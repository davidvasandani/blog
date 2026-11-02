# Implementation Plan: Fix SitePing UI on phones

**Spec**: `./spec.md`
**Status**: Draft

## Technical Context
- Eleventy 3 site. Global CSS is `_includes/assets/css/inline.css`, inlined
  into every page by `_includes/layouts/base.njk`.
- `@siteping/widget` 0.12.0, bundled by `scripts/build-siteping.cjs` from
  `src/siteping.js`, loaded only for verified CMS editors.
- Browser checks use Puppeteer 25 (`scripts/test-siteping-browser.cjs`,
  `scripts/test-a11y.cjs`). CI sets `PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome`.

## Architecture & Approach
1. CSS (FR-1, FR-2, FR-3). In `inline.css`, change the three contact-form
   rules from `input, textarea, button` / `input, textarea` / `button` to
   `form input, form textarea, form button` / `form input, form textarea` /
   `form button`. Property values stay the same. The only Blog-authored
   controls are in `_includes/components/form.njk` (a `<form>`, included by
   `_includes/layouts/contact.njk` for `/contact/`). SitePing's body-level
   toolbar (`annotator.ts`) and popup (`popup.ts`) have no `<form>`
   ancestor, so they fall back to their own inline styles and user-agent
   defaults. The widget's closed shadow root (launcher, FAB) was already
   unaffected.
2. Regression check (FR-2, FR-3, FR-5). Extend
   `scripts/test-siteping-browser.cjs`:
   - Keep the existing mount and cross-tab logout check.
   - New page with the `iPhone 15 Pro` device profile (393px, touch). Before
     any script runs, wrap `Element.prototype.attachShadow` to force
     `mode: 'open'` so the test can click the FAB and then the
     `[data-item-id="annotate"]` menu item. This is test-only.
   - Find the toolbar: a body child with `data-siteping-ignore` whose direct
     child is a button. Assert Cancel width < half the toolbar width and
     instruction span width >= 200px.
   - Load `/contact/` at the same viewport and assert the Send button fills
     the form's width (the scoped rule still applies).
   - Launch with `--no-sandbox`, like `scripts/test-a11y.cjs`, so it runs on
     NixOS as well. CI already runs the a11y audit with this flag.
3. Wiring (FR-5). Add `"test:siteping": "node scripts/test-siteping-browser.cjs"`
   to `package.json` and call it from `npm test` after the a11y audit (the
   site is built by then).

## Data Model
Not applicable: no stored data changes.

## Contracts
Not applicable: no API or interface changes. `/api/siteping` is mocked in
the browser check.

## Research Notes
See `./research.md`.

## Constitution Check
- 1 (scope): Blog repository only; the SitePing package isn't changed.
- 2 (preserve): the contact form's computed styles are compared before and
  after; content, URLs, editor flow and Gemini don't change.
- 3, 4 (tests): the browser check tests observable layout, mocks the API,
  uses a fake token, and needs no credentials.
- 5: no new dependency.
- 6: specs and knowledge stay unpublished (`.eleventyignore` already
  covers them).
- 9: local validation, Codex review, knowledge update, PR.
No deviations.

## Risks & Dependencies
- A future SitePing release could rename `.sp-fab` or the `data-item-id`
  values. The test would fail loudly, which is what we want after a bump.
- New Blog-authored controls outside a `<form>` would be unstyled. None
  exist today; the knowledge page records the rule.
- Adding a Puppeteer step lengthens `npm test` by a few seconds.
