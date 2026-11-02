# Research: Slack link preview image

## Evidence
- Live `/resume/` HTML has a correct absolute `og:image`, width/height 1528
  and alt text.
- `GET /authors/david-vasandani.jpg` returns 200 `image/jpeg`, 713,610 bytes,
  1528x1528 baseline JPEG with EXIF, for the `Slackbot-LinkExpanding`,
  `Slack-ImgProxy` and curl user agents. Cloudflare doesn't block these user
  agents from this network. Slack's own IPs couldn't be tested.
- Slack search for the shared message (2026-11-02 22:24Z) shows a title and
  text, but the unfurl data has no media.
- Published guidance for Slack previews says to keep og:image under about
  1 MB and confirm it loads. WhatsApp's limit is about 300 KB. The repo's own
  knowledge page had already flagged that a smaller version might be needed.

## Decision
Build a 600x600 JPEG from the committed headshot at build time and make it
the default og:image.

## Alternatives considered
- Commit a resized copy: needs a drift check under constitution principle 8.
  A build-time copy doesn't.
- Shrink `/authors/david-vasandani.jpg` itself: it's also the author page
  photo, and principle 2 asks to keep published content.
- 1200x630 banner with `summary_large_image`: crops the face. Rejected in
  task 13f2.
- Cloudflare WAF/bot changes: out of scope, and there's no evidence of a
  block.
