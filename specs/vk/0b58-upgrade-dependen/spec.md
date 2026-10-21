# Feature specification: tested dependency upgrades

Status: specified

## Summary
Make dependency maintenance safe and repeatable by protecting public reading and local authoring behavior before upgrading dependencies.

## User stories
- Readers can continue opening posts, author/tag archives, images and contact pages.
- Editors retain configured collections, previews and login/logout redirects.
- Maintainers can verify upgrades locally without hosted credentials.

## Functional requirements
- FR-1: Preserve rendered public pages, links, dates, images and contact form semantics.
- FR-2: Preserve admin collection fields, preview title/body/date/tags and identity redirects.
- FR-3: Preserve hello/echo API behavior and missing-route responses.
- FR-4: Provide repeatable local checks, including alternate publication output and server compilation.
- FR-5: Complete baseline tests before upgrading existing packages; document versions and unresolved risks.
- FR-6: Exclude internal documents and fixtures from publication.

## Acceptance criteria
- One documented local command runs frontend and admin/API tests successfully before and after upgrades.
- Clean dependency installation, both publication builds and TypeScript checks succeed.
- Independent review reports no significant unresolved findings.

## Out of scope
Hosted authentication, real Git Gateway writes, new API endpoints, redesigns and other services.

## Open questions
None; local admin coverage means owned configuration, preview and identity integration plus the repository's serverless API, not emulation of Netlify's hosted backend.

## Clarifications
- Upgrade to stable compatible versions; major changes require passing contract tests and migration evidence. Deferred packages must have reasons.
- Use the available Node 24 runtime for validation and align documented runtime requirements during upgrades.
- The alternate Gemini generator remains in scope because it shares dependencies.
- No open questions require user input.
