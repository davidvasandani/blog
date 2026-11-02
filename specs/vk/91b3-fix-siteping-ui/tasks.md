# Tasks: Fix SitePing UI on phones

**Plan**: `./plan.md`

Tasks are ordered by dependency. Tasks marked **[P]** touch independent files
and may run in parallel within their group. Each task names the file(s) it
changes.

## Phase 1: Baseline
- [x] T001 Record the contact form's computed styles (input, textarea, button)
  at 393px and 1280px, plus the before screenshot of the annotate toolbar, from
  the current build. Writes only to a temp directory outside the repo.

## Phase 2: Core (depends on T001)
- [x] T002 [P] Write the failing regression check in
  `scripts/test-siteping-browser.cjs`: a phone-profile page, annotate mode, toolbar
  and contact-form assertions, `--no-sandbox` launch.
- [x] T003 [P] Scope the contact-form control rules to `form` in
  `_includes/assets/css/inline.css`.
- [x] T004 [P] Add `test:siteping` and call it from `test` in `package.json`.

## Phase 3: Validation (depends on T002, T003, T004)
- [x] T005 Rebuild. Confirm T002 fails without T003 and passes with it, compare
  the contact-form styles with T001's baseline, and take after screenshots
  of the toolbar and the opened comment popup at 393px.
- [x] T006 Run `npm test` and `npm run typecheck`, and record the results
  in `specs/vk/91b3-fix-siteping-ui/validation.md`.
