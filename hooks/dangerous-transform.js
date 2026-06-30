#!/usr/bin/env node
// Created by Alex Villarroel · part of Orchestrator OS
/**
 * dangerous-transform.js
 * --------------------------------------------------------------------------
 * PURPOSE : Deny known-bad in-place file transforms issued through a shell.
 *           Stream editors run blind: a stray `sed -i` regex can rewrite an
 *           entire tracked file with no diff preview and no undo. The correct
 *           tool for editing a file is the editor (Edit/Write), which shows the
 *           exact before/after. This hook blocks the blind transforms and tells
 *           the agent to use the editor instead.
 *
 * EVENT   : PreToolUse on shell tools (Bash | Shell | PowerShell). Inspects the
 *           command string and DENIES when it matches a destructive in-place
 *           transform pattern.
 *
 * POSTURE : FAIL-OPEN. If the command cannot be parsed we allow it; this hook
 *           only fires on a positive match against a small, high-confidence
 *           pattern list (low false-positive risk).
 *
 * KILL    : Set HOOKS_OFF=1 to disable. Exits 0 immediately.
 * --------------------------------------------------------------------------
 */

'use strict';

// Each rule: a regex over the raw command + the guidance shown on denial.
// Patterns target IN-PLACE rewrites only. A `sed` that prints to stdout, or one
// that writes to a NEW file, is left alone.
const RULES = [
  {
    re: /\bsed\b[^|;&]*\s-i\b/,
    why: 'sed -i rewrites the file in place with no diff and no undo.',
  },
  {
    re: /\bperl\b[^|;&]*\s-i\b/,
    why: 'perl -i rewrites the file in place with no diff and no undo.',
  },
  {
    re: /\b(gawk|awk)\b[^|;&]*\s-i\s+inplace\b/,
    why: 'awk -i inplace rewrites the file in place with no diff and no undo.',
  },
  {
    // PowerShell content cmdlets piped back over a file are a classic
    // silent-corruption path (especially on encoding/EOL).
    re: /\((?:Get-Content|gc)\b[^)]*\)\s*\|\s*(?:Set-Content|sc|Out-File)\b/i,
    why: 'Reading a file and piping it back through Set-Content/Out-File can ' +
      'silently change encoding and line endings.',
  },
];

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.on('data', (c) => (data += c));
    process.stdin.on('end', () => resolve(data));
    setTimeout(() => resolve(data), 2000);
  });
}

function deny(reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
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
    const tool = payload?.tool_name || '';
    if (!/^(Bash|Shell|PowerShell)$/.test(tool)) process.exit(0);

    // Different shell tools name the field differently; check the common ones.
    const cmd =
      payload?.tool_input?.command ||
      payload?.tool_input?.script ||
      '';
    if (!cmd) process.exit(0);

    for (const rule of RULES) {
      if (rule.re.test(cmd)) {
        deny(
          `Blocked dangerous in-place transform. ${rule.why} ` +
            `Use the editor (Edit/Write) instead so the change is reviewable ` +
            `and reversible.`
        );
      }
    }

    process.exit(0); // no match, allow
  } catch (err) {
    console.error('[dangerous-transform] internal error, allowing: ' + err.message);
    process.exit(0); // FAIL-OPEN
  }
})();
