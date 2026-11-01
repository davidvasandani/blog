# SitePing implementation plan

1. Resolve audience (CMS editors or reader accounts) and persistence (shared or browser-local), then refine SPEC.md using PRIOR_KNOWLEDGE.md.
2. Execute the supplied SpecKit commands in order: constitution, specify, clarify, plan, tasks, analyze. Keep task artifacts in `specs/vk/4620-add-siteping-for/`.
3. Inspect and pin the chosen SitePing package APIs; establish the existing test baseline before changing dependencies.
4. Implement the verified authentication boundary in `api/` and/or `workers/`, preserving Decap OAuth. Add persistence only as selected by the clarified requirements.
5. Bundle and integrate the widget with the public HTML layout; mount only for the authorized audience, remove on sign-out/expiry, and fail closed without breaking reading.
6. Add meaningful tests for anonymous denial, valid identity, invalid/expired identity, persistence, and sign-out. Keep all third-party network requests mocked.
7. Run typechecking, site/Gemini regression tests, accessibility, and applicable Worker integration checks. Document outcomes and operational configuration.
8. Run an independent Codex CLI review; fix confirmed findings and rerun affected checks until no significant findings remain.
9. Record reusable shipped knowledge, tagged with the task issue id, and update the knowledge index; commit it with the implementation.
10. Open the Blog PR against its base branch, satisfy required checks and review requirements, then merge.

Resolved: reuse CMS GitHub sign-in and editor permissions with shared Blog Durable Object storage. Detailed plan: specs/vk/4620-add-siteping-for/plan.md.
