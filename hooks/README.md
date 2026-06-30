# Hooks: the enforcement layer

← [00_HOOKS_INDEX](./00_HOOKS_INDEX.md) · [Orchestrator OS](../00_MOC.md)

A hook is a command the agent harness runs automatically on a lifecycle event (before or after a tool call, at session start, at compaction). It reads the event as JSON on stdin and can allow, ask, deny, or inject context. This directory holds small, self-contained Node scripts plus this guide.

## Why hooks (remembered vs enforced)

Rules written in a prompt are *remembered*, not *enforced*. An agent drops a fraction of its standing instructions on any given turn, and one forgotten check is how a bad deploy, a line-ending corruption, or an edit to a protected core slips through.

A hook is the opposite: a script the harness runs on every matching tool call, in every session, with no chance to forget. The principle is simple. A check a script can run is never left to memory. Anything that is deterministic and high-stakes belongs in a hook; anything that needs judgment stays in the prose ceremony.

## The scripts here

| Script | Event | Decision | Posture |
|---|---|---|---|
| [eol-guard.js](./eol-guard.js) | PreToolUse + PostToolUse on Edit/Write | block on a confirmed EOL flip | fail-open |
| [frozen-zone.js](./frozen-zone.js) | PreToolUse on Edit/Write to a frozen list | ask | fail-open |
| [dangerous-transform.js](./dangerous-transform.js) | PreToolUse on shell tools | deny blind in-place transforms | fail-open |
| [deploy-gate.js](./deploy-gate.js) | PreToolUse on the deploy command | deny unless proof is fresh and green | fail-closed |
| [secret-scan.js](./secret-scan.js) | PreToolUse on Edit/Write | ask on a secret-value shape (key, AWS, PEM, JWT) | fail-open |
| [structure-lint.js](./structure-lint.js) | PreToolUse on Write of a new doc | deny a new root doc; ask to index a new doc (orphan reminder) | fail-open |
| [session-start.js](./session-start.js) | SessionStart | inject a reground banner | non-blocking |

## The config schema (settings.json hooks block)

Hooks are registered in the harness `settings.json` under a `hooks` key, grouped by event. Each entry has a `matcher` (which tool it applies to) and a list of `hooks` (commands to run). Use absolute paths or a `$VAR` the harness resolves; the `<hooks-dir>` placeholder below stands in for your install root (for example `~/.claude/hooks` for a user-scope install, or `.claude/hooks` for a repo-scope install).

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "node <hooks-dir>/eol-guard.js snapshot" },
          { "type": "command", "command": "node <hooks-dir>/frozen-zone.js" }
        ]
      },
      {
        "matcher": "Bash|Shell|PowerShell",
        "hooks": [
          { "type": "command", "command": "node <hooks-dir>/dangerous-transform.js" },
          { "type": "command", "command": "node <hooks-dir>/deploy-gate.js" }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "node <hooks-dir>/eol-guard.js verify" }
        ]
      }
    ],
    "SessionStart": [
      {
        "matcher": "startup|resume|compact",
        "hooks": [
          { "type": "command", "command": "node <hooks-dir>/session-start.js" }
        ]
      }
    ]
  }
}
```

The `matcher` is a regular expression over the tool name. `eol-guard.js` is wired twice: a `snapshot` pass on PreToolUse and a `verify` pass on PostToolUse.

## The control contract

A hook talks to the harness in two ways: its exit code and, optionally, a JSON object on stdout.

**Exit codes**

- `0` - success. The tool proceeds. Anything written to stdout is read as a structured decision (see below).
- `2` - block (PreToolUse) or report a problem (PostToolUse). Whatever the hook writes to stderr is shown to the agent so it can self-correct.
- any other non-zero - treated as a hook error. It is logged but does not block.

**Structured decisions (PreToolUse)**

Instead of relying on exit code 2, a PreToolUse hook can exit `0` and print a decision. This is the preferred path because it carries a reason and an explicit verb:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "ask",
    "permissionDecisionReason": "This file is frozen; confirm the edit."
  }
}
```

`permissionDecision` is one of:

- `allow` - proceed without prompting.
- `ask` - pause and ask the human to confirm (used by [frozen-zone.js](./frozen-zone.js), [secret-scan.js](./secret-scan.js), and [structure-lint.js](./structure-lint.js)).
- `deny` - refuse the tool call with the given reason (used by [dangerous-transform.js](./dangerous-transform.js), [deploy-gate.js](./deploy-gate.js), and [structure-lint.js](./structure-lint.js)).

