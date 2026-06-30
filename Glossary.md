# Glossary

*One page of the load-bearing terms in Orchestrator OS, so the vocabulary is a reference, not a barrier. New here? Read [the 5-minute Quickstart](./Quickstart.md) first, then [the shortform guide](./the-shortform-guide.md). ← [Orchestrator OS](./00_MOC.md).*

## The core idea
- **Orchestrator**: a persistent point-man for a domain that directs disposable sub-agents and never does the leaf work itself.
- **Builder**: the orchestrator's doer tier, the sub-agents or roles it dispatches to actually produce the work.
- **Dispatch**: the act of sending a sub-agent a brief that carries the scope, the fence (what not to touch), the acceptance criteria, and the return shape.
- **Lens**: a specialist agent that applies one view or critique (a red-team lens, a security lens, a recon lens).

## The two execution modes
- **Adaptive**: the default judgment loop, spawn and read and re-plan and integrate as the path is discovered.
- **Workflow**: a deterministic coded path that fans agents out, verifies, and synthesizes the same way every run, for pre-decomposable work that wants scale or repeatability. A tool the orchestrator wields, never a rival.
- **Classifier**: the one line stated before acting, naming the task, the mode (`do-direct | delegate | workflow`), the model, and the consults.

## How one is born and kept honest
- **The Standard**: the mold, the canonical definition of what an orchestrator IS plus the checklist of birth components.
- **Born complete**: an orchestrator arrives with every required component (folders, ceremony, contract, prompts, links, builder) or it does not arrive. Half-built things rot.
- **Factory**: the ceremony that mints a new orchestrator from the mold so it arrives whole.
- **Gatekeeper**: the ceremony that owns enforcement, runs the standard's checklist against a candidate, and refuses anything not fully green.
- **Conformance gate**: that fixed checklist, run before anything goes live.
- **Flywheel**: how the system improves itself, lessons become rules and rules become enforced, getting stricter only where strictness has teeth.

## The operating spine
- **Master Ceremony**: the per-domain operating sequence a role runs from intake to close.
- **Multi-Agent Contract**: the roster, dispatch standard, return schema, model routing, and guardrails underneath the ceremony.
- **Prompt pack**: the orchestrator's complete, paste-ready set of operating prompts (boot, resume, and the role's full task set).
- **Sandbox**: the role-conformance harness, where a role is tested to stay in-role and writes and validates its own prompt pack.

## The building blocks and rules
- **Hook**: a small script the harness runs on a lifecycle event that flags or blocks an action when a rule is violated. Makes a rule enforced, not remembered.
- **enforced_by**: the discipline that every rule names its enforcement point (hook, gate, ceremony, lint, or convention). A rule without one is a lesson, not a rule.
- **Fail-open / fail-closed**: a hook posture. On error, fail-open allows the action (a buggy guard must not brick work), fail-closed denies it (used only for the irreversible, like a deploy).
- **Frozen zone / forbidden zone**: files deliberately protected (edit only with confirmation) or never editable by a builder.
- **Infra folders**: the five every orchestrator carries: `commands/`, `agents/`, `hooks/`, `setups/`, `secrets-rotation/`.
- **Active / Complete**: lifecycle subfolders, work moves from in-flight to done, and Complete is point-in-time history, never edited retroactively.

## Navigation and discipline
- **MOC**: Map of Contents, the hub index that links every area both ways.
- **Handoff**: a brief, either a one-time first-run explainer or a recurring session-to-session note.
- **Grounding**: recon the real system before acting. The live source beats any doc, and a recalled memory or stale summary is a hypothesis, not a fact.
- **Two-library rule**: you work against two agent libraries, your own canonical one and an external reference you mine and adapt, never blind-copy.

*Created by Alex Villarroel · part of Orchestrator OS.*
