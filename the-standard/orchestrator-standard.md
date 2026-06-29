# Orchestrator Standard - the mold every orchestrator is minted from

*The canonical definition of what an orchestrator IS and what one needs to be born complete. The template the **Designer** (factory) mints from, and the standard the **Gatekeeper** enforces (mandating BOTH the knowledge base AND the outside code repos - see §3.5 + §6).*

← [00_STANDARD_INDEX](./00_STANDARD_INDEX.md) · [Orchestrator OS](../00_MOC.md)

> New here? This is the spec, not the intro. Read [the-shortform-guide](../the-shortform-guide.md) and [the-philosophy](../the-philosophy.md) first. This page assumes the orchestrator-and-builder model and the vocabulary those guides define.

---

## 1 · What an orchestrator IS (the invariant)

A **persistent point-man for a domain** that **directs disposable sub-agents** and never does the leaf work itself. It: classifies the request, dispatches the right sub-agent with a tight brief, independently verifies the result, and synthesizes for the human.

**Fan out for intelligence; keep writes single-threaded** (one integrator). The shape is constant; only the domain changes:

| Orchestrator | Domain | Ceremony + Contract |
|---|---|---|
| **Build orchestrator** | shipping software | its Master Ceremony + Multi-Agent Contract |
| **Operations orchestrator** | running the business / org | its Master Ceremony + Multi-Agent Contract |
| **Meta orchestrator** | the operating system itself | its Master Ceremony + Multi-Agent Contract |
| **Designer (the factory)** | minting new orchestrators from ideas | its Master Ceremony + Multi-Agent Contract |
| *(future)* | whatever an idea hatches - an app, a brand, a product | minted by the Designer per this standard |

**Every orchestrator has at least one BUILDER** - its doer tier, the disposable sub-agents or roles it dispatches to actually produce the work. A code orchestrator's builders are real roles spanning a knowledge brief plus a code repo. A non-code orchestrator's builders are its sub-agent roster. A new code/product orchestrator is minted WITH its builder (§3.5).

---

## 2 · Required birth components (the checklist - none optional)

A new orchestrator is NOT complete until every box is filled:

- [ ] **Folder** `<Name>/` at the root, with the **FULL standard structure (§3)** - every work folder + the `Active/`+`Complete/` lifecycle subfolders (§3a) + all five infra folders `commands/ · agents/ · hooks/ · setups/ · secrets-rotation/` (§3.6, own-slice + pointer to canonical).
- [ ] **`Operating System.md`** - an in-folder pointer to its ceremony + contract + library (one click).
- [ ] **`RESUME_PROMPT.md`** - who it is, the orient walk, its loop, standing rules, live state. It points DIRECTLY at its ceremony + contract (the `[[<X> Master Ceremony]] + [[<X> Multi-Agent Contract]]` wikilinks, read in full on boot), in addition to the one-click Operating System pointer. The canonical docs live in the central `ceremonies/` area; the resume + Operating System reach them as pointers, never copies.
- [ ] **`MEMORY.md`** - the orchestrator's own **role-specific memory** (battle-scars · role facts · learnings); the §10 flywheel writes new role memories here. Global / cross-cutting memory stays in the shared memory brain; the resume points at both.
- [ ] **A tailored Master Ceremony** (the per-task operating spine) - canonical in the central `ceremonies/` area. "Master Ceremony" names whichever of the four shipped ceremonies fits the domain (build-ceremony for shipping code, operator-ceremony for an ongoing domain, factory-ceremony for minting, gatekeeper-ceremony for enforcement), tailored to the role.
- [ ] **A tailored Multi-Agent Contract** (roster · dispatch · guardrails) - canonical in the central `ceremonies/` area.
- [ ] **A FULL prompt pack** in `<Name>/commands/<Name> Prompts.md` (§3.6; indexed cross-orchestrator in the central prompts index) - NOT a thin starter: the RESUME/boot prompt **+ the role's complete situational set** (code orchestrators: fix-it · wave-run · stage-it · ship-it · incident · retro · builder-dispatch · builder-boot + any gate; non-code: the role's full task set). REQUIRED for every orchestrator. Generate it via the sandbox (the role writes its own, tailored) and re-run to validate.
- [ ] **A boot handoff** in the central `handoffs/<Name> Handoff.md` - the one-time first-run explainer + boot brief. (Distinct from the in-folder `HANDOFFS/` session briefs in §3: the boot handoff lives centrally and is read once at first wake; `HANDOFFS/` holds the recurring session-to-session briefs.)
- [ ] **At least one BUILDER wired to it** (its doer tier), set up immediately with the agents it needs (more addable). For a code/artifact orchestrator this is a real builder spanning the knowledge base + a code repo (§3.5).
- [ ] **Registration in EVERY index your system keeps** - your map / MOC, the relevant area index, and whatever top-level entry points your tree uses (a start-here or role table, a table of contents, a filesystem-true atlas with a drift-check + count, a directory). Map these names to your own set; the rule is that no index which should list it is left stale.
- [ ] **Full cross-link integration (not just index rows)** - every new doc reachable from its MOC + **two-way** references to its relatives (orchestrator-roster siblings · the Designer that minted it + this standard · any superseded/related existing doc + its planner memory), placed in the RIGHT section of each index, no orphans. See the pattern below; verify with backlinks.
- [ ] **A changelog entry** (revert-ready) recording the creation + commit hash.