**Context injection (SessionStart)**

A SessionStart hook returns text the harness prepends to the session:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "Reground check: the live board beats stale docs..."
  }
}
```

**Input on stdin**

Every hook receives the event as JSON. The fields used here:

```jsonc
{
  "tool_name": "Edit",                 // "Bash", "Write", "Edit", ...
  "tool_input": {
    "file_path": "src/app.js",         // Edit/Write target
    "command": "sed -i s/a/b/ f.js"    // shell command (Bash/Shell)
  },
  "cwd": "/abs/path/to/repo",          // working directory (deploy-gate uses it)
  "source": "resume"                   // SessionStart only: startup|resume|compact
}
```

## Fail-open vs fail-closed

Every hook declares a posture in its header, and it matters:

- **Fail-open** - on any internal error (bad JSON, unreadable file, missing snapshot) the hook allows the tool to proceed. A buggy guard must never brick legitimate work. Six of the seven hooks here are fail-open; the only hard stop is a *confirmed* violation.
- **Fail-closed** - [deploy-gate.js](./deploy-gate.js) is the deliberate exception. A deploy is irreversible and public, so a broken or absent gate must deny the deploy rather than wave it through. If the gate cannot prove the build is green, it says no.

Pick the posture by blast radius. Reversible action plus uncertainty equals allow. Irreversible action plus uncertainty equals deny.

## The kill switch

Every script checks `HOOKS_OFF=1` first and exits immediately when set. This is the escape hatch for the rare case where a hook is in the way and you accept the risk.

```bash
# disable all hooks for one command
HOOKS_OFF=1 <deploy-command>
```

Note that the kill switch also lifts the fail-closed deploy gate, so use it consciously.

## Where hooks live (user vs repo)

- **User scope** (`~/.claude/settings.json`) - applies to every session on the machine. Good for broad safety nets like `dangerous-transform.js`.
- **Repo scope** (`.claude/settings.json` in the project) - applies only when working in that repo. Good for repo-specific rules like `frozen-zone.js` (the frozen list is project-specific) and `deploy-gate.js` (the deploy command is project-specific).

Keep the scope as narrow as the rule. A hook that should only fire inside one project does not belong in the user config.

## Testing

Hooks are plain scripts that read stdin and write stdout, so they test from the shell. Pipe a sample event and inspect the exit code and output:

```bash
# frozen-zone should ASK on a frozen file
echo '{"tool_name":"Edit","tool_input":{"file_path":"src/<frozen-module>"}}' \
  | node frozen-zone.js
# -> {"hookSpecificOutput":{...,"permissionDecision":"ask",...}}

# dangerous-transform should DENY a sed -i
echo '{"tool_name":"Bash","tool_input":{"command":"sed -i s/a/b/ f.js"}}' \
  | node dangerous-transform.js
# -> {"hookSpecificOutput":{...,"permissionDecision":"deny",...}}

# deploy-gate should DENY with no proof directory present
echo '{"tool_name":"Bash","tool_input":{"command":"<deploy-command>"},"cwd":"."}' \
  | node deploy-gate.js
# -> deny: no gate-proof directory...

# kill switch should let everything through
echo '{"tool_name":"Bash","tool_input":{"command":"sed -i s/a/b/ f.js"}}' \
  | HOOKS_OFF=1 node dangerous-transform.js
# -> (no output, exit 0)
```

Confirm all four decisions (allow, ask, deny, context) plus the kill switch before wiring anything to `block` or `deny` in `settings.json`. A good rollout blocks only the clear-cut cases first, runs the rest as `ask` for a few sessions to tune the patterns, then tightens.

## Borrowed patterns and attribution

The stdin/stdout/exit-code mechanics and the lifecycle event names follow the Claude Code hooks interface from Anthropic. The matcher-and-recipe structure, the Node-for-cross-platform approach, and several recipe shapes are adapted from the ECC plugin hooks (MIT, [affaan-m/ECC](https://github.com/affaan-m/ECC)). The scripts here are rewritten generic and self-contained.

*Created by Alex Villarroel · part of Orchestrator OS.*
