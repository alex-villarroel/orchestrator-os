# Knowledge Discipline

*The contract for a living knowledge base shared by many agents. It governs how every session SAVES, so the base stays clean instead of rotting back into a pile of duplicates and orphans. Binding on every session that can write here: orchestrators, builders, and any subagent.*

← [[rules/00_RULES_INDEX|00_RULES_INDEX]] · [[00_MOC|Orchestration OS]]

> **The knowledge base is a knowledge directory, NOT a working directory. We work OUT of it, not IN it.**
> Everyone can save knowledge here, but access comes with this contract. It is what keeps a freshly organized base from decaying.

## The golden rule

**Never skip steps.** Follow the proven pattern, set things up correctly, and reconcile everything in the same change. This is how nothing rots and any session, even a cold one after a long gap, picks up clean.

## The rules

1. **Knowledge, not artifacts.** The base holds *knowledge*: resumes, handoffs, ceremonies, run docs, decisions, maps, memory. Code, build artifacts, scratch, and working temp do NOT belong here. They live in their git repos and working directories. We work out of the base, not in it.

2. **One canonical file per thing.** Update the existing file in place. Never save a second or third version. No `RESUME_PROMPT_v2`, no `... final FINAL`, no `copy of ...`, no `... (1)`. Version history lives in **git**, not in filename spam.

3. **Right folder, and a map for every doc.** Each file goes in its dedicated area, never dumped at the root or into a random folder. Every new or changed doc gets correct `[[wikilinks]]` to what it relates to and is reachable from its area MOC and the directory index. A doc nobody links is tomorrow's mess.

4. **Two-way links, no orphans.** Linking is mutual: the doc links its neighbors, and at least one index, MOC, or directory lists the doc back. An inbound-orphan (nothing links *to* it) is as broken as an outbound-orphan. Resolve bare links to exactly one target so shared-basename files are not falsely counted as linked.

5. **Reconcile every dependent index in the same change.** When a doc asserts a *fact* (a version, a count, a status, a roster, an index row), that fact lives in more than one place. When it changes, update **every** doc that states it in the same change: the area MOC, the table of contents, the directory index and its counts, and any resume that quotes it. A stale source of truth is a priority-one hazard: it restarts a fresh session on false facts. Find the dependents through the link graph (backlinks on the changed note), not from memory.

6. **Stale goes to archive, never hard-delete.** When a file is superseded or goes cold, move it to an `Archives/` folder. Do not leave it rotting beside the live docs, and do not hard-delete it, because it may carry history. Archives is also the pressure valve: if a storage or sync limit ever looms, it is the first place to empty. Dated point-in-time records (run logs, incident reports, daily snapshots) are historical and are not rewritten; when superseded they move to Archives rather than being patched forever.

7. **Commit when done, keep the index current.** The base is a git repo and the single source of truth for every device and every session. Pull or read before you edit; commit right after a batch of work. An uncommitted local change is invisible to everyone else, which is silent drift. Keep one writer at a time so commits do not collide. Whenever you add, move, or retire a doc, adjust its line in the described index in the same change.

## For delegated work

Every dispatch to a subagent carries this contract. A subagent may save knowledge here, but it follows the rules: right folder, update don't duplicate, link it both ways, archive what it supersedes. The integrator rejects knowledge that lands as a **duplicate** or an **orphan**.

*Adapted from a production knowledge-base contract and PKM plus software-reliability disciplines (ECC MIT, Anthropic, Cognition).*

*Created by Alex Villarroel · part of Orchestration OS.*