### The cross-link pattern (what "fully integrated" means - run this every mint; the Gatekeeper verifies it)

A new orchestrator/system is *integrated*, not just *listed*, when:

1. **Index rows land in the RIGHT section** (not dumped at the bottom): the matching section of your map / MOC and of each index your tree keeps (a table of contents, an atlas row with a drift-check + count, a start-here or role table, a directory, where you have them). Map these to whatever index set your own system uses.
2. **Two-way sibling links** - it links to the other orchestrators, and the roster references it back.
3. **Provenance links** - it links to the Designer (minted-by) + this standard (built-to); the Designer's MOC names it as a mint.
4. **Relative links** - any pre-existing doc the idea touches (an old product MOC, a prior note) points to the new system AND the new system points back; the planner memory flags it.
5. **No orphans / no dangling (ZERO graph islands)** - every new doc has at least one **inbound wikilink** (its folder index/MOC lists it); backlinks on the new docs are clean. Use **path-explicit links for shared basenames**, and note a query-driven list/table aggregates but makes **no graph edge** (it does not satisfy this). The gate rejects any new file that is degree-0 in the graph.

---

## 3 · The folder structure standard (every orchestrator, the FULL set)

Every orchestrator's folder carries the **full set** below - this is the floor, not "only when volume warrants." Mature, differently-shaped folders are **grandfathered + MAPPED, never broken** (a legacy `roles/`+`specialists/` maps to `agents/`; a legacy `knowledge/` maps to `REFERENCE/`; legacy task launchers sit under the `commands/` concept alongside the new boot pack - both are its commands; reconcile over time, do not break live launchers).

```
<Name>/
  Operating System.md          # in-folder pointer to ceremony + contract + library
  RESUME_PROMPT.md             # boot + live state  (heavy domains may use RESUMES/RESUME_PROMPT.md)
  <Name> MOC.md                # the hub
  MEMORY.md                    # the orchestrator's own role memory
  REFERENCE/                   # durable methods (roster, dispatch, escalations) + standards it owns
  MISSIONS/       [Active/ Complete/]   # large multi-phase initiatives
  PLANS/          [Active/ Complete/]   # strategy / roadmaps (pre-approval)
  DESIGNS/        [Active/ Complete/]   # single-issue design decisions
  DIRECTIVES/     [Active/ Complete/]   # dispatchable work orders (builders start here)
  Daily Contract/ [Active/ Complete/]   # the day's operating terms
  STATUS/                      # live trackers + run logs (flat)
  REPORTS/                     # ledgers / gap maps / test maps (flat)
  HANDOFFS/                    # session-to-session briefs (flat)
  CEREMONIES/                  # in-folder pointers to its ceremony + contract (canonical centrally)
  Changes/                     # its change ledger, or a pointer to the central change log
  Archives/                    # superseded docs (cold; date-prefixed)
  commands/                    # §3.6 - its command / prompt library (the prompt pack lives here)
  agents/                      # §3.6 - its agent roster (pointer for code orchestrators)
  hooks/                       # §3.6 - its hooks (pointer for code orchestrators)
  setups/                      # §3.6 - its stack setup / onboarding docs (index + pointers)
  secrets-rotation/            # §3.6 - its secret inventory + rotation schedule (NEVER values)
```

