*The index for the orchestrators area: what an orchestrator is, and a worked example you can copy. Start here, then read the standard and the ceremony.*

← [Orchestrator OS](../00_MOC.md)

---

## In this area

- [the-orchestrator-pattern](./the-orchestrator-pattern.md) - what an orchestrator IS. The persistent director that owns a domain, frames work, dispatches disposable builders, integrates single-threaded, and never does the leaf work. Covers the orchestrator-vs-builder split, when to spawn vs embody, and model routing by tier.
- [the-workflow-pattern](./the-workflow-pattern.md) - the second mode of orchestration: a deterministic, code-driven workflow. When to script a fan-out instead of steering it by hand, when NOT to, how a workflow composes under the orchestrator, and the canonical fan-out / verify / synthesize patterns.
- [example-orchestrator](./example-orchestrator.md) - a fully worked generic example ("Example Orchestrator" for `<your-domain>`). Its full folder set, core docs (RESUME / Operating System / MOC / MEMORY), ceremony and contract pointers, builder, agents index, and prompt pack. The shape end to end, ready to copy.

## Read in this order

1. [the-orchestrator-pattern](./the-orchestrator-pattern.md) - understand the role and its one rule.
2. [the-workflow-pattern](./the-workflow-pattern.md) - the deterministic mode and when to choose it over steering by hand.
3. [orchestrator-standard](../the-standard/orchestrator-standard.md) - the birth checklist (what a complete orchestrator must contain).
4. [example-orchestrator](./example-orchestrator.md) - copy the shape.
5. [build-ceremony](../ceremonies/build-ceremony.md) + [multi-agent-contract](../ceremonies/multi-agent-contract.md) - the operating spine and the wiring.

## Related areas

- [orchestrator-standard](../the-standard/orchestrator-standard.md) - the mold every orchestrator is minted from.
- [build-ceremony](../ceremonies/build-ceremony.md) - the per-task operating spine.
- [multi-agent-contract](../ceremonies/multi-agent-contract.md) - roster, dispatch standard, model routing, guardrails.

---

← [Orchestrator OS](../00_MOC.md)

*Created by Alex Villarroel · part of Orchestrator OS.*
