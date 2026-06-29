# Sandbox Index

*The test bed for the Orchestrator OS: where roles (resumes, ceremonies, contracts) are put through the ringer before they ship. Every role is run in describe mode against a task built to tempt its failure mode, then graded by a separate skeptic. Run never equals grade.*

← [Orchestrator OS](../00_MOC.md)

## Contents

- [role-conformance-harness](./role-conformance-harness.md) - the two-step method (RUN then EVALUATE) that validates a role stays in-role: the rubric, the read-only-at-the-tool-layer caveat, the hybrid-role architecture probe, and how to use the loop as a prompt foundry.

## Conventions

- **Run never equals grade.** The agent that runs a role never scores its own work. A separate, skeptical grader who did not write the role does.
- **Read-only at the tool layer.** Describe-mode instructions are not enough. Spawn run-agents with read-only tools or a throwaway worktree so a dry run cannot leak into real writes.
- **Tempt the failure mode.** Every test task is engineered so the path of least resistance is the rule the role must not break.
- **Outputs.** Each campaign produces a `RESULTS_<date>.md` and, where a change is warranted, a `PROPOSAL_<topic>.md` held for review. Changes land through the governing flywheel, never straight from a single run.

*Created by Alex Villarroel · part of Orchestrator OS.*
