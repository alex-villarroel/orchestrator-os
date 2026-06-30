#!/usr/bin/env node
// Created by Alex Villarroel · part of Orchestrator OS
/**
 * secret-scan.js
 * --------------------------------------------------------------------------
 * PURPOSE : Stop a secret VALUE from being written into the knowledge base.
 *           The rule (the standard): names and locations of secrets live in
 *           your secrets map; the actual values live in a password manager,
 *           never in a note or a committed file. This catches the slip where
 *           a real key gets pasted into a doc.
 *
 * EVENT   : PreToolUse on Edit | Write. Scans the content being written for
 *           common secret-value shapes and returns an ASK so the human can
 *           confirm it is a placeholder/example, or cancel and move the value
 *           to the password manager.
 *
 * DETECTS : OpenAI-style keys (sk-...), AWS access keys (AKIA...), PEM private
 *           keys (-----BEGIN ... PRIVATE KEY-----), and JWTs (eyJ........).
 *           Shapes are intentionally generic; extend SECRET_PATTERNS for your
 *           own providers.
 *
 * POSTURE : FAIL-OPEN, ASK (warn-first). A false positive must never silently
 *           block a legitimate write; the human decides. Promote to "deny"
 *           once you trust the patterns in your repo.
 *
 * KILL    : Set HOOKS_OFF=1 to disable. Exits 0 immediately.
 * --------------------------------------------------------------------------
 */

'use strict';

// Generic secret-value shapes. Add your providers' token formats here.
const SECRET_PATTERNS = [
  { name: 'API key (sk-...)', re: /sk-[A-Za-z0-9]{20,}/ },
  { name: 'AWS access key', re: /AKIA[0-9A-Z]{16}/ },
  { name: 'private key block', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { name: 'JWT', re: /eyJ[A-Za-z0-9_-]{18,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/ },
];

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

    // Write carries .content; Edit carries .new_string.
    const input = payload?.tool_input || {};
    const content = input.content || input.new_string || '';
    if (!content) process.exit(0);

    for (const p of SECRET_PATTERNS) {
      if (p.re.test(content)) {
        decide(
          'ask',
          `This write looks like it contains a SECRET value (${p.name}). ` +
            `The rule: names and locations go in your secrets map, the value ` +
            `goes in a password manager, never in a note. Confirm this is a ` +
            `placeholder/example, or cancel and store the value securely.`
        );
      }
    }

    process.exit(0); // no secret shape found, allow silently
  } catch (err) {
    console.error('[secret-scan] internal error, allowing: ' + err.message);
    process.exit(0); // FAIL-OPEN
  }
})();
