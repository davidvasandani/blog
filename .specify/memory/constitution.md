# Blog Constitution

Version: 1.2.0

1. Scope is davidvasandani/blog. Changes to other services require clarification.
2. Preserve published URLs, content, editor workflows, API contracts, and Gemini output unless a deliberate change is specified.
3. Test observable behavior. Establish passing local regression coverage before upgrading existing application dependencies.
4. Local tests must be deterministic, require no production credentials, and never publish content or change hosted settings.
5. Declare directly imported dependencies, commit a reproducible lockfile, and document new tools and deferred upgrades.
6. Keep specifications, test fixtures, diagram sources, and knowledge pages out of published outputs.
7. Non-Node tooling (such as Python for RenderCV, or a third-party agent skill's scripts) must be pinned exactly (a release or a git commit), installed into an ignored local path, kept out of the Node `npm test` path and existing CI jobs (give it a separate job), and documented beside its sources.
8. Generated artifacts that are committed and published (such as SVG diagrams) must come from committed sources with a documented command. A separate check must regenerate them and fail on drift. They must make no external network requests, contain no scripts, and pass the site's accessibility audit (titled, described `role="img"` figures with alt text where embedded).
9. Ship only after local validation and independent review. Record reusable project knowledge and merge through a pull request with required checks satisfied.

Governance: these Blog-specific principles replace unrelated scaffold principles. Changes must preserve the user's project boundary and test-before-upgrade requirement. Version 1.2.0 adds principle 8 (generated artifacts) and widens 6 and 7.

Review: 2026-10-30 dependency advisory follow-up. Version 1.0.0 remains applicable without amendment; all seven principles are retained.

Review: 2026-10-30 resume role timeline correction (`/speckit.constitution`). Version 1.2.0 applies without amendment. Resume claims must follow committed evidence; the attached hiring repository is read-only. This review supersedes the stale version/count wording in the preceding review note.

Review: 2026-10-31 retired-host cleanup (`/speckit.constitution`). Version 1.2.0 remains applicable. Cloudflare is the blog's deployment target; retain API, editor, resume, Gemini and accessibility behavior while removing obsolete adapters. Hosted account and DNS changes are outside this repository cleanup.
