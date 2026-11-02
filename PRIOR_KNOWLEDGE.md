# Prior knowledge: Resume Heading Design (task 0d66)

Searched `knowledge-base/` for resume page, RenderCV, CSS, SitePing and
accessibility notes. Relevant pages: `resume-rendercv.md`, `siteping.md`,
`resume-voice.md`, `cloudflare-hosting.md`.

## How /resume/ is built (resume-rendercv.md)
- `pages/resume.njk` is fed by `pages/resume.11tydata.js` →
  `scripts/resume-page.cjs`, which renders RenderCV's Markdown with
  markdown-it (raw HTML off), drops its h1 and demotes headings one level.
  Role headings therefore arrive as `<h3>`.
- The page only exists when `npm run resume` has rendered output
  (`resume/rendercv_output/`, gitignored). `npm test` checks one h1 and an
  unbroken outline (`tests/resume.test.cjs`).
- RenderCV's own `.html` loads CDN CSS and fails Pa11y; don't publish it.
- Pa11y (WCAG2AA) audits `/resume/` on every deploy. Locally it needs
  Chromium via `PUPPETEER_EXECUTABLE_PATH` on this NixOS host.

## CSS boundaries (siteping.md)
- SitePing's toolbar and popup live in the page DOM, so Blog CSS must not
  use bare element selectors (`button`, `input`, ...). Scope new rules to a
  class or container. Note that bare `header` already gets `padding: 1em`,
  so don't wrap resume entries in `<header>`.

## Resume wording (resume-voice.md, AGENTS.md)
- Every wording change to the YAML goes through `/voice`, and
  `npm run resume:voice` runs in `npm test`. A layout-only change that leaves
  the YAML alone has no wording to review, but the check must still pass.
- Public repo: never name the POS vendor in specs, knowledge pages or
  commits.

## Gaps
No page covers the resume page's visual design or RenderCV's Markdown entry
shape (heading, then location, dates, duration on separate lines). That is
worth recording after this task.
