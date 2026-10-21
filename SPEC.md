# Technical specification: dependency upgrades

Scope: davidvasandani/blog only. Add executable local regression tests before upgrading existing dependencies. Preserve public URLs, content, author/tag navigation, contact form, CMS editing configuration/previews, Netlify API responses, and Gemini output.

## Current architecture
Eleventy 2 builds Markdown/Nunjucks/Liquid into _site. Decap CMS is loaded by admin/index.html and configured by admin/config.yml, with custom previews. netlify/functions/api.ts exposes Express through serverless-http. A separate Gemini generator and TypeScript server share this repository. No local test suite is configured.

## Requirements
- Establish deterministic frontend tests against rendered output and relevant filters/navigation/form behavior.
- Test admin configuration, preview rendering, and actual serverless API requests, including missing routes and query handling. Tests must not require production credentials, hosted authentication, or write real content.
- Demonstrate passing tests against existing dependencies before changing their versions. Adding test tooling is allowed during that baseline phase.
- Upgrade supported dependencies using registry/release evidence; adapt code to compatibility changes. Record deferred upgrades and remaining advisories honestly.
- Provide a reproducible npm ci / npm test workflow, type checks and website/Gemini builds. Keep build-time documentation out of generated site output.
- Follow the supplied SpecKit stages, independent review, project knowledge update, and PR merge in order.

## Acceptance
A clean local install can run the complete test suite, build both outputs, and compile TypeScript. Tests verify user-facing contracts rather than dependency implementation details. Review has no significant unresolved findings. The PR targets the existing base branch and is merged only after required checks pass.

## Boundaries
No changes to other services, production authentication settings, or unrelated infrastructure. Hosted Git Gateway/Identity cannot be fully exercised offline; document that boundary instead of claiming end-to-end hosted coverage.
