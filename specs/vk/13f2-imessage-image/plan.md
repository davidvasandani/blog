# Implementation Plan: Link previews (og:title and og:image)

**Spec**: `./spec.md`
**Status**: Ready

## Technical Context
Eleventy 3 with Nunjucks templates (autoescape on). Every public page uses
`_includes/layouts/base.njk`, which includes `_includes/components/head.njk`.
`_data/metadata.json` has `title` ("David Vasandani") and `url`
(`https://david.vasandani.me`). `section` is set to `post` by
`layouts/post.njk` front matter and is already read by `base.njk`. The Gemini
build uses `gemini/_includes` and ignores `_includes/**`.

## Architecture & Approach
- `_includes/components/head.njk` (FR-1 to FR-6): compute
  - `ogTitle`: `metadata.title` if `page.url == "/"`, else `title or metadata.title`.
  - `ogDescription`: the expression the description meta already uses.
  - `ogImageUrl`: front matter `ogImage` or `/authors/david-vasandani.jpg`,
    emitted as `metadata.url + ogImageUrl`.
  - alt: front matter `ogImageAlt`, else "Photo of David Vasandani" for the
    default image, else `ogTitle`.
  - Width/height 1528 only when no `ogImage` override.
  - `og:url` = `metadata.url + page.url`; `og:type` = `article` when
    `section == "post"`.
  - `twitter:card` = `summary`.
  Nunjucks autoescape covers FR-6. The eleventy-img transform only touches
  `<img>`, so meta URLs are untouched.
- `tests/frontend.test.cjs`: build-output test (acceptance criteria).
- FR-7: no other file changes.

## Data Model
Two optional front matter fields: `ogImage` (site-root path starting with
`/`) and `ogImageAlt`. Not `image`: `authors/*.md` already use `image` for
the author photo (a path without a leading slash), and a clash would emit
a broken URL. No research or contracts files needed: no new
dependency or API.

## Constitution Check
1 Blog only. 2 Head-only addition; URLs, content, Gemini unchanged. 3/4
Deterministic build-output test. 5 No new dependency. 6 Specs not published
(`.eleventyignore` lists `specs/`). 8 No generated artifact: reuses the
committed headshot. 9 Local validation, Codex review, knowledge page, PR.
10 No resume wording change.

## Risks & Dependencies
- iMessage caches previews per URL; already-shared links may show the old
  card until the cache expires. Not fixable from the site.
- The headshot is 713 KB. iMessage accepts it; some apps cap at ~300 KB
  (WhatsApp). Acceptable for the stated goal; noted for later.
