# Contributing

*Thanks for wanting to make this better. ← [[README|README]] · [[00_MOC|Orchestration OS]].*

Orchestration OS grows by people sharing what actually works. Contributions of agents, skills, commands, hooks, ceremonies, and setup guides are all welcome.

## Before you open a PR
1. **Keep it real and generic.** No personal data, no secrets, no absolute machine paths, no company-specific content. Use neutral placeholders (`<your-domain>`, `<your-app-repo>`). This is a public reference.
2. **No em dashes in prose.** A house-style choice for all public copy.
3. **Link it in.** Every new file gets an entry in its area `00_*_INDEX.md` and at least one inbound link, and the area index links back to [[00_MOC|00_MOC]]. No orphans.
4. **Match the conventions.** Agents are `agents/<name>.md` with YAML frontmatter (`name`, `description`, `tools`, `model`). Hooks are `hooks/<name>.js` with a header stating the event and fail mode. See [[rules/naming-conventions|naming-conventions]].
5. **Credit upstreams.** If you adapt someone else's work, add an `*Adapted from ...*` note and a line in [[CREDITS|CREDITS]].

## How to contribute
- **A new agent or command:** add the file, list it in the area index, and include a one-line description.
- **A new setup guide:** follow the pattern in [[setups/00_SETUPS_INDEX|setups]] (steps + a diagram). Visuals are first-class here.
- **A fix or improvement:** open a PR with a clear before and after. Small, reviewable changes are easier to accept.

## Reviews
PRs get reviewed for the rules above plus clarity and whether the pattern generalizes. Be patient and kind, both ways. See [[CODE_OF_CONDUCT|CODE_OF_CONDUCT]].

*Created by Alex Villarroel · part of Orchestration OS.*
