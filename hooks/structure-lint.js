#!/usr/bin/env node
// Created by Alex Villarroel · part of Orchestrator OS
/**
 * structure-lint.js
 * --------------------------------------------------------------------------
 * PURPOSE : Enforce the two structural rules a single edit can actually check,
 *           so they are not left to a human reading a checklist:
 *             1. ROOT STAYS CLEAN. A new doc must live in a subfolder, not at
 *                the repo root. (The routing rule: every artifact has a home.)
 *             2. NO ORPHANS (reminder). When a new doc is created in a folder
 *                that has an index (00_*_INDEX), remind the author to add it to
 *                that index and give it an inbound link.
 *
 *           This is deliberately MODEST. It is NOT a full link-graph validator
 *           (that needs the whole repo and belongs in the gate, not a per-edit
 *           hook). Rule 1 is a hard deny; rule 2 is a soft reminder.
 *
 * EVENT   : PreToolUse on Write (new-file creation). Edits to existing docs do
 *           not change structure and pass untouched.
 *
 * POSTURE : FAIL-OPEN. Rule 1 = deny (new root doc); rule 2 = ask (reminder).
 *
 * CONFIG  : ROOT = the project root being protected (default: process.cwd();
 *           override with LINT_ROOT). Root-allowed basenames extend via env
 *           ROOT_ALLOW="FILE.md,OTHER.md" (added to the built-in allowlist).
 *
 * KILL    : Set HOOKS_OFF=1 to disable. Exits 0 immediately.
 * --------------------------------------------------------------------------
 */

'use strict';

const path = require('path');
const fs = require('fs');

// Docs that legitimately live at the repo root.
const ROOT_ALLOW = new Set(
  [
    'README.md', '00_MOC.md', 'CLAUDE.md', 'Glossary.md', 'Quickstart.md',
    'the-shortform-guide.md', 'the-longform-guide.md', 'the-philosophy.md',
    'CHANGELOG.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'SECURITY.md', 'CREDITS.md',
  ].concat(
    (process.env.ROOT_ALLOW || '').split(',').map((s) => s.trim()).filter(Boolean)
  )
);

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.on('data', (c) => (data += c));
    process.stdin.on('end', () => resolve(data));
    setTimeout(() => resolve(data), 2000);
  });
}

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

function hasIndex(dir) {
  try {
    return fs.readdirSync(dir).some((f) => /^00_.*INDEX.*\.md$/i.test(f));
  } catch (_) {
    return false;
  }
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
    if (payload?.tool_name !== 'Write') process.exit(0);

    const filePath = payload?.tool_input?.file_path;
    if (!filePath || !/\.md$/i.test(filePath)) process.exit(0);

    // Only act on NEW docs; overwriting an existing file changes no structure.
    const abs = path.resolve(filePath);
    if (fs.existsSync(abs)) process.exit(0);

    const root = path.resolve(process.env.LINT_ROOT || process.cwd());
    const dir = path.dirname(abs);
    const base = path.basename(abs);

    // Rule 1: root stays clean.
    if (dir === root) {
      if (!ROOT_ALLOW.has(base)) {
        decide(
          'deny',
          `"${base}" would be created at the repo root. New docs go in a ` +
            `subfolder (every artifact has a home), not the root. Move it into ` +
            `the right area folder, or add it to ROOT_ALLOW if it truly belongs ` +
            `at the root.`
        );
      }
      process.exit(0); // an allowlisted root doc
    }

    // Rule 2: orphan reminder for a new doc in an indexed folder.
    if (hasIndex(dir)) {
      decide(
        'ask',
        `New doc "${base}" in an indexed folder. Before you finish: add it to ` +
          `that folder's 00_*_INDEX and give it at least one inbound link, so ` +
          `it is not an orphan. (Reminder only; the gate verifies the graph.)`
      );
    }

    process.exit(0);
  } catch (err) {
    console.error('[structure-lint] internal error, allowing: ' + err.message);
    process.exit(0); // FAIL-OPEN
  }
})();
