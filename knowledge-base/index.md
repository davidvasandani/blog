# Blog knowledge base

- [Current Cloudflare hosting](cloudflare-hosting.md): authoritative hosting, shared API and standalone accessibility audit; supersedes historical provider guidance. Task: bd3547c1-520f-493b-a49e-18f32927121c.

- [Dependency upgrades and local testing](dependency-testing.md): baseline-first upgrades, CMS boundaries, Eleventy migration pitfalls, scoped Joi/Zod security overrides and verification commands. Task: 0b580ba2-71f3-4437-83a4-8ea5080e8fe4 (Upgrade Dependencies)
- [Resume with RenderCV](resume-rendercv.md): resume YAML source, pinned Python tooling, npm wrapper, CI artifact, resume page and PDF (historical deployment notes; see current hosting), and the page's entry-header layout transform. Tasks: e51fe535-6eff-4934-a141-6f1fb612dbda (Set up RenderCV in the blog); 0d661c6d-f22a-4c25-9ad3-ce09f436460a (Resume Heading Design)
- [Diagrams: Mermaid and diagram-design](diagrams-mermaid.md): Mermaid as source, pinned diagram-design redraws, manifest drift check, CI job, embedding gotchas (eleventy-img, Gemini, narrow column). Task: 9f29a37f-e305-491d-a278-64d472783749 (Mermaid Diagram Design)
- [Resume role attribution](resume-role-timeline.md): promotion dates, phase-specific timeline evidence, Lead/Senior Lead corrections, and limits of earlier-role evidence. Task: a48e7b92-06d7-40eb-99c1-ed2266c43637 (VAS-932)
- [Projects catalog and top-level pages](projects.md): catalog scope, navigation ordering, CMS fields and the optional-resume/Gemini boundaries. Task: 5d213750-2219-4125-beee-f85e3a0367b4 (VAS-943).
- [Resume voice and public-repo confidentiality](resume-voice.md): every resume change goes through the `/voice` skill (AGENTS.md, constitution 10, `npm run resume:voice` in CI), keeping qualifiers and ownership, and keeping the hiring repo's confidential names out of this public repo (specs and commits too), and recording the source of claims David supplies himself. Tasks: 76c7f44d-6efd-4fda-abfc-9f3b31eeb12f (My Voice), a29016bd-821a-4444-a8ae-2402820da029 (Clarify volume)

- [SitePing and CMS sign-in](siteping.md): one GitHub editor login, shared Durable Object feedback, deployment binding, regression checks, and why Blog CSS must not use bare control selectors (the widget's toolbar and popup live in the page). Tasks: 2edab207-fbe6-4baa-96e7-37ba3e0ed70a, VAS-945; 91b3f57c-0c1b-4552-9ba2-da29988361ed (Fix SitePing UI)
