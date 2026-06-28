# Multi-Agent Contract

*Roles, structure, and the agent-operations layer: who directs, who builds, who ships, and the rules that keep many agents from stepping on each other or on the math.*

← [[ceremonies/00_CEREMONIES_INDEX|00_CEREMONIES_INDEX]] · [[00_MOC|Orchestration OS]]

Related: [[ceremonies/build-ceremony|build-ceremony]] · [[ceremonies/operator-ceremony|operator-ceremony]] · [[ceremonies/factory-ceremony|factory-ceremony]] · [[ceremonies/gatekeeper-ceremony|gatekeeper-ceremony]]

---

## The core idea

One **orchestrator** (persistent) directs many disposable **builder** sub-agents. The orchestrator never writes feature code; builders never ship. **Every change is built by one mind and checked by another, against a frozen set of untouchables.** That split is what makes large, safety-sensitive builds safe.

---

## The roles

### Orchestrator (one, persistent; the point man and single integrator)
- **Directs:** recons the next change, writes the builder directive, decides scope and what stays frozen.
- **Independently verifies:** re-runs the load-bearing checks itself on every staged build, never trusts a builder's self-report.
- **Owns ship:** holds the only deploy keys. Package, deploy, post-verify served bytes.
- **Is the single integrator:** the only role that merges staged work and resolves conflicts. Builders never integrate.
- **Owns continuity and decisions:** updates the resume, run log, and handoff every wave; applies the decision protocol; consults the owner only on genuine forks.
- **Default model:** the top tier (orchestration, verification, architecture, root-cause, multi-file invariants).

### Builder sub-agent (one per change, fresh context, disposable)
- Reads the directive, recons its lane, **stages** exactly one well-scoped change in its allowed files, runs the full [[ceremonies/build-ceremony|build-ceremony]], writes a structured report, and **stops**.
- **Never** packages, deploys, or integrates. Never says "live." A builder's job ends at staged plus reported.
- **Default model:** the mid tier (implementation, refactors); the low tier for trivial mechanical edits.

### Investigator / recon sub-agent (read-only, optional)
- Maps a screen, feature, or data model before a build is briefed. Builds nothing. Returns anatomy, data-source map, buildable-vs-fork, line-ending probe, and a decomposition into independently-verifiable units.
- **Default model:** mid tier, or top tier for a deep or ambiguous map.

### Red / verify lenses (fresh sub-agents, dispatched per risk class)
- The pre-mortem and verify panels (the red lenses plus reviewer, security, drift, behavioral, completeness). Real fresh-context sub-agents told to refute, fed the spec or diff only, never the implementer's reasoning.
- **Default model:** top tier for any Critical-lane lens; mid tier for lower-lane lenses.

---

## The bridge model (builders are isolated; only the owner or orchestrator connects them)

Builders **cannot reach each other.** Each is a fresh, contained context that sees only its directive and its own repo lane. There is no builder-to-builder channel. The only things that bridge two builders are the owner or the orchestrator: information flows up to the orchestrator and back down, never sideways.

- A builder that needs something from another lane **flags it up**; the orchestrator routes it. The builder never reaches across.
- **Hard repo separation (the fence):** every sub-agent's prompt opens with a verbatim fence: *read only under this repo root; the foreign repo and everything under it is forbidden; if the task seems to need a forbidden path, STOP and return FENCE-BLOCKED.* Each reply opens with a containment acknowledgement echoing its allowed root. The orchestrator scans every returned conclusion for the forbidden root string; a hit is a breach (disqualify the output, quarantine, one tightened re-dispatch, tighten the rail).
- **Why:** isolation keeps a builder from silently editing the wrong repo, leaking one project's identifiers into another, or coordinating off-book. The orchestrator is the single integration point, which is also the single place verification happens.

> Example: with two repos `<your-app-repo>` (the app) and `<your-orchestrator>` (the tool layer), a new tool that needs an app route means the tool-builder flags it up, the app-builder builds the route, then the tool-builder adds the definition. They never read each other's repo.

*Adapted from Cognition multi-agent research (isolated context windows, no cross-agent chatter).*

---

## Model routing (route the model to the task)

Cost and capability are a dial, not a default. Route by role and by the change's lane or operation, and state the choice in the dispatch line so it is visible and overridable.

| Tier | Use for | Typical role |
|---|---|---|
| **High** | architecture, root-cause, multi-file invariants, orchestration and independent re-verify, any Critical-lane red lens | orchestrator; Critical panels; deep recon |
| **Mid** | implementation, refactors, standard recon, lower-lane lenses | builders; investigator; F/S-lane panels |
| **Low** | classification, boilerplate transforms, narrow mechanical edits | a trivial-tier FIX/REFACTOR build |

