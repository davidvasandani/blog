# Link previews (Open Graph)

Tasks: 13f2dbd4-b8af-4925-aa6a-55f7ef3f57a7 (iMessage image); 9f5f-fix-slack-previe (Fix Slack Preview), 2026-11-02.

`_includes/components/head.njk` emits Open Graph tags on every page that uses
`layouts/base.njk`, so iMessage, Slack and Mastodon show a title and picture.

- og:title is the page `title`. The home page's title is "Home", so `/` uses
  `metadata.title` instead.
- og:description is `metaDescription`, then a post's `summary`, then the site
  default. Posts set `summary`, not `metaDescription`, so the plain
  `<meta name="description">` on posts is still the site default.
- og:image must be absolute (iMessage ignores relative URLs). It is
  `metadata.url` plus a site-root path. The default is
  `/img/og/david-vasandani.jpg`, a 600x600 baseline JPEG of about 55 KB that
  the build makes from `authors/david-vasandani.jpg`. It's square, so
  `twitter:card` is `summary`; `summary_large_image` would crop the face.
- Per-page override: front matter `ogImage` (path starting with `/`) and
  `ogImageAlt`. Don't use `image`: `authors/*.md` already use it for the
  author photo without a leading slash.
- `<meta>` URLs are not `<img>`, so the eleventy-img transform leaves them
  alone. The Gemini build has its own includes and is unaffected.
- `tests/frontend.test.cjs` checks titles, types, URLs and that every
  page's og:image path exists in `_site`.
- iMessage and Slack cache a preview per URL. Links shared before a change
  can keep the old card, so test with a new URL (for example `?v=2`).

## Keep the preview image small (Slack)

The original 1528px, 714 KB headshot gave a Slack card with a title and
description but a grey image placeholder. The unfurl had no image, though the
file returned 200 for Slack's user agents. Slack's image proxy, WhatsApp
(about 300 KB) and others give up on large preview images.

- An `eleventy.before` hook in `.eleventy.config.images.js` runs eleventy-img
  on the headshot (width 600, JPEG quality 82, a fixed file name, output to
  `_site/img/og/`). It is rebuilt every build and never committed, so
  constitution principle 8 needs no drift check.
- Don't use sharp's `mozjpeg: true` here: it forces a progressive JPEG.
  Baseline is the safest choice for unfurlers.
- The default branch of `head.njk` declares `og:image:type`, width and height.
  If the size in the hook changes, change those tags too. The frontend test
  compares them with the file's sharp metadata and keeps it under 300 KB.
- `/authors/david-vasandani.jpg` stays published for the author page.
