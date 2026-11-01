# Prior knowledge: SitePing for signed-in users

Searched the Blog's existing `blog/knowledge-base/` for SitePing, feedback, auth, CMS, and Cloudflare. Read its index, `cloudflare-hosting.md`, and `dependency-testing.md`. No prior SitePing integration was found. Knowledge base was read-only during recall.

- Current deployment is Cloudflare Worker `david-vasandani-blog`, with static assets and Express `/api/*`. Use `workers/index.ts`, `api/app.ts`, and `wrangler.jsonc`; historical Netlify and Vercel notes are superseded.
- README and API source confirm current authentication is Decap GitHub OAuth, not the historical Identity/Git Gateway described in older knowledge. Preserve its callback and editor workflow.
- Node 24 and the committed npm lockfile are required. Validate with npm test, npm run typecheck, relevant Worker tests, and Gemini checks. Tests must mock external services and never publish content or submit real contact messages.
- Keep internal specifications and knowledge pages excluded from both Eleventy outputs.
- Pa11y audits public HTML; system Chromium is supported through PUPPETEER_EXECUTABLE_PATH. Do not disable the accessibility gate.
- Delivery uses a PR with required checks; knowledge records verified signatures and linear history requirements. Recheck live protection before merging.

The initial SPEC.md was written before recall as explicitly ordered by this pipeline. This recall informs subsequent specification refinement and planning. Audience and feedback storage remain user clarification questions.