### 3a · `Active/` + `Complete/` on the lifecycle folders

The five folders whose items move in-flight -> done carry `Active/` + `Complete/`: **Daily Contract · DIRECTIVES · MISSIONS · DESIGNS · PLANS**. An item moves **Active -> Complete the moment it ships / closes**; Complete is point-in-time history, never edited retroactively. Wikilinks survive the move (basename resolution). **Flat (no Active/Complete):** REFERENCE · STATUS · REPORTS · HANDOFFS · Archives + the five infra folders. *enforced_by: convention + the §6 gate (a structure-lint hook is aspirational, not shipped here).*

### 3.6 · The five infra folders (own-slice + pointer to canonical)

Every orchestrator carries all five; each holds the orchestrator's OWN slice + a **pointer to the canonical central source** (no content duplication):

- **commands/** - the orchestrator's command / prompt library. The paste-ready pack lives here as `<Name>/commands/<Name> Prompts.md`; the central prompts area is the cross-orchestrator index.
- **agents/** - its agent roster. The `00_AGENTS_INDEX` references **TWO separate, both-important libraries**: (1) your own canonical **[Agents](../agents/00_AGENTS_INDEX.md)** library (categorized: red-team lenses, reviewers, security, recon/design, retro + the growing domain categories) - **every orchestrator points to it; everyone has access** (spawn by type via the Agent tool); and (2) an **external reference library** you mine + adapt, never blind-copy. **Link your own library PATH-EXPLICIT (`[[Agents/00_AGENTS_INDEX|Agents]]`) - a bare `[[Agents]]` mis-resolves to the external library's index.** CODE orchestrators ALSO carry execution copies in the repo `.claude/agents/` (where they run). NON-code orchestrators' own domain roles live in-folder. Product-specific agents stay with their orchestrator; never duplicate the shared panel.
- **hooks/** - CODE orchestrator: a pointer-index to the repo `.claude/hooks/` (canonical). NON-code: the hook catalog, or an explicit "n/a (no repo); user-level hooks noted."
- **setups/** - the setup / onboarding docs for that orchestrator's stack: an index pointing to the relevant central handoff docs (hosting · CLI tooling · source control · etc.).
- **secrets-rotation/** - that orchestrator's secret **inventory** (which secrets · which sinks) + a **rotation SCHEDULE / cadence** + pointers to the canonical secrets map + rotation runbook + the secret manager (values). **NEVER a secret value in the knowledge base.** *enforced_by: the §6 gate (a secret-scan hook is aspirational, not shipped here).*

**Naming + casing** follow the project naming conventions (Title-Case domain folders · lowercase role/data + infra subfolders · `00_<NAME>_INDEX.md` in-folder indexes · path-explicit links for shared basenames). New mints conform; legacy is grandfathered + mapped.

---

## 3.5 · The BUILDER standard (dual-location - inside AND outside the knowledge base)

A builder is the orchestrator's **doer** - what it dispatches to actually produce the work. For a CODE / artifact orchestrator the builder is a real role that lives in **two places**, so minting it requires additions in BOTH (this is why the Gatekeeper guards Work, not just the knowledge base):

- **Knowledge-side (the brief + knowledge):** `<Builder>/` area - MOC · RESUME · SPEC/FEATURE docs · the builder's brief (its system prompt). This is what the builder READS.
- **Outside (where it WORKS):** the code repo under `<your-app-repo>/` - the source + `.claude/` (settings.json hooks · `agents/` · worktrees). This is where it builds, STAGES, and is independently verified.
- **Reference shape:** one app builder (knowledge brief + app repo) and one service/API builder (knowledge brief + service repo), each wired to the same orchestrator.
- **Non-code orchestrators:** the "builder" tier is just the sub-agent roster (the operations orchestrator's role sub-agents; the meta orchestrator's Explore/Plan/judge roster) - knowledge-side only, no repo.
- **Set up one builder per orchestrator immediately** with the agents it needs; add more as the domain grows. **The Gatekeeper mandates BOTH sides** - a code builder is not complete until its knowledge brief AND its repo `.claude/` config both exist + are registered.

---

## 4 · The ceremony + contract pattern (invariants vs tailored)

Every orchestrator's pair shares the same SKELETON; only the domain content changes.

**Master Ceremony (the operating spine) - invariant sections:**

- **§0 a CLASSIFIER stated before acting** - `task=<type> · lane/profile=<…> · do=<direct | spawn:<role>> · model=<frontier|mid|small> · consults=<…>`.
- **Lanes / profiles** that set the RIGOR (cheap/reversible vs high-stakes/irreversible).
- **A per-task SPINE** (intake -> ground -> do/dispatch -> verify -> the gate -> close).
- **Grounding discipline** - recon the real system; the live source beats any doc.
- **A safety/verify GATE before the irreversible action** (deploy · money-commit · structural-fold · external send · any `<safety-critical-action>`).
- **Continuity** - save state every batch; nothing half-done at a stop.
- **The flywheel** - how the ceremony improves itself (the retro loop).

**Multi-Agent Contract (the structure) - invariant sections:**

- **The roles** - the orchestrator + its sub-agents / lenses / specialists.
- **The bridge model** - orchestrator directs disposable sub-agents; never solo-commits the irreversible.
- **Dispatch standard + return schema** - every brief carries scope + fence + acceptance + conventions.
- **Decision protocol** - decide vs flag the human (reversible-default vs genuine fork).
- **Model routing** - which tier per role/task.
- **Guardrails / golden rules** - the never-X list for the domain.
- **Roster hygiene + continuity.**

**Tailored per domain:** the lanes/roles, the frozen/forbidden zone, the specific irreversible action the gate protects, the model map, the specialists.

---

## 5 · How a new orchestrator is minted (the factory algorithm; the gatekeeper's gate)

1. **Frame the idea** - domain, the irreversible action that needs a gate, the sub-roles, the frozen/forbidden zone.
2. **Mint from the mold** - generate the folder (§3) + the tailored ceremony + contract (§4) + the prompt pack + the boot handoff.
3. **Register** - fill every index (§2 checklist).
4. **Conformance gate** - the Gatekeeper verifies the §2 checklist is 100% green and the pair matches the §4 pattern before the new orchestrator is "live." A missing box = not born yet.
5. **Log** - a changelog entry, revert-ready.

---

## 6 · Gatekeeper enforcement

The Gatekeeper owns this standard. `Work/` is the workspace above the knowledge base - it holds the knowledge base, the code repos, and the builder configs. The Gatekeeper **mandates both sides**: the knowledge-side structure AND the outside repos + builder `.claude/` configs. Any new orchestrator + builder (minted by the Designer or by hand) passes:

- the §2 checklist,
- the §3.5 builder check (both locations exist + registered),
- the §4 pattern review,
- the **§2 cross-link integrity check** (backlinks clean, two-way links + right-section placement),
- the **§3 layout** (full work set + §3a Active/Complete on the lifecycle folders + the §3.6 five infra folders) + naming convention (casing · `00_` indexes · path-explicit shared basenames; secrets-rotation holds NO values),

 - on BOTH sides - before it is registered as live.

Changes to THIS standard route through the Gatekeeper's flywheel. **The §1 roster is the Gatekeeper's to update at the gate** - the Designer PROPOSES a row, the Gatekeeper folds it (the Designer does not edit this file itself).

---

## 7 · The two-library agent rule

Every orchestrator works against **two distinct agent libraries**, and they are not interchangeable:

1. **Your own library** - the canonical, categorized roster you build and govern (`[[Agents/00_AGENTS_INDEX|Agents]]`). Every orchestrator points to it; everyone can spawn from it by type. This is the source of truth for the agents you run.
2. **An external reference library** - a third-party or upstream collection you **mine and adapt** for patterns, never blind-copy into your own tree.

**Always link your own library PATH-EXPLICIT** (`[[Agents/00_AGENTS_INDEX|Agents]]`). A bare `[[Agents]]` mis-resolves to the external library's index when the two share a basename. Borrowed patterns carry an attribution line (`*Adapted from ...*`) and are localized to your conventions before they enter your library.

---

*Borrowed structural patterns in this standard are adapted from established multi-agent and orchestration practice (ECC MIT / Anthropic / Cognition) and generalized here for any domain.*

*Created by Alex Villarroel · part of Orchestrator OS.*
