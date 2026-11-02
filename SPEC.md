# Tidy the resume page's role headings

Task: 0d66 (Resume Heading Design)

## Problem
On `/resume/`, each role heading takes five or six stacked blocks (David's
screenshot, 2026-11-02, SitePing note "Improve the formatting."):

```
Sweetgreen, Senior Manager, IT Infrastructure & Innovation   <h3>
Culver City, CA                                              <p>
Feb 2026 – present                                           <p>
10 months                                                    <p>
Theme: Running IT operations, ...                            <p><strong>
Promoted from ...                                            <p>
```

RenderCV's Markdown output puts the location, dates and duration on separate
lines, and `scripts/resume-page.cjs` renders each as its own paragraph with
full paragraph spacing. The page is hard to scan: the facts a reader wants
(where, when, how long) are spread over a third of the screen, and the
company and title run together in one bold line.

## Goal
A compact, scannable header for every resume entry, on desktop and phones:

```
SWEETGREEN                                         small caps, muted
Senior Manager, IT Infrastructure & Innovation     the heading
Feb 2026 – present · 10 months · Culver City, CA   one muted meta line
| Theme: Running IT operations, ...                accent bar, not bold
Promoted from ...
```

## Requirements
1. Location, dates and duration that RenderCV writes under an entry heading
   render as one `<p class="resume-meta">`, one `<span>` per item, ordered
   dates, duration, location. Separators come from CSS, not text.
2. In headings of the form `**Company**, Title`, the company renders as a
   small eyebrow line above the title. The heading's text content stays
   "Company, Title" (the comma survives in a visually hidden span), so the
   outline and screen readers read the same words as today.
3. A paragraph that is only `**Theme: ...**` renders as
   `<p class="resume-theme">` with "Theme:" as a label and the sentence in
   normal weight.
4. Entries without these parts (Open Source items with a year only, Projects
   with a summary and no date, Skills) render correctly: a year alone is a
   meta line; a sentence ending in a period is never treated as meta.
5. No resume wording changes. The YAML is untouched, so `/voice` has nothing
   to review; `npm run resume:voice` must still pass.
6. Raw HTML in resume text stays disabled. Only the renderer's own fixed
   markup is injected; every resume string is still escaped.
7. Styles are scoped to the resume classes (no bare element selectors: the
   SitePing widget lives in the page DOM). Text colours meet WCAG AA on the
   page background; Pa11y must pass.
8. The PDF is unchanged (RenderCV's Typst theme is out of scope).

## Out of scope
Grouping several Sweetgreen roles under one company heading; the contact
list and Summary sections; the PDF design.

## Verification
- Unit tests in `tests/resume.test.cjs` for the transform: meta grouping,
  eyebrow split, theme paragraph, no-date entries, escaping.
- Render the resume, build the site, and screenshot `/resume/` at desktop
  and 393px widths.
- `npm test` (includes Pa11y and the voice check).
