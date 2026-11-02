# Blog Constitution

Version: 1.3.0

1. Scope is davidvasandani/blog. Changes to other services require clarification.
2. Preserve published URLs, content, editor workflows, API contracts, and Gemini output unless a deliberate change is specified.
3. Test observable behavior. Establish passing local regression coverage before upgrading existing application dependencies.
4. Local tests must be deterministic, require no production credentials, and never publish content or change hosted settings.
5. Declare directly imported dependencies, commit a reproducible lockfile, and document new tools and deferred upgrades.
6. Keep specifications, test fixtures, diagram sources, and knowledge pages out of published outputs.
7. Non-Node tooling (such as Python for RenderCV, or a third-party agent skill's scripts) must be pinned exactly (a release or a git commit), installed into an ignored local path, kept out of the Node `npm test` path and existing CI jobs (give it a separate job), and documented beside its sources.
8. Generated artifacts that are committed and published (such as SVG diagrams) must come from committed sources with a documented command. A separate check must regenerate them and fail on drift. They must make no external network requests, contain no scripts, and pass the site's accessibility audit (titled, described `role="img"` figures with alt text where embedded).
9. Ship only after local validation and independent review. Record reusable project knowledge and merge through a pull request with required checks satisfied.
10. Every change to resume wording goes through the `/voice` skill and keeps every fact, qualifier and ownership claim. `npm test` enforces the skill's mechanical rules through `scripts/resume-voice.cjs`. Agent instructions live in `AGENTS.md` (`CLAUDE.md` imports it).

Governance: these Blog-specific principles replace unrelated scaffold principles. Changes must preserve the user's project boundary and test-before-upgrade requirement. Version 1.2.0 adds principle 8 (generated artifacts) and widens 6 and 7.

Review: 2026-10-30 category merge. Version 1.2.0 and all nine principles remain applicable without amendment. Résumé grouping changes preserve entry content and published URLs.

Review: 2026-10-30 resume role timeline correction (`/speckit.constitution`). Version 1.2.0 applies without amendment. Resume claims must follow committed evidence; the attached hiring repository is read-only.

Review: 2026-10-31 retired-host cleanup (`/speckit.constitution`). Version 1.2.0 remains applicable. Cloudflare is the blog's deployment target; retain API, editor, resume, Gemini and accessibility behavior while removing obsolete adapters. Hosted account and DNS changes are outside this repository cleanup.

Review: 2026-11-01 Projects (`/speckit.constitution`). Version 1.2.0 remains applicable. The project catalog uses committed public-facing evidence, existing navigation and page layout; it does not update other services or publish internal planning documents.
Review: 2026-11-01 resume voice rewrite (`/speckit.constitution`). Version 1.2.0 applies without amendment. Resume wording changes must keep every fact and role attribution backed by committed evidence, and follow the `/voice` skill. The hiring repository stays read-only.

Review: 2026-11-01 SitePing integration (`/speckit.constitution`). Version 1.2.0 remains applicable. Keep changes within the Blog repository, preserve Decap OAuth and public reading, verify authentication before exposing protected feedback, and mock external requests in tests. Resolve the intended signed-in audience and storage requirements before implementation.

Amendment: 2026-11-01, version 1.3.0 adds principle 10 at David's request: all resume updates go through the `/voice` skill.

Review: 2026-11-01 Clarify volume, task a290 (`/speckit.constitution`). Version 1.3.0 applies without amendment. Principle 1: the change stays in this repository and the hiring repository is read-only. Principle 10: the one-phrase resume edit still goes through `/voice`. A claim that comes from David's own instruction rather than committed evidence is recorded with its source in the spec. Principle 9: validate locally, get an independent review, record knowledge and merge through a PR.

Review: 2026-11-02 Fix SitePing UI, task 91b3 (`/speckit.constitution`). Version 1.3.0 applies without amendment. Principle 1: fix it in the Blog's own CSS, not by changing the SitePing package or another service. Principle 2: the contact form must look the same. Principles 3 and 4: a deterministic browser test with a mocked editor session covers the layout, and `npm test` runs it.

Review: 2026-11-02 Resume Heading Design, task 0d66 (`/speckit.constitution`). Version 1.3.0 applies without amendment. Principle 2: `/resume/` keeps its URL, PDF and words; only the page's layout changes. Principle 10: the YAML is untouched, so there is no wording for `/voice` to review, and `npm run resume:voice` must still pass. Principle 3: unit tests cover the renderer's transform, and Pa11y audits the restyled page.

Review: 2026-11-02 Timeline Audit, task 5ab27642-ab10-41bf-83d9-2bafb85d0287 (`/speckit.constitution`). Version 1.3.0 retained. The user explicitly authorizes a cross-repository audit: private assessments live in hiring, public SpecKit artifacts and reusable sanitized knowledge live in blog. Prior task-specific read-only limits on hiring do not apply to this task. No published resume wording changes are planned. Assess relevance separately from source verification and preserve effective role dates and planned-work qualifiers.

Review: 2026-11-02 iMessage image, task 13f2 (`/speckit.constitution`). Version 1.3.0 applies without amendment. Principle 1: link-preview tags live in the Blog's own templates; no Cloudflare or DNS change. Principle 2: page content, URLs and Gemini output stay the same; only `<head>` gains tags. Principle 8: reuse the committed headshot as the preview image instead of adding a generated artifact. Principle 3: a build-output test checks the tags.

Review: 2026-11-02 Resume semver, task d8ed (`/speckit.constitution`). Version 1.3.0 applies without amendment. Version metadata stays within the Blog; resume prose and published URLs are preserved. Validate shared PDF/HTML version behavior without adding Python to npm test; render separately and obtain independent review before merging.

Review: 2026-11-02, build setup latency, workspace 271671fa (`/speckit.constitution`). Version 1.3.0 applies without amendment. Limit changes to the Blog and its build settings. Preserve pinned RenderCV and published output. Separate observed provider timings from inferred causes, and verify hosted settings before claiming a deployment speedup.

Review: 2026-11-02 Content recovery bullet, task VAS-965, specs/vk/4fff-this-is-borning (`/speckit.constitution`). Version 1.3.0 applies without amendment. Principle 10: the rewritten bullet goes through `/voice` and keeps the credential repair, recovery triggers, 62 newly imported items and 63 requeued failures exactly as the prior audit stated, without implying those downloads completed or widening ownership beyond the household project. Principle 1: `hiring/netflix/timeline-audit/REPORT.md` (F08, R041) is read-only evidence, not re-verified. Principle 9: ship after local validation (`npm run resume:voice` and rendering checks), an independent Codex review, a knowledge-base update, and merge through a PR.

Review: 2026-11-02 Fix Slack preview, task 9f5f (`/speckit.constitution`). Version 1.3.0 applies without amendment. Principle 1: fix the preview in the Blog's templates and build, with no Cloudflare change. Principle 8: build the smaller preview image from the committed headshot at build time with the existing eleventy-img dependency instead of committing a generated copy. Principle 2: the author photo URL and page content don't change. Principle 3: a build-output test checks the preview image's size and declared dimensions.
