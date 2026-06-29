# Example Orchestrator

*A fully worked, generic orchestrator you can copy end to end. "Example Orchestrator" owns the made-up domain `<your-domain>`. Every folder, every core doc, and the builder it dispatches to are shown in shape so a reader can clone the structure and fill in their own domain. For a literal stub tree to `cp -r`, see the [Example Orchestrator stub tree](../examples/Example Orchestrator/Example Orchestrator MOC.md) under `examples/`.*

← [00_ORCHESTRATORS_INDEX](./00_ORCHESTRATORS_INDEX.md) · [Orchestrator OS](../00_MOC.md)

---

## What this is

This page is a template instance. It shows what a complete orchestrator looks like once it has been minted to the [orchestrator-standard](../the-standard/orchestrator-standard.md). Replace `<your-domain>`, `<your-orchestrator>`, `<your-app-repo>`, and `<builder>` with your real values and you have a working orchestrator skeleton.

- **Name:** Example Orchestrator
- **Domain:** `<your-domain>` (the one thing it owns and is accountable for)
- **Irreversible action its gate protects:** the domain's commit point (deploy / publish / external send)
- **Builder:** `<builder>` (its doer tier; for a code domain it writes to `<your-app-repo>`)

## The full folder set

Every orchestrator carries the same structure. Lifecycle folders (the ones whose items move from in-flight to done) carry `Active/` and `Complete/`; the rest are flat.

```
Example Orchestrator/
  Operating System.md          # one-click pointer to ceremony + contract + library
  RESUME_PROMPT.md             # who it is, the orient walk, its loop, live state
  Example Orchestrator MOC.md  # the hub
  MEMORY.md                    # this orchestrator's own role memory
  REFERENCE/                   # durable methods (roster, dispatch, escalations)
  MISSIONS/      [Active/ Complete/]   # large multi-phase initiatives
  PLANS/         [Active/ Complete/]   # strategy / roadmaps (pre-approval)
  DESIGNS/       [Active/ Complete/]   # single-issue design decisions
  DIRECTIVES/    [Active/ Complete/]   # dispatchable work orders (builders start here)
  Daily Contract/[Active/ Complete/]   # the day's operating terms
  STATUS/                      # live trackers + run logs (flat)
  REPORTS/                     # ledgers / gap maps / test maps (flat)
  HANDOFFS/                    # session-to-session briefs (flat)
  CEREMONIES/                  # in-folder pointers to its ceremony + contract
  Changes/                     # its change ledger
  Archives/                    # superseded docs (cold; date-prefixed)
  commands/                    # its prompt pack lives here
  agents/                      # its agent roster (00_AGENTS_INDEX)
  hooks/                       # its hooks (or a pointer to the repo's .claude/hooks/)
  setups/                      # stack setup / onboarding pointers
  secrets-rotation/            # secret inventory + rotation schedule (NEVER values)
```

## The core docs (in shape)

### RESUME_PROMPT.md

The boot prompt. The first thing the orchestrator reads when it wakes.

```markdown
# Example Orchestrator - RESUME

You are the Example Orchestrator. You own `<your-domain>`. You are a
persistent director: you frame work, dispatch disposable workers, verify
their output, and integrate on a single thread. You never do the leaf
work yourself.

## Orient (do this first, every boot)
1. Read [[Example Orchestrator MOC]] for the current map.
2. Read [[build-ceremony]] + [[multi-agent-contract]] IN FULL.
3. Read [[MEMORY]] (this role's scars + learnings) and the shared brain.
4. Read STATUS/ for live state. Pick up nothing half-done.

## Your loop
classify -> ground -> frame -> dispatch -> verify -> integrate -> close

## Standing rules
- Fan out for intelligence; keep writes single-threaded.
- State the classifier line before acting.
- Never pass the gate without independent verification.
- Save state every batch.

## Live state
<the current in-flight directives, missions, open gates>
```

### Operating System.md

A one-click pointer (no copied content; it reaches the canonical docs).

```markdown
# Example Orchestrator - Operating System
- Ceremony: [[build-ceremony]]
- Contract: [[multi-agent-contract]]
- Standard it was minted from: [[orchestrator-standard]]
- Agent library: [[agents/00_AGENTS_INDEX|Example Orchestrator Agents]]
- Prompt pack: [[commands/Example Orchestrator Prompts]]
```

### Example Orchestrator MOC.md

The hub. Links out to every area of the folder and to its siblings.

```markdown
# Example Orchestrator MOC
*Director of `<your-domain>`.*

- Boot: [[RESUME_PROMPT]] · [[Operating System]]
- Spine: [[build-ceremony]] · [[multi-agent-contract]]
- Memory: [[MEMORY]]
- Work: [[DIRECTIVES]] · [[MISSIONS]] · [[PLANS]] · [[DESIGNS]]
- Tier: [[<builder>]] (its builder) · [[agents/00_AGENTS_INDEX|agents]]
- Minted to: [[orchestrator-standard]]
```

### MEMORY.md

Role-specific memory. The retro loop writes new entries here; cross-cutting memory stays in the shared brain.

```markdown
# Example Orchestrator - Memory
## Battle scars
- <a mistake made once, and the rule that prevents it now>
## Role facts
- <a durable fact about `<your-domain>`>
## Learnings
- <dated entries from the flywheel>
```

## Ceremony + contract pointers

The orchestrator does not copy its ceremony and contract into its folder; it points at the canonical versions. The `CEREMONIES/` folder holds in-folder pointers only.

