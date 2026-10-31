# Implementation plan

1. Move the shared Express application to api/app.ts; update Worker import and compile targets. Keep test-only serverless adaptation outside production code.
2. Remove retired deployment configs, adapters, Identity email templates and forced redirect assets; preserve Cloudflare resume validation.
3. Replace the accessibility plugin with pinned direct Pa11y and Puppeteer dependencies and a recursive blocking audit; retain the inaccessible fixture regression.
4. Refresh current documentation, package metadata and provider-specific comments. Preserve historical knowledge snapshots.
5. Regenerate the lockfile, run typecheck, full tests and Worker smoke tests. Review the complete diff independently with Codex and fix confirmed findings.
6. Record hosting knowledge, commit, open the task PR, verify checks and merge.
