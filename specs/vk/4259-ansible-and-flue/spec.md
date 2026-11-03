# Feature specification: POS logging approval history

Feature dir: `specs/vk/4259-ansible-and-flue/`
Status: Specified

## Summary
Recover the stakeholder work behind fleet log collection so the candidate's Netflix application reflects both implementation and cross-team execution.

## User stories
- As the candidate, I want a sourced chronology of approval and rollout so I can tell the story accurately.
- As a reviewer, I want each resume claim tied to evidence and its limits.

## Functional requirements
- FR-1: Search Slack, Jira, Confluence and Google Docs, reporting limitations.
- FR-2: Separate proposal, security/business decisions, pilot and fleet coverage; establish whether nearly a year refers to approval or the project overall.
- FR-3: Deliver a private cited timeline and a public-safe voice-reviewed resume draft with accurate ownership and numbers.
- FR-4: Validate claims, obtain independent review, commit reusable knowledge and merge PRs.

## Out of scope
Published resume edits, contacting stakeholders, changing production systems and unsupported savings claims.

## Acceptance criteria
- [x] Each required source system has recorded search coverage or an explicit access limitation.
- [x] Every chronology row has a date, source and claim limit; duration claims have endpoints.
- [x] Draft includes only supported facts or explicitly attributed candidate recollection.
- [x] Voice and independent review are recorded. PR outcomes are recorded by pipeline stage 13.

## Open questions
- Resolved: preserve the candidate recollection as attributed context. Use dated primary records for verified duration; do not invent approvals to fill gaps. No user decision is needed to proceed.
- Research questions remain: earliest proposal, explicit security/business approvals, production rollout date and the May coverage source.
