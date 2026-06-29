# The shortform guide

*The 30 minute introduction. If you read one thing before touching the system, read this. ← [Orchestrator OS](./00_MOC.md) · [README](./README.md).*

You can learn the whole idea in half an hour. This guide gives you the core idea, the one rule that everything else hangs off, a five minute mental model of the layers, and a short "do this first" path that ends with you running a real change through the system. When you want depth, go to [the-longform-guide](./the-longform-guide.md). When you want hands-on setup with diagrams, go to [the setups](./setups/00_SETUPS_INDEX.md).

---

## The core idea: be the director, not the doer

One person typing at one model hits a ceiling fast. You become the bottleneck: you read every file, you hold every detail, you write every line, and the quality of the result is capped by how much you can keep in your head at once.

Orchestrator OS removes that ceiling by splitting the work into two kinds of worker:

- A **persistent orchestrator** that owns a domain. It does not do the leaf work. It frames the request, picks the right specialist, dispatches a tight brief, independently checks the result, and synthesizes for you. It remembers. It is the part that stays.
- **Disposable builders and specialists** that do the leaf work. Each is spawned for one job with a narrow brief, produces its output, and goes away. They are cheap, parallel, and forgettable. They are the part that is thrown away.

That is the shift in one line: **you stop being the doer and become the director of doers.** Your job is to frame, dispatch, verify, and decide. The orchestrator does that on your behalf for its domain, and you direct the orchestrator.

This is principle 3 of [the-philosophy](./the-philosophy.md) ("orchestrate, do not solo") made operational. The full shape of the persistent role is in [the-orchestrator-pattern](./orchestrators/the-orchestrator-pattern.md).

---

## The one rule: fan out for intelligence, write single-threaded

If you remember nothing else, remember this:

> **Fan out for intelligence. Keep writes single-threaded.**

Reading, analyzing, and proposing are safe to do in parallel and they get better the more parallel they are. Spawn five readers, five lenses, five critics at once. Each sees the problem fresh; together they see more than any one of them could. Parallel exploration is pure upside.

Writing is the opposite. The moment two workers both change the same thing, you get conflicts, lost edits, and a result assembled by telephone. So every change funnels through **one integrator**. Many minds propose; one hand writes. That keeps the work coherent no matter how wide you fanned out to understand it.

```mermaid
flowchart LR
  H["You / the orchestrator"] --> A["Reader 1"]
  H --> B["Reader 2"]
  H --> C["Critic"]
  H --> D["Designer"]
  A --> I["One integrator"]
  B --> I
  C --> I
  D --> I
  I --> W["Single-threaded write"]
```

Fan out is wide and parallel. The write is a single line. This rule is why the result stays coherent even when a dozen agents touched the thinking. See [orchestration-first](./rules/orchestration-first.md) for the rule in full and [multi-agent-contract](./ceremonies/multi-agent-contract.md) for how the contract enforces it.

---

## The five minute mental model: the layers

The system is five layers stacked on top of each other. Each one produces or feeds the one below it, and a thin layer of scripts (the hooks) makes the rules impossible to forget.

```mermaid
flowchart TD
  S["Standard: the mold every orchestrator is born from"] --> F["Factory: mints new orchestrators to the standard"]
  F --> O["Orchestrators: persistent directors, one per domain"]
  O --> G["Gatekeeper: refuses anything not born complete"]
  G --> B["Sandbox: proves roles stay in-role"]
  Hooks["Hooks: scripts that enforce the rules so they cannot be skipped"] -.enforces.-> S
  Hooks -.enforces.-> F
  Hooks -.enforces.-> O
  Hooks -.enforces.-> G
  Hooks -.enforces.-> B
```

Read it top to bottom:

