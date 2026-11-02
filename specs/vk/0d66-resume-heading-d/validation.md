# Validation: Resume Heading Design (task 0d66)

Date: 2026-11-02. RenderCV 2.8 output rendered locally; Chromium 149 for
Pa11y and screenshots.

- `npm test`: 53 tests pass, 0 fail. Includes the three new
  `renderResume()` tests (entry header, year-only and no-date entries,
  escaping), the one-h1 outline test and the published-page test.
- Pa11y (WCAG2AA): "Public-page accessibility audit passed (26 pages)",
  including `/resume/`. Colours: meta #6b5750 at 6.09:1 on #FFF0EB; label
  and eyebrow #9a3412 at 6.58:1 on #FFF0EB and 5.99:1 on the callout tint
  #fbe4db.
- `npm run resume:voice`: no mechanical voice problems. The YAML is
  unchanged, so there was no wording for `/voice` to review.
- SitePing browser check (part of `npm test`) still passes; the new rules
  are scoped under `.resume` / `.resume-*` and `.visually-hidden`.
- Built HTML: all 7 roles get the eyebrow and one meta line; both Open
  Source entries get a "2026" meta line; the Projects entry keeps its
  summary sentence as a paragraph and gets no meta line.
- Screenshots before and after at 1280px and 393px: the first role header
  (heading to end of theme) went from about 205px to about 155px tall at desktop, including the
  theme callout. On a phone the meta line wraps after a separator, never
  before one.
