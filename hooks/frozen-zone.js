#!/usr/bin/env node
// Created by Alex Villarroel · part of Orchestration OS
/**
 * frozen-zone.js
 * --------------------------------------------------------------------------
 * PURPOSE : Guard a configurable set of "frozen" files. These are modules that
 *           are deliberately stable (a math/calc core, a request worker, a
 *           print/PDF core) where an accidental edit has outsized blast radius.
 *           Editing one should require a human confirmation, not a silent write.
 *
 * EVENT   : PreToolUse on Edit | Write. Returns an ASK decision when the target
 *           file matches the frozen list, prompting the human to confirm.
 *
 * POSTURE : FAIL-OPEN. On any internal error the edit is allowed. The frozen
 *           zone is a speed bump, not a vault door; the proof gate / review
 *           catches anything that slips. (Promote to "deny" once the list is
 *           proven stable in your repo if you want a hard wall instead.)
 *
 * CONFIG  : Frozen files are matched by BASENAME so the list is path-agnostic.
 *           Override the default set with a comma-separated env var:
 *             FROZEN_FILES="<frozen-module>,calc-core.js,print-core.js"
 *
 * KILL    : Set HOOKS_OFF=1 to disable. Exits 0 immediately.
 * --------------------------------------------------------------------------
 */

'use strict';

const path = require('path');

// Default frozen basenames. Replace with the modules you actually freeze.
// Placeholder <frozen-module> stands in for your project's protected core.
const DEFAULT_FROZEN = [
  '<frozen-module>',
  'calc-core.js',
  'print-core.js',
  'worker.js',
];

function frozenSet() {
  const fromEnv = (process.env.FROZEN_FILES || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return new Set(fromEnv.length ? fromEnv : DEFAULT_FROZEN);
}

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.on('data', (c) => (data += c));
    process.stdin.on('end', () => resolve(data));
    setTimeout(() => resolve(data), 2000);
  });
}

// Emit a PreToolUse permission decision and exit 0. The harness reads the JSON.
function decide(decision, reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: decision, // "allow" | "ask" | "deny"
        permissionDecisionReason: reason,
      },
    })
  );
  process.exit(0);
}

(async function main() {
  if (process.env.HOOKS_OFF === '1') process.exit(0);

  let payload;
  try {
    payload = JSON.parse((await readStdin()) || '{}');
  } catch (_) {
    process.exit(0); // fail-open
  }

  try {
    const tool = payload?.tool_name;
    if (tool !== 'Edit' && tool !== 'Write') process.exit(0);

    const filePath = payload?.tool_input?.file_path;
    if (!filePath) process.exit(0);

    const base = path.basename(filePath);
    if (frozenSet().has(base)) {
      decide(
        'ask',
        `"${base}" is in the frozen zone. Edits here have wide blast radius. ` +
          `Confirm you intend to modify a frozen module, or cancel and route ` +
          `the change through the owning module instead.`
      );
    }

    process.exit(0); // not frozen, allow silently
  } catch (err) {
    console.error('[frozen-zone] internal error, allowing: ' + err.message);
    process.exit(0); // FAIL-OPEN
  }
})();
