# The philosophy

*The handful of beliefs the whole system rests on. If you read nothing else, read this. ← [[00_MOC|Orchestration OS]] · [[README|README]].*

Orchestration OS is opinionated. Here is what it believes and why.

## 1. Be real
The fastest way to lose people is to pretend. Say when you are unsure. Show the mistakes. Do not play the all-knowing guru. Being real is not a softer version of being good at this, it is the strategy, because trust compounds and bluffing does not.

## 2. Enforce, do not remember
A rule you only remember gets forgotten about a fifth of the time, and the one time it matters is the time it slips. Anything a script can check should be a script, not a note. That is what the [[hooks/00_HOOKS_INDEX|hooks layer]] is for, and why the [[ceremonies/gatekeeper-ceremony|gatekeeper]] refuses work that is not born complete. A check a machine can run is never left to memory.

## 3. Orchestrate, do not solo
One person typing at one model hits a ceiling. The way past it is to direct, not do: a persistent orchestrator frames the work and dispatches disposable builders and specialists. Fan out for intelligence (many parallel readers and lenses), but keep writes single-threaded through one integrator so the result does not become a game of telephone. See [[orchestrators/the-orchestrator-pattern|the-orchestrator-pattern]] and [[rules/orchestration-first|orchestration-first]].

## 4. Born complete, or not born
A new part of the system arrives with everything it needs (its folders, its operating spine, its prompts, its links) or it does not arrive. Half-built things rot and mislead. The [[ceremonies/factory-ceremony|factory]] mints to the [[the-standard/orchestrator-standard|standard]]; the gatekeeper holds the line.

## 5. Keep the knowledge a clean graph
Knowledge that cannot be found does not exist. Every document has a home, a map that reaches it, and links both ways. One canonical version of each thing, never a pile of copies. Stale work moves to an archive, it does not get deleted or left to mislead. See [[rules/knowledge-discipline|knowledge-discipline]].

## 6. Verify independently
The thing that built it is the worst judge of whether it works. Verification is done by a fresh perspective that did not write the work, against the spec and the running result, not the author's reasoning. The [[sandbox/00_SANDBOX_INDEX|sandbox]] applies the same idea to the roles themselves.

---
*These are not rules you follow because they are here. They are here because they keep paying off. Disagree, fork, and prove a better way.*

*Created by Alex Villarroel · part of Orchestration OS.*
