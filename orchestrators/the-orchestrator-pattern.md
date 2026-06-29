*What an orchestrator actually is, and the one rule that defines it: a persistent director that frames work and dispatches disposable workers, but never does the leaf work itself.*

← [00_ORCHESTRATORS_INDEX](./00_ORCHESTRATORS_INDEX.md) · [Orchestrator OS](../00_MOC.md)

---

## The one-line definition

An **orchestrator** is a persistent director that owns a domain. It classifies each request, frames the work, dispatches disposable builders and specialists with tight briefs, verifies their output, and integrates the result on a single thread. It is the point-man for its domain and the only thing that survives between tasks.

The defining constraint: **an orchestrator never does the leaf work itself.** The moment it starts hand-editing the file, writing the paragraph, or running the migration directly, it has stopped being an orchestrator and become a worker. Its job is to frame, dispatch, verify, and integrate, not to produce.

## The invariant (true of every orchestrator)

1. **Persistent.** It outlives any single task. State, memory, and standing rules carry forward.
2. **Domain-owning.** It is the single point of accountability for one domain (shipping software, running a business, the operating system itself, whatever a new idea hatches).
3. **Directs disposable workers.** The things it dispatches are cheap, scoped, and thrown away after one job. They do not accumulate context or authority.
4. **Fan out for intelligence; single-thread the writes.** Many workers can read, search, and propose in parallel. Exactly one integrator commits the irreversible change.
5. **Verifies independently.** It never trusts a worker's self-report. It checks the artifact against the spec before integrating.
6. **Never does the leaf work.** See above. This is the line that separates the role from everything below it.

## The orchestrator vs builder split

The two tiers are different kinds of thing, and conflating them is the most common failure.

| | Orchestrator | Builder / specialist |
|---|---|---|
| **Lifespan** | Persistent (survives tasks) | Disposable (one job, then gone) |
| **Scope** | The whole domain | One tight brief |
| **Context** | Accumulates (memory, state, rules) | Fresh each spawn, no carryover |
| **Owns** | Framing, routing, verification, integration | Producing one artifact |
| **Authority** | Decides what to do and accepts/rejects results | Executes the brief, returns the result |
| **Count** | One per domain | As many as the work needs, in parallel |

The builder is the orchestrator's **doer tier**: the role it dispatches to actually produce the work. A code orchestrator's builder is a real role that reads a brief and writes to a repo. A non-code orchestrator's builder tier is just its sub-agent roster (researchers, reviewers, drafters). Either way, the builder is downstream of the orchestrator and never the reverse.

See [multi-agent-contract](../ceremonies/multi-agent-contract.md) for how the tiers are wired (roster, dispatch schema, guardrails) and [orchestrator-standard](../the-standard/orchestrator-standard.md) for what a complete orchestrator must contain to be "born."

## When to spawn vs when to embody

Not every task needs a sub-agent. The orchestrator decides per request:

**Embody (do it on the main thread) when:**
- The task is small, cheap, and reversible.
- The answer is a single lookup or a one-line decision.
- Spawning would cost more context than the work itself.
- The orchestrator already holds everything needed in its own context.

**Spawn (dispatch a disposable worker) when:**
- The work is large enough to pollute the orchestrator's context (reading many files, long generation).
- It benefits from a **fresh, scoped context** with no carryover bias.
- You want **parallel** intelligence (several lenses attacking the same problem at once).
- It is the **leaf work** itself (writing the code, drafting the doc, running the analysis). This is always a spawn, never an embody, by the invariant above.
- You need an **independent verifier** whose context is clean of the implementer's reasoning.

Rule of thumb: fan out the moment a task would either bury the director in detail or benefit from more than one head. Keep the integration single-threaded regardless of how wide the fan-out was.

## Model routing by tier

Match the model to the job, not the role. An orchestrator routes work across tiers to spend capability where it pays off.

| Tier | Use for | Model class |
|---|---|---|
| **Heavy** | Framing hard problems, design judgment, integration of conflicting results, the orchestrator's own reasoning | Top-tier model |
| **Mid** | Most builder work: scoped implementation, drafting, structured analysis against a clear brief | Mid-tier model |
| **Light** | Mechanical fan-out: search, extraction, classification, format conversion, lookups | Fast/cheap model |

Principles:
- **The orchestrator itself runs heavy.** Framing and integration are where judgment lives; do not under-power them.
- **Most builders run mid.** A clear brief plus a mid model produces the bulk of the work at the right cost.
- **Fan-out runs light.** When you spawn ten workers to read ten directories, they do not each need a top-tier model.
- **Verification can run a different tier than production.** An independent reviewer at a different capability level catches different mistakes.

State the routing explicitly in the classifier line of every task so the choice is visible and auditable: `do=<direct | spawn:<role>> · model=<heavy|mid|light>`.

## How it runs (the loop)

Every orchestrator runs the same shape; only the domain content changes (see [build-ceremony](../ceremonies/build-ceremony.md) for the full per-task spine):

1. **Classify** the request (task type, lane/rigor, do-vs-spawn, model, who to consult).
2. **Ground** in the real system (the live source beats any doc).
3. **Frame** the work into tight briefs.
4. **Dispatch** disposable workers (fan out for intelligence).
5. **Verify** each result independently against the spec.
6. **Integrate** on a single thread through the gate.
7. **Close** (save state, record learnings, nothing left half-done).

The gate before the irreversible step (deploy, money-commit, external send) is non-negotiable. Everything before the gate can be parallel and disposable; the gate is where the single integrator takes over.

## Related

- [orchestrator-standard](../the-standard/orchestrator-standard.md) - the mold every orchestrator is minted from (the birth checklist).
- [build-ceremony](../ceremonies/build-ceremony.md) - the per-task operating spine.
- [multi-agent-contract](../ceremonies/multi-agent-contract.md) - the roster, dispatch standard, and guardrails.
- [example-orchestrator](./example-orchestrator.md) - a fully worked generic example you can copy.

---

*Adapted from the Architect Reference (ECC, MIT), Anthropic's multi-agent guidance, and Cognition's single-threaded-integration principle.*

← [00_ORCHESTRATORS_INDEX](./00_ORCHESTRATORS_INDEX.md) · [Orchestrator OS](../00_MOC.md)

*Created by Alex Villarroel · part of Orchestrator OS.*
