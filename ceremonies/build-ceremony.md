# Build Ceremony

*The per-change operating spine: how one change goes from idea to verified, shipped artifact safely, every time.*

← [[ceremonies/00_CEREMONIES_INDEX|00_CEREMONIES_INDEX]] · [[00_MOC|Orchestration OS]]

Related: [[ceremonies/multi-agent-contract|multi-agent-contract]] · [[ceremonies/gatekeeper-ceremony|gatekeeper-ceremony]] · [[ceremonies/factory-ceremony|factory-ceremony]] · [[ceremonies/operator-ceremony|operator-ceremony]]

---

## The spine

> Classify → Recon → Spec + pre-mortem → Design panel → Red panel → Build → Verify → Gate → Ship → Retro

One change runs these phases in order. The classifier picks which early phases compress and what the first move is; the risk lane picks how hard the back half bites. **One spine, many entry shapes.**

## Three laws that never bend

1. **Never ship RED.** Green only, verified against the real served artifact. Never call anything "shipped" or "live" that is not confirmed live.
2. **Scale to a fact, both ways.** Rigor is a function of what the change actually touches, never of how the request was phrased. A full panel on a no-op is waste; silently down-scaling a safety-critical change is worse.
3. **A check a script can run is never delegated to a panel.** Scripts catch the deterministic class (build markers, byte-exactness, scope diff); panels find what scripts cannot (a leaked field, a fail-open flip).

---

## Step 0: Classify (state it before you act)

Before anything, write one line so the work is legible to any session and the owner can override it:

> `operation=<type> · size=<tier> · lane=<D/F/S/C> (touches: <fact>) · phases=<the mask> · skipped=<named>`

**Operation type** (pick one, by intent):

| Type | Trigger | First move |
|---|---|---|
| **FIX** | broken; behavior is wrong | reproduce as a failing test (red for the right reason) before any fix |
| **FEATURE** | a capability that does not exist yet | acceptance brief + research-and-reuse, then design |
| **CHANGE** | works, but the desired behavior differs | amend the behavior and its tests together |
| **REFACTOR** | behavior held, structure improves | capture current behavior as characterization tests, then restructure green |
| **INCIDENT** | live breakage | stabilize and reproduce; compressed timeline, no safety phase dropped |

**Size tier** (take the highest any signal reaches):

| Tier | Files | New contract / dependency | Ambiguity |
|---|---|---|---|
| trivial | 1, a few lines | none | none, the change is obvious |
| small | 1 file / 1 function | none | clear once you read the code |
| standard | 2 to 5 files | maybe a new internal module | one real choice to make |
| large | many / cross-cutting | new external dep or public API | multiple open questions |

**The override (non-negotiable):** anything touching a safety-critical key (money, auth, merge or shared-state, public surface, schema, single-writer resource) or a migration or deletion is **at least Standard, Critical by floor**, regardless of operation type or file count. Doubt goes to the higher lane, recorded with the fact that locked it.

*Adapted from ECC (Everything Claude Code, MIT, Affaan Mustafa) `orch-pipeline` and `intent-driven-development`.*

---

## The risk lanes (set by what the change touches, not by prose)

| Lane | Qualifies | Rigor |
|---|---|---|
| **D: Docs/Drafts** | no app code (planning, handoff, a draft `.md`) | inline author + one judge |
| **F: Fast** | code; one module; no risk flag; small diff | inline recon, test-first, back panel only |
| **S: Standard** | multi-module / new entity / shared state; no critical flag | recon lenses + front and back panels |
| **C: Critical** | ANY of {money, auth, merge/concurrency, public, schema, single-writer-write}; or migration / deletion | full ceremony, both panels, two security lenses |

> **Floors:** money, auth, merge, public, schema are always Critical. Doubt goes to the higher lane, and you record why.

---

## Phase 1: Recon (map the real bytes)

Read the actual code before designing anything: the data model, the exact frozen helpers, the call graph, the reference exemplar to mirror, and the line-ending convention of every file you will touch. Run the **keys-touched probe**: search the target for every state or storage key and every endpoint it reads or writes, and set the risk flags from what you find, not what the request claims.

For FEATURE and large work, add a **research-and-reuse** check: before writing net-new, look explicitly for a proven implementation or an in-repo exemplar to adopt, and record the decision. Adopt over invent.

Produce build-ready anchors, a per-file line-ending note, a keys-touched manifest, and the exemplar. Never trust a stale ship log as the map.

**Gate:** every touched stored or merge key has its merge branch identified (or is explicitly flagged missing). Anchors are real. Unconverged after two passes means stop and ask.

*Adapted from ECC `orch-pipeline` Phase 1.*

