# Agents Index

*The agent library for Orchestration OS: reusable subagent briefs, organized by domain, every one linked from here so nothing orphans. Read the pattern doc first, then browse the example briefs. ← [[00_MOC|Orchestration OS]]*

## The category model

Agents are filed by the work they do, one folder per domain. A brief lives at `agents/<Category>/<name>.md`, and each category carries its own `00_<CATEGORY>_INDEX.md` that wikilink-lists its members. The full set of categories:

> 💻 Coding · 🔬 Research · 📊 Data · 📝 Writing · 📣 Marketing · 🏢 Business · 🎧 Support · 💰 Finance · 🎨 Creative · 🎓 Education · ⚖️ Legal · 🏡 Lifestyle · 🧩 Meta

The discipline that holds it together - zero orphans, path-explicit links, the two-library rule, and repo-side execution copies - is written up in full here:

- [[agents/the-agent-library-pattern|The Agent Library Pattern]] - how the library is structured and why.

## Example agents (Coding)

A worked set of four briefs from the Coding category, scrubbed and reusable as-is. Together they show the build-and-review arc: map the ground, review the work, gate for gaps, then attack what is left.

- [[agents/recon-cartographer|recon-cartographer]] - maps the real code before any design begins.
- [[agents/code-reviewer|code-reviewer]] - six-category review of a built diff against its spec.
- [[agents/completeness-critic|completeness-critic]] - the "what's missing?" gate before packaging.
- [[agents/red-correctness|red-correctness]] - a red-team lens attacking correctness gaps.

## Adding an agent

Drop the brief in the right category folder and add its row to that category's index in the same change. New category? Create the folder plus its `00_<CATEGORY>_INDEX.md` and add a row here. Link agents path-explicitly so shared basenames never mis-resolve. Zero orphans before you call it done.

← [[00_MOC|Orchestration OS]]

*Created by Alex Villarroel · part of Orchestration OS.*
