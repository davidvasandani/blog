# Technical plan (/speckit.plan)

Spec: ./spec.md

## Context and approach
Eleventy and RenderCV publish through Cloudflare Workers Builds. `.python-version` is already 3.14.8; `scripts/resume.cjs` uses an ignored virtualenv. The screenshot shows PYTHON_VERSION=3.13.18 detected from environment before application commands run.

1. Inspect only the Blog Worker build settings and current runtime-selection documentation. Record evidence in `research.md`.
2. Align a confirmed stale Blog build PYTHON_VERSION to the existing file; preserve Node selection, secrets and build commands. Read back the setting and inspect the subsequent build before claiming success.
3. Add a focused drift diagnosis procedure to `README.md` if needed; record validation in `validation.md`.
4. Independent Codex review of the diff, then knowledge-base update/index and PR merge.

## Constitution check
No dependency or runtime pin upgrade; no resume wording change. Blog scope only. Local checks do not mutate hosted systems. Existing ignored generated artifacts stay ignored. No data model or API contract changes are needed.

## Risks and dependencies
Cloudflare authentication may block hosted repair and timing verification. Do not turn a documentation-only outcome into a claim that the build is fixed. Exact runtime defaults can change; verify current documentation and preserve an explicit validated pin.
