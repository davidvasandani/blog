# Tasks: Link previews (og:title and og:image)

**Plan**: `./plan.md`

## Layer 1 (independent files, parallel-safe)
- [x] T001 [P] Add Open Graph and Twitter card tags to `_includes/components/head.njk` (FR-1 to FR-6).
- [x] T002 [P] Add a build-output test for the tags to `tests/frontend.test.cjs` (acceptance criteria).

## Layer 2 (depends on T001, T002)
- [x] T003 Build and inspect `_site/index.html`, a post and `_site/about/index.html` heads; confirm image paths exist in `_site` and Gemini output is unchanged (FR-7). No file changes.
- [x] T004 Run `npm test` (includes Pa11y) and record the result in `specs/vk/13f2-imessage-image/validation.md`.
