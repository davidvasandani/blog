# Prior knowledge: Fix the Slack link preview

Searched `knowledge-base/` for link previews, Open Graph, Slack, og:image,
images and Cloudflare. Relevant pages:

## link-previews.md (task 13f2, iMessage image)
- `_includes/components/head.njk` emits the Open Graph tags for every page
  that uses `layouts/base.njk`.
- og:image must be absolute: `metadata.url` plus a path from the site root.
  The default is the headshot `/authors/david-vasandani.jpg` (1528x1528,
  about 700 KB), which is square, so `twitter:card` is `summary`.
- Pages override the image with `ogImage`/`ogImageAlt` front matter. Don't
  use `image`, which `authors/*.md` already use.
- `<meta>` URLs aren't touched by the eleventy-img transform. The Gemini build
  has its own includes.
- `tests/frontend.test.cjs` checks the tags and that each og:image file exists
  in `_site`.
- Already flagged: some apps cap preview images around 300 KB ("make a
  smaller derivative if that matters"). That is the gap this task closes.
- Apps cache previews per URL.

## cloudflare-hosting.md
- The site is a Cloudflare Worker serving static assets from `_site`.
  `static/img` is copied through as-is. Zone settings are changed in the
  dashboard, not from the repo.

## dependency-testing.md / diagrams-mermaid.md
- eleventy-img (and sharp) is installed. Images inside `<img>` tags get
  transformed, but passthrough files are served byte for byte.

## Implications
- Fix it in the repo by publishing a small, purpose-made preview image. No
  hosting changes.
- Keep the `ogImage` override and the summary card.
