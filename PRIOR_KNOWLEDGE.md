# Prior knowledge: link previews (task 13f2)

Searched `knowledge-base/` for head, meta, metadata, social, preview, image
and passthrough notes. No page covers Open Graph or `<head>` metadata; this is
new ground. Related facts:

## Site and hosting (cloudflare-hosting.md)
- The site is `https://david.vasandani.me`, served by a Cloudflare Worker.
  Always Use HTTPS is on, so absolute `https://` URLs are correct.
  `_data/metadata.json` already holds `url: https://david.vasandani.me`.
- Pa11y audits all public HTML on `npm test`; head-only changes don't affect it.

## Images (diagrams-mermaid.md, dependency-testing.md)
- The eleventy-img transform rasterises every `<img>` in HTML output. `<meta>`
  tags are not `<img>`, so an og:image URL is left alone.
- `static/img` and `authors/*.jpg` are passthrough-copied. The headshot
  `authors/david-vasandani.jpg` is published at `/authors/david-vasandani.jpg`.
- Constitution 8: committed generated artifacts need a source, command and
  drift check. Reusing the existing headshot avoids adding one.

## Pages (projects.md, resume-rendercv.md)
- Every page uses `layouts/base.njk` → `components/head.njk`.
- `/resume/` only exists when RenderCV output is present.
- The Gemini build ignores `pages/**` and has its own templates, so head
  changes don't reach Gemini output.
