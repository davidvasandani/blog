# Technical plan

Spec: ./spec.md. Status: Ready.

## Technical context and approach
Node 24, Eleventy, Express and Cloudflare Workers. Move netlify/functions/api.ts to api/app.ts, remove its serverless wrapper, import from workers/index.ts, and adapt tests locally with serverless-http. Remove api/functions, netlify, both deployment configs and obsolete Identity templates. Update tsconfig.test.json and api/tsconfig.json for the shared module.

Replace netlify-plugin-a11y with direct Pa11y 10 and the existing locked Puppeteer version. scripts/test-a11y.cjs exports an audit function which recursively checks public HTML, excludes admin, throws on errors and runs as CLI. tests/a11y.test.cjs invokes it against the inaccessible fixture. Keep browser environment support.

Remove obsolete forced redirects from source and simplify scripts/workers-assets.cjs to validate the resume. Update README.md, resume/README.md, comments, package metadata and lockfile. Preserve upstream license credit.

## Data model / contracts
No data-model changes. Existing API methods, status codes and bodies are unchanged; existing regression and Worker tests are contract checks.

## Constitution check
All nine principles honored. No production writes or new non-Node tooling. Directly declare imported packages. Preserve generated artifacts and exclusions. Independent review and required PR checks precede merge.

## Risks and validation
Dependency relocation can break compilation; use typecheck and API tests. Audit replacement can weaken coverage; test inaccessible fixture and recursively audit published pages. Worker smoke tests verify actual runtime behavior. Run full npm test and test:workers. Hosted secrets and account configuration are not exercised.
