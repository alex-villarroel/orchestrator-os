# CLAUDE.md - working in this repository

*Guidance for Claude Code (or any agent) operating inside Orchestrator OS. ← [Orchestrator OS](./00_MOC.md).*

## What this repo is
A reference operating system for AI orchestration. It is knowledge to read and adapt, not an app to run. The agents (`agents/<Category>/<name>.md`), skills (`skills/<name>/SKILL.md`), hooks (`hooks/*.js`, wired via `hooks/hooks.json`), and prompt packs (`commands/`) follow Claude Code conventions and can be copied into a real `.claude/` setup.

## How to help here
- **Adapt, do not blind-copy.** When someone pulls a pattern from here into their own system, tailor it to their domain. Cite where it came from.
- **Keep the graph clean.** Every new doc gets a home, an entry in its area `00_*_INDEX.md`, and at least one inbound link. No orphans. See [knowledge-discipline](./rules/knowledge-discipline.md) and [naming-conventions](./rules/naming-conventions.md).
- **Public copy has no em dashes** and no personal data, secrets, or absolute machine paths. This is a public repo.
- **Reconcile indexes in the same change.** If you add or move a doc, update the area index and [00_MOC](./00_MOC.md) in the same edit.

## Where things are
See [the map](./00_MOC.md). The orchestration layer is in `the-standard/`, `orchestrators/`, `ceremonies/`, `sandbox/`. The building blocks are in `agents/`, `commands/`, `hooks/`, `rules/`. Setup guides with diagrams are in `setups/`.

*Created by Alex Villarroel · part of Orchestrator OS.*
