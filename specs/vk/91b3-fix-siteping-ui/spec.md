# Feature Specification: Fix SitePing UI on phones

**Feature dir**: `specs/vk/91b3-fix-siteping-ui/`
**Status**: Clarified

## Summary
When a signed-in editor starts a SitePing annotation on a phone, the toolbar
at the top of the page breaks. The instruction "Tap an element or drag to
select an area" wraps one word per line, and a full-width Cancel pill covers
it (David's iPhone screenshot on /resume/, 2026-11-02). The Blog's contact-form
styles apply to every input, textarea and button on the page, including
SitePing's controls, which live in the page rather than in the widget's own
isolated area. Editors can't read the instruction, and the comment box gets
the same styles. The Blog's styles should stop reaching SitePing, and readers
should see no change.

## User Stories
- As an editor on my phone, I want the annotate toolbar to show its
  instruction on one or two readable lines with a normal-sized Cancel
  button, so I know what to do and can back out.
- As an editor, I want the comment box and its buttons to look the way
  SitePing designed them, not like the contact form.
- As a reader, I want the contact form and every page to look exactly as
  they do today.

## Functional Requirements
- FR-1: The Blog's form-control styles apply only to the Blog's own form
  controls, not to controls that SitePing adds to the page.
- FR-2: On a phone-width touch screen (393px), the annotate toolbar's Cancel
  button keeps its own size. It doesn't fill the row, and the instruction
  text gets most of the row's width.
- FR-3: The contact form's fields and Send button keep the same size,
  spacing, font, border and colors at phone and desktop widths.
- FR-4: Public readers still don't load SitePing. Sign-in, cross-tab logout
  and the feedback API don't change.
- FR-5: An automated browser check covers FR-2 and FR-3 and runs as part of
  the Blog's normal test command, so CI catches a regression.

## Out of Scope
- Changing or forking the SitePing package, or asking upstream for a fix.
- Restyling SitePing to match the Blog.
- Other services and other repositories.

## Acceptance Criteria
- [ ] At a 393px iPhone viewport, in annotate mode, Cancel is narrower than
      half the toolbar and the instruction text is at least 200px wide.
- [ ] A before/after screenshot shows the instruction on at most two lines.
- [ ] The contact form's computed styles match the pre-change baseline.
- [ ] `npm test` runs the browser check and passes; `npm run typecheck`
      passes.

## Clarifications
Session 2026-11-02. No answers came with the command; these are the
defaults chosen, with reasons.
- Q: Should the browser check also cover the comment popup? A: The
  automated check covers the toolbar, which is the reported bug, and the
  contact form. The popup's controls get the same fix (no `<form>` around
  them), and a screenshot of the opened popup at phone width checks them
  during validation. Opening the popup takes a synthetic tap-and-select
  through the widget's overlay, which would make the test brittle.
- Q: Should the browser check run in `npm test`? A: Yes. A regression check
  that nothing runs doesn't protect anything. CI already runs `npm test` with
  Chrome for the accessibility audit, and the check mocks the SitePing API,
  so it stays deterministic and needs no credentials (constitution 3, 4).
  The existing mount and logout checks in the same script run there too.

## Open Questions
None.
