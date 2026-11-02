# Feature Specification: Resume Heading Design

**Feature dir**: `specs/vk/0d66-resume-heading-d/`
**Status**: Clarified

## Summary
On `/resume/`, every role starts with five or six stacked blocks: a bold
"Company, Title" heading, then the location, the dates and the duration
each on their own line with full paragraph spacing, then a bold "Theme:"
sentence. David's screenshot (2026-11-02, SitePing note "Improve the
formatting.") shows one role header filling a third of the screen. Readers
scanning the page can't quickly see where and when each role was. The
header should be compact and easy to scan, with the same words.

## User Stories
- As a hiring manager skimming the resume, I want each role's company,
  title, dates and length on two or three tight lines, so I can scan the
  career history quickly.
- As a reader on a phone, I want the same compact header without awkward
  wrapping.
- As a screen reader user, I want the headings and text to read the same
  words as before.
- As David, I want the resume's wording, the PDF and the URL unchanged.

## Functional Requirements
- FR-1: In each entry, the location, dates and duration appear together on
  one muted line under the title, in the order dates, duration, location,
  separated by a visual divider that isn't announced as text.
- FR-2: When a heading names a company and a title, the company shows as a
  small label above the title. The heading still reads "Company, Title" to
  assistive technology and in the page outline.
- FR-3: The "Theme:" line shows as an accented callout with "Theme:" as a
  label and the sentence in normal weight.
- FR-4: Entries without a company/title split, a date or a theme
  (Open Source, Projects, Skills) still render correctly. A sentence is
  never mistaken for a location or date.
- FR-5: Resume text is still escaped; no resume string can inject markup.
- FR-6: The page passes the site's accessibility audit (WCAG 2 AA),
  including text contrast for the muted line and label.
- FR-7: The new styles don't reach elements outside the resume content,
  including the SitePing widget that lives in the page.
- FR-8: The resume YAML, the PDF and the page URL don't change.

## Acceptance Criteria
- A rendered Sweetgreen role shows: SWEETGREEN label; the title as the
  heading; "Feb 2026 – present · 10 months · Culver City, CA" on one line;
  the theme callout; then the summary and bullets.
- At 393px wide the header stays readable with no overlap.
- Automated tests cover FR-1 to FR-5; `npm test` passes, including the
  accessibility audit and the voice check.

## Out of Scope
- Grouping several roles under one company heading.
- The PDF's design, the contact list and the Summary section.
- Any wording change to the resume.

## Clarifications
### Session 2026-11-02
- Q: What counts as meta (location, dates, duration)? A: The plain lines
  RenderCV writes right after an entry heading, up to the last one that is
  a date range, a year or a duration. A line ending in a period, or one
  with bold or links, is never meta. An entry with no date line has no
  meta line (Projects keeps its summary sentence as a paragraph).
- Q: Dates on the right of the title, or under it? A: Under it, on the
  meta line. The page column is about 600px and titles are long, so a
  right column would wrap on most roles and on every phone.
- Q: Does "Theme:" stay in the text? A: Yes, as the label. Words don't
  change (FR-8).
- Q: Should the repeated Sweetgreen roles merge under one company?
  A: No, out of scope. The eyebrow makes the repetition light.

## Open Questions
None. The SitePing note asks for better formatting without naming a
layout; this spec chooses one, and David can adjust it in review.
