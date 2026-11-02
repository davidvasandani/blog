# Feature Specification: Resume semantic version

Status: Specified

## Summary
Replace the opaque Git hash with a readable resume release version. A PDF reader
can compare a saved copy with the current resume published from main.

## User Stories
- As a reader, I can see major, minor, and patch versions in my PDF and online.
- As the author, I assign versions to resume changes independently of blog changes.

## Functional Requirements
- FR-1: PDF footers show the release version and retain name and page count.
- FR-2: The published resume displays the same version near the PDF download.
- FR-3: Versions are explicit stable MAJOR.MINOR.PATCH values; no Git dependency,
  timestamps, unavailable fallback, or silent default.
- FR-4: Invalid/missing version metadata prevents rendering/publishing the resume.
- FR-5: Document bump semantics and release steps; retain URLs and prose.

## Acceptance Criteria
- Rendered PDF footer and HTML show Resume version 1.0.0, with no Git label.
- A different valid version propagates to both consumers.
- Invalid/missing version fails clearly; rendering works with Git absent.
- Render options, missing-render page omission, and Gemini isolation still work.

## Out of Scope
Automated release management, rewriting resume prose, and other services.

## Open Questions
- Initial version and meaning of bump levels are resolved in clarification below.

## Clarification (/speckit.clarify)
No open questions remain. Implementation defaults: start at 1.0.0, independent
of package.json's blog version. Major means substantial restructuring or changed
positioning; minor means substantive additions (roles, achievements, skills);
patch means corrections or formatting. Lower fields reset on higher bumps.
Only stable numeric triplets are supported, with no leading zeros, pre-release
or build suffixes. Unrelated blog edits do not bump the resume. A version denotes
a released resume, not every local edit; authors bump before releasing changes.
