# Resume with RenderCV

Current hosting update (task bd3547c1-520f-493b-a49e-18f32927121c): see [Cloudflare hosting](cloudflare-hosting.md). Provider-specific instructions below are historical.

Task: e51fe535-6eff-4934-a141-6f1fb612dbda (Set up RenderCV in the blog)
Updated: 2026-10-27 (publishing follow-up); 2026-11-02 (page layout, task 0d661c6d-f22a-4c25-9ad3-ce09f436460a)

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

## Page layout (task 0d66, Resume Heading Design, 2026-11-02)
RenderCV's Markdown writes each entry as `## **Company**, Title`, then the location, dates and duration as separate plain lines, then `**Theme: ...**`. Rendered straight, that's five or six stacked paragraphs per role. `scripts/resume-page.cjs` now runs a markdown-it core rule (`resumeLayout`, exported through `renderResume()`) that rewrites the token stream:
- h3 `**Company**, Title` → `.resume-org` eyebrow plus `.resume-role`, with the comma kept in a `.visually-hidden` span so the heading still reads "Company, Title".
- The plain lines after an h3, up to the last date, year or duration, become one `<p class="resume-meta">` ordered dates, duration, location. A line ending in "." is never meta, which keeps the Projects summary ("Personal project, ...") out.
- A paragraph that is only `**Theme: ...**` becomes `.resume-theme` with a `.resume-label`.

Gotchas:
- Fixtures for `renderResume()` must use `###` (it takes the already-demoted page Markdown).
- markdown-it leaves empty text tokens around `**bold**`; filter them before matching token shapes.
- Inject only fixed strings as `html_inline` tokens. Resume text stays in `text` tokens, so it's still escaped with `html: false`.
- Put the `·` separator in `span:not(:last-child)::after`, not `span + span::before`, or a wrapped phone line starts with a dot. `content: "·" / ""` hides it from screen readers.
- Styles live under `.resume` (a wrapper in `pages/resume.njk`) and `.resume-*`. Colours checked on #FFF0EB: #6b5750 (6.09:1) and #9a3412 (6.58:1; 5.99:1 on the callout tint #fbe4db).
- Company grouping (follow-up, 2026-11-02): `groupCompanies()` runs after the per-entry pass. Adjacent h3 entries with the same company become a `section.resume-company` (h3 company, overall range, shared location) wrapping `div.resume-roles` with h4 roles on a CSS timeline. `groupMeta` tags each meta token with `token.meta.kind` (dates, duration, location) so later passes can find them. Splice groups back to front so earlier token indexes stay valid. Spec: `specs/vk/0d66-resume-heading-d/company-grouping.md`.
- Changing RenderCV's version or theme can change this Markdown shape. Rerun the render and check the built page's headings and meta lines.
- CodeQL's "Bad HTML filtering regexp" check runs on tests too, and fails the PR's CodeQL check. A blocklist like `/<(script|img)[ >]/` gets flagged (case, then tabs). To test escaping, collect the tag names in the output and compare them with an allowlist instead.
