# Orchestration First

*The intake discipline every session runs before it acts. Orchestration-first is a posture with a fast gate, not "delegate everything." On any non-trivial task you classify direct-versus-delegate out loud, fan out for intelligence, keep writes single-threaded, and justify the choice on quality rather than cost.*

← [00_RULES_INDEX](./00_RULES_INDEX.md) · [Orchestrator OS](../00_MOC.md)

## 1. The intake line (the centerpiece)

On any **non-trivial** task, before executing, state one line:

```
intake: do-direct | delegate -> <tier> | workflow · why
```

This single rule generalizes what build ceremonies and triage roles already do, to every session, in one place. There are three modes, not two: do it yourself, steer it adaptively by delegating, or script it as a deterministic workflow.

## 2. The do-direct gate

**Do-direct** when delegating would cost more than the work itself: trivial, single-step, or context-cheap tasks, where writing the brief plus spawn latency plus a lossy summary back would exceed the task. Reads, lookups, a one-line edit, a status check, a relay, or a synthesis and decision only you hold.

**Delegate** when the task is **craft** (authored quality), **breadth** (parallelizable recon or research), **specialized judgment**, or work that would **bloat your context**. Then pick the tier:

- **cheap** - mechanical, high-volume, low-judgment work.
- **peer** (same tier) - standard craft.
- **up** - deep judgment, money, safety, multi-step reasoning.
- **cross-vendor** (a different company's model) - high-stakes **verification** where failure-mode diversity matters, because a different model catches errors a same-model reviewer shares.

Do not delegate the trivial just to look "orchestration-first." The gate cuts both ways.

**Run a workflow** (the deterministic third mode) when the delegated work is **pre-decomposable** (you can write the steps before you start) AND benefits from **scale or repeatability**: a wide fan-out over many files or sources, or a recurring standardized process (a review, a research sweep, an audit, a migration). A workflow encodes the path as code: same shape every run, parallel, resumable. **Do NOT** reach for one when the path is unknown and only recon reveals the work, when the run needs a human gate or mid-run adaptation, or when the step is small (the authoring tax exceeds the work). The action that is irreversible or high-stakes never lives inside the script; it returns to the orchestrator and its gate. Full decision guide: [the-workflow-pattern](../orchestrators/the-workflow-pattern.md).

## 3. The invariant: fan out for intelligence, single-thread the writes

**Fan out for INTELLIGENCE; keep WRITES single-threaded with one integrator.** Reads, analysis, lenses, recon, and drafts-for-review fan out freely. The actual writes, commits, and deploys stay single-threaded through one mind. This is what keeps orchestration from going fragile: parallel writers turn into a game of telephone, and the base ends up with conflicting copies. One integrator owns the merge.

## 4. Routing is the default, not a per-task afterthought

The `<tier>` field is mandatory on every delegate decision. Up for judgment, money, and safety; peer for craft; cheap for mechanical; cross-vendor for verification diversity. Routing is encoded in the rule itself, not remembered case by case.

## 5. The honesty clause on cost

Orchestration is justified by **decision quality, sustained context across a long session, and parallel wall-clock time**. It is **not** justified by cost-parity. Multi-agent work measures far more total tokens than a single direct pass; cheap-tier routing recovers some, but a frontier orchestrator plus subagents is usually *more* tokens, not fewer. So we measure rather than assume the cost evens out, and we never delegate trivial work on the false premise that it is cheaper.

## Paste-ready rule

```
ORCHESTRATION-FIRST (every session). On any non-trivial task, before acting, state one line:
  intake: do-direct | delegate -> <cheap|peer|up|cross-vendor> | workflow · why
Do-direct only when delegating would cost more than the work (trivial / single-step / a
synthesis only you hold). Delegate craft, breadth, specialized judgment, or
context-bloating work, at the right model tier. Run a WORKFLOW (deterministic, code-driven
fan-out) when the work is pre-decomposable AND wants scale or repeatability (wide sweeps,
recurring reviews/audits/migrations); not when the path is unknown, a human gate sits
mid-run, or the step is small. Fan out for INTELLIGENCE; keep WRITES single-threaded
(one integrator). The irreversible step never lives in the script; it returns to the gate.
Orchestration buys quality + sustained context + parallelism, not cheaper tokens. Measure.
```

*Adapted from a multi-agent operating model synthesizing Anthropic (orchestrator-subagent, token cost) and Cognition (single-threaded writes) plus software-reliability disciplines (ECC MIT).*

*Created by Alex Villarroel · part of Orchestrator OS.*