**Rules:**
- **Escalate only on a clear reasoning gap.** Start at the tier the lane warrants; bump up only when the lower tier fails for a reason you can name, never reflexively.
- **The reviewer tier is never below the builder tier on a Critical lane.** A second mind weaker than the first is not a check.
- **Track per dispatch** (model, token estimate, retries, wall-clock, success or failure). This is the data the retro reads to tune routing.

*Adapted from ECC `agentic-engineering`, `prompt-optimizer`.*

---

## Parallel work: the work-item board

**The serialize rule, first:** parallelize builders **only on disjoint file-sets.** Anything that touches the shared single-writer resource (for example a `<frozen-module>` deploy file that the cache-bust rewrites) must be **serialized, one build at a time**, because concurrent edits collide. Identify the single-writer resource and make it a one-at-a-time lane; everything genuinely disjoint can fan out.

When more than one builder runs in a wave, make the work visible and mergeable by treating each dispatch as a **card**:

```
card:
  id:          wave3-<short-name>
  owner:       <one builder, never shared>
  scope:       <allowed files / branch>
  forbidden:   <the shared module>, <frozen cores>, anything outside the lane (the fence)
  operation:   FIX · size small · lane S (touches: <fact>)   # from the classifier
  state:       backlog -> ready -> running -> review -> blocked -> merged -> archived
  acceptance:  the criteria the verify panel judges against
  evidence:    tests, frozen proof, drift result, line-endings before==after, behavioral
  merge_gate:  the exact condition that lets the orchestrator integrate it
```

**The flow:** shape the board (fuzzy ambition into cards with owners and merge gates), assign boundaries (one owner per card, no overlapping writes without the integrator), run agents (each writes evidence plus a handoff, not just code), review in sequence (scripted gate, then frozen and drift, then the risk-class panels, then behavioral), then **merge deliberately** (the orchestrator is the single integrator).

**The merge queue, with eviction and context:** non-overlapping cards integrate speculatively in parallel; overlapping cards integrate one-by-one, re-verifying each time. A card whose re-verify fails (conflict, frozen-proof break, drift, a panel no-ship) is **evicted**, and the full failure context (conflicting files, the diff, the gate output) is fed into its re-dispatch. This is retry-with-context at the merge layer, never a blind re-run.

**Failure modes to name and kill:** agent soup (many builders, no owner or merge gate); invisible work (a result that lives only in a transcript, never staged); board theater (cards with no acceptance criteria); overlapping writes (two builders on one file with no integrator); no artifact (process produced docs, not a staged, verifiable change).

*Adapted from ECC `team-agent-orchestration`, `autonomous-loops`.*

---

## The dispatch standard (the builder directive is a checklist)

Every builder directive carries, in order, or it is not dispatched:

