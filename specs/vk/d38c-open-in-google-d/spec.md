# Feature Specification: Open in Google Docs

Status: specified

## Summary
Give resume readers a Google Docs copy alongside the PDF download.

## User stories
- As a visitor, I can open the resume in Google Docs from the resume page.
- As the author, I receive a formatted document containing my current published resume without rewriting its claims.

## Functional requirements
- FR-1: Create a native Google Doc with the complete current resume, preserving wording and section order.
- FR-2: Add “Open in Google Docs” beside “Download the PDF” using the verified document URL.
- FR-3: Preserve the PDF link, release version, resume body, existing URLs and Gemini output.
- FR-4: The copy is a snapshot; document how to maintain it. Do not imply automatic synchronization.
- FR-5: Verify document content and access. Blog readers need read access; never enable public editing.

## Out of scope
Resume rewriting, automated sync, other services, Google API integration in the website.

## Acceptance criteria
- Native Google Doc readback contains the source resume text, section headings and lists.
- Built /resume/ contains the correctly labelled Google Docs link and existing PDF action.
- Validation and independent review pass before the PR is merged.

## Open questions
- Resolved: user explicitly requested creation: “Create one. I don’t have a URL.”
- Preserve existing wording; create a snapshot from the current source. Public viewing is implied by the requested public blog link. No open product questions remain.
