# The Agent Library Pattern

*How to keep a fleet of reusable subagent briefs sane: one folder per domain, a category index that wikilink-lists every member so nothing orphans, path-explicit links because basenames collide, and the two-library rule that separates what you run from what you mine. ← [00_AGENTS_INDEX](./00_AGENTS_INDEX.md) · [Orchestrator OS](../00_MOC.md)*

Once you have more than a handful of agents, a flat pile stops working: you cannot find them, duplicates breed, and half of them quietly fall out of the graph. The pattern below keeps a growing fleet navigable, every brief one click from its index, and the boundary between "ours" and "borrowed" unambiguous.

## One folder per domain

Every agent brief lives at `agents/<Category>/<name>.md`. Categories group by the work the agent does, not by the project that happens to use it:

> Coding · Research · Data · Writing · Marketing · Business · Support · Finance · Creative · Education · Legal · Lifestyle · Meta

An agent belongs to exactly one category. If a brief does not fit any existing folder, that is the signal to open a new category, not to wedge it somewhere close. A new category means: create `agents/<Category>/`, add its category index, and add a row to the top index. Nothing half-filed.

## A category index that lists every member (zero orphans)

Each category folder carries a `00_<CATEGORY>_INDEX.md` whose only structural job is to wikilink-list every agent in that folder. The top-level [00_AGENTS_INDEX](./00_AGENTS_INDEX.md) in turn links every category index. The rule is two-way and absolute:

- The index lists the member (so the member has an inbound link and is never a graph orphan).
- The member footer links back to the index (so you can climb back up).

If you add an agent and do not add its row to the category index, you have created an orphan. Reconcile the index in the same change that adds the file, every time. Likewise when you move or retire an agent: fix the index row, do not leave a dangling link.

## Path-explicit links for shared basenames

Agent basenames repeat. A `code-reviewer` exists in your library, in any external reference library you keep, and as an execution copy inside a repo. A bare `[[code-reviewer]]` is ambiguous and Obsidian will resolve it to whichever shared-basename file it feels like, silently pointing your index at the wrong note.

So always link agents by full path with a display alias:

```
[[agents/Coding/code-reviewer|code-reviewer]]
```

This reads cleanly on GitHub and in Obsidian, and it pins the link to exactly the file you mean. Reserve bare wikilinks for notes whose basename is genuinely unique.

## The two-library rule: own-and-run vs mine-never-run

Keep two libraries and never blur them:

1. **Your canonical library** (this one) is what you **own and run**. Every brief here is something an orchestrator can spawn by type. You maintain it, you version it, you are accountable for what it does.
2. **An external reference library** is a proven catalog you **mine but never run**. You read it for ideas, exemplars, and battle-tested structure, then adapt the good parts into your own briefs. You never wire it directly into a ceremony.

When you pull from the external library, **adapt, do not copy**, and **cite the source** in the adapted brief (a short `*Adapted from ...*` line). Blind-copying drags in assumptions that do not match your system; citing keeps provenance honest and makes the next person's adaptation easier. Treat the external library as a quarry, not a dependency.

## Execution copies live in the repo

The vault library is the canonical *knowledge* of each agent. A code orchestrator that actually runs these agents also keeps flat execution copies in its repo at `.claude/agents/` (flat, no category folders), which is where Claude Code discovers and runs them. The flow is one-directional:

- Author and curate the brief in the vault category folder (canonical).
- Sync the execution copy into the repo `.claude/agents/` when the orchestrator needs to run it.

Do not duplicate the shared panel into every orchestrator, and do not treat a repo copy as the source of truth. The vault is where briefs are designed and reviewed; the repo copy is a deployment artifact.

## The discipline in one breath

One folder per domain. Every category index lists every member, two-way, zero orphans. Path-explicit links so shared basenames never mis-resolve. Two libraries: one you own and run, one you mine and cite, never copy. Repo `.claude/agents/` holds flat execution copies, the vault holds the canon.

← [00_AGENTS_INDEX](./00_AGENTS_INDEX.md) · [Orchestrator OS](../00_MOC.md)

*Created by Alex Villarroel · part of Orchestrator OS.*
