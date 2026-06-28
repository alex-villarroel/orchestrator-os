# Ceremonies Index

*The five operating ceremonies of Orchestration OS: the spines that turn ideas into gated, shipped, well-run systems.*

← [[00_MOC|Orchestration OS]]

---

## The ceremonies

- [[ceremonies/build-ceremony|build-ceremony]]: the per-change operating spine: classify, recon, spec and pre-mortem, design panel, red panel, build, verify, gate, ship, retro.
- [[ceremonies/multi-agent-contract|multi-agent-contract]]: the roles and agent-ops layer: a persistent orchestrator directing disposable builders, the bridge model, model routing, the dispatch standard, and anti-anchoring.
- [[ceremonies/factory-ceremony|factory-ceremony]]: the factory pattern: how an idea becomes a new orchestrator, minted from one shared standard, with the mint stopping before the build.
- [[ceremonies/gatekeeper-ceremony|gatekeeper-ceremony]]: the gatekeeper pattern: the conformance gate on new systems plus the retro flywheel that turns lessons into rules with an enforced_by point.
- [[ceremonies/operator-ceremony|operator-ceremony]]: a generic domain-operator orchestrator: running an ongoing domain by dispatching specialists under a safety gate, hybrid author-vs-spawn.

## How they fit together

The **factory** mints a new orchestrator from a shared standard. The **gatekeeper** gates it and owns how the rules evolve. Once live, an orchestrator runs either as a **build** orchestrator (the per-change spine for software) or an **operator** (the per-task spine for an ongoing domain), and both lean on the **multi-agent contract** for who builds, who checks, and who ships.

---
*Ceremonies Index: Orchestration OS. Adapted from ECC (Everything Claude Code, MIT, Affaan Mustafa), Anthropic Claude Code, and Cognition multi-agent research.*

*Created by Alex Villarroel · part of Orchestration OS.*
