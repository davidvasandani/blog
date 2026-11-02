# Feature Specification: Timeline audit against resume

Status: specified. Command: /speckit.specify. Task: 5ab27642-ab10-41bf-83d9-2bafb85d0287.

## Summary and user story
As the applicant for Netflix job 790318930709, I want a complete, explainable relevance assessment of my resume and timeline so I can choose the strongest evidence and identify gaps without overstating experience.

## Functional requirements
- FR-1: Identify and inventory both supplied preview sources and the exact job description, retaining retrieval status and provenance.
- FR-2: Assign every resume bullet and timeline item a stable ID, 0–5 relevance score, matched job criteria, rationale and recommended use.
- FR-3: Keep relevance, source confidence and chronology assessment separate. Do not reuse prior ranking scores without fresh judgment.
- FR-4: Map resume claims to timeline evidence; flag missing support, date conflicts, overlaps, project-phase differences and qualifiers.
- FR-5: Deliver a readable report and machine-readable full inventory with coverage validation and prioritized recommendations.
- FR-6: Keep private evidence in hiring and public planning sanitized. Preserve the published resume unchanged.

## Acceptance criteria
Every in-scope source item is scored exactly once; score bounds and mappings validate; all criteria refer to the target role; sources and limitations are explicit; generated views agree; independent review has no significant unresolved findings; knowledge is committed and PRs merged.

## Out of scope
Resume rewrites, job applications, contacting recruiters, production changes and claims of hiring probability.

## Open questions
Resolved by /speckit.clarify, 2026-11-02: both preview URLs currently return a capability authorization shell without content. Inspect preview metadata to identify their source. If content cannot be retrieved, use the current committed resume and both canonical and incident timelines as explicitly labeled fallback scope, never claim preview equivalence. Include all highlight bullets; score summary and skill statements separately as supplemental items. Treat chronological event records individually; assess project deep dives separately if present. The score is editorial relevance, not hiring probability. Missing corroboration is not falsity. No user answer is needed to make a useful, honestly scoped audit. Remaining questions: none; source equivalence remains an evidence limitation until verified.
