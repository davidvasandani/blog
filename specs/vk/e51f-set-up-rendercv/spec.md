# Feature Specification: RenderCV resume source

**Feature dir**: `specs/vk/e51f-set-up-rendercv/`
**Status**: Clarified

## Summary
David is applying for the Netflix Solutions Engineer 5 - Content Promotion & Distribution role and needs a resume he can tailor and regenerate quickly. Keeping the resume as structured YAML source in the blog repository, rendered by RenderCV, gives a versioned, reviewable, typographically consistent document instead of a hand-edited word-processor file.

## User Stories
- As David, I want my resume stored as plain-text source in my blog repo so that changes are versioned and reviewable like any other content.
- As David, I want one command to produce a PDF from that source so that I can tailor and re-export it for each application quickly.
- As David, I want a live re-render while I edit so that I can see layout changes without re-running commands.
- As David, I want CI to prove the resume still renders and give me the PDF so that a broken edit is caught before I need to send it.
- As a blog reader, I should see no change to the published site.

## Functional Requirements
- FR-1: The repository holds a single resume source file in RenderCV's format, pre-filled with the contact details already public on the blog. Unknown career content is marked TODO and not invented.
- FR-2: A one-time setup command installs a pinned RenderCV version into an isolated local environment.
- FR-3: A render command produces a PDF (plus RenderCV's companion formats) in an ignored output folder.
- FR-4: A watch command re-renders on save.
- FR-5: If RenderCV is not installed, the commands give clear setup instructions and do not fail with a confusing error.
- FR-6: The resume source, its docs, and rendered output never appear in the built website or Gemini capsule.
- FR-7: CI renders the resume on each pull request and on pushes to main, fails if the PDF is missing or empty, and makes the PDF downloadable.
- FR-8: The existing Node test suite keeps passing without Python installed and checks the resume setup contract.
- FR-9: Usage is documented next to the resume source.

## Out of Scope
- Writing David's actual career content.
- Publishing the resume on david.vasandani.me (see Clarifications).
- Custom RenderCV themes beyond selecting a built-in one.

## Acceptance Criteria
- [ ] On a clean checkout with Python 3.12+, running the setup and then the render command produces `David_Vasandani_CV.pdf`.
- [ ] `npm test` passes, and `_site`/`_gemini` contain no resume files.
- [ ] The CI resume job passes and uploads a PDF artifact.
- [ ] The resume README explains setup, render, watch and editing.

## Clarifications
No answers were supplied, so these are default decisions recorded as assumptions. David can reverse any of them later.
- Q: Should the rendered PDF be published on the site now? A: No. The source is a skeleton with TODO content, and publishing it would put an unfinished resume on the public site. Publishing can be a later change once the content is real. CI artifacts provide the PDF in the meantime.
- Q: Which built-in theme should be the default? A: `classic`, RenderCV's default single-column ATS-friendly layout. Changing it is a one-line `design.theme` edit, documented in the README.
- Q: Should rendered output be committed to git? A: No. The output is reproducible from the pinned version and source, and it includes the render date, so committing it would create churn. Output is gitignored.

## Open Questions
None remaining.
