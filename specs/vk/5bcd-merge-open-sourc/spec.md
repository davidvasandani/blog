# Feature specification: merge résumé categories

Status: specified

Readers should find open-source contributions and personal projects in one Projects section, avoiding an unnecessary split between related work.

## User story
As a résumé reader, I want to scan all projects together while retaining each project's details.

## Functional requirements
- FR-1: Show one Projects section containing the former Open Source entries followed by the existing Projects entries.
- FR-2: Preserve all entry names, dates, summaries, highlights, links, and unrelated résumé sections.
- FR-3: Publish the merged heading in both the blog résumé page and its PDF at their existing URLs.
- FR-4: Keep generated files and task documentation out of the published content except for the intended résumé page and PDF.

## Acceptance criteria
- Exactly one Projects heading and no Open Source heading in the rendered résumé.
- All three original project entries remain, in their original order and with unchanged details.
- Existing résumé tests and the rendered page accessibility audit pass.

## Out of scope
Post tags, other services, dependency updates, and résumé copy or design changes.

## Open questions
None. Projects is the inclusive name for both existing groups, and the résumé is the only matching category source in this repository.

## Clarification review
Resolved from repository context: the merged label is Projects; contributions come first; generated artifacts remain ignored and are rebuilt by deployment. No questions remain open.
