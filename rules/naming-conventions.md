# Naming Conventions

*The codified naming and structure rules for the knowledge base. They apply to new files; existing files are grandfathered and not mass-renamed. Consistent names are what let any agent, fresh or returning, find a doc and link it correctly the first time.*

← [00_RULES_INDEX](./00_RULES_INDEX.md) · [Orchestrator OS](../00_MOC.md)

## Folder casing

- **Domain folders use Title Case:** `Orchestrator OS`, `Build KB`, `Alex Handoffs`.
- **Role, data, and working subfolders use lowercase:** `rules`, `roles`, `agents`, `knowledge`, `contracts`.
- Legacy UPPERCASE subfolders from older areas are grandfathered. Do not mass-rename them.

## File patterns

- **In-folder index:** `00_<NAME>_INDEX.md`. The `00_` prefix sorts it to the top of the folder. Keep **one index per folder**; do not also keep a duplicate copy at the parent.
- **Map of content:** `<Name> MOC.md`.
- **Resume:** `RESUME_PROMPT.md`, exactly that name.

## The shared-basename gotcha

A bare `[[Name]]` resolves to only **one** file, even when several folders intentionally share that basename (`RESUME_PROMPT.md`, `Operating System.md`, `00_MOC.md`). The link silently points at whichever one the resolver picks first, which is usually not the one you meant.

**Always link path-explicit for shared basenames:**

- Correct: `[[Orchestrator OS/rules/knowledge-discipline|knowledge-discipline]]`
- Correct: `[[Folder/Operating System|Operating System]]`
- Wrong: `[[Operating System]]` (ambiguous, resolves to one arbitrary target)

This also matters for orphan counting: a bare link to a shared basename makes every same-named file look linked when only one actually is. Path-explicit links keep the graph honest.

## Enforcement

A conformance gate checks these conventions on new files, backed by a structure lint. New work that violates casing, the index pattern, or path-explicit linking is sent back before it merges.

*Adapted from a production knowledge-base naming standard and PKM plus software-reliability disciplines (ECC MIT, Anthropic, Cognition).*

*Created by Alex Villarroel · part of Orchestrator OS.*