1. **The fence** (read only under your repo root; foreign repo forbidden; STOP and FENCE-BLOCKED if needed) plus the vault contract (right folder, update don't duplicate, link it, archive what you supersede). The reply opens with a containment acknowledgement.
2. **The classifier line:** `operation · size · lane (touches fact) · phases · skipped`. This tells the builder which shape it is running.
3. **Conventions plus the exemplar, passed in.** Hand the builder the reference exemplar to imitate and the in-lane conventions. Do not assume it will find them.
4. **Acceptance criteria as assertions** plus **scope boundaries (what NOT to touch).** The most common dispatch defect is a missing "do not" list and missing done-conditions. Cover tech and lane, target scope, acceptance criteria, error and edge handling, security and auth assumptions, existing patterns, and the explicit out-of-scope.
5. **Parallel when disjoint, serial on the shared file.** Independent cards dispatch together in one wave; anything touching the single-writer resource serializes.
6. **Retry-with-context on any re-dispatch.** A failed build's re-dispatch must embed the exact failure artifact (error, conflicting files, diff, test output). Never re-run the same prompt.

*Adapted from ECC `prompt-optimizer`, `autonomous-loops`; Anthropic Claude Code subagent prompting guidance.*

---

## Panels: author-bias and anti-anchoring

The whole reason panels exist is that **the reviewer was never the author.** Self-review misses what the author already rationalized.

- **The reviewer never wrote the code it reviews.** Independent re-verify is done by a different mind (the orchestrator), and every red lens is a fresh context.
- **Anti-anchoring:** each lens or voice is fed the **spec plus diff only, never the implementer's reasoning or transcript.** It gets the question, not the answer the builder already reached.
- **The evidence rule:** a finding ships only with (exact anchor + a concrete counterexample + why current guards miss it). A clean lens is a valid result; never manufacture findings to justify the invocation.
- **Dispatch the panel in parallel with the orchestrator's own re-verify.** The risk-class red lenses and the orchestrator's independent re-verify consume only the staged diff and share no dependency, so fire them in one batch the moment the build stages. Parallel wins twice: wall-clock (the lens overlaps the gate) and cleaner anti-anchoring (a concurrently-dispatched lens runs truly blind).

*Adapted from Cognition multi-agent research (anti-anchoring); ECC `council`, `agent-evaluator`.*

---

## Builders mis-report; the orchestrator independently re-verifies

This is the orchestrator's signature move and a non-negotiable: **never trust a builder's self-report; re-run the load-bearing checks yourself, every ship.**

- **Line-endings especially:** builders repeatedly mis-state them. Verify the convention yourself, every file.
- **Frozen-function checks:** a windowed text search false-alarms on moved or minified functions; use the line-range method.
- **Drift false-alarms:** a drift check that diffs a stale backup fails on prior-shipped work; re-verify against the actual shipped package, not a backup copy.
- **Near-miss integrity:** if a builder reports a self-caught corruption, re-check integrity (definition counts, syntax check, sort-diff) before trusting it.

---

## When an agent degrades: falsify the wrapper before blaming the model

When a sub-agent's output quality drops ("the builder is getting worse," tools look flaky, a fresh context behaves worse than the playground, a post-compaction session feels off), walk the layers most likely to bite:

- **System prompt**: conflicting or bloated instructions (an ever-growing prohibition list degrades the agent; this is why the lessons base gets a garbage-collection pass, see [[ceremonies/gatekeeper-ceremony|gatekeeper-ceremony]]).
- **Session history / memory**: stale context injected after a compaction; old topics leaking into a new dispatch.
- **Tool discipline**: "must use tool X" lives only in prose and is not enforced in code, so the agent skips it or hallucinates the call. Code-gate the requirement.
- **Hidden repair loops**: a silent second pass mutating the output.
- **Rendering / transport**: the answer is right internally but mangled on delivery.

The quick questions: can the agent skip a required tool and still answer? does old-conversation content appear in a new dispatch? is the same fact in the prompt AND memory AND history? does a second pass run before delivery? **A yes points at the layer.** Fix code-first, not prompt-first.

*Adapted from ECC `agent-architecture-audit`.*

---

## Roster hygiene

The agent roster (red lenses, recon, specialists) rots the same way a lessons base does: overlap, dead agents, and silent gaps accumulate. At each deep audit, review the roster:
- **Overlap:** two agents claiming the same responsibility, so merge or scope them apart.
- **Dead:** an agent nothing dispatches anymore, so archive it with a reason.
- **Gap:** a recurring card pattern with no named agent, so promote it into one.

---

## Task granularity

Each card is one **independently-verifiable change with a single dominant risk and a clear done condition.** Keep tests with the implementation in the same card; never split "implement X" from "test X." Minimize cross-card file overlap to keep merges cheap.

---

## The golden rules (never violated)

1. Builders **stage only**; the orchestrator owns ship.
2. The orchestrator **independently verifies** every build before ship; builders mis-report and tools false-alarm.
3. Safety-critical cores stay **byte-frozen** and are proven frozen on every single ship.
4. **One ship at a time.** Parallelize builders only on disjoint file-sets; serialize anything touching the shared deploy file.
5. **Nothing irreversible on the owner's behalf**: genuine money, auth, or product forks are built-but-flagged, never guessed.
6. **Panels are real fresh-context sub-agents**: never N personas in one head; fed spec or diff only; the reviewer never wrote the code.
7. **Hard repo separation**: the fence is in every dispatch.
8. **Reach a clean stopping point**: nothing half-done across a stop; hand off.
9. **One integrator merges.** A failed merge evicts with full context, never a blind retry.
10. **Route the model to the task.** A Critical-lane reviewer is never weaker than the builder it checks.
11. **Every dispatch is a checklist**: fence + vault contract + classifier line + conventions/exemplar + acceptance criteria + scope boundaries + retry-with-context.
12. **Falsify the wrapper before blaming the model.** When an agent degrades, run the diagnostic and fix code-first.
13. **Verify in parallel.** The independent verify checks dispatch in one batch at stage-complete, never serialized.

---
*Multi-Agent Contract: the org chart and agent-ops layer of Orchestration OS. Pairs with [[ceremonies/build-ceremony|build-ceremony]]. Living document: the retro flywheel amends it. Adapted from ECC (MIT, Affaan Mustafa), Anthropic Claude Code, and Cognition multi-agent research.*

*Created by Alex Villarroel · part of Orchestration OS.*
