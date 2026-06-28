<!--
  Orchestration OS - public README.
  WORKING NAME "Orchestration OS" - rebrand to your final name before publishing.
  Alex: confirm the "Who made this" bio + your handles before the repo goes public (marked below).
-->

# Orchestration OS

**An open operating system for building with AI through orchestration.**

> Not another agent pack. This is the layer ABOVE the agents: a mold every orchestrator is born from, a factory that mints new ones, a gatekeeper that enforces the standard, and a sandbox that proves your roles stay in-role. Download it and it is already linked and interconnected, so you can read it as a living map, not a pile of files.

<!-- badges (add on publish): License MIT + CC-BY-4.0 · PRs welcome · Stars -->

---

## Why this exists

Most AI work is one person typing at one model. That hits a ceiling: you forget half your own rules, you cannot hold a big system in one context, and quality swings with your energy. Orchestration is the way past it. You stop being the doer and become the director: a persistent orchestrator frames the work, disposable builders and specialists do the leaf work in parallel, and the writes flow back through a single integrator so nothing turns into a game of telephone.

The hard part was never the agents. It was the system around them: how a new orchestrator is born complete, how work is gated so the irreversible thing cannot slip through, how a role is tested so it does not drift, and how the whole thing stays a clean, navigable knowledge graph instead of rotting into chaos. That system is what this repo is.

## Who made this

<!-- Alex: confirm/replace this block + add your handles before publishing -->
Built by Alex Villarroel. I run my businesses, my building, and my creative work through AI orchestration, and I learn in public. The honest version: AI is over-complicated right now, and a lot of the wins come from boring fundamentals like good file structure, short context, and a system that enforces its own rules. I am not a guru. I am a builder sharing what actually works, mistakes included. If it helps you, take it.

## What is different

- **It leads with orchestration, not agents.** Agent and prompt collections are everywhere. The unique value here is the operating layer: [[the-standard/00_STANDARD_INDEX|the standard]], [[ceremonies/00_CEREMONIES_INDEX|the ceremonies]], [[orchestrators/00_ORCHESTRATORS_INDEX|the orchestrator pattern]], and [[sandbox/00_SANDBOX_INDEX|the conformance harness]].
- **It enforces itself.** Rules you only remember get forgotten. The [[hooks/00_HOOKS_INDEX|hooks layer]] turns the load-bearing ones into scripts that run automatically, so a bad deploy or a corrupted file cannot slip through.
- **It is born complete.** A [[ceremonies/factory-ceremony|factory]] mints a new orchestrator from the mold with its full folder set, ceremony, contract, prompt pack, and agent index, all cross-linked with zero orphans, and a [[ceremonies/gatekeeper-ceremony|gatekeeper]] refuses anything that is not.
- **It is interconnected on download.** Every doc links to its neighbors and back to [[00_MOC|the map]]. Works in Obsidian and renders on GitHub.

## What is inside

| Area | What it is |
|---|---|
| 🏛️ [[the-standard/00_STANDARD_INDEX|The Standard]] | the mold: what an orchestrator needs to be born complete |
| 🎼 [[orchestrators/00_ORCHESTRATORS_INDEX|Orchestrators]] | the pattern + a worked generic example |
| 📜 [[ceremonies/00_CEREMONIES_INDEX|Ceremonies]] | the operating spines (build · multi-agent contract · factory · gatekeeper · operator) |
| 🧪 [[sandbox/00_SANDBOX_INDEX|Sandbox]] | the role-conformance harness (prove a role stays in-role) |
| 🤖 [[agents/00_AGENTS_INDEX|Agents]] | the categorized agent-library pattern + example agents |
| ⌨️ [[commands/00_COMMANDS_INDEX|Commands]] | the prompt-pack pattern + an example full pack |
| 🪝 [[hooks/00_HOOKS_INDEX|Hooks]] | the enforcement layer (fail-closed where it matters) |
| 📐 [[rules/00_RULES_INDEX|Rules]] | knowledge discipline · naming conventions · orchestration-first |
| 🛠️ [[setups/00_SETUPS_INDEX|Setups]] | step-by-step setup for every piece, each with a diagram |

## Quickstart

1. Read [[the-shortform-guide|the-shortform-guide]] (about 30 minutes). It explains the orchestrator-and-builder model and the one rule that makes it work.
2. Open [[00_MOC|the map]] and skim the areas.
3. Copy [[orchestrators/example-orchestrator|the example orchestrator]] and adapt it to your domain using [[the-standard/orchestrator-standard|the standard]].
4. Pick the [[setups/00_SETUPS_INDEX|setup guide]] for each piece you want and follow its diagram.

## Structure

A flat, readable tree. Each area has a `00_*_INDEX.md` that lists its contents. The agents, commands, and hooks follow the Claude Code conventions (`agents/*.md` with YAML frontmatter, `hooks/*.js`), so they drop into a real setup.

## Philosophy

See [[the-philosophy|the-philosophy]]. Short version: be real, enforce don't remember, fan out for intelligence and write single-threaded, and keep the knowledge a clean graph.

## License

Dual licensed. Code (agents, commands, hooks, scripts) under **MIT** ([[LICENSE]]). Prose (ceremonies, the standard, guides, docs) under **CC-BY-4.0** ([[LICENSE-docs]]). Use it, adapt it, build on it.

## Credits

This stands on the shoulders of others. Full acknowledgements in [[CREDITS|CREDITS]] (Everything Claude Code by Affaan Mustafa, Anthropic's Claude Code, Cognition's multi-agent research, and established knowledge-management and software-reliability disciplines).

## Contributing

PRs welcome. See [[CONTRIBUTING|CONTRIBUTING]] and [[CODE_OF_CONDUCT|CODE_OF_CONDUCT]]. Found a security issue? [[SECURITY|SECURITY]].

*Created by Alex Villarroel · part of Orchestration OS.*
