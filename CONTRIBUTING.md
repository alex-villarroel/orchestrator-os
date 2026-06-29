# Contributing

*Thanks for wanting to make this better. ← [README](./README.md) · [Orchestrator OS](./00_MOC.md).*

Orchestrator OS grows by people sharing what actually works. Contributions of agents, skills, commands, hooks, ceremonies, and setup guides are all welcome.

## Before you open a PR
1. **Keep it real and generic.** No personal data, no secrets, no absolute machine paths, no company-specific content. Use neutral placeholders (`<your-domain>`, `<your-app-repo>`). This is a public reference.
2. **No em dashes in prose.** A house-style choice for all public copy.
3. **Link it in.** Every new file gets an entry in its area `00_*_INDEX.md` and at least one inbound link, and the area index links back to [00_MOC](./00_MOC.md). No orphans.
4. **Match the conventions.** Agents are filed by domain at `agents/<Category>/<name>.md` with YAML frontmatter (`name`, `description`, `tools`, `model`), and each category folder carries a `00_<CATEGORY>_INDEX.md` that lists its briefs. Hooks are `hooks/<name>.js` with a header stating the event and fail mode. See [the-agent-library-pattern](./agents/the-agent-library-pattern.md) and [naming-conventions](./rules/naming-conventions.md).
5. **Credit upstreams.** If you adapt someone else's work, add an `*Adapted from ...*` note and a line in [CREDITS](./CREDITS.md).

## How to contribute
- **A new agent or command:** add the file, list it in the area index (for an agent, its category `00_<CATEGORY>_INDEX.md`, path-explicit), and include a one-line description.
- **A new setup guide:** follow the pattern in [setups](./setups/00_SETUPS_INDEX.md) (steps + a diagram). Visuals are first-class here.
- **A fix or improvement:** open a PR with a clear before and after. Small, reviewable changes are easier to accept.

## Reviews
PRs get reviewed for the rules above plus clarity and whether the pattern generalizes. Be patient and kind, both ways. See [CODE_OF_CONDUCT](./CODE_OF_CONDUCT.md).

*Created by Alex Villarroel · part of Orchestrator OS.*
