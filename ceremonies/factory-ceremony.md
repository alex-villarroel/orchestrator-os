# Factory Ceremony

*The factory pattern: how a raw idea becomes a new orchestrator, minted from one shared standard, then gated and handed off to run on its own.*

← [00_CEREMONIES_INDEX](./00_CEREMONIES_INDEX.md) · [Orchestrator OS](../00_MOC.md)

Related: [gatekeeper-ceremony](./gatekeeper-ceremony.md) · [multi-agent-contract](./multi-agent-contract.md) · [operator-ceremony](./operator-ceremony.md) · [build-ceremony](./build-ceremony.md)

---

## The factory's place in the system

**Every idea starts at the factory and works its way out.** The factory frames an idea and mints a tailor-made orchestration system for it (a folder, a ceremony, a contract, a prompt pack, a handoff, and a builder), using one shared **orchestrator standard** as the mold. The gatekeeper gates the result; the owner approves; then the new orchestrator runs independently.

> factory mints → gatekeeper gates → owner approves → the new orchestrator lives

This keeps every orchestrator in the system shaped the same way, so any session is legible and nothing drifts.

---

## Step 0: Classify (state it before you act)

> `idea=<app | brand | product | tool | service> · scope=<new-orchestrator | extend-existing> · do=spawn:<minting-role> · model=<high tier, design judgment> · gate=<gatekeeper conformance> + <owner>`

## The lanes

| Lane | What | Rule |
|---|---|---|
| **New idea → mint** | a genuinely new domain (an app, brand, product) | run the full mint spine plus the standard |
| **Extend existing** | the idea belongs to an orchestrator that already exists | route it to that orchestrator; do not mint a duplicate |
| **Not-yet-an-idea** | a vague spark | shape it with the owner first (intake); do not mint on a fog |

---

## The per-idea spine

> Capture → Frame → Mint from the standard → Register → Gate → Hand off

### 1. Capture
Write the intake brief: what the idea **is**, its domain, the **safety-critical action** that will need a gate (`<safety-critical-action>`), the **frozen or forbidden zone** (`<frozen-module>`), and the **builder(s)** it will need (code? a repo? which agents?). Separate the owner's product intent from inferred detail; never invent a constraint the owner has to set.

### 2. Frame the orchestrator
One page, shown to the owner: its domain, its lanes and profiles, its roles, its model routing, and its safety gate. Frame before you mint.

### 3. Mint from the standard (tailored, never copied)
Generate every birth component the standard names, tailored to the real idea, to the full structure (not a lean subset):
- **Root files:** the operating-system doc, a resume prompt, a map-of-content index, and a memory file.
- **Work folders:** reference, missions, plans, designs, directives, a daily contract, status, reports, handoffs, ceremonies, and archives, with `Active/` and `Complete/` on the lifecycle folders.
- **Infra folders:** `commands/` (the full prompt pack, not a thin stub), `agents/` (point at the relevant categories of the shared agent library path-explicit, and separately at any external reference library; the two are distinct libraries), `hooks/`, `setups/`, and a secrets-rotation inventory and schedule (**never values**).
- **A tailored ceremony ([build-ceremony](./build-ceremony.md) for code, [operator-ceremony](./operator-ceremony.md) for an ongoing domain) plus its [multi-agent-contract](./multi-agent-contract.md)** for the new orchestrator's domain.
- **A boot handoff** and **the builder** (for code: a repo brief plus the repo's agent config, a project instructions file, and a proposed ignore file; for non-code: the sub-agent roster).

Every folder gets a README or index. Name the frozen and forbidden zones **at birth**, before the builder writes a line.

### 4. Register and cross-link (two-way, zero graph orphans)
Fill every index in the right section (start-here, home, table of contents, the atlas with a row and a count, the directory) **and** make each new folder's index wikilink-**list** its members, so every new file has an inbound link. Use path-explicit links `[[Folder/Name|Name]]` for shared basenames (a bare `[[Name]]` resolves to only one same-named file; a query-generated list makes no graph edge). **Verify zero orphans before the gate.** Index rows alone are not integration. Do not edit the gatekeeper-owned standard; **propose** its roster row and let the gatekeeper fold it at the gate.

### 5. Gate
Hand to the gatekeeper for the conformance gate (the standard's checklist plus the builder spec plus the ceremony pattern, on both the vault and the repo side). Fix any red. Then the owner approves. Nothing goes live un-gated. (See [gatekeeper-ceremony](./gatekeeper-ceremony.md).)

### 6. Hand off
The new orchestrator takes its first directive from the owner; the factory steps back. Log it.

*Adapted from ECC `orch-pipeline`; the Anthropic Claude Code subagent and project-config model.*

---

## Where the factory stops (the hard line)

**The mint stops before the build.** The factory mints the orchestration **scaffolding and config**, then stops at the gatekeeper gate. Nothing is committed to the product's history or deployed before the owner's go.

- **The factory DOES:** all vault docs (ceremonies, contracts, briefs, map-of-content, resume prompts, prompt pack, handoff) plus the builder's repo agent config, project instructions file, and a proposed ignore file (the scaffolding files).
- **The factory DOES NOT** (these are the minted orchestrator's or builder's first acts, after go-live, on the owner's word): initialize version control or commit the product source, set a remote or push, deploy, or edit feature code. Trigger phrases that mean the **builder's** first act, not the factory's: "set up the repo," "init," "commit the starter," "push it."
- **The factory DOES NOT edit the gatekeeper-owned standard.** It registers in the vault indexes only and proposes the standard's roster row.
- **The last action is:** register the vault indexes, hand to the gatekeeper gate, owner approves. Then, and only then, the builder takes its first directive (which may be "initialize version control and baseline-commit the repo").

*Why: the factory mints, the builder builds, and initializing version control plus committing the product **is** building. Keeping it on the builder's side means the product's history starts under the gated builder, on the owner's word, not before approval.*

---

## Grounding discipline

Tailor to the real idea, not a template fill. Recon any existing system the idea touches so you do not mint a duplicate of something an existing orchestrator already owns. The live workspace beats an assumption.

---

## The gate (before a new orchestrator goes live)

- **Gatekeeper conformance gate**: the standard's checklist plus the builder spec plus the ceremony pattern, on both the vault and the repo. A missing box means not born.
- **Owner approval**: a new orchestrator is a standing addition to the system; it goes live only on the owner's word.
- **Frozen and forbidden defined at birth**: the new orchestrator's untouchables are named before its builder writes a line.

---

## The flywheel

Each mint teaches the mold. A pattern that recurs across ideas, a birth component that was missed, a better tailoring: feed it back to the standard through the gatekeeper's flywheel. The factory **proposes** mold improvements; the gatekeeper **owns and folds** them. (See [gatekeeper-ceremony](./gatekeeper-ceremony.md).)

---

## Continuity

Save the resume and the mint log every idea. A half-minted orchestrator is never left registered-but-incomplete (it fails the gate). Continuity is a deliverable.

---
*Factory Ceremony: the idea-to-orchestrator pattern of Orchestrator OS. Built to the shared orchestrator standard; sibling of [build-ceremony](./build-ceremony.md) and [operator-ceremony](./operator-ceremony.md). Living document: the flywheel amends it. Adapted from ECC (MIT, Affaan Mustafa) and Anthropic Claude Code.*

*Created by Alex Villarroel · part of Orchestrator OS.*
