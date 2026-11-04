# Technical plan
Spec: ./spec.md

## Technical context and approach
Content-only change to resume/David_Vasandani_CV.yaml, rendered by existing scripts/resume.cjs and pages/resume.njk. Preserve YAML structure, dates, schema, toolchain and URLs. Rewrite the summary and selected highlights to foreground documented results; leave candidate-written crash bullets intact. Use the original YAML and knowledge pages as evidence, with source limitations in research.md. Keep technical mechanisms alongside outcomes. Minor bump resume/VERSION from main's 1.1.2 to 1.2.0 because the settings-audit achievement now adds documented contract size and sweep duration.

## Data model and contracts
No changes. Existing RenderCV schema and generated Markdown/PDF contract apply.

## Validation
Apply voice manually to every changed string, then npm run resume:voice. Render via npm run resume -- --dont-generate-png; build and run npm test with installed Chromium, plus typecheck. Inspect generated Markdown, PDF page count/text and published version. Independent codex review --uncommitted, including sanitized source mapping; address findings before commit.

## Constitution check
All ten principles respected: blog-only change; no dependencies or API changes; hiring read-only; no private names; planning and knowledge excluded from publication; pinned existing renderer; factual and voice review; PR/check gate.

## Risks
Sparse historical baselines prevent monetary/FTE conversions. Reported costs are not audited invoices. No annualized savings claim without duration evidence. Older deployment figures remain candidate resume claims, not newly verified telemetry. Measurements missing from other bullets are documented in knowledge-base/resume-measured-outcomes.md at stage 12.
