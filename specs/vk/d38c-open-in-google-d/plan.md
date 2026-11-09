# Implementation Plan: Open in Google Docs

Spec: ./spec.md

## Technical context and approach
Eleventy/Nunjucks, Node 24. `pages/resume.njk` owns the resume actions. `resume/David_Vasandani_CV.yaml` supplies content; `scripts/resume-page.cjs` renders the page and PDF link. No new dependency or runtime API is necessary.

1. Use the connected Google Docs tools to create a native document in ChatGPT. Generate text and structural formatting from the current YAML without rewriting content. Preserve all contact fields, roles, dates, summaries, highlights, projects and skills. Verify readback against generated text.
2. Verify read access for blog visitors, using available Drive/browser capabilities. If access cannot be configured, report the concrete limitation rather than falsely claiming public availability.
3. Add the returned document URL as a plain anchor in `pages/resume.njk` beside the PDF action; existing styles and keyboard behavior apply.
4. Document snapshot maintenance in `resume/README.md`. Build the site and run existing relevant resume checks; inspect the generated anchor.
5. Independent Codex review, knowledge capture, commit, PR and merge with required checks.

## Data model and contracts
No application data model or API changes. The native document is an external snapshot; the repository stores its stable URL in the resume template. YAML remains authoritative.

## Constitution check
Blog-only code changes; Google Doc creation is explicitly authorized. No wording edits or release-version change. Preserve URLs, content and Gemini output. Specs remain excluded by `.eleventyignore`. No added dependencies. Validation and independent review precede merge.

## Risks
External permissions may prevent anonymous viewing. Snapshot can become stale after resume updates: maintenance instructions must call this out. Rendering requires the existing pinned Python/RenderCV setup. Verify connector write outcomes before retrying.
