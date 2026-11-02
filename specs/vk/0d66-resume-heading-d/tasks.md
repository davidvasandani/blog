# Tasks: Resume Heading Design

**Feature dir**: `specs/vk/0d66-resume-heading-d/`

## Phase 1: Baseline
- [x] T001 Render the resume and build the site; screenshot `/resume/` at
  1280px and 393px (no file changes; images kept outside the repo).

## Phase 2: Tests first
- [x] T002 Add failing unit tests for `renderResume()` (meta grouping and
  order, year-only meta, summary sentence not meta, eyebrow with heading
  text unchanged, theme callout, escaping) in `tests/resume.test.cjs`.

## Phase 3: Implementation
- [x] T003 Add the markdown-it core rule and export `renderResume()` in
  `scripts/resume-page.cjs` (depends on T002).
- [x] T004 [P] Wrap the resume body in `<div class="resume">` in
  `pages/resume.njk`.
- [x] T005 [P] Add scoped `.resume …` and `.visually-hidden` styles in
  `_includes/assets/css/inline.css`.

## Phase 4: Verification
- [x] T006 Rebuild; screenshot 1280px and 393px and compare with T001
  (depends on T003 to T005).
- [x] T007 Run `npm test` with Chromium (Pa11y, voice check, outline test)
  and record results in `specs/vk/0d66-resume-heading-d/validation.md`.
