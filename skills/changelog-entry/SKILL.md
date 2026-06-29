---
name: changelog-entry
description: Write a changelog entry for a change in Keep a Changelog format. Use when the user asks to add a changelog entry, update the changelog, record what changed, or note a change for the next release.
allowed-tools: Read, Edit
---

# Changelog Entry

Add an entry to `CHANGELOG.md` describing a change, in Keep a Changelog style. Use this whenever a change is worth recording for the next release.

## Steps

1. Read the existing `CHANGELOG.md` to match its style. If there is no `Unreleased` section at the top, create one under the title.
2. Pick the right category for the change: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, or `Security`.
3. Write one line, present tense, describing what changed from the reader's point of view, not the implementation detail. Lead with the user-visible effect.
4. Add the line as a bullet under the matching category in the `Unreleased` section. Create the category subheading if it does not exist yet.
5. Do not invent a version number or a release date. Releasing is a separate, human-timed step.

## Format

```markdown
## [Unreleased]

### Added
- New capability, described by what it lets the reader do.

### Fixed
- The bug that is now gone, described by the symptom it removed.
```

## Rules

- One entry per change. Keep it to a single readable line.
- Describe the outcome, not the diff. "Faster cold start on large repos" beats "refactored the loader".
- No em dashes. Use commas, periods, or colons.
- If the change is internal only and nothing about it reaches a user or operator, say so and ask whether it is worth an entry before adding one.

← [00_SKILLS_INDEX](../00_SKILLS_INDEX.md) · [Orchestrator OS](../../00_MOC.md)

*Created by Alex Villarroel · part of Orchestrator OS.*
