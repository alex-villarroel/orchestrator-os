# 💻 Coding Index

*The Coding category of the agent library: reusable subagent briefs for mapping, reviewing, and red-teaming code. Every brief in this folder is listed here so nothing orphans. ← [00_AGENTS_INDEX](../00_AGENTS_INDEX.md) · [Orchestrator OS](../../00_MOC.md).*

---

A worked set of four briefs, scrubbed and reusable as-is. Together they show the build-and-review arc: map the ground, review the work, gate for gaps, then attack what is left.

- [recon-cartographer](./recon-cartographer.md) - maps the real code before any design begins.
- [code-reviewer](./code-reviewer.md) - six-category review of a built diff against its spec.
- [completeness-critic](./completeness-critic.md) - the "what's missing?" gate before packaging.
- [red-correctness](./red-correctness.md) - a red-team lens attacking correctness gaps.

## Adding a Coding agent

Drop the brief in this folder and add its row above in the same change. Link path-explicitly so shared basenames never mis-resolve, and make sure the brief footer links back here. Zero orphans before you call it done. The full discipline is in [the-agent-library-pattern](../the-agent-library-pattern.md).

← [00_AGENTS_INDEX](../00_AGENTS_INDEX.md) · [Orchestrator OS](../../00_MOC.md)

*Created by Alex Villarroel · part of Orchestrator OS.*
