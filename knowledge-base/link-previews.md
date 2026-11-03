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

## What Slack actually sends

Captured on 2026-11-02 with a temporary Worker route (PR #189, since
removed) that logged request headers, read back with `wrangler tail`.
Workers Logs is off for this Worker, so `wrangler tail` (with the account's
`CLOUDFLARE_API_TOKEN`) is how to see live requests. Static assets don't run
the Worker, so a probe needs its own route in `run_worker_first`.

- Page: `User-Agent: Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)`,
  `Accept: */*`, `Accept-Encoding: gzip, br` and `Range: bytes=0-32768`, from
  AWS (AS14618). Slack reads only the first 32 KB of HTML. The og tags sit
  within the first kilobyte of every page; keep them before the inline CSS.
  Cloudflare ignored the Range header on `/resume/` and returned all 17 KB
  with a 200.
- Image: two fetches, both from AWS and both with `Accept: */*`,
  `Accept-Encoding: gzip, br` and no Range or cookies. One was
  `Slackbot 1.0 (+https://api.slack.com/robots)`, the other
  `Slack-ImgProxy (+https://api.slack.com/robots)`, from different addresses.
- No Accept-Language, Referer or Sec-Fetch headers from Slack's servers.
- The same share also brought requests from the sender's own Mac, with a
  `facebookexternalhit/1.1 Facebot Twitterbot/1.0` page user agent and a
  `com.apple.WebKit.Networking` image fetch. That's the macOS client making
  its own preview, not Slack. Don't mistake it for Slack's crawler.
