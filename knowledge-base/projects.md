# Projects catalog and top-level pages

Task: 5d213750-2219-4125-beee-f85e3a0367b4 (VAS-943), 2026-11-01.

The Projects catalog lives in `pages/projects.md` at `/projects/`. It covers personal/open-source projects documented in the committed resume plus the blog and its diagram workflow. Keep it aligned when those source descriptions change; do not invent project URLs or imply ownership of upstream tools.

Top-level navigation is generated from `eleventyNavigation` front matter by `_includes/components/nav.njk`. Integer order 5 places Projects after Contact. The page inherits `layouts/page.njk` from `pages/pages.json`, which supplies its h1, so content headings start at h2. The existing Decap Page collection can edit this Markdown; retain its required date, permalink and navigation fields.

Do not make a catalog entry depend on `/resume/` existing: the resume route is absent until RenderCV output is available. Ordinary `pages/` content is deliberately excluded from Gemini. Existing `.eleventyignore` rules keep specs and knowledge out of both outputs.

Verification for this change covered all public-page navigation, internal catalog links, current-page state, narrow/wide browser widths, 42 regression tests and the public accessibility audit (including Projects).
