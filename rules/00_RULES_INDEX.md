# Rules Index

*The standing rules of Orchestrator OS: how shared agents save knowledge, name things, and decide direct-versus-delegate. Every session inherits these as the first move of every task.*

← [Orchestrator OS](../00_MOC.md)

## The rules

- [knowledge-discipline](./knowledge-discipline.md) - the contract for a living knowledge base shared by many agents: knowledge not artifacts, one canonical per thing, right folder plus a map for every doc, two-way links and no orphans, reconcile every dependent index in the same change, stale goes to archive (never hard-delete), commit when done, keep the index current.
- [naming-conventions](./naming-conventions.md) - Title-Case domain folders, lowercase role and data subfolders, `00_<NAME>_INDEX.md` indexes, `<Name> MOC.md`, `RESUME_PROMPT.md`, path-explicit links for shared basenames, and the gotcha that a bare `[[Name]]` resolves to only one same-named file.
- [orchestration-first](./orchestration-first.md) - the intake discipline: state `intake: do-direct | delegate -> tier · why` before acting, fan out for intelligence, keep writes single-threaded with one integrator, the do-direct gate, and the rule that orchestration buys quality plus sustained context plus parallelism, not cheaper tokens.

← [Orchestrator OS](../00_MOC.md)

*Created by Alex Villarroel · part of Orchestrator OS.*
