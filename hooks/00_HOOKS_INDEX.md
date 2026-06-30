# Hooks Index

*The enforcement layer of the Orchestrator OS: small, self-contained scripts the agent harness runs on lifecycle events so the high-stakes rules are enforced by a script, not left to memory. Deterministic checks live here; judgment stays in the ceremonies.*

← [Orchestrator OS](../00_MOC.md)

## Contents

- [README](./README.md) - the enforcement-layer pattern: why hooks (remembered vs enforced), the settings.json config schema, the control contract (exit codes and permissionDecision JSON), fail-open vs fail-closed, the kill switch, user vs repo placement, and testing.

## Scripts

- [`eol-guard.js`](eol-guard.js) - PreToolUse snapshot plus PostToolUse verify of line-ending (CR-count) drift on edited source files; blocks on a confirmed flip. Fail-open.
- [`frozen-zone.js`](frozen-zone.js) - PreToolUse on Edit/Write to a configurable frozen-file list; returns an ASK decision. Fail-open.
- [`dangerous-transform.js`](dangerous-transform.js) - PreToolUse on shell tools; denies known-bad in-place transforms (such as `sed -i` on tracked files) and points to the editor instead. Fail-open.
- [`deploy-gate.js`](deploy-gate.js) - PreToolUse on a configurable deploy command; fail-closed unless a fresh, green gate-proof directory exists.
- [`secret-scan.js`](secret-scan.js) - PreToolUse on Edit/Write; returns an ASK when the content being written matches a secret-value shape (API key, AWS key, PEM private key, JWT), so a real key cannot slip into a note. Fail-open.
- [`structure-lint.js`](structure-lint.js) - PreToolUse on Write of a new doc; DENIES a new doc at the repo root (every artifact has a home) and ASKs to index a new doc created in an indexed folder (orphan reminder). Modest by design, not a full graph validator. Fail-open.
- [`session-start.js`](session-start.js) - SessionStart; injects a short reground / context banner. Non-blocking.

## Conventions

- **Enforce, do not remind.** A check a script can run is never delegated to a prompt. Deterministic and high-stakes goes in a hook; judgment stays in the ceremony.
- **Posture by blast radius.** Reversible action plus uncertainty equals allow (fail-open). Irreversible action plus uncertainty equals deny (fail-closed). Only [deploy-gate.js](./deploy-gate.js) fails closed.
- **Always escapable.** Every script honors `HOOKS_OFF=1` and exits immediately, so a buggy hook never bricks work.
- **Test before wiring.** Pipe a sample event to each script and confirm all four decisions (allow, ask, deny, context) plus the kill switch before adding it to `settings.json`.

*Created by Alex Villarroel · part of Orchestrator OS.*
