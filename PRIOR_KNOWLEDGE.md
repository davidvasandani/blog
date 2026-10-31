# Prior knowledge: retired hosts

Read-only search of blog/knowledge-base for Cloudflare, Netlify, Vercel and accessibility found:
- cloudflare-migration/status.json and production-verification.json: Worker migration preserved static content, API and OAuth; old snapshots retain Netlify apex and fallback notes. They are historical evidence, not current deployment instructions. This task does not change DNS.
- dependency-testing.md: accessibility checks must fail on inaccessible fixtures; use system Chromium on NixOS. The plugin currently supplies Pa11y transitively and must be replaced without losing blocking coverage. Its Identity/serverless notes are stale relative to the current GitHub OAuth implementation.
- resume-rendercv.md: preserve pinned Python tooling, RESUME_VENV caching and rendered resume/PDF publication.
- diagrams-mermaid.md: preserve offline artifact checks and exclude internal files from published outputs.

The user's Cloudflare-only hosting direction supersedes old migration fallback guidance. The technical spec must preserve these behavior and build contracts.
