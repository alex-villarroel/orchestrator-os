#!/usr/bin/env node
// Created by Alex Villarroel · part of Orchestration OS
/**
 * eol-guard.js
 * --------------------------------------------------------------------------
 * PURPOSE : Detect line-ending (EOL) drift on edited source files. An agent
 *           that rewrites a file can silently flip CRLF <-> LF, which produces
 *           a "whole file changed" diff and corrupts version history. This hook
 *           snapshots the carriage-return (CR) count of a file BEFORE an edit
 *           and verifies it AFTER. A net flip in CR count blocks the change.
 *
 * EVENT   : PreToolUse  (mode: snapshot) on Edit | Write
 *           PostToolUse (mode: verify)   on Edit | Write
 *           One file, two modes. Selected by the first CLI argument:
 *             node eol-guard.js snapshot      <- wire to PreToolUse
 *             node eol-guard.js verify        <- wire to PostToolUse
 *
 * POSTURE : FAIL-OPEN. Any internal error (bad JSON, unreadable file, missing
 *           snapshot) allows the tool to proceed. A guard must never brick work
 *           it cannot reason about. The only hard stop is a CONFIRMED flip.
 *
 * KILL    : Set HOOKS_OFF=1 in the environment to disable. Exits 0 immediately.
 * --------------------------------------------------------------------------
 */

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

// Source extensions we care about. EOL drift in binaries is meaningless.
const SOURCE_EXT = new Set([
  '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs',
  '.html', '.css', '.scss', '.json', '.md', '.yml', '.yaml',
  '.py', '.go', '.rs', '.java', '.c', '.h', '.sh',
]);

const SNAPSHOT_DIR = path.join(os.tmpdir(), 'orchestration-os-eol-guard');

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.on('data', (c) => (data += c));
    process.stdin.on('end', () => resolve(data));
    // If nothing arrives on stdin, do not hang the harness.
    setTimeout(() => resolve(data), 2000);
  });
}

function crCount(buf) {
  // Count 0x0D bytes. CRLF files have one CR per line; LF files have zero.
  let n = 0;
  for (let i = 0; i < buf.length; i++) if (buf[i] === 0x0d) n++;
  return n;
}

function snapshotPathFor(filePath) {
  const key = crypto.createHash('sha1').update(filePath).digest('hex');
  return path.join(SNAPSHOT_DIR, key + '.json');
}

function isSource(filePath) {
  return SOURCE_EXT.has(path.extname(filePath).toLowerCase());
}

// PreToolUse: record CR count of the file as it exists right now.
function doSnapshot(filePath) {
  if (!fs.existsSync(filePath)) return; // new file, nothing to compare against
  const buf = fs.readFileSync(filePath);
  fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });
  fs.writeFileSync(
    snapshotPathFor(filePath),
    JSON.stringify({ cr: crCount(buf), bytes: buf.length, at: Date.now() })
  );
}

// PostToolUse: compare current CR count against the snapshot.
// Returns a human-readable reason string if a flip is detected, else null.
function doVerify(filePath) {
  const snapPath = snapshotPathFor(filePath);
  if (!fs.existsSync(snapPath) || !fs.existsSync(filePath)) return null;

  const before = JSON.parse(fs.readFileSync(snapPath, 'utf8'));
  const after = crCount(fs.readFileSync(filePath));

  // Clean up the snapshot so it never goes stale.
  try { fs.unlinkSync(snapPath); } catch (_) {}

  const beforeStyle = before.cr === 0 ? 'LF' : 'CRLF';
  const afterStyle = after === 0 ? 'LF' : 'CRLF';

  // A flip is a change of EOL family (CR present <-> CR absent).
  if ((before.cr === 0) !== (after === 0)) {
    return `EOL flip detected on ${path.basename(filePath)}: ` +
      `${beforeStyle} (CR=${before.cr}) -> ${afterStyle} (CR=${after}). ` +
      `Re-make the edit preserving the original line endings.`;
  }
  return null;
}

(async function main() {
  // Kill switch.
  if (process.env.HOOKS_OFF === '1') process.exit(0);

  const mode = process.argv[2]; // "snapshot" | "verify"
  let payload;

  try {
    payload = JSON.parse(await readStdin() || '{}');
  } catch (_) {
    process.exit(0); // fail-open on unparseable input
  }

  const filePath = payload?.tool_input?.file_path;
  if (!filePath || !isSource(filePath)) process.exit(0);

  try {
    if (mode === 'snapshot') {
      doSnapshot(filePath);
      process.exit(0);
    }

    if (mode === 'verify') {
      const reason = doVerify(filePath);
      if (reason) {
        // PostToolUse cannot deny via permissionDecision; surface to the agent
        // on stderr and exit 2 so the flip is reported and self-corrected.
        console.error('[eol-guard] ' + reason);
        process.exit(2);
      }
      process.exit(0);
    }

    // Unknown mode: do nothing.
    process.exit(0);
  } catch (err) {
    // FAIL-OPEN: never block on our own bug.
    console.error('[eol-guard] internal error, allowing: ' + err.message);
    process.exit(0);
  }
})();
