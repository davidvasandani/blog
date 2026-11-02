# Technical spec: Fix the Slack link preview

Task: 9f5f-fix-slack-previe (workspace 9f5f0cb3-66d7-4f4a-a5ca-39c972674950), 2026-11-02.

## Problem
A link to https://david.vasandani.me/resume pasted into Slack unfurls with the
title "Resume" and the description, but the thumbnail is a grey image
placeholder. The Slack message's unfurl data has no image.

## Findings
- The page HTML is correct: `og:image` is the absolute URL
  `https://david.vasandani.me/authors/david-vasandani.jpg` with width/height
  1528 and alt text (added in PR #181).
- The image returns 200 `image/jpeg` for the Slackbot and Slack-ImgProxy user
  agents. It is 1528x1528 and 713,610 bytes, and it still carries EXIF data.
- Slack fetches the image separately through its image proxy, which gives up
  on large files. Guidance for Slack, WhatsApp and others is to keep the
  preview image well under 1 MB, and WhatsApp's limit is about 300 KB. A
  714 KB, 2.3 MP original is the likely reason the thumbnail is blank.

## Change
1. Add a dedicated preview image, `/img/og/david-vasandani.jpg`: the
   headshot resized to 600x600, baseline sRGB JPEG with metadata stripped,
   well under 100 KB. An `eleventy.before` hook in
   `.eleventy.config.images.js` builds it from `authors/david-vasandani.jpg`
   with `@11ty/eleventy-img` (a direct dependency) on every build. Nothing
   generated is committed, so there's nothing to drift (constitution
   principle 8).
2. `_includes/components/head.njk`: make the default `og:image` that file,
   declare width/height 600, and add `og:image:type` `image/jpeg`. Keep
   `twitter:card` `summary`, because the image is square. The `ogImage`
   front matter override still works.
3. `tests/frontend.test.cjs`: the default preview image must be under 300 KB,
   and its real pixel size must match the declared `og:image:width/height`.
4. Update `knowledge-base/link-previews.md`.

## Non-goals
- No Cloudflare zone, WAF or cache changes.
- The author page photo (`/authors/david-vasandani.jpg`) stays unchanged.
- No resume wording changes.

## Verification
- `npm test` passes.
- After deploy, the live `og:image` URL returns a small JPEG. Slack caches
  unfurls per URL for about 30 minutes, so reshare or use a fresh URL
  (e.g. `/resume/?v=2`) to see the new card.
