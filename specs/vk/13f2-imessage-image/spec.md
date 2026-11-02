# Feature Specification: Link previews (og:title and og:image)

**Feature dir**: `specs/vk/13f2-imessage-image/`
**Status**: Clarified

## Summary
A link to david.vasandani.me sent in iMessage shows a bare URL card: no
picture and no real title. The pages carry no Open Graph metadata, which
iMessage and most chat and social apps read to build previews. Every page
should tell those apps what title and image to show, so a shared link looks
like it belongs to David.

## User Stories
- As David, when I text someone a link to a post or my resume, I want the
  preview to show my photo and the page's title.
- As someone receiving that link, I want to see what it is before I tap it.
- As David, I want to give a post its own preview picture later without
  touching templates.

## Functional Requirements
- FR-1: Every public HTML page declares a preview title. Pages use their own
  title; the home page uses the site name, not "Home".
- FR-2: Every public HTML page declares a preview image as an absolute
  https URL on david.vasandani.me that points to a published file.
- FR-3: The default preview image is David's existing headshot, with alt
  text and its pixel size.
- FR-4: A page or post can name its own preview image and alt text in front
  matter.
- FR-5: Pages also declare a description (a post uses its summary when it
  has no separate meta description), canonical page URL, site name and
  type (article for posts, website otherwise), and a card hint
  for apps that use Twitter card tags.
- FR-6: Titles and descriptions with quotes or ampersands don't break the
  page markup.
- FR-7: Visible content, URLs, the resume and Gemini output don't change.

## Out of Scope
- Generated per-post social cards with text.
- Hosting, DNS or cache changes on Cloudflare.

## Acceptance Criteria
- [ ] Built home, post, about and resume pages contain og:title, og:image,
  og:image:alt, og:description, og:url, og:site_name, og:type and
  twitter:card.
- [ ] Each og:image starts with `https://david.vasandani.me/` and the path
  exists in `_site`.
- [ ] The home page's og:title is "David Vasandani".
- [ ] `npm test` passes.

## Clarifications
- Which image? No image file was attached to the task; "iMessage image"
  names the place the preview shows. Use the committed headshot
  `authors/david-vasandani.jpg` (1528x1528), already published at
  `/authors/david-vasandani.jpg`. David can swap it later with front
  matter (FR-4) or by changing one default.
- Square or 1.91:1? Square. Cropping the headshot to 1.91:1 cuts the face,
  and a new composed card would be a generated artifact (constitution 8).
  iMessage shows square images as a large preview. Because X-style
  `summary_large_image` crops to 2:1, the card hint is `summary`, which
  shows a square thumbnail.

## Open Questions
None.
