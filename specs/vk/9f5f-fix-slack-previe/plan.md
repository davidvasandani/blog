# Implementation Plan: Slack link preview image

**Spec**: `./spec.md`
**Status**: Ready

## Technical Context
Eleventy 3.1.7 static site on Cloudflare Workers assets. `@11ty/eleventy-img`
7.1.0 is a direct dependency and bundles sharp. Open Graph tags live in
`_includes/components/head.njk`. Workers Builds runs `npm run workers:build`,
which includes the Eleventy build, so a file generated during the build ships
with the site.

## Architecture & Approach
1. `.eleventy.config.images.js` gets an `eleventy.before` hook. It calls
   `Image('authors/david-vasandani.jpg', { widths: [600], formats: ['jpeg'],
   outputDir: <output>/img/og, filenameFormat: () => 'david-vasandani.jpg',
   sharpJpegOptions: { quality: 82, mozjpeg: true } })`. The output path comes
   from the event's `directories.output`. sharp drops the input metadata and
   writes sRGB by default. The Gemini config doesn't load this file, so
   `_gemini` is unaffected. (FR-1, FR-3)
2. `_includes/components/head.njk`: the default `ogImageUrl` becomes
   `/img/og/david-vasandani.jpg`. In the default branch, declare
   `og:image:width`/`og:image:height` as 600 and `og:image:type` as
   `image/jpeg`. The `ogImage` override branch doesn't change. (FR-2, FR-4,
   FR-5)
3. `tests/frontend.test.cjs`: in the Open Graph test, read the home page's
   og:image file. Assert it is under 300 KB, and use the eleventy-img
   dependency's bundled sharp to check that its metadata width, height and
   format match the declared tags. (Acceptance criteria)
4. `knowledge-base/link-previews.md` plus its index line.

## Data Model
Not applicable.

## Contracts
Head tags, default branch:
- `og:image` = `https://david.vasandani.me/img/og/david-vasandani.jpg`
- `og:image:type` = `image/jpeg`, `og:image:width` = `og:image:height` = `600`
- `og:image:alt` = `Photo of David Vasandani`, `twitter:card` = `summary`

## Research Notes
See `./research.md`.

## Constitution Check
- 1: changes only Blog templates, build config and tests. Pass.
- 2: `/authors/david-vasandani.jpg` stays published, and page content and
  Gemini output don't change. Only the `<head>` tag values change. Pass.
- 3/4: a deterministic build-output test, with no network or credentials.
  Pass.
- 5: no new dependency. sharp comes in through the declared eleventy-img, and
  the test requires it through eleventy-img's path. Pass.
- 6: specs stay out of `_site` (the existing test checks this). Pass.
- 8: the derived image is built during the build and never committed, so
  there's no drift to check. Pass.
- 9: Codex review, knowledge update, PR. Planned.

## Risks & Dependencies
- Slack caches unfurls per URL, so old shares can keep the blank card.
  Check with a new URL.
- If the real cause were Cloudflare blocking Slack's image proxy, a smaller
  file wouldn't fix it. The live check after deploy settles that, and the
  knowledge page records the result.
- eleventy-img writes once per build. `--serve` reruns the hook, which is
  cheap because of its cache.
