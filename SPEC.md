# Remove retired hosting integrations

The personal blog runs on Cloudflare Workers. Remove Netlify and Vercel deployment configuration, adapters, provider-only packages, stale setup instructions, and obsolete Identity templates. Preserve the Worker routes, shared Express API, GitHub OAuth editor workflow, static URLs, resume rendering, Gemini output, and accessibility checks.

Move reusable API code out of the Netlify directory and update Worker imports and test compilation. Replace the Netlify accessibility plugin with directly declared audit tooling, retaining blocking audits. Update package metadata and lockfile. Keep historical specifications and knowledge as history, with current hosting guidance clearly superseding migration notes.

Scope: davidvasandani/blog only. This is repository cleanup; it does not delete provider accounts, change DNS, or update other services. Cloudflare deployment configuration remains authoritative.

Acceptance: no active deployment or runtime dependency on either retired provider; build, typecheck, regression tests and Worker smoke tests pass; documentation describes Cloudflare accurately; independent review passes; knowledge is recorded; the change is merged through a PR.
