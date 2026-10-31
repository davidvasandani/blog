# Current blog hosting

Task: bd3547c1-520f-493b-a49e-18f32927121c (`vk/bd35-remove-netlify-a`), 2026-10-31.

Cloudflare Workers is the blog's deployment target. `wrangler.jsonc` names `david-vasandani-blog`; `workers/index.ts` serves static assets and routes `/api/*` through the shared Express app in `api/app.ts`. `/hello` is handled directly by the Worker. The app's GitHub OAuth and contact contracts are unchanged. `serverless-http` is only a test dependency.

`npm run workers:build` renders the resume, builds Eleventy and verifies the PDF exists. There are no Netlify/Vercel deployment files, function adapters or Identity email templates. No hosted accounts or DNS records were changed by this cleanup. `cloudflare-migration/` is historical evidence, including its former apex redirect and fallback instructions; it is not current deployment guidance.

Accessibility uses directly pinned Pa11y 10 and Puppeteer. `scripts/test-a11y.cjs` recursively audits all public HTML except `admin`, fails on error issues or missing HTML, and supports a system browser via `PUPPETEER_EXECUTABLE_PATH`. The inaccessible-fixture regression remains mandatory. Run the audit after the resume build to include the generated resume.

For current deployment, secrets and local development instructions use README.md. Old provider-specific notes in dependency-testing.md and resume-rendercv.md describe earlier configurations and are superseded here. Preserve the pinned RenderCV environment and build-output exclusions.

Hosted integration follow-up: PR #156 still received Vercel preview checks. Removing config files does not disconnect a dashboard-managed Git integration. The available Vercel connection could not access the blog team (403; consent recovery 404), so hosted disconnection remains outstanding.
