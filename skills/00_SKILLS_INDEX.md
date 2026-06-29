# Skills Index

*The model-invoked building block for Orchestrator OS: a `SKILL.md` folder whose description Claude matches on its own to pull a procedure into context, loaded progressively so the always-on cost is one line. Read the pattern doc first, then the worked example. ← [Orchestrator OS](../00_MOC.md)*

---

## The docs

- [the-skill-pattern](./the-skill-pattern.md) - what a Skill is, the commands-vs-skills-vs-agents split (commands are user-typed, skills are model-invoked by description, agents are spawned subagents), the `SKILL.md` frontmatter, progressive disclosure, when to reach for each, and how skills fit the orchestration system next to hooks.

## Example skills

- [changelog-entry](./changelog-entry/SKILL.md) - a generic model-invocable skill that adds a Keep a Changelog entry for a change. Shows correct frontmatter (`name`, `description`, `allowed-tools`) and a short progressive-disclosure body.

## Conventions

- **One folder per skill.** Each skill lives at `skills/<skill-name>/SKILL.md`. The folder name becomes the `/command` name, so keep it and the frontmatter `name` in sync.
- **Description carries the trigger.** `description` is the load-bearing field, because Claude matches on it to decide when to fire. Put the key use case first and name the phrases a user would actually say.
- **Progressive disclosure.** Keep `SKILL.md` short; push long reference material to supporting files in the same folder and point at them from the body so they load only when needed.
- **Skill or hook?** A skill carries model judgment. A [hook](../hooks/00_HOOKS_INDEX.md) enforces a rule deterministically. If a rule must never be skipped, it is a hook, not a skill.
- **Reconcile the index.** Adding, moving, or retiring a skill updates this index in the same change. No orphans.

---

← [Orchestrator OS](../00_MOC.md)

*Created by Alex Villarroel · part of Orchestrator OS.*
