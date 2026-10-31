# Prior knowledge for category merge

Searched the local `knowledge-base/` for resume, RenderCV, and categories before planning. Relevant page: `knowledge-base/resume-rendercv.md`.

- Edit `resume/David_Vasandani_CV.yaml`; RenderCV 2.8 is pinned with full CLI extras.
- Generated outputs and the Python venv are ignored. Deployment renders the source; do not commit PDFs.
- Build the résumé before Eleventy to include `/resume/` and its PDF. The site uses RenderCV Markdown through `scripts/resume-page.cjs`, not RenderCV HTML.
- Gemini excludes the résumé. Pipeline and knowledge documents must also remain unpublished.
- Existing résumé tests cover publication and tooling. Pa11y checks the rendered page.
- The render date changes daily, so validate content rather than binary PDF equality.

These findings refine SPEC.md: regeneration is local validation; only source and task documentation are committed.

## Concurrent retired-host cleanup record

# Prior knowledge: retired hosts

Read-only search of blog/knowledge-base for Cloudflare, Netlify, Vercel and accessibility found:
- cloudflare-migration/status.json and production-verification.json: Worker migration preserved static content, API and OAuth; old snapshots retain Netlify apex and fallback notes. They are historical evidence, not current deployment instructions. This task does not change DNS.
- dependency-testing.md: accessibility checks must fail on inaccessible fixtures; use system Chromium on NixOS. The plugin currently supplies Pa11y transitively and must be replaced without losing blocking coverage. Its Identity/serverless notes are stale relative to the current GitHub OAuth implementation.
- resume-rendercv.md: preserve pinned Python tooling, RESUME_VENV caching and rendered resume/PDF publication.
- diagrams-mermaid.md: preserve offline artifact checks and exclude internal files from published outputs.

The user's Cloudflare-only hosting direction supersedes old migration fallback guidance. The technical spec must preserve these behavior and build contracts.
