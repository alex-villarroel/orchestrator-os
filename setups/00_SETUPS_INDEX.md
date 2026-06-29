# 🛠️ Setups Index

*Step by step setup guides for Orchestrator OS, each with a diagram that renders on GitHub and in Obsidian. The fastest path from reading the standard to running an orchestrator. ← [Orchestrator OS](../00_MOC.md).*

---

## On-ramp (start here)
- [setup-claude-code](./setup-claude-code.md) - install Claude Code, learn the user-level versus project-level `.claude/` layout, drop in agents, commands, and hooks from this repo, or install the whole thing as a plugin. Start here if you have never run Claude Code.
- [setup-the-whole-system](./setup-the-whole-system.md) - the architecture overview. How the layers fit together and the order to set them up in.
- [setup-folder-structure](./setup-folder-structure.md) - the full orchestrator folder tree (root files, lifecycle folders with Active and Complete, the five infra folders).

## The orchestration layer
- [setup-an-orchestrator](./setup-an-orchestrator.md) - stand up your first orchestrator by hand from the standard. Define the domain, copy the worked example, fill the core docs, wire the ceremony and contract, set the frozen zone, send the first directive.
- [setup-the-factory](./setup-the-factory.md) - use the factory to mint NEW orchestrators so you do not hand build each one. Shows the hard stop where the factory mints scaffolding then stops before the build.
- [setup-the-gatekeeper](./setup-the-gatekeeper.md) - run the conformance gate on a new orchestrator before it goes live (folder set, ceremony pair, prompt pack, zero orphans, builder).
- [setup-the-sandbox](./setup-the-sandbox.md) - test that a role stays in-role: the run then evaluate loop and the rubric.
- [setup-the-build-ceremony](./setup-the-build-ceremony.md) - run a change through the per-task spine (classify, recon, design, red, build, verify, gate, ship, retro).
- [setup-orchestration-first](./setup-orchestration-first.md) - adopt the intake habit: direct versus delegate, fan out for intelligence, write single-threaded.

## The building blocks
- [setup-agents](./setup-agents.md) - stand up your categorized agent library (one folder per domain, the two-library rule, path-explicit links, flat execution copies).
- [setup-commands](./setup-commands.md) - build a full prompt pack for an orchestrator (the role writes it in the sandbox, validated, regenerated when the ceremony changes).
- [setup-skills](./setup-skills.md) - stand up a model-invoked skill (a `SKILL.md` folder Claude matches by description and loads progressively, for the procedures you want applied without asking).
- [setup-hooks](./setup-hooks.md) - wire the enforcement hooks into a real setup (copy the scripts, the settings.json block, the kill switch, soak warn-first then flip to block).

## Which one do I want
- **New to Claude Code:** start with [setup-claude-code](./setup-claude-code.md), then [setup-the-whole-system](./setup-the-whole-system.md).
- **One orchestrator, learning the shape:** [setup-an-orchestrator](./setup-an-orchestrator.md). You understand every piece because you place every piece.
- **Many orchestrators, repeatably:** [setup-the-factory](./setup-the-factory.md). Once you have built one by hand, let the factory mint the rest to the same mold.

## The pattern docs behind these
- [orchestrator-standard](../the-standard/orchestrator-standard.md) (the mold) · [example-orchestrator](../orchestrators/example-orchestrator.md) (a worked copy) · [build-ceremony](../ceremonies/build-ceremony.md) + [multi-agent-contract](../ceremonies/multi-agent-contract.md) (the spine + roles) · [factory-ceremony](../ceremonies/factory-ceremony.md) + [gatekeeper-ceremony](../ceremonies/gatekeeper-ceremony.md) (mint + gate).

---
*Setups Index: Orchestrator OS. Diagrams use Mermaid so they render on GitHub and in Obsidian. Adapted in part from ECC (Everything Claude Code, MIT), Anthropic Claude Code, and Cognition multi-agent research.*

*Created by Alex Villarroel · part of Orchestrator OS.*
