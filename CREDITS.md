# Credits and acknowledgements

*This project stands on the shoulders of others. ← [[README|README]] · [[00_MOC|Orchestration OS]].*

Orchestration OS is a synthesis. The orchestration layer (the standard, the factory, the gatekeeper, the conformance harness) is original, but it was shaped by, and borrows patterns from, the work below. Thank you to everyone here.

## Direct sources
- **Everything Claude Code (ECC)** by Affaan Mustafa, used under the MIT License. The repository structure (map-of-contents hubs, explicit wikilinks, folder-per-skill, layered rules, the guide format) and several agent and skill patterns are adapted from ECC. Repo: https://github.com/affaan-m/ECC . Patterns adapted from ECC are noted in-doc where they appear.
- **Anthropic, Claude Code.** The agent, hook, skill, and resume-driven session conventions follow Claude Code's architecture (subagents, the hooks interface, slash commands, skills). Docs: https://code.claude.com/docs .

## Principles drawn on
- **Cognition** for the multi-agent coordination principle that drives the single-integrator rule: fan out for intelligence, but keep writes single-threaded so the work does not become a game of telephone.
- **Knowledge-management practice** (Zettelkasten, the Obsidian and PKM community) for the backlinks, maps-of-content, and no-orphan discipline.
- **Software-reliability practice** for the frozen-core, proof-on-deploy, tripwire, and revert-ready changelog disciplines.

## The one hard obligation
Where this repo includes or adapts MIT-licensed work, the original copyright notice and permission text are preserved (see LICENSE). If you build on Orchestration OS, please keep this CREDITS file and the license notices intact, and add your own line. That is the whole ask.

*Created by Alex Villarroel · part of Orchestration OS.*
