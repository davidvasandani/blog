# Implementation Plan: Resume semantic version

Spec: ./spec.md

## Technical Context
Node 24 CommonJS, Eleventy/Nunjucks, and separately installed RenderCV 2.8.

## Architecture & Approach
- `resume/VERSION`: single tracked stable release triplet, initially 1.0.0.
- `scripts/resume-version.cjs`: read and validate the value on each call; throw
  an actionable error for missing/invalid data. No new dependency.
- `scripts/resume.cjs`: replace Git subprocess with shared version read; override
  footer with name, page count and Resume version label. On successful render,
  write the rendered version beside generated files only when both default PDF
  and Markdown have new file identity or modification/change timestamps. Clear that marker before
  rendering so failed renders cannot appear current. Watch performs a successful
  initial render before entering the watcher and captures the version at startup.
- `scripts/resume-page.cjs`: retain missing-PDF/Markdown omission; require rendered
  marker to match the tracked version before returning html, pdfUrl, version.
- `pages/resume.njk`: show version next to download. Marker prevents relabeling an
  old PDF after changing VERSION without rendering again.
- `resume/README.md`: explain bump levels, rebuilds, watch restart and main release.
- `tests/resume.test.cjs`: validate version errors, footer args without Git, marker
  mismatch, and version in built HTML. Existing no-tool fixture copies new helper.

## Data Model & Contracts
VERSION is UTF-8 text containing a numeric triplet, optional surrounding whitespace.
Reader returns a string or throws. Generated `resume-version.txt` stores the value
used for the successful PDF render, never committed or published. The page's
version property is the validated matching value. No API contract changes.

## Research Notes
The package version tracks the blog, not the resume. Git tags are unavailable in
some build environments and are not an appropriate rendering dependency. Explicit
version metadata works in source archives and changes only with resume releases.
No external library or network research required for this local file contract.

## Constitution Check
All ten principles honored: Blog-only, stable URLs/prose, deterministic Node tests,
no dependencies, ignored render artifacts, independent review before PR merge.

## Risks & Dependencies
Authors must bump before releasing changes. Watch mode retains its starting
version; stop/restart after a bump. Existing local output must be regenerated to
supply the version marker. Production already renders before building Eleventy.
