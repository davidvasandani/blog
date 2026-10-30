# Feature specification: Sweetgreen role chronology

Feature dir: `specs/vk/018c-senior-vs-lead-v/`
Status: Specified through `/speckit.specify`

Readers should see a substantive Lead Software Engineer entry and understand how David's work progressed through Senior, Lead and Senior Lead. Empty placeholders and accomplishments attributed to the wrong period obscure that progression.

## User stories
- As a resume reader, I want distinct accomplishments under each Sweetgreen role so I can understand the progression.
- As the author, I want claims supported by committed records so the resume is defensible.

## Functional requirements
- FR-1: Replace both Lead placeholders with concrete accomplishments supported by the committed timelines.
- FR-2: Preserve the existing verified promotion dates and review attribution across Senior, Lead and Senior Lead. Use activity dates, not review dates or backlog closure dates.
- FR-3: Respect qualifications about ownership, estimates and unshipped work. Do not turn proposals or investigations into shipped outcomes.
- FR-4: Publish consistent revised content in the resume page and PDF. Preserve Gemini exclusion and keep evidence/process files unpublished.
- FR-5: Record enough source provenance to audit the editorial choices without copying private research archives into the Blog.

## Out of scope
Changes to hiring, other services, hosting, dependencies, job titles, or unrelated resume sections.

## Acceptance criteria
- Lead has no TODO highlights and contains dated, supported accomplishments.
- Senior and Senior Lead are reviewed, with any reassignment explained in the evidence notes.
- Existing resume checks pass after rendering and building; the page and PDF contain the revised role content.
- Independent review has no significant findings; knowledge is recorded and the PR is merged after checks.

## Open questions
- Resolved through `/speckit.clarify`: retain the resume's ChartHop effective employment dates. Timeline team-name changes and first observed signatures are activity milestones, not promotion dates. Multi-period projects require phase-specific wording. The timeline primarily covers late 2024 onward, so it cannot independently redate the Senior accomplishments. Preserve those unless Blog history supplies contrary evidence. No open questions remain.
