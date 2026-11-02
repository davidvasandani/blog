# Link previews (Open Graph)

Task: 13f2dbd4-b8af-4925-aa6a-55f7ef3f57a7 (iMessage image), 2026-11-02.

`_includes/components/head.njk` emits Open Graph tags on every page that uses
`layouts/base.njk`, so iMessage, Slack and Mastodon show a title and picture.

- og:title is the page `title`. The home page's title is "Home", so `/` uses
  `metadata.title` instead.
- og:description is `metaDescription`, then a post's `summary`, then the site
  default. Posts set `summary`, not `metaDescription`, so the plain
  `<meta name="description">` on posts is still the site default.
- og:image must be absolute (iMessage ignores relative URLs). It is
  `metadata.url` plus a site-root path. Default: the headshot
  `/authors/david-vasandani.jpg` (1528x1528, about 700 KB). Square, so
  `twitter:card` is `summary`; `summary_large_image` would crop the face.
- Per-page override: front matter `ogImage` (path starting with `/`) and
  `ogImageAlt`. Don't use `image`: `authors/*.md` already use it for the
  author photo without a leading slash.
- `<meta>` URLs are not `<img>`, so the eleventy-img transform leaves them
  alone. The Gemini build has its own includes and is unaffected.
- `tests/frontend.test.cjs` checks titles, types, URLs and that every
  page's og:image path exists in `_site`.
- iMessage caches a preview per URL. Links shared before a change can keep
  the old card. Some apps (WhatsApp) cap preview images around 300 KB; make a
  smaller derivative if that matters.