## Phase 2: Spec + pre-mortem (freeze the testable contract, then break it on paper)

Write the contract the validators will judge against: **acceptance criteria as observable assertions** plus invariants, out-of-scope, definition-of-done, rollback, and observability. For FEATURE and any risky work, write the acceptance brief first (a short list for clear work, a full brief for security, data, migration, or cross-system work). Separate **discovered facts** (read from code) from **business constraints** (only the owner or a product artifact supplies these, never inferred from code).

On any money or other safety-critical flag, fill the relevant **worksheet before any design exists**: the identity or dedupe key, the empty-input fallback, the id-generation source (never `max(id)+1`), the status lifecycle enumerated, the fail-mode table (a fail-open to fail-closed flip is a blocker), and which single engine owns this value.

Then run the **pre-mortem**: assume the change shipped and broke, and write the most likely post-incident report so each hazard becomes an invariant or a test before any code exists.

**Gate:** at least one executable criterion per non-trivial behavior; out-of-scope non-empty; rollback present; every worksheet answer evidence-anchored.

*Adapted from ECC `intent-driven-development`.*

## Phase 3: Design panel (imitate by default, contest only when open)

Default is **imitate**: if the recon exemplar dictates the shape, clone it and label only the deltas. **Contest** the design only when the shape is genuinely open (two or more plausible architectures with different blast radius): dispatch two or three biased designers, anonymize their proposals (A/B/C), and have a judge pick a winner plus grafts.

For a genuinely open strategic fork *before* concrete proposals exist, you may convene a **council**: independent voices each given only the question, never each other's transcript (anti-anchoring), to surface the tradeoff. The council is pre-design deliberation; the contest is the post-proposal compare. Do not run a contest on a question recon could have answered.

**Gate:** the design covers 100% of the spec's criteria; rollback and observability non-empty.

*Adapted from ECC `council`; Cognition multi-agent research (anti-anchoring on shared context).*

## Phase 4: Red panel (refute the plan before it is built)

Dispatch the **red lenses for this change's risk class** as real fresh-context sub-agents told to refute, not review, fed the spec and design only, never the implementer's reasoning. The cheapest place to catch a bug is before it is written.

| Risk in the change | Lens | What it attacks |
|---|---|---|
| money / billing / totals | red-money | double-count, recompute, reconciliation divergence |
| auth / endpoint / role / secret | red-auth | boundary holes, privilege escalation, secret source to sink leak |
| migration / importer / new state key | red-migration | stored-shape change, missing merge branch, orphaned keys |
| merge / shared state / multi-writer | red-concurrency | lost update, delete-resurrection, empty-wipe, tombstone gaps |
| mixed-version deploy (artifacts ship one at a time) | red-version | old-client / new-server window |
| portal / export / customer-facing / public | red-surface | data leakage, injection, PII in output |
| empty / first-run / missing-data | red-edge | empty-state, no-feedback, first-run breakage |
| any | red-correctness | spec-vs-impl gaps, null/boundary, error paths |

**The evidence rule:** a finding ships only with (exact anchor + a concrete counterexample + why current guards miss it). A clean lens is a valid result. Never manufacture findings to justify the invocation.

**Gate:** confirmed objections resolved (a finding is confirmed when half the skeptics independently raise the same violated invariant with an anchor, or one irrefutable counterexample exists). Loop back to design at most twice, else stop. Lane F skips the front panel: there, the plan is the diff, so the panel runs at the back.

*Adapted from ECC `agent-evaluator`, `code-reviewer` (evidence rule).*

## Phase 5: Build (test-first, single-writer, proven)

Write the behavioral assertions from the spec **before** the change; watch them go red for the right reason, then green. Build in the in-lane files only. Reuse existing save and compute functions: author no new safety-critical math; it flows through the frozen engine. Escape every free-text interpolation. Make backup-first, count-asserted edits. On any failure: restore, re-recon, re-author. Never patch the patch.

**Gate:** the suite is green for the right reasons; any change to shared state or a handler has at least one assertion exercising the integrated wiring (a logic change that is never wired is a silent no-op).

## Phase 6: Verify (prove it, independently, against the running thing)

This is the second mind. A **different mind than the builder** re-runs the load-bearing checks itself, never trusting the self-report:

- **Frozen-proof:** the untouchable cores (see [[ceremonies/gatekeeper-ceremony|gatekeeper-ceremony]] on freeze discipline) are byte-identical to the prior shipped artifact. For a frozen function inside a changed file, confirm its line range falls outside the changed ranges (a windowed text search false-alarms on moved neighbors).
- **Drift-check:** only the intended files differ and exactly the intended new keys appeared; the diff matches the design, no scope creep.
- **Behavioral verify:** for any UI or public-surface change, drive the served artifact and confirm the visible outcome actually happens, console clean.
- **Byte-exactness:** the line-ending convention of each touched file is preserved (verify it yourself; builders mis-report this constantly), and a syntax check passes on each edited file.

