# Validation: merged résumé categories

2026-10-30, VAS-931.

- Parsed YAML deep comparison against HEAD after joining the two lists: identical, with three project entries.
- `npm ci --ignore-scripts`: passed, zero reported vulnerabilities.
- `npm run resume:setup` and `npm run resume -- --dont-generate-png`: passed with pinned RenderCV 2.8.
- `npm run build` and `npm run gemini:build`: passed.
- Markdown and built HTML checks: exactly one Projects heading, no Open Source heading, all three entries in order.
- PDF text inspection: Projects followed by the AI coding platform, SitePing and household platform entries; PDF is three pages and keeps the existing download filename. Poppler emitted a metadata-type diagnostic while successfully extracting text and reporting page information.
- `node --test tests/resume.test.cjs`: 8 passed, 0 failed.
- `npm run test:a11y` with the installed Nix Chromium: passed for all public pages, including the rendered résumé.
- `git diff --check`: passed.

SpecKit analysis found no errors, coverage gaps, or constitution violations. Generated outputs remain ignored. Independent `codex review --uncommitted` completed with no actionable defects. Its test invocation failed in its environment and its YAML probe used the unavailable `yaml` package instead of this repository's `js-yaml`. The main workspace reran the résumé suite afterward: all 8 tests passed.

## Base branch update

Integrated main commit `5a09669` before merging PR #152, preserving the role timeline correction from PR #153. Resolved documentation conflicts by retaining this task's documents and appending the upstream role timeline spec, plan, and constitution review. Parsed YAML comparison against updated main confirms that the only content difference is the category grouping. RenderCV, Eleventy, all eight résumé tests and the public accessibility audit passed again. A second independent Codex review found no actionable regressions; its runtime checks were blocked by subprocess restrictions.
