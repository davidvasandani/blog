# Feature Specification: Projects

**Feature dir**: `specs/vk/1d64-projects/`
**Status**: Clarified via `/speckit.clarify`

## Summary
Give readers a single place to explore David's documented projects, discoverable as a top-level category alongside the existing blog navigation.

## User Stories
- As a visitor, I can find Projects from any public HTML page and understand what each project does.
- As the author, I can update the catalog with the same content workflow used for other pages.

## Functional Requirements
- FR-1: Provide a top-level Projects navigation link and permanent `/projects/` page, with the existing active-page treatment.
- FR-2: Include all documented personal/open-source projects: self-hosted AI coding platform, SitePing contributions, household content/workflow platform, personal blog and diagram publishing workflow.
- FR-3: Give each entry a descriptive heading and factual summary; link to existing public supporting content where available. No fabricated project URLs or achievements.
- FR-4: Preserve existing routes, responsive layout, accessible navigation, editor behavior and Gemini output boundaries.
- FR-5: Document how to maintain the list.

## Out of Scope
Professional resume accomplishments unless requested, external-service changes, automatic GitHub importing, new APIs, dependencies and individual project detail pages.

## Acceptance Criteria
- Projects is reachable through top-level navigation; only its own link is marked current on the Projects page.
- All five catalog entries render with nonempty descriptions; internal links resolve to generated pages.
- Existing builds, tests and accessibility audits pass; content fits narrow and wide viewports.
- Internal documentation remains unpublished and existing pages remain available.

## Open Questions
None blocking. Pending optional user preference, use personal/open-source projects already documented in this repository. “Comprehensive” means all projects within that evidenced scope, not an unsupported claim to cover every private or professional project. Use sentence-case summaries and distinguish upstream contributions from ownership. The page remains manually maintained; Gemini continues publishing posts only.
