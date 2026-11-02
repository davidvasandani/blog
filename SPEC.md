# Link previews: og:title and og:image

Task: 13f2 (iMessage image)

## Problem
When a blog link is pasted into iMessage, the preview has no picture and no
proper title. The site's `<head>` (`_includes/components/head.njk`) has only
`<title>` and `<meta name="description">`. There are no Open Graph tags, so
iMessage (and Slack, Mastodon, LinkedIn) fall back to a bare URL card.

## Goal
Every HTML page on david.vasandani.me carries Open Graph tags so link previews
show an image and a title.

## Requirements
1. Every page built from `layouts/base.njk` emits, in `<head>`:
   - `og:title`: the page's `title`. The home page (whose title is "Home")
     uses the site name, `metadata.title` ("David Vasandani").
   - `og:image`: an absolute `https://david.vasandani.me/...` URL. iMessage
     ignores relative URLs.
   - `og:image:alt`, `og:image:width`, `og:image:height`.
   - `og:description`: the meta description, falling back to a post's
     `summary` before the site default,
     `og:url` (absolute canonical URL of the page), `og:site_name`,
     `og:type` (`article` for posts, `website` otherwise).
   - `twitter:card` set to `summary` (the image is square; see `specs/vk/13f2-imessage-image/spec.md`).
2. Default image: David's existing headshot, `authors/david-vasandani.jpg`
   (1528x1528 JPEG, already copied to `/authors/david-vasandani.jpg`). No new
   generated artifact.
3. A page or post can override the image with front matter `ogImage` (a
   site-root path) and `ogImageAlt`. Width/height are only emitted for the
   default image, whose size is known.
4. Values are HTML-escaped (titles with quotes or `&` must not break markup).
5. Nothing else changes: visible page content, URLs, Gemini output, resume.

## Out of scope
- Per-post generated social cards.
- Changes to Cloudflare, DNS or any other service.

## Acceptance
- Built `_site/index.html`, a post, and `/resume/` contain the tags above
  with absolute image URLs that resolve to a file in `_site`.
- `npm test` passes, including a new test in `tests/frontend.test.cjs`.
