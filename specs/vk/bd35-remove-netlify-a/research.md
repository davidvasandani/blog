# Repository findings

workers/index.ts imports the shared Express application from a retired-provider directory. The application itself is host-neutral except for its exported serverless-http wrapper; retain that adapter only in tests. The current CMS already uses GitHub OAuth. The accessibility plugin is a wrapper around Pa11y 10; replace it with direct auditing at the same pinned version instead of upgrading dependencies. scripts/workers-assets.cjs removes forced redirects that only exist for the old host. Keep its resume/PDF presence check.

Prior knowledge: ../../../../PRIOR_KNOWLEDGE.md. Historical migration snapshots must not be treated as current deployment instructions.
