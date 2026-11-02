# Feature Specification: Slack link preview image

**Feature dir**: `specs/vk/9f5f-fix-slack-previe/`
**Status**: Clarified

## Summary
When David pastes https://david.vasandani.me/resume into Slack, the preview
card shows the title "Resume" and the description, but the picture is a grey
placeholder. The page names his headshot as its preview image. That file is
the full-size 1528x1528 photo, about 714 KB with its camera metadata still in
it, and Slack's image fetcher doesn't use it. Every page should name a small
picture made for previews, so Slack, WhatsApp and iMessage show his photo.

## User Stories
- As David, when I share a link to my resume or a post in Slack, I want the
  preview to show my photo, not an empty box.
- As someone receiving the link in Slack or WhatsApp, I want a preview that
  looks finished.

## Functional Requirements
- FR-1: Every page's default preview image is a small version of David's
  headshot made for link previews, under 300 KB, the limit of the strictest
  common app (WhatsApp).
- FR-2: The preview image's declared width, height and type match the
  published file.
- FR-3: The preview image comes from the committed headshot on every build,
  so changing the headshot changes the preview.
- FR-4: Pages that name their own preview image in front matter keep
  working.
- FR-5: The preview image URL stays absolute and on david.vasandani.me.

## Out of Scope
- Cloudflare zone, WAF, cache or DNS changes.
- Changing the author page photo or its URL, page content, the resume or
  Gemini output.
- Generated text cards for each post.

## Acceptance Criteria
- [ ] The built pages' `og:image` points to the new preview image, an
      absolute URL.
- [ ] The published preview image is under 300 KB, and its real pixel size
      equals the declared `og:image:width` and `og:image:height`.
- [ ] `npm test` passes.
- [ ] After deploy, the live `/resume/` page names the small image, and the
      image URL returns 200 `image/jpeg`.
- [ ] A fresh Slack share of the resume link shows the photo. (Slack caches
      unfurls, so use a URL Slack hasn't seen.)

## Clarifications
No answers came with the task, so these follow earlier decisions and the
screenshot.
- Card shape: a square thumbnail (`summary`). The headshot is square, and
  task 13f2 chose `summary` because a wide crop cuts off the face. The Slack
  card in the screenshot already has a square thumbnail slot.
- Size: 600x600 JPEG. That's above Slack's and Facebook's minimums for a
  square thumbnail, sharp on high-density screens at Slack's roughly 75 to
  150 px thumbnail, and well under 300 KB.

## Open Questions
None.
