# Feature Specification: Resume in Decap

**Feature dir**: `specs/vk/619d-add-resume-to-de/`
**Status**: Clarified via `/speckit.clarify`

## Summary
The CMS at `/admin/` lists two collections, Post and Page. The resume is a RenderCV YAML file that can only be changed by editing raw YAML in a text editor or on GitHub. Add a third collection, Resume, so David can edit the resume through form fields (name, contact details, summary, each role and its highlights, projects and skills) the same way he edits posts and pages, and have the change go through the existing review and deploy path.

## User Stories
- As the author, I can open Resume in the CMS sidebar next to Post and Page and see every part of my resume as labelled form fields.
- As the author, I can change a highlight, add or reorder a bullet, or add a role without touching YAML syntax.
- As the author, saving a resume edit produces a draft in the same editorial workflow as posts, so it becomes a pull request whose checks (including the resume voice check) run before anything is published.
- As a reader, the published `/resume/` page and PDF look and read the same until the author actually changes the content.

## Functional Requirements
- FR-1: The CMS shows a Resume collection alongside Post and Page. It edits the one existing resume file in place; it does not create, delete or rename files.
- FR-2: Every value the resume file holds today is reachable as a field: contact details and social networks, the summary, each experience entry (company, position, dates, location, summary, highlights), each project entry, and each skill line. Fields that RenderCV treats as optional stay optional.
- FR-3: Lists (social networks, experience, highlights, projects, skills) can be added to, removed from and reordered.
- FR-4: Saving from the CMS must keep every value the renderer reads, including values the form does not expose. A save with no changes must yield data RenderCV reads identically.
- FR-5: Notes kept as YAML comments today that a CMS save would remove are kept somewhere committed, so no information is lost the first time the file is saved from the CMS.
- FR-6: Post and Page collections, the editorial workflow, sign-in and existing previews keep working unchanged.
- FR-8: The resume file must parse under a strict YAML parser. Commit 8331c6b put an unquoted `: ` in the current role's summary, which broke `npm test` and the RenderCV job on `main` (runs 42576237297 and 42578893977). Quote that value without changing its words. Decap's own parser (yaml 1.x) tolerates the error, so the CMS would load the file, but a strict parser would not.
- FR-7: The resume editing rules (every wording change goes through `/voice`, the voice check runs in CI) are documented for CMS edits as well.

## Out of Scope
- A rendered live preview of the PDF inside the CMS.
- Running `/voice` or RenderCV inside the CMS.
- Editing tailored copies of the resume, `resume/VERSION`, or the RenderCV design settings beyond leaving them intact.
- Any change to resume wording.
- Changes to hosting, GitHub OAuth or other services.

## Acceptance Criteria
- [ ] The built admin config contains a Resume collection pointing at `resume/David_Vasandani_CV.yaml`, and the existing Post and Page assertions still pass.
- [ ] A test fails if the resume file uses a key that the CMS form does not cover.
- [ ] A test that loads the resume, serializes it the way the CMS does and parses it again gets identical data.
- [ ] The CMS opens the Resume entry locally and shows the current values.
- [ ] js-yaml and PyYAML both parse the resume file.
- [ ] `npm test` passes, including `npm run resume:voice`.

## Clarifications
Resolved 2026-11-09 without a reply from David, using the defaults below. He can override any of them on the PR.

- Q: Should the RenderCV `design`, `locale` and `settings` blocks be editable? A: Yes, in collapsed groups below the resume content. Exposing them means every key in the file has a field, so FR-4 doesn't depend on Decap keeping keys it has no field for. The theme is a dropdown of RenderCV's built-in themes.
- Q: What happens to the YAML comments? A: Decap rebuilds the file from parsed data on save, so every comment is dropped. Its per-field `comment` option only works for folder collections, not for a single file. The notes (role attribution pointer, ChartHop date source, crash-figure re-run note, page-break and time-span reasons) move to `resume/README.md`, and the YAML keeps only the schema hint line and a pointer to the README. The README says a CMS save also drops those two lines and how to restore the schema hint.
- Q: Does the save reformat the file? A: Yes. Decap's YAML writer reflows long lines and may change quoting. That is acceptable as long as the parsed data is identical (FR-4); the first CMS save will show a large whitespace diff.
- Q: Preview? A: None. The collection turns the preview pane off (`editor.preview: false`) so the form gets the full width; a field-by-field preview adds nothing and a rendered resume preview is out of scope.
- Q: Does a CMS save skip `/voice`? A: No. The editorial workflow turns the save into a pull request, CI runs `npm run resume:voice`, and the README and AGENTS rule still require `/voice` before merge.

## Open Questions
None blocking.
