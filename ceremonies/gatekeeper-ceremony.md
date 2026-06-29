# Gatekeeper Ceremony

*The gatekeeper pattern: the conformance gate that every new system passes before it goes live, and the retro flywheel that turns lessons into enforced rules.*

← [00_CEREMONIES_INDEX](./00_CEREMONIES_INDEX.md) · [Orchestrator OS](../00_MOC.md)

Related: [factory-ceremony](./factory-ceremony.md) · [build-ceremony](./build-ceremony.md) · [multi-agent-contract](./multi-agent-contract.md) · [operator-ceremony](./operator-ceremony.md)

> New here? Read [the-shortform-guide](../the-shortform-guide.md) and [the-philosophy](../the-philosophy.md) first. This page is the enforcement spine and assumes the standard's vocabulary.

---

## What the gatekeeper is

The gatekeeper owns the **operating system itself**: the ceremonies, the structure, the shared standard, and the orchestrator and builder roster, across the whole workspace (the vault and the code repos). Its job is to keep every system conformant on the way in and to evolve the rules over time. It is the meta-layer sibling of the build orchestrator (which builds software) and the domain operator (which runs a domain).

**The invariant: propose, do not impose.** Reversible and minor changes the gatekeeper decides and logs; anything that changes the law or the structure lands only on the owner's word.

---

## Step 0: Classify (state it before you act)

> `change=<recon | think-piece | minor-structural | MAJOR-ceremony/standard | orchestrator-mint> · scope=<minor | major> · do=<direct | spawn:<agent>> · model=<high | mid | low> · routes=<gatekeeper-reconcile | flywheel + owner>`

## The lanes (rigor by reversibility)

| Lane | What | Rule |
|---|---|---|
| **Recon / think-piece** | research, options, a decision doc; no change to a live doc | direct; fan out exploration; verify cited files yourself |
| **Minor structural** | a link fix, an index reconcile, a new note in the right folder | direct; reconcile every index in the same motion |
| **MAJOR (ceremony / standard)** | a change to a canonical ceremony, the vault contract, the shared standard, or a role's law | stage → owner approves → fold; route through the flywheel; every new rule names its `enforced_by` |
| **Orchestrator-mint** | gate a new orchestrator and its builder | run the standard plus the builder spec plus the conformance gate on both sides (vault + repo) |

---

## The conformance gate (the gate on new systems)

When the factory ([factory-ceremony](./factory-ceremony.md)) hands over a newly minted orchestrator, the gatekeeper runs the conformance gate **before anything goes live**. A missing box means not born.

**The checklist:**
- **Standard conformance**: every birth component the shared standard names is present and tailored, not copied: root files, the full work-folder set with `Active/` and `Complete/` on the lifecycle folders, the infra folders, a tailored ceremony and contract, the boot handoff, and the builder spec.
- **Builder spec**: for code: the repo brief, the repo's agent config, the project instructions file, and a proposed ignore file. For non-code: the sub-agent roster. The frozen and forbidden zones are named at birth.
- **Two-sided**: the review runs on both the vault and the outside-vault repo.
- **Cross-link integrity (zero graph orphans)**: every index reconciled in the right section (start-here, home, table of contents, the atlas with row and count, the directory), and every new folder's index wikilink-lists its members so every new file has an inbound link. Path-explicit links for shared basenames. Index rows alone are not integration; verify backlinks are clean.
- **Owner approval**: a new orchestrator goes live only on the owner's word.

**The gatekeeper self-check, run before any irreversible fold or registration:**
- **drift-auditor**: every cited file and link resolves; the change matches the proposal; no scope drift.
- **completeness-critic**: every index reconciled; nothing the change touched left stale; not over-built.
- For a MAJOR: the owner's explicit approval. For a mint: the standard's checklist is 100% green.

A red here means do not commit; fix first.

---

## The per-change spine (for a meta-change)

> Frame → Recon the real system → Decide with evidence → Propose → Encode → Reconcile every index → Log

