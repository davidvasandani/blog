# Feature Specification: Strengthen the stalled-import resume bullet

**Feature dir**: `specs/vk/4fff-this-is-borning/`
**Status**: Clarified

## Summary
Rewrite the second highlight under the "Household content and workflow platform" project in `resume/David_Vasandani_CV.yaml` (the stalled-import bullet) so a reader evaluating the user for the Netflix Solutions Engineer 5 - Content Promotion & Distribution role can quickly see the content-pipeline recovery work it describes. The posting emphasizes content ingestion, structured troubleshooting, and practical remediation; leading with the restored imports rather than a task-log opening speaks to that directly. This is a wording change only — no new facts, no scope change, no change to any other bullet.

## User Stories
- As David evaluating his own resume against a Solutions Engineer posting, I want the stalled-import bullet to lead with the outcome (imports restored) rather than the mechanism, so a reader sees the relevant recovery work without parsing the sentence twice.
- As a reviewer checking this change against prior evidence, I want the rewritten bullet to preserve every fact and qualifier from the current bullet, so the edit cannot be mistaken for a new or stronger claim.

## Functional Requirements
- FR-1: Rewrite only the stalled-import highlight (currently: "Got stalled imports running again by fixing credentials and using the recovery triggers. That brought in 62 new items and requeued 63 failed downloads.") in `resume/David_Vasandani_CV.yaml`. No other line in the file changes.
- FR-2: The rewritten bullet must lead with the restored imports (the outcome) rather than opening with the troubleshooting steps.
- FR-3: The rewritten bullet must retain all of the following facts, unchanged in meaning: credential repair, the recovery triggers, 62 newly imported items, and 63 failed downloads requeued.
- FR-4: The 62-imported and 63-requeued figures must remain two distinct outcomes. The bullet must not merge them or imply the 63 requeued downloads completed.
- FR-5: The bullet must not add business impact, outcomes, or claims beyond what the current bullet and the prior audit evidence support (see `hiring/netflix/timeline-audit/REPORT.md`, F08 and R041).
- FR-6: The bullet must not expand ownership or scope beyond a household/personal project (no wording implying this was professional work, a team effort, or production-scale).
- FR-7: The bullet must stay under the "Household content and workflow platform" project entry, alongside its unchanged sibling highlights.
- FR-8: The rewritten bullet must pass through the `/voice` skill and conform to `resume/David_Vasandani_CV.yaml`'s surrounding voice (no AI mentioned — this bullet has none to begin with, no dashes, no curly quotes).
- FR-9: The rewritten bullet must not name the POS vendor or any confidential product (not applicable to this bullet's subject matter, but the constraint carries over from repository policy).
- FR-10: `npm run resume:voice` must pass on the edited file.

## Out of Scope
- Any other resume bullet, summary, role, or section.
- Re-verifying or re-fetching the underlying recovery run; the audit's existing evidence boundary (requeued ≠ completed, run not re-fetched) is authoritative and unchanged.

## Acceptance Criteria
- [x] The YAML diff touches exactly one highlight string under `projects` → "Household content and workflow platform", and no other line in `resume/David_Vasandani_CV.yaml`.
- [x] The new bullet opens with the restored imports rather than the credential/trigger mechanism.
- [x] The new bullet still states: credentials were fixed, recovery triggers were used, 62 items were newly imported, and 63 failed downloads were requeued (not completed).
- [x] No business-impact claim, team/professional framing, or new fact appears that is absent from the current bullet or the cited audit evidence.
- [x] The bullet has been run through `/voice` and the fact/qualifier/ownership comparison against the original has been checked.
- [x] `npm run resume:voice` passes on the edited file.

## Open Questions
None. The scope, preserved facts, and evidence boundary are fully specified by `blog/SPEC.md`, `blog/PRIOR_KNOWLEDGE.md`, and the constitution's 2026-11-02 "Content recovery bullet" review.
