# Changelog

*← [README](./README.md) · [Orchestrator OS](./00_MOC.md).*

All notable changes to Orchestrator OS are recorded here. Format loosely follows Keep a Changelog; this project uses semantic versioning once it is public.

## [0.2.0] - 2026-06-29
- **Enforcement made real.** Shipped two working hooks and wired them in [hooks.json](./hooks/hooks.json): [secret-scan](./hooks/secret-scan.js) (asks when a write carries a secret-value shape: API key, AWS key, PEM key, JWT) and [structure-lint](./hooks/structure-lint.js) (denies a new doc at the repo root; reminds to index a new doc in an indexed folder). The standard's two "aspirational, not shipped here" footnotes (§3a, §3.6) now name these hooks as their `enforced_by`.
- **Honest prose.** The README "enforces itself" claim now distinguishes the hook-enforced deterministic rules from the human-run structural conformance gate, and says which is which.
- **On-ramp.** Added [Quickstart](./Quickstart.md) (a 5-minute path in) and [Glossary](./Glossary.md) (one page of the load-bearing terms), linked from the README and the map.

## [0.1.0] - unreleased (initial assembly)
Initial public structure.
- The orchestration layer: [the standard](./the-standard/00_STANDARD_INDEX.md), [orchestrators](./orchestrators/00_ORCHESTRATORS_INDEX.md), [ceremonies](./ceremonies/00_CEREMONIES_INDEX.md), [sandbox](./sandbox/00_SANDBOX_INDEX.md).
- The building blocks: [agents](./agents/00_AGENTS_INDEX.md), [commands](./commands/00_COMMANDS_INDEX.md), [hooks](./hooks/00_HOOKS_INDEX.md), [rules](./rules/00_RULES_INDEX.md).
- [Setups](./setups/00_SETUPS_INDEX.md) with diagrams for every piece.
- Root docs: [README](./README.md), [the-shortform-guide](./the-shortform-guide.md), [the-longform-guide](./the-longform-guide.md), [the-philosophy](./the-philosophy.md), [CREDITS](./CREDITS.md), dual MIT + CC-BY-4.0 license.

*Created by Alex Villarroel · part of Orchestrator OS.*
