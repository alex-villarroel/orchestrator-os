# Agents Index

*The agent library for Orchestrator OS: reusable subagent briefs, organized by domain, every one linked from here so nothing orphans. Read the pattern doc first, then browse the example briefs. ← [Orchestrator OS](../00_MOC.md)*

## The category model

Agents are filed by the work they do, one folder per domain. A brief lives at `agents/<Category>/<name>.md`, and each category carries its own `00_<CATEGORY>_INDEX.md` that wikilink-lists its members. The full set of categories:

> 💻 Coding · 🔬 Research · 📊 Data · 📝 Writing · 📣 Marketing · 🏢 Business · 🎧 Support · 💰 Finance · 🎨 Creative · 🎓 Education · ⚖️ Legal · 🏡 Lifestyle · 🧩 Meta

The discipline that holds it together - zero orphans, path-explicit links, the two-library rule, and repo-side execution copies - is written up in full here:

- [The Agent Library Pattern](./the-agent-library-pattern.md) - how the library is structured and why.

## Categories

Each category lives in its own folder under `agents/` and carries a `00_<CATEGORY>_INDEX.md` that lists its members. The shipped library starts with one worked category; add rows here as new categories appear.

- [💻 Coding](./Coding/00_CODING_INDEX.md) - a worked set of four briefs showing the build-and-review arc: map the ground, review the work, gate for gaps, then attack what is left.

### Coding briefs

- [recon-cartographer](./Coding/recon-cartographer.md) - maps the real code before any design begins.
- [code-reviewer](./Coding/code-reviewer.md) - six-category review of a built diff against its spec.
- [completeness-critic](./Coding/completeness-critic.md) - the "what's missing?" gate before packaging.
- [red-correctness](./Coding/red-correctness.md) - a red-team lens attacking correctness gaps.

## Adding an agent

Drop the brief in the right category folder and add its row to that category's index in the same change. New category? Create the folder plus its `00_<CATEGORY>_INDEX.md` and add a row here. Link agents path-explicitly so shared basenames never mis-resolve. Zero orphans before you call it done.

← [Orchestrator OS](../00_MOC.md)

*Created by Alex Villarroel · part of Orchestrator OS.*