- **Ceremony:** [build-ceremony](../ceremonies/build-ceremony.md) - the per-task spine (classify, ground, dispatch, verify, gate, close).
- **Contract:** [multi-agent-contract](../ceremonies/multi-agent-contract.md) - the roster, dispatch standard, return schema, model routing, and guardrails.

## The builder

Every orchestrator has at least one builder: its doer tier. The Example Orchestrator's is `<builder>`.

- **Knowledge-side (the brief it reads):** a `<builder>/` area with its own MOC, RESUME, and spec docs. This is its knowledge.
- **Outside (where it actually works):** for a code domain, the repo `<your-app-repo>` with its `.claude/` config (settings, hooks, execution agent copies). This is where it builds, stages, and is verified.
- **Non-code domain:** the builder tier is simply the sub-agent roster (researchers, drafters, reviewers); knowledge-side only, no repo.

The orchestrator dispatches a brief to `<builder>`, `<builder>` produces the artifact, and the orchestrator verifies it independently before integrating. The builder is disposable; the orchestrator persists.

## The agents index (agents/00_AGENTS_INDEX.md)

```markdown
# Example Orchestrator - Agents
Two libraries, both important:
1. Shared canonical library (everyone has access; spawn by type):
   [[agents/00_AGENTS_INDEX|the shared Agents library]]
2. External reference to mine and adapt (never blind-copy).

## This orchestrator's own roster
- <builder> - the doer tier
- <verifier> - independent check of the builder's output
- <researcher> - light, parallel fan-out (search / extract)
```

## The prompt pack (commands/Example Orchestrator Prompts.md)

A complete situational set, not a thin starter. The pack a reader pastes to drive the orchestrator.

```markdown
# Example Orchestrator - Prompts
- BOOT - wake the orchestrator (the RESUME walk)
- frame-it - turn a raw request into tight briefs
- dispatch - spawn a builder with a scoped brief
- wave-run - fan out N workers in parallel
- verify - independently check a returned artifact
- gate - the pre-irreversible safety check
- integrate - single-threaded commit of verified work
- incident - what to do when something breaks
- retro - the flywheel (write learnings to MEMORY)
- builder-boot - boot <builder> with its brief
```

## How to copy this

This recipe reproduces the FULL §2 born-complete checklist from the [orchestrator-standard](../the-standard/orchestrator-standard.md). None of these steps is optional - a missing box means the orchestrator is not born yet.

A literal stub tree of everything below already exists at [examples/Example Orchestrator/](../examples/Example Orchestrator/Example Orchestrator MOC.md). The fastest start is `cp -r` that folder and fill the stubs; the steps here are the same checklist in prose.

1. **Copy the full folder set** above, renaming `Example Orchestrator/` to your orchestrator. Keep the FULL standard structure: every work folder, the `Active/` + `Complete/` lifecycle subfolders, and all five infra folders (`commands/`, `agents/`, `hooks/`, `setups/`, `secrets-rotation/`). Do not lean it out.
2. **Fill the four placeholders:** `<your-orchestrator>`, `<your-domain>`, `<your-app-repo>`, `<builder>`.
3. **Write the core docs** from the shapes shown: RESUME_PROMPT, Operating System, MOC, MEMORY, and the agents index.
4. **Point at (do not copy)** your tailored [build-ceremony](../ceremonies/build-ceremony.md) and [multi-agent-contract](../ceremonies/multi-agent-contract.md); the `CEREMONIES/` folder holds in-folder pointers only.
5. **Write the FULL prompt pack** in `commands/<Name> Prompts.md` - the complete situational set, not a thin starter.
6. **Stand up one builder immediately** with the agents it needs (knowledge-side brief AND, for a code domain, its repo `.claude/` config).
7. **Write the boot handoff** - the first-run explainer + boot brief, in the central `handoffs/<Name> Handoff.md`. This is what a fresh operator reads to wake the orchestrator the first time.

   ```markdown
   # <Name> Handoff
   *First-run explainer + boot brief for <Name>.*
   - What it owns: <your-domain> · gate protects: <the irreversible action>
   - Boot it: paste the BOOT prompt from commands/<Name> Prompts.md
   - First read: RESUME_PROMPT -> ceremony + contract IN FULL -> MEMORY -> STATUS
   - Live state lives in: STATUS/ · open work in DIRECTIVES/Active
   ```
8. **Register it in EVERY index and cross-link** - the start-here role table, the home hub, the table of contents, the atlas (row + count + drift-check), the directory. Two-way sibling links, provenance links (minted-by + built-to), and an inbound link for every new doc. Verify there are zero orphan docs (use path-explicit links for shared basenames).
9. **Add a revert-ready changelog entry** recording the creation + commit hash, so the whole mint can be backed out cleanly.

   ```markdown
   ## <date> - mint: <Name> orchestrator
   - Added: <Name>/ (full structure), ceremony + contract pair, prompt pack, boot handoff, one builder
   - Indexes reconciled: start-here, home hub, ToC, atlas (+count), directory
   - Commit: <hash>   ·   Revert: remove <Name>/ + the index rows added in this commit
   ```

See [the-orchestrator-pattern](./the-orchestrator-pattern.md) for the why behind each piece and [orchestrator-standard](../the-standard/orchestrator-standard.md) for the full birth checklist the steps above mirror.

---

*Adapted from the Architect Reference orchestrator template (ECC, MIT), Anthropic's multi-agent guidance, and Cognition's single-threaded-integration principle.*

← [00_ORCHESTRATORS_INDEX](./00_ORCHESTRATORS_INDEX.md) · [Orchestrator OS](../00_MOC.md)

*Created by Alex Villarroel · part of Orchestrator OS.*
