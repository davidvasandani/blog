# Blog Constitution

Version: 1.1.0

1. Scope is davidvasandani/blog. Changes to other services require clarification.
2. Preserve published URLs, content, editor workflows, API contracts, and Gemini output unless a deliberate change is specified.
3. Test observable behavior. Establish passing local regression coverage before upgrading existing application dependencies.
4. Local tests must be deterministic, require no production credentials, and never publish content or change hosted settings.
5. Declare directly imported dependencies, commit a reproducible lockfile, and document new tools and deferred upgrades.
6. Keep specifications, test fixtures, and knowledge pages out of published outputs.
7. Non-Node tooling (such as Python for RenderCV) must be pinned exactly, installed into an ignored local environment, kept out of the Node `npm test` path and existing CI jobs (give it a separate job), and documented beside its sources.
8. Ship only after local validation and independent review. Record reusable project knowledge and merge through a pull request with required checks satisfied.

Governance: these Blog-specific principles replace unrelated scaffold principles. Changes must preserve the user's project boundary and test-before-upgrade requirement.
