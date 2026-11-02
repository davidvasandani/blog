# Resume semantic version validation

- Installed the locked Node dependencies and pinned RenderCV 2.8 environment.
- `npm test`: 58 tests passed; accessibility passed on 26 public pages; SitePing
  browser checks passed. Used the environment's installed Nix Chromium through
  PUPPETEER_EXECUTABLE_PATH because downloaded Chrome cannot launch here.
- `npm run typecheck`: passed.
- `npm run resume:voice`: passed; resume YAML/prose unchanged.
- `npm run resume -- --dont-generate-png`: rendered successfully. PDF text
  extraction confirms Resume version 1.0.0 on pages 1/3, 2/3, 3/3, retaining name.
- `npm run build`: published HTML displays Resume version 1.0.0 beside download.
- Independent Codex review found that partial/custom renders could incorrectly
  stamp stale default artifacts. Fixed by comparing before/after file identity
  and nanosecond modification/change timestamps for both PDF and Markdown.
- After that fix, `node --test tests/resume.test.cjs`: all 14 tests passed,
  including no Git, alternate version, missing/invalid version, mismatched marker,
  skipped outputs, failed renderer, and watch initialization.
- Real `--dont-generate-pdf --dont-generate-png` invocation confirmed no marker is
  written; a normal render restores it. Rebuilt and repeated resume tests passed.
- `git diff --check`: passed.

Initial local attempts encountered missing RenderCV during installation and the
browser path issue. Both were resolved before the passing checks above.
- Second independent `codex review --uncommitted`: no actionable defects. The
  reviewer inspected the diff read-only; the validation above was run separately.

## Category merge task record

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

## Latest main integration, 2026-10-31

Integrated `fc1b008`, preserving newer role descriptions, PDF footer and retired-host cleanup. Documentation conflicts retain both task records and the current hosting index. Parsed YAML comparison to current main confirms only the Projects grouping differs. Clean installation, résumé rendering, web and Gemini builds, all eight résumé tests, and accessibility across 25 public pages passed. The old Chromium path was absent; the audit passed with installed Chromium 149. Independent Codex review against current main found no actionable regressions and also passed typechecking and API tests.

## Integration with current main, 2026-11-02

Integrated `a2b7777`, retaining current résumé wording, layout, semantic versioning, and all other main changes. Compared parsed YAML against main after joining the two lists: entry content is identical. Bumped `resume/VERSION` from 1.0.0 to 1.0.1 for this grouping/formatting change. Clean installation, voice check, real RenderCV render, web/Gemini builds and all 14 current résumé tests passed. Generated Markdown has one Projects heading and HTML displays 1.0.1. Independent Codex review reported no actionable regressions; its test attempt overlapped dependency installation and could not find tsc.

Accessibility rerun against the completed current build passed for all 26 public pages.

## Signed history refresh

Current main has résumé version 1.1.0. This formatting change advances it to 1.1.1. Preserve the reviewed category change in one GitHub-signed commit based on current main, replacing unsigned task history without changing protections.
