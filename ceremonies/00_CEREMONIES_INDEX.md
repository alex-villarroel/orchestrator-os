# Ceremonies Index

*The four operating ceremonies of Orchestrator OS (build, factory, gatekeeper, operator), plus the multi-agent contract that governs how agents work together. The spines that turn ideas into gated, shipped, well-run systems.*

← [Orchestrator OS](../00_MOC.md)

---

## The four ceremonies

- [build-ceremony](./build-ceremony.md): the per-change operating spine: classify, recon, spec and pre-mortem, design panel, red panel, build, verify, gate, ship, retro.
- [factory-ceremony](./factory-ceremony.md): the factory pattern: how an idea becomes a new orchestrator, minted from one shared standard, with the mint stopping before the build.
- [gatekeeper-ceremony](./gatekeeper-ceremony.md): the gatekeeper pattern: the conformance gate on new systems plus the retro flywheel that turns lessons into rules with an enforced_by point.
- [operator-ceremony](./operator-ceremony.md): a generic domain-operator orchestrator: running an ongoing domain by dispatching specialists under a safety gate, hybrid author-vs-spawn.

## The contract underneath them

- [multi-agent-contract](./multi-agent-contract.md): not a ceremony but the structure all four share: the roles and agent-ops layer (a persistent orchestrator directing disposable builders), the bridge model, model routing, the dispatch standard, and anti-anchoring.

## How they fit together

The **factory** mints a new orchestrator from a shared standard. The **gatekeeper** gates it and owns how the rules evolve. Once live, an orchestrator runs either as a **build** orchestrator (the per-change spine for software) or an **operator** (the per-task spine for an ongoing domain), and both lean on the **multi-agent contract** for who builds, who checks, and who ships.

---
*Ceremonies Index: Orchestrator OS. Adapted from ECC (Everything Claude Code, MIT, Affaan Mustafa), Anthropic Claude Code, and Cognition multi-agent research.*

*Created by Alex Villarroel · part of Orchestrator OS.*
