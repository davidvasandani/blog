# Implementation Plan: Projects

**Spec**: `./spec.md`
**Status**: Ready via `/speckit.plan`

## Technical Context
Node 24, Eleventy 3, Markdown pages and the existing navigation plugin. No runtime or dependency changes.

## Architecture & Approach
Add `pages/projects.md`, inheriting `pages/pages.json` and `layouts/page.njk`. Use title Projects, a descriptive metaDescription, permalink `/projects/index.html` and `eleventyNavigation: {key: Projects, order: 5}` to sit after Contact (4), even when Resume is absent. Use h2 project headings under the layout's h1 and ordinary paragraphs/links; the existing shared nav handles active state.

Use five entries supported by `resume/David_Vasandani_CV.yaml`, `README.md`, and `posts/mermaid-and-diagram-design/mermaid-and-diagram-design.md`. Link the blog repository and the existing diagram post. Do not link `/resume/`, which may not be generated. Document maintenance in `README.md`.

## Data Model and Contracts
No new entity, database or API. Page front matter uses the existing page/navigation contract. `/projects/` is a static route. Gemini ignores `pages/**` intentionally.

## Research Notes
See `research.md` for evidence and decisions. Reuse plain Markdown so updates work with the existing generic Pages collection in Decap. No custom template or styling required.

## Constitution Check
Blog only; existing URLs and CMS preserved; no upgrades or non-Node tooling; internal artifacts excluded by existing rules; use existing regression/a11y suites plus direct output/browser inspection, independent review and PR merge. No deviations.

## Risks & Dependencies
Completeness is limited to documented personal/open-source work. Resume is optional at build time; avoid linking to it. Browser validation requires system Chromium on NixOS. Branch protection and existing remote checks may delay merging.
