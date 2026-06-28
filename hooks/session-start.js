#!/usr/bin/env node
// Created by Alex Villarroel · part of Orchestration OS
/**
 * session-start.js
 * --------------------------------------------------------------------------
 * PURPOSE : Inject a short reground / context banner at the start (or resume)
 *           of a session. After a compaction or a fresh launch, an agent loses
 *           the standing context; a few canonical lines restore the foundation
 *           without the agent having to rediscover it.
 *
 * EVENT   : SessionStart. Non-blocking. Returns additionalContext that the
 *           harness prepends to the session. It never denies or stops anything.
 *
 * POSTURE : FAIL-OPEN by construction. A SessionStart hook cannot block work;
 *           the worst case is an empty banner. Any error simply skips the
 *           banner and exits 0.
 *
 * CONFIG  : SESSION_BANNER  override the banner text entirely.
 *           SESSION_START_SOURCES  comma-separated "matchers" the harness may
 *                                  pass (e.g. startup,resume,compact). If set,
 *                                  the banner is only injected for those.
 *
 * KILL    : Set HOOKS_OFF=1 to disable. Exits 0 with no banner.
 * --------------------------------------------------------------------------
 */

'use strict';

const DEFAULT_BANNER = [
  'Reground check (session start):',
  '- Confirm the live board / current state beats any stale doc; verify before acting.',
  '- Honor the enforcement layer: frozen zones ask, dangerous transforms are denied,',
  '  deploys are gated. Do not work around a hook; fix the underlying issue.',
  '- Prefer the editor over shell rewrites. Preserve existing line endings.',
  '- State your plan before multi-step or irreversible actions.',
].join('\n');

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.on('data', (c) => (data += c));
    process.stdin.on('end', () => resolve(data));
    setTimeout(() => resolve(data), 2000);
  });
}

(async function main() {
  if (process.env.HOOKS_OFF === '1') process.exit(0);

  let payload = {};
  try {
    payload = JSON.parse((await readStdin()) || '{}');
  } catch (_) {
    process.exit(0); // fail-open, no banner
  }

  try {
    // Optionally scope to specific start sources.
    const allowed = (process.env.SESSION_START_SOURCES || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const source = payload?.source || payload?.matcher || '';
    if (allowed.length && source && !allowed.includes(source)) {
      process.exit(0);
    }

    const banner = process.env.SESSION_BANNER || DEFAULT_BANNER;

    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'SessionStart',
          additionalContext: banner,
        },
      })
    );
    process.exit(0);
  } catch (err) {
    // Never let a banner break a session start.
    console.error('[session-start] internal error, skipping banner: ' + err.message);
    process.exit(0);
  }
})();
