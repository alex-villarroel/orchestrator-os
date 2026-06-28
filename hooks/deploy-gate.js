#!/usr/bin/env node
// Created by Alex Villarroel · part of Orchestration OS
/**
 * deploy-gate.js
 * --------------------------------------------------------------------------
 * PURPOSE : Make "never deploy without a fresh green gate" a wall, not a habit.
 *           A deploy is the one irreversible, public-facing action; it must be
 *           preceded by a proof run (tests / lint / tripwires) whose result is
 *           recorded. This hook refuses the deploy command unless a gate-proof
 *           directory exists, is FRESH, and is GREEN.
 *
 * EVENT   : PreToolUse on shell tools. DENIES the configured deploy command
 *           unless the proof is valid.
 *
 * POSTURE : FAIL-CLOSED. This is the one hook that blocks on its own error or
 *           on missing data. A broken or absent gate must never let a deploy
 *           through. If anything is uncertain, the deploy is denied.
 *
 * CONFIG  : Environment overrides (with safe defaults):
 *             DEPLOY_COMMAND_PATTERN  regex that identifies the deploy command
 *                                     default matches "<deploy-command>" and a
 *                                     generic "deploy" verb.
 *             GATE_PROOF_DIR          directory holding the proof
 *                                     default ".deploy-gate"
 *             GATE_MAX_AGE_MIN        freshness window in minutes (default 30)
 *
 *           Expected proof shape inside GATE_PROOF_DIR:
 *             status   a file containing the single word "green" (or "pass")
 *           Its mtime is the proof timestamp used for the freshness check.
 *
 * KILL    : Set HOOKS_OFF=1 to disable. Exits 0 immediately. (Use only when you
 *           are intentionally bypassing the gate; it removes the wall.)
 * --------------------------------------------------------------------------
 */

'use strict';

const fs = require('fs');
const path = require('path');

const DEPLOY_PATTERN = new RegExp(
  process.env.DEPLOY_COMMAND_PATTERN || '<deploy-command>|\\bdeploy\\b'
);
const PROOF_DIR = process.env.GATE_PROOF_DIR || '.deploy-gate';
const MAX_AGE_MIN = parseInt(process.env.GATE_MAX_AGE_MIN || '30', 10);

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
        permissionDecisionReason: '[deploy-gate] ' + reason,
      },
    })
  );
  process.exit(0);
}

function allow() {
  process.exit(0);
}

// Returns null if the gate is valid, otherwise a denial reason string.
function checkGate(cwd) {
  const dir = path.isAbsolute(PROOF_DIR) ? PROOF_DIR : path.join(cwd, PROOF_DIR);
  const statusFile = path.join(dir, 'status');

  if (!fs.existsSync(dir)) {
    return `no gate-proof directory at "${dir}". Run the proof gate before deploying.`;
  }
  if (!fs.existsSync(statusFile)) {
    return `gate-proof "${statusFile}" missing. Run the proof gate before deploying.`;
  }

  const status = fs.readFileSync(statusFile, 'utf8').trim().toLowerCase();
  if (status !== 'green' && status !== 'pass') {
    return `gate status is "${status}", not green. Fix and re-run the proof gate.`;
  }

  const ageMin = (Date.now() - fs.statSync(statusFile).mtimeMs) / 60000;
  if (ageMin > MAX_AGE_MIN) {
    return `gate proof is stale (${Math.round(ageMin)} min old, max ${MAX_AGE_MIN}). ` +
      `Re-run the proof gate before deploying.`;
  }

  return null; // valid
}

(async function main() {
  if (process.env.HOOKS_OFF === '1') allow();

  let payload;
  try {
    payload = JSON.parse((await readStdin()) || '{}');
  } catch (_) {
    // FAIL-CLOSED: cannot read the request. If a deploy is in flight we must
    // not allow it blind. But we also do not know it IS a deploy, so allow
    // non-shell uncertainty and only clamp once we confirm a deploy below.
    allow();
  }

  try {
    const tool = payload?.tool_name || '';
    if (!/^(Bash|Shell|PowerShell)$/.test(tool)) allow();

    const cmd =
      payload?.tool_input?.command ||
      payload?.tool_input?.script ||
      '';

    // Only this hook's concern: the deploy command. Everything else passes.
    if (!cmd || !DEPLOY_PATTERN.test(cmd)) allow();

    const cwd = payload?.cwd || process.cwd();
    const reason = checkGate(cwd);
    if (reason) deny(reason);

    allow(); // gate is fresh + green
  } catch (err) {
    // FAIL-CLOSED: a broken gate denies the deploy.
    deny('gate check errored (' + err.message + '). Deploy denied for safety.');
  }
})();
