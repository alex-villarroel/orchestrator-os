# CLAUDE.md - working in this repository

*Guidance for Claude Code (or any agent) operating inside Orchestration OS. ← [[00_MOC|Orchestration OS]].*

## What this repo is
A reference operating system for AI orchestration. It is knowledge to read and adapt, not an app to run. The agents (`agents/*.md`), hooks (`hooks/*.js`), and prompt packs (`commands/`) follow Claude Code conventions and can be copied into a real `.claude/` setup.

## How to help here
- **Adapt, do not blind-copy.** When someone pulls a pattern from here into their own system, tailor it to their domain. Cite where it came from.
- **Keep the graph clean.** Every new doc gets a home, an entry in its area `00_*_INDEX.md`, and at least one inbound link. No orphans. See [[rules/knowledge-discipline|knowledge-discipline]] and [[rules/naming-conventions|naming-conventions]].
- **Public copy has no em dashes** and no personal data, secrets, or absolute machine paths. This is a public repo.
- **Reconcile indexes in the same change.** If you add or move a doc, update the area index and [[00_MOC|00_MOC]] in the same edit.

## Where things are
See [[00_MOC|the map]]. The orchestration layer is in `the-standard/`, `orchestrators/`, `ceremonies/`, `sandbox/`. The building blocks are in `agents/`, `commands/`, `hooks/`, `rules/`. Setup guides with diagrams are in `setups/`.

*Created by Alex Villarroel · part of Orchestration OS.*