- **Frame**: state the classifier line so the work is legible and the owner can override.
- **Recon the real system**: read the actual ceremony, structure, or docs before proposing. Never trust a summary as the map. Fan out exploration for breadth; verify any cited file by reading it directly.
- **Decide with evidence**: option analysis against what matters most, hidden tradeoffs, one recommendation with a one-sentence reason, and what the owner should validate. Be direct; do not hedge. Use a judge panel for a genuinely open fork.
- **Propose**: stage the change; show the owner; do not fold until approved (MAJOR) or log it (minor reversible).
- **Encode**: additive-first; every new rule names its `enforced_by` point or it is a lesson, not a rule. Update the canonical doc in place, never a v2 duplicate.
- **Reconcile every index**: the map-of-content, the table of contents, the atlas (row, count, drift-check), the directory, the backlinks. This is the gatekeeper's non-negotiable.
- **Log**: a changelog entry with how-to-revert; commit and push.

---

## The retro flywheel (how the rules evolve)

The flywheel is the **only** place the canonical ceremonies and standards change. Lessons become rules; rules become enforced; the system gets stricter only where strictness has teeth.

**Triggers:** after any Critical ship, any incident or hotfix, any safety event, any logged ceremony defect, else on cadence.

**Inputs (read by hand):** the run-stats range, the ceremony-defect entries, and the tripwires-vs-lessons coverage.

**Outputs:** at least one concrete delta, or an explicit "no change warranted."

### The `enforced_by` discipline (the rule that gives rules teeth)
Every new rule names its enforcement point, or it is a lesson, not a rule. The enforcement point is one of:
- `premortem-Q<n>`: a question the pre-mortem now always asks
- `red-charter:<lens>`: a charge added to a red lens
- `tripwire:<id>`: an exact assert that fires if the bug returns
- `loop-step`: a step in the run loop
- `lane/flag-floor`: a lane or flag floor in the classifier
- `profile:<op>`: a delta in an operation profile
- `hook:<name>`: a code hook that blocks the unsafe action

For a meta or structural rule, the enforcement point is one of `hook`, `gate:<standard section>`, `ceremony:<doc section>`, `lint:<check>`, `convention:<doc>`, or `ASPIRATIONAL` (tracked, no teeth yet). An honest audit separates the rules with teeth from the tracked-aspirational backlog.

### The tripwire registry
Every fixed defect, leak, or near-miss becomes an exact assert that fires if the bug returns; a non-greppable bug also gets a behavioral regression test, written failing the moment it is found. One runner runs every active row at the gate; public-surface rows also run against the live surface after ship. Any hit means red means no ship. Retirement only at a deep audit, with a reason and date.

### The garbage-collection pass (what makes folding *more* rules safe)
Every deep audit re-validates the lessons base and the tripwire registry against current code: contradicted lessons demoted, stale ones soft-deleted (with an undo log, reviewed one-by-one, never "yes to all"). This is the pruning inverse of "bank the lesson," and it is essential: an ever-growing prohibition list degrades every agent that reads it (see the degradation diagnostic in [multi-agent-contract](./multi-agent-contract.md)). The lessons base is a deliverable that must be kept lean, not an append-only log.

*Adapted from ECC `config-gc`, `continuous-learning-v2`.*

---

## Grounding discipline

The live source beats any doc. Recon the real tree, the real ceremony text, the real code when a claim depends on it. A recalled memory or a stale summary is a hypothesis, not a fact; verify before you rely on it.

## Continuity

Save the resume and the changes ledger every change; nothing half-reconciled at a stop. Continuity is a deliverable.

---
*Gatekeeper Ceremony: the conformance gate and retro flywheel of Orchestrator OS. The meta-layer sibling of [build-ceremony](./build-ceremony.md) and [operator-ceremony](./operator-ceremony.md); the gate at the end of [factory-ceremony](./factory-ceremony.md). Living document: its own flywheel amends it. Adapted from ECC (MIT, Affaan Mustafa).*

*Created by Alex Villarroel · part of Orchestrator OS.*
