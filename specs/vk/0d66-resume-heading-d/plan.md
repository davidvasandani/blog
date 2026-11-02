# Implementation Plan: Resume Heading Design

**Feature dir**: `specs/vk/0d66-resume-heading-d/` | **Spec**: `spec.md` |
**Research**: `research.md`

## Summary
Restyle each `/resume/` entry header. A markdown-it core rule in
`scripts/resume-page.cjs` regroups RenderCV's tokens (company eyebrow,
one meta line, theme callout); scoped CSS in
`_includes/assets/css/inline.css` styles them. No YAML, PDF or URL change.

## Technical Context
Node 24, Eleventy, markdown-it (already a dependency). RenderCV 2.8 output
is only needed to build the real page; unit tests use inline Markdown
fixtures. Pa11y 10 audits the built page.

## Constitution Check
- 1 Scope: Blog repo only. Pass.
- 2 Preserve URLs/content: same words, same URL, same PDF. Pass.
- 3/4 Tests: deterministic unit tests on fixtures; no network. Pass.
- 5 Dependencies: none added. Pass.
- 6 Published outputs: specs stay unpublished. Pass.
- 7 Non-Node tooling: RenderCV use unchanged. Pass.
- 9 Ship: local validation, Codex review, knowledge page, PR. Planned.
- 10 Voice: YAML untouched; `npm run resume:voice` still runs. Pass.

## Design
### Markup (per entry)
```html
<h3><span class="resume-org">Sweetgreen</span><span class="visually-hidden">, </span><span class="resume-role">Senior Manager, ...</span></h3>
<p class="resume-meta"><span>Feb 2026 – present</span><span>10 months</span><span>Culver City, CA</span></p>
<p class="resume-theme"><span class="resume-label">Theme:</span> Running IT operations, ...</p>
```
Headings without `**Company**, ` keep their markup. Paragraphs that aren't
meta or theme are untouched.

### Transform (`scripts/resume-page.cjs`)
- `resumeLayout(md)`: registers a core rule after `inline`.
- Meta: after `heading_close` for h3, scan `paragraph_open, inline,
  paragraph_close` triples whose inline has exactly one `text` child not
  ending in "."; stop at the first other token. Keep the run up to the last
  date/duration match (`/\b(19|20)\d{2}\b|present/i` or
  `/^\d+ (years?|months?)( \d+ months?)?$/`). Replace with one paragraph:
  html_inline span wrappers around the original text tokens, ordered dates,
  duration, others.
- Eyebrow: h3 inline children `strong_open, text, strong_close, text(", …")`.
- Theme: paragraph inline exactly `strong_open, text("Theme: …"),
  strong_close`.
- Export `renderResume(markdown)` for tests; `readResume()` uses it.

### Styles (`inline.css`)
`.resume-org` block, 0.75em, uppercase, letter-spacing, #9a3412;
`.resume-role` block; h3 gets top margin via `.resume-org` presence
(`h3:has(.resume-org)` avoided; the rule targets `main h3` only inside the
resume via a wrapper class `.resume` added in `pages/resume.njk`).
`.resume-meta` 0.9em, #6b5750, `margin-top: -0.5em`, flex-wrap with gaps.
`.resume-theme` left border 3px #9a3412, tint #fbe4db, padding.
`.visually-hidden` standard clip pattern.

## Files
- `scripts/resume-page.cjs` (transform)
- `pages/resume.njk` (wrap body in `<div class="resume">`)
- `_includes/assets/css/inline.css` (scoped styles)
- `tests/resume.test.cjs` (unit tests)

## Verification
Render, build, screenshot 1280px and 393px; `npm test` with Chromium.
