# The Skill Pattern

*What a Skill is, how it differs from a command and an agent, and how it fits the orchestration system: a model-invoked capability that Claude reaches for on its own when your request matches the skill's description, with its body loaded only on demand through a `SKILL.md` folder.*

← [00_SKILLS_INDEX](./00_SKILLS_INDEX.md) · [Orchestrator OS](../00_MOC.md)

---

## What a Skill is

A Skill is a folder with a `SKILL.md` file at its root. The frontmatter tells Claude when the skill applies; the body tells Claude what to do once it does. You drop the folder into `.claude/skills/<skill-name>/`, and from then on Claude can pull the skill into context on its own whenever your request matches the skill's description. You never have to remember it is there.

That is the whole point. A skill is the home for a procedure you keep re-explaining, a checklist you keep pasting, or a house convention that should apply without being asked for. Unlike a fact you put in `CLAUDE.md`, a skill's body costs almost nothing until it is needed, because only its short description sits in context full time. The full instructions load on the turn the skill fires.

## The commands vs skills vs agents split

The three building-block primitives look similar and are easy to confuse. The clean way to tell them apart is by who invokes them and where they run.

- **Commands are user-typed.** A command is a prompt you invoke by hand, by typing `/name`. You decide when it runs. Commands are how a human invokes a role's law in one paste. See [the-prompt-pack-pattern](../commands/the-prompt-pack-pattern.md).
- **Skills are model-invoked.** A skill is matched by its `description` and pulled in by Claude itself when the work fits, with no slash typed. You write the trigger once, in the description, and then trust the model to reach for it. Progressive disclosure keeps the cost low: the description is always in context, the body loads only when the skill fires, and any supporting files load only when the body points to them.
- **Agents are spawned subagents.** An agent is a separate context with its own system prompt, tools, and budget, spawned by an orchestrator to do leaf work in parallel and report back. See [the-agent-library-pattern](../agents/the-agent-library-pattern.md).

One honest note on the current tooling: in Claude Code today, commands and skills have technically merged. A file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create `/deploy`, and a skill can be set to manual-only with `disable-model-invocation: true`. So the line is not a hard wall in the runtime. But the distinction that matters for design still holds: a command is something you reach for, a skill is something the model reaches for, and an agent is a whole separate worker you dispatch. Choose by invocation, not by file location.

## The SKILL.md frontmatter

A `SKILL.md` opens with YAML frontmatter. Every field is optional; only `description` is recommended, because that is the text Claude matches against to decide whether to load the skill.

```yaml
---
name: changelog-entry
description: Write a changelog entry for a change in Keep a Changelog format. Use when the user asks to add a changelog entry, update the changelog, or record what changed for a release.
allowed-tools: Read, Edit
---
```

The fields you will actually reach for:

- **`name`** - the display label in skill listings. The command you type comes from the folder name, not from this field (except for a plugin-root skill), so keep the folder name and `name` in sync to avoid confusion.
- **`description`** - what the skill does and when to use it. This is the load-bearing field. Put the key use case first and name the trigger phrases a user would actually say, because Claude matches on this text and the listing truncates long descriptions. A `when_to_use` field can carry extra trigger context if the description gets crowded.
- **`allowed-tools`** - tools Claude may use without a permission prompt while the skill is active. It grants, it does not restrict.
- **`disable-model-invocation: true`** - makes the skill manual-only (`/name`), so Claude never fires it on its own. Use this for anything with side effects you want to time yourself, like a deploy or a send.

Do not invent fields. The supported set as of 2026 includes `name`, `description`, `when_to_use`, `allowed-tools`, `disallowed-tools`, `disable-model-invocation`, `user-invocable`, `argument-hint`, `arguments`, `model`, `effort`, `context`, `agent`, `hooks`, `paths`, and `shell`. If you need one that is not on that list, check the Claude Code skills docs rather than guessing.

## Progressive disclosure

Progressive disclosure is the reason a skill is cheap. It loads in three stages, each only when needed:

1. **Description, always loaded.** Just the frontmatter `description` (and `name`) sits in context so Claude knows the skill exists and when it applies. This is a few lines, not the whole body.
2. **Body, loaded on invocation.** When the skill fires, the rendered `SKILL.md` body enters the conversation and stays for the rest of the session. Keep it concise and under roughly 500 lines, because every line is a recurring token cost once it is in.
3. **Supporting files, loaded on demand.** A skill folder can hold extra files, a `reference.md`, an `examples.md`, a `scripts/` helper. These do not load until the body points Claude at them. Reference them from `SKILL.md` with a short note on what each contains so Claude knows when to open it.

```text
changelog-entry/
  SKILL.md        # required: the trigger and the core instructions
  reference.md    # optional: the full format spec, loaded only when needed
  examples/       # optional: sample outputs, loaded only when needed
```

The discipline: put the trigger and the everyday instructions in `SKILL.md`, and push long reference material out to a supporting file. That keeps the always-on cost to a one-line description and the on-invocation cost to a short body.

## When to reach for each

- **Reach for a skill** when you keep re-explaining the same procedure or convention and you want Claude to apply it on its own, without being asked, whenever the work fits. Changelog entries, commit-message style, an API convention, a house format.
- **Reach for a command** when a human should decide the timing, especially anything with a side effect or a gate. A deploy, a ship, a wave kickoff. You type it; the model does not start it for you.
- **Reach for an agent** when the work is a self-contained chunk that deserves its own fresh context and tools, run in parallel and reported back. Recon, a review pass, a red-team lens.

## How skills fit the orchestration system

Skills are the model-invoked half of the building blocks. Where a command is the orchestrator's hands and an agent is a disposable worker it dispatches, a skill is a standing reflex: a convention or procedure that fires automatically so the orchestrator does not have to remember to ask for it. That makes skills a natural home for the small, repeatable house rules that would otherwise rot in a long `CLAUDE.md` or get forgotten mid-session.

The boundary with hooks is worth keeping sharp. A [hook](../hooks/00_HOOKS_INDEX.md) is deterministic enforcement: a script the harness runs on a lifecycle event, fail-closed where the stakes are high, with no judgment involved. A skill is model judgment: Claude decides it applies and follows the body. If a rule must never be skipped, it belongs in a hook, not a skill. If a procedure needs the model to read context and adapt, it belongs in a skill. Enforce the un-skippable; let skills carry the judgment.

Skills live in the graph like every other building block: one folder per skill, listed in [00_SKILLS_INDEX](./00_SKILLS_INDEX.md) so nothing orphans, path-explicit links, and a setup guide with a diagram in [setup-skills](../setups/setup-skills.md).

## The pattern in one line

A skill is a `SKILL.md` folder whose description Claude matches on its own to pull in a procedure, loaded progressively so the always-on cost is one line: use it for conventions and procedures the model should apply without being asked, a command for what a human times, an agent for a worker you dispatch, and a hook for what must never be skipped.

---

*Adapted from Anthropic's Claude Code skills documentation and the Agent Skills open standard.*

← [00_SKILLS_INDEX](./00_SKILLS_INDEX.md) · [Orchestrator OS](../00_MOC.md)

*Created by Alex Villarroel · part of Orchestrator OS.*
