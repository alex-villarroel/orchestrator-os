# 🛠️ Setups Index

*Step by step setup guides for Orchestration OS, each with a diagram that renders on GitHub and in Obsidian. The fastest path from reading the standard to running an orchestrator. ← [[00_MOC|Orchestration OS]].*

---

## On-ramp (start here)
- [[setups/setup-claude-code|setup-claude-code]] - install Claude Code, learn the user-level versus project-level `.claude/` layout, drop in agents, commands, and hooks from this repo, or install the whole thing as a plugin. Start here if you have never run Claude Code.
- [[setups/setup-the-whole-system|setup-the-whole-system]] - the architecture overview. How the layers fit together and the order to set them up in.
- [[setups/setup-folder-structure|setup-folder-structure]] - the full orchestrator folder tree (root files, lifecycle folders with Active and Complete, the five infra folders).

## The orchestration layer
- [[setups/setup-an-orchestrator|setup-an-orchestrator]] - stand up your first orchestrator by hand from the standard. Define the domain, copy the worked example, fill the core docs, wire the ceremony and contract, set the frozen zone, send the first directive.
- [[setups/setup-the-factory|setup-the-factory]] - use the factory to mint NEW orchestrators so you do not hand build each one. Shows the hard stop where the factory mints scaffolding then stops before the build.
- [[setups/setup-the-gatekeeper|setup-the-gatekeeper]] - run the conformance gate on a new orchestrator before it goes live (folder set, ceremony pair, prompt pack, zero orphans, builder).
- [[setups/setup-the-sandbox|setup-the-sandbox]] - test that a role stays in-role: the run then evaluate loop and the rubric.
- [[setups/setup-the-build-ceremony|setup-the-build-ceremony]] - run a change through the per-task spine (classify, recon, design, red, build, verify, gate, ship, retro).
- [[setups/setup-orchestration-first|setup-orchestration-first]] - adopt the intake habit: direct versus delegate, fan out for intelligence, write single-threaded.

## The building blocks
- [[setups/setup-agents|setup-agents]] - stand up your categorized agent library (one folder per domain, the two-library rule, path-explicit links, flat execution copies).
- [[setups/setup-commands|setup-commands]] - build a full prompt pack for an orchestrator (the role writes it in the sandbox, validated, regenerated when the ceremony changes).
- [[setups/setup-hooks|setup-hooks]] - wire the enforcement hooks into a real setup (copy the scripts, the settings.json block, the kill switch, soak warn-first then flip to block).

## Which one do I want
- **New to Claude Code:** start with [[setups/setup-claude-code|setup-claude-code]], then [[setups/setup-the-whole-system|setup-the-whole-system]].
- **One orchestrator, learning the shape:** [[setups/setup-an-orchestrator|setup-an-orchestrator]]. You understand every piece because you place every piece.
- **Many orchestrators, repeatably:** [[setups/setup-the-factory|setup-the-factory]]. Once you have built one by hand, let the factory mint the rest to the same mold.

## The pattern docs behind these
- [[the-standard/orchestrator-standard|orchestrator-standard]] (the mold) · [[orchestrators/example-orchestrator|example-orchestrator]] (a worked copy) · [[ceremonies/build-ceremony|build-ceremony]] + [[ceremonies/multi-agent-contract|multi-agent-contract]] (the spine + roles) · [[ceremonies/factory-ceremony|factory-ceremony]] + [[ceremonies/gatekeeper-ceremony|gatekeeper-ceremony]] (mint + gate).

---
*Setups Index: Orchestration OS. Diagrams use Mermaid so they render on GitHub and in Obsidian. Adapted in part from ECC (Everything Claude Code, MIT), Anthropic Claude Code, and Cognition multi-agent research.*

*Created by Alex Villarroel · part of Orchestration OS.*