**Dispatch the verify checks in parallel.** The scripted checks and behavioral render and each risk-class red lens consume only the staged diff and share no dependency, so fire them in one batch at stage-complete, never serialized: faster wall-clock, and a concurrently-dispatched lens runs truly blind. A scripted red simply moots the lens (cheap).

**Gate:** all independent checks green. Any miss means re-brief with the specific fix; do not ship.

*Adapted from ECC `ai-regression-testing`, `click-path-audit`, `canary-watch`.*

## Phase 7: Gate (scripts before verdicts)

Run the deterministic gate on the staged artifact. **No panel verdict counts toward shipping until every scripted line is green:**

- **Artifact asserts:** the file whitelist, the entry-count baseline, this change's content markers, and every standing assert.
- **Cache-bust matrix:** client assets changed means bump the version string everywhere and assert the new version on every tag plus zero old-version strings remain; a server-only change asserts no bust (over-busting is drift too).
- **Tripwire runner:** every active tripwire row green against the staged artifact (see [[ceremonies/gatekeeper-ceremony|gatekeeper-ceremony]] on the retro flywheel; each fixed bug becomes an exact assert that fires if it returns).
- **Secret / PII / leak scan:** search the staged artifact for secret patterns, internal names, and dev artifacts.

A single critical-category failure (money, auth or leakage, delete-sticks, frozen-proof) blocks at 100%; non-critical at a warn threshold. Any red line means no ship.

**Gate:** every scripted line green; all panel verdicts ship; behavioral passed.

## Phase 8: Ship (the owner of deploy does this)

The single deploy-owner role ships: package by iterating the prior artifact's entry list and copying each file from disk (append any new file first), then deploy in the foreground. Deploy is owned by exactly one role, never a builder. A reproducible package plus a foreground deploy is the only way served bytes can be verified.

Then **post-verify served bytes:** hit the live surface, confirm health, confirm the new version on every tag, confirm the change's marker is present in the *served* bytes, and run the public-surface tripwire rows plus a PII scan against the live surface. "Shipped" means served-bytes verified, full stop.

Optionally **soak:** a timed re-check loop against a pre-deploy baseline (health, asset-count match, key-element presence, error rate, latency) to catch the passes-at-T+0 / fails-at-T+10 class.

**Gate:** served bytes show the change and no leak strings. Then update the trackers (resume, ship log, deploy log).

## Phase 9: Retro (bank the lesson)

After any Critical ship, any incident, or on cadence: turn misses into lessons, lessons into rules, rules into ceremony changes. Every fixed defect, leak, or near-miss adds a **tripwire row** (an exact assert that fires if the bug returns) and, where the bug is not greppable, a **behavioral regression test** written failing the moment it is found. Every new rule names its enforcement point or it is a lesson, not a rule. The full flywheel mechanics live in [[ceremonies/gatekeeper-ceremony|gatekeeper-ceremony]].

On a cadence, run a **whole-app deep audit** (security-exposure, reconciliation, public-surface, code-review sweep, drift). Per-change ceremonies see the diff; only the deep audit sees accumulated state.

---

## Quick checklist

- [ ] **Classify**: operation + size + lane locked to a fact; skipped phases named
- [ ] **Recon**: real anchors + per-file line-endings + exemplar; keys-touched probe; no stale map
- [ ] **Spec + pre-mortem**: criteria as assertions + rollback (+ worksheet if safety-critical); hazards mapped
- [ ] **Design panel**: imitate the exemplar; contest only if the shape is open
- [ ] **Red panel**: the matrix lenses for this risk class; evidence rule
- [ ] **Build test-first**: in-lane only; no new safety-critical math; escape all data
- [ ] **Verify**: frozen-proof + drift + behavioral + byte-exactness, a second mind, in parallel
- [ ] **Gate**: artifact / cache-bust / tripwire / leak, all green
- [ ] **Ship**: foreground, by the deploy owner; post-verify served bytes
- [ ] **Retro**: tripwire row on any fix; deep audit on cadence

---
*Build Ceremony: the per-change spine of Orchestration OS. Living document: the retro flywheel amends it. Adapted from ECC (MIT, Affaan Mustafa), Anthropic Claude Code subagent patterns, and Cognition multi-agent research.*

*Created by Alex Villarroel · part of Orchestration OS.*