1. **The standard** is the mold. It defines exactly what an orchestrator IS and what it needs to be "born complete": its folders, its operating spine, its prompts, its links, its builder. See [orchestrator-standard](./the-standard/orchestrator-standard.md).
2. **The factory** mints new orchestrators from an idea, stamping each one to the standard so it arrives whole instead of half-built. See [factory-ceremony](./ceremonies/factory-ceremony.md).
3. **The orchestrators** are the persistent directors, one per domain (shipping software, running the business, evolving the system itself). See [the-orchestrator-pattern](./orchestrators/the-orchestrator-pattern.md) and the worked [example-orchestrator](./orchestrators/example-orchestrator.md).
4. **The gatekeeper** holds the line: it refuses to register anything that is not 100 percent complete against the standard. Half-built things never go live. See [gatekeeper-ceremony](./ceremonies/gatekeeper-ceremony.md).
5. **The sandbox** is the conformance harness. It tests that each role actually behaves like its role and does not drift into doing the leaf work itself. See [role-conformance-harness](./sandbox/role-conformance-harness.md).

And underneath all of it, **the hooks**: small scripts that run the rules automatically so a tired human can never skip them. This is principle 2 of [the-philosophy](./the-philosophy.md), "enforce, do not remember." A rule you only remember gets forgotten the one time it matters. See [the hooks layer](./hooks/00_HOOKS_INDEX.md).

These five are the teaching layers, a deliberate subset of the full component set. [the-longform-guide](./the-longform-guide.md) walks all of it: the Standard, the Orchestrators (with the workflow pattern), the Ceremonies plus the multi-agent contract, the Sandbox, and the building blocks the orchestrators draw on (Agents, Commands, Skills, Hooks, Rules, and Setups).

The payoff of the stack: every orchestrator is born the same shape, checked the same way, and kept honest the same way. You learn the pattern once and it holds everywhere.

---

## Do this first

Three steps, in order. They take you from reading to running a real change.

### 1. Read the philosophy

Open [the-philosophy](./the-philosophy.md) and read all six principles. It is short on purpose. Everything else in the system is a consequence of those beliefs, so once they click the rest reads fast. Pay special attention to "orchestrate, do not solo" and "enforce, do not remember."

### 2. Copy the example orchestrator

Open [example-orchestrator](./orchestrators/example-orchestrator.md) and read it as a finished, born-complete orchestrator. Notice that it arrives with everything: its folder layout, its operating spine, its prompt pack, its links both ways, and a builder wired to it. Then copy it as your starting point and rename it for your own domain. Do not start from a blank folder; start from a complete one and change the domain. The structure it follows is the [orchestrator-standard](./the-standard/orchestrator-standard.md), and the way it gets minted cleanly is the [factory-ceremony](./ceremonies/factory-ceremony.md).

### 3. Run one change through the build ceremony

Pick one small, real change and walk it through the [build-ceremony](./ceremonies/build-ceremony.md) end to end:

- frame the request and classify it,
- fan out to understand the current state (read, recon, propose),
- dispatch a single builder to make the change single-threaded,
- verify with a fresh perspective that did not write the change (principle 6, "verify independently"),
- pass the [gatekeeper](./ceremonies/gatekeeper-ceremony.md) before anything irreversible,
- close out and record what you learned.

Doing this once teaches you more than reading ten times. You will feel the difference between directing and doing, and you will see why the one rule exists.

```mermaid
flowchart LR
  R["Read the philosophy"] --> C["Copy the example orchestrator"]
  C --> X["Run one change through the build ceremony"]
  X --> L["You now think in orchestration"]
```

---

## Where to go next

- Want the depth behind every layer? [the-longform-guide](./the-longform-guide.md) gives each one its own section, plus the full lifecycle and the flywheel that makes the system improve itself.
- Want to set it up for real, with a diagram for every piece? [The setups](./setups/00_SETUPS_INDEX.md) are the fastest path from download to running.
- Want the principles again, on their own? [the-philosophy](./the-philosophy.md).
- Want the map of everything? [Orchestrator OS](./00_MOC.md).

---

*Thirty minutes in, you should be able to say what an orchestrator is, why writes are single-threaded, and what "born complete" means. If you can, you are ready for [the-longform-guide](./the-longform-guide.md).*

*Created by Alex Villarroel · part of Orchestrator OS.*
