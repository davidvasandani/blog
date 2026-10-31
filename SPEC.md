# Merge Open Source and Projects

Combine the résumé's `open_source` and `projects` sections into one `projects` section, displayed as Projects. Keep all entries, links, dates, descriptions, and their existing order, with former Open Source entries first. The categories occur in `resume/David_Vasandani_CV.yaml`; the blog has no matching post taxonomy to migrate.

Regenerate the published résumé with the repository's pinned RenderCV workflow. Preserve existing résumé download URLs and unrelated résumé content and styling. Keep pipeline documents out of site output. Validate the source structure, rendered heading and entries, and the affected build. Obtain independent Codex review before committing knowledge and merging a pull request.

Scope is exclusively davidvasandani/blog. No other services or dependency changes are required. Assumption: Projects is the merged heading because it covers both contributions and personal projects.

# Resume role timeline correction (2026-10-30)

Update the Blog resume to distinguish Sweetgreen Senior, Lead, and Senior Lead roles using committed timeline evidence from the Blog and attached hiring repository. The Lead entry currently contains placeholders. Preserve verified promotion dates, attribute accomplishments to the period supported by evidence, and avoid invented outcomes or metrics. Read hiring only; change Blog files only, apart from the required workspace prior-knowledge note.

The canonical source is `resume/David_Vasandani_CV.yaml`. Review its history and committed timeline material, record source/date support, replace Lead placeholders, and correct misplaced accomplishments when evidence supports it. Keep HTML, Gemini and downloadable resume outputs consistent through their existing build pipeline. Acceptance requires substantive Lead content, supported role attribution, relevant resume tests and builds, independent Codex review, updated project knowledge, and a merged PR against the base branch.

## Concurrent retired-host cleanup record

# Remove retired hosting integrations

The personal blog runs on Cloudflare Workers. Remove Netlify and Vercel deployment configuration, adapters, provider-only packages, stale setup instructions, and obsolete Identity templates. Preserve the Worker routes, shared Express API, GitHub OAuth editor workflow, static URLs, resume rendering, Gemini output, and accessibility checks.

Move reusable API code out of the Netlify directory and update Worker imports and test compilation. Replace the Netlify accessibility plugin with directly declared audit tooling, retaining blocking audits. Update package metadata and lockfile. Keep historical specifications and knowledge as history, with current hosting guidance clearly superseding migration notes.

Scope: davidvasandani/blog only. This is repository cleanup; it does not delete provider accounts, change DNS, or update other services. Cloudflare deployment configuration remains authoritative.

Acceptance: no active deployment or runtime dependency on either retired provider; build, typecheck, regression tests and Worker smoke tests pass; documentation describes Cloudflare accurately; independent review passes; knowledge is recorded; the change is merged through a PR.
