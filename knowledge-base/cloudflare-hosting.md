# Current blog hosting

Task: bd3547c1-520f-493b-a49e-18f32927121c (`vk/bd35-remove-netlify-a`), 2026-10-31.

Cloudflare Workers is the blog's deployment target. `wrangler.jsonc` names `david-vasandani-blog`; `workers/index.ts` serves static assets and routes `/api/*` through the shared Express app in `api/app.ts`. `/hello` is handled directly by the Worker. The app's GitHub OAuth and contact contracts are unchanged. `serverless-http` is only a test dependency.

`npm run workers:build` renders the resume, builds Eleventy and verifies the PDF exists. There are no Netlify/Vercel deployment files, function adapters or Identity email templates. No hosted accounts or DNS records were changed by this cleanup. `cloudflare-migration/` is historical evidence, including its former apex redirect and fallback instructions; it is not current deployment guidance.

Accessibility uses directly pinned Pa11y 10 and Puppeteer. `scripts/test-a11y.cjs` recursively audits all public HTML except `admin`, fails on error issues or missing HTML, and supports a system browser via `PUPPETEER_EXECUTABLE_PATH`. The inaccessible-fixture regression remains mandatory. Run the audit after the resume build to include the generated resume.

For current deployment, secrets and local development instructions use README.md. Old provider-specific notes in dependency-testing.md and resume-rendercv.md describe earlier configurations and are superseded here. Preserve the pinned RenderCV environment and build-output exclusions.

Hosted integration follow-up: PR #156 still received Vercel preview checks. Removing config files does not disconnect a dashboard-managed Git integration. The available Vercel connection could not access the blog team (403; consent recovery 404), so hosted disconnection remains outstanding.

Branch protection follow-up (same task, 2026-10-31): replaced the two required Netlify contexts with `Workers Builds: david-vasandani-blog` (Cloudflare app 85455), `test`, `resume`, and `diagrams` (GitHub Actions app 15368). Retained CodeQL, pr-label, strict up-to-date checks and existing review settings. All current checks passed on PR #156. Vibe Kanban also gates on non-required failing checks, so old Netlify preview failures can still block its merge tool after branch protection is corrected.

Netlify follow-up (2026-11-01, task 2edab207-fbe6-4baa-96e7-37ba3e0ed70a, VAS-945): at David's request, unlinked `davidvasandani/blog` from Netlify project `david-vasandani-blog` in Developer settings > Repository. Verified “Current repository: Not linked.” This stops new Netlify builds and GitHub checks for the Blog. The account-wide GitHub app remains unchanged. Historical check failures remain on old commits; they are not evidence of Cloudflare build failures.

HTTPS zone settings (task a6167873, 2026-11-02): `http://david.vasandani.me` used to serve pages with a 200. David changed these `vasandani.me` zone settings in the Cloudflare dashboard. The repo's API token can read zone settings but not edit them.

- Always Use HTTPS: on. Plain HTTP gets a 301 to HTTPS before the Worker runs, so `workers/index.ts` has no redirect of its own. PR #165 added one and was closed in favour of this setting.
- HSTS: on, max-age 1 month (2592000), includeSubDomains on, preload off, No-Sniff on. Raise max-age to 6–12 months once it has run without trouble.
- Minimum TLS version: 1.2. Opportunistic Encryption: off. SSL mode is still Full.

These zone-wide settings only affect proxied hostnames, and `david.vasandani.me` (the Worker custom domain) is the only one. Every other `vasandani.me` record is DNS-only, so the settings don't touch them. includeSubDomains only covers `*.david.vasandani.me`. The apex is served by Netlify and sends its own `max-age=31536000` HSTS header without includeSubDomains. Preload would cover all of `vasandani.me`, so leave it off unless every hostname serves HTTPS. If another hostname is ever switched to proxied, it must serve HTTPS first.
