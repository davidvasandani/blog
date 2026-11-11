# Feature Specification: Review documents as resume evidence

**Feature dir**: `specs/vk/25ba-self-reviews/`
**Status**: Clarified

## Summary
David supplied three year-end review documents (two self-reviews and one manager review) and asked for them to be analyzed, for the private work timeline and notes to be updated, and for resume updates to be proposed. The reviews are the first source that describes the work in someone else's words and names what mattered most in a year, so they can confirm claims the resume already makes, surface work the timeline is missing, and show how the work is perceived. They are also confidential and written after the fact, so they need the same evidence discipline as every other source.

## User Stories
- As David, I want each claim in the reviews checked against the dated records, so that I know which ones I can rely on in a resume line or an interview.
- As David, I want the private timeline to show work the reviews name that it is missing, so that the timeline stays the complete record.
- As David, I want notes on what the reviews mean for a partner-facing engineering role, so that I can prepare for questions about feedback and growth.
- As David, I want proposed resume lines with evidence and a recommendation, so that I can pick what to publish instead of finding the page already changed.
- As a reader of this public repository, I should learn nothing confidential from this task's artifacts.

## Functional Requirements
- FR-1: Every claim in the three documents is sorted as corroborating a dated record, adding detail, new, conflicting, or self-reported only, with the matching record named.
- FR-2: Work named in the reviews that has a dated record and no timeline entry is added to the private timeline with the record's dates and role. Work with no dated record is listed as a gap, not drawn.
- FR-3: A dated note records what the reviews change for the application, including strengths, development feedback and open questions for David.
- FR-4: Proposed resume lines are drafted through `/voice`, each with its evidence, its risk and a recommendation. The published resume and its version are unchanged.
- FR-5: The source documents, the analysis, the timeline, the notes and the proposals stay in the private repository. This repository receives only sanitized pipeline artifacts and a knowledge note.
- FR-6: Role attribution uses effective promotion dates and event dates. Activity counts are not treated as outcomes.

## Out of Scope
Publishing any proposed line, rebuilding the frozen canonical timeline or the relevance audit, new research in work systems, and estimates only David can make.

## Acceptance Criteria
- [ ] `git diff origin/main -- resume/` is empty and `npm run resume:voice` passes.
- [ ] The private timeline rebuilds cleanly, and each added entry's dates and role match its source record (checked by script).
- [ ] Every proposed line has a `/voice` record, an evidence row and a recommendation.
- [ ] A confidentiality grep over tracked and untracked changes in this repository finds no review text, names or confidential product names.
- [ ] Independent Codex review reports no significant outstanding findings.

## Clarifications
Resolved 2026-11-11 from the task's wording and the repositories' own rules. These are the agent's readings, not answers David gave; the pull request states them so he can overrule one.
- "The timeline" is the editable private work timeline. Its README says to edit the source file and rebuild. The canonical timeline is a dated snapshot whose guide says not to overwrite it, so it stays as it is.
- "Propose" means drafts only. The published resume and its version do not change in this task.
- A review item with no dated record is listed as a gap. The review year is not a date.

## Open Questions
None block the work. Questions only David can answer (dates, figures and which proposals to adopt) are listed for him in the private repository.
