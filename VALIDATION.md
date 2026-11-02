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
