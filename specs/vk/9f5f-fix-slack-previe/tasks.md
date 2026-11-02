# Tasks: Slack link preview image

**Plan**: `./plan.md`

## Layer 1 (independent files)
- [x] T001 [P] Build the 600x600 preview JPEG from the headshot in an `eleventy.before` hook. File: `.eleventy.config.images.js`
- [x] T002 [P] Point the default og:image at `/img/og/david-vasandani.jpg` and declare 600x600 and `image/jpeg`. File: `_includes/components/head.njk`
- [x] T003 [P] Test that the default preview image is under 300 KB and that its real size and format match the tags. File: `tests/frontend.test.cjs`

## Layer 2 (depends on T001 to T003)
- [x] T004 Run `npm test` and record the results. File: `specs/vk/9f5f-fix-slack-previe/validation.md`

## Layer 3 (depends on T004)
- [x] T005 Record the knowledge. Files: `knowledge-base/link-previews.md`, `knowledge-base/index.md`
