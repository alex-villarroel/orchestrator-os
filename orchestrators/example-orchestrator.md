*A fully worked, generic orchestrator you can copy end to end. "Example Orchestrator" owns the made-up domain `<your-domain>`. Every folder, every core doc, and the builder it dispatches to are shown in shape so a reader can clone the structure and fill in their own domain.*

← [[orchestrators/00_ORCHESTRATORS_INDEX|00_ORCHESTRATORS_INDEX]] · [[00_MOC|Orchestration OS]]

---

## What this is

This page is a template instance. It shows what a complete orchestrator looks like once it has been minted to the [[the-standard/orchestrator-standard|orchestrator-standard]]. Replace `<your-domain>`, `<your-orchestrator>`, `<your-app-repo>`, and `<builder>` with your real values and you have a working orchestrator skeleton.

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

- **Ceremony:** [[ceremonies/build-ceremony|build-ceremony]] - the per-task spine (classify, ground, dispatch, verify, gate, close).
- **Contract:** [[ceremonies/multi-agent-contract|multi-agent-contract]] - the roster, dispatch standard, return schema, model routing, and guardrails.

## The builder

Every orchestrator has at least one builder: its doer tier. The Example Orchestrator's is `<builder>`.

- **Vault-side (the brief it reads):** a `<builder>/` area with its own MOC, RESUME, and spec docs. This is its knowledge.
- **Work-side (where it actually works):** for a code domain, the repo `<your-app-repo>` with its `.claude/` config (settings, hooks, execution agent copies). This is where it builds, stages, and is verified.
- **Non-code domain:** the builder tier is simply the sub-agent roster (researchers, drafters, reviewers); vault-side only, no repo.

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

1. Copy the folder set above, renaming `Example Orchestrator/` to your orchestrator.
2. Fill the four placeholders: `<your-orchestrator>`, `<your-domain>`, `<your-app-repo>`, `<builder>`.
3. Write the five core docs (RESUME, Operating System, MOC, MEMORY, agents index) from the shapes shown.
4. Point at (do not copy) your [[ceremonies/build-ceremony|build-ceremony]] and [[ceremonies/multi-agent-contract|multi-agent-contract]].
5. Stand up one builder immediately with the agents it needs.
6. Register it in your indexes and verify there are no orphan docs (every new doc has an inbound link).

See [[orchestrators/the-orchestrator-pattern|the-orchestrator-pattern]] for the why behind each piece and [[the-standard/orchestrator-standard|orchestrator-standard]] for the full birth checklist.

---

*Adapted from the Architect Reference orchestrator template (ECC, MIT), Anthropic's multi-agent guidance, and Cognition's single-threaded-integration principle.*

← [[orchestrators/00_ORCHESTRATORS_INDEX|00_ORCHESTRATORS_INDEX]] · [[00_MOC|Orchestration OS]]

*Created by Alex Villarroel · part of Orchestration OS.*
