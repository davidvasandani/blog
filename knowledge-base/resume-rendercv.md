# Resume with RenderCV

Current hosting update (task bd3547c1-520f-493b-a49e-18f32927121c): see [Cloudflare hosting](cloudflare-hosting.md). Provider-specific instructions below are historical.

Task: e51fe535-6eff-4934-a141-6f1fb612dbda (Set up RenderCV in the blog)
Updated: 2026-10-27 (publishing follow-up)

## Layout
The resume source is `resume/David_Vasandani_CV.yaml` (RenderCV 2.8 schema). `resume/requirements.txt` pins `rendercv[full]==2.8`. The `[full]` extra is required for the CLI, the bundled Typst compiler, and fonts. No system TeX or Typst is needed. `scripts/resume.cjs` backs `npm run resume:setup` (creates `resume/.venv`), `npm run resume` and `npm run resume:watch`. It prefers the venv binary, falls back to `rendercv` on PATH, and otherwise exits 1 with setup instructions. Output goes to the gitignored `resume/rendercv_output/` (pdf, png, typ, md, html).

## Boundaries
- `resume/` is in `.eleventyignore`: its README and RenderCV's generated Markdown would otherwise be published by both Eleventy generators. `tests/resume.test.cjs` fails if any resume file reaches `_site` or `_gemini`.
- `npm test` needs no Python. Rendering is checked by a separate `resume` job in `.github/workflows/test.yml`, which uploads the PDF as the `resume` artifact. Get the latest PDF from that artifact, not from git.
- Published (follow-up, 2026-10-27): the Netlify build command runs `npm run resume:setup && npm run resume -- --dont-generate-png` before eleventy. Netlify's image has Python 3.14 through mise, and Typst ships abi3 wheels, so this works. Netlify's dependency cache includes node_modules (including node_modules/.cache) and pip's wheel cache (deploy logs show `Using cached ...whl`), but not ~/.cache/puppeteer or resume/. Most of the ~16s cold setup is unpacking and installing wheels, not downloading them, so the cached venv is what saves time. So `RESUME_VENV=node_modules/.cache/resume-venv` (netlify.toml `[build.environment]`) keeps the venv between builds, the same pattern as Puppeteer's Chrome. Measured: a cold install takes about 16s on Netlify (34s locally); a cache hit takes about 1s; the venv compresses to about 85MB (raw 471MB, mostly phonenumbers, typst, fonts, pip). `resume:setup` checks the cached interpreter still runs, and recreates the venv with `--clear` otherwise (the venv symlinks to mise's Python path, which changes when the image updates). It always runs `pip install -r` to reconcile version bumps.
- `/resume/` is `pages/resume.njk`, fed by `pages/resume.11tydata.js` → `scripts/resume-page.cjs`. That script renders RenderCV's Markdown with markdown-it (raw HTML off), drops its h1 and demotes the other headings. When nothing has been rendered, permalink is false and the page is excluded from collections, so no nav link points to a missing page. The PDF is a passthrough copy from the ignored `resume/rendercv_output/`; passthrough ignores `.eleventyignore`, and a missing source file is skipped. The Gemini build ignores `pages/**`.
- RenderCV's own `.html` output has an empty `<title>` and loads CDN CSS/KaTeX. Don't publish it as-is: Pa11y (WCAG2AA) would fail the deploy.
- Pa11y scans every page under `/`, so `/resume/` is audited on every deploy. The CI `resume` job builds the site with the rendered resume and runs the same audit.

## Gotchas
- `settings.current_date: today` stamps "Last updated", so PDFs differ between days. This is one reason output isn't committed.
- Long values in the education `degree` column wrap badly in the `classic` theme. Use abbreviations (BS, MS).
- Mastodon handles use `username: '@user@instance'`.
- Upgrading means bumping both the pin and the schema tag on the YAML's first line. The test asserts both.
- Local `npm test` needs Chrome for the Pa11y audit. On this NixOS host, use `PUPPETEER_EXECUTABLE_PATH=$(nix build --no-link --print-out-paths nixpkgs#chromium)/bin/chromium`.

## Project categories

Task: VAS-931 / df1c3a90-2839-43df-8cac-960631834dfd (Merge Open Source and Projects categories), 2026-10-30.

`cv.sections.projects` is the single Projects section for open-source contributions and personal projects. The former Open Source entries precede the household platform entry. Section keys supply rendered headings, so join the YAML lists rather than renaming headings in templates. The same source produces both `/resume/` and its PDF; regenerate before validating either output. Compare parsed entry objects when regrouping to catch lost details without relying on date-sensitive PDF bytes.
