# Validation: Fix SitePing UI on phones

Run 2026-11-02 locally (Node 24, Chromium 149 via `PUPPETEER_EXECUTABLE_PATH`).

## Reproduction and fix (iPhone 15 Pro profile, 393px, mocked editor session)
| | toolbar height | Cancel width | instruction width |
|---|---|---|---|
| Before | 187px | 365px | 0px (one word per line) |
| After | 57px | 82px | 251px (two lines) |

The comment popup, opened by tapping the page heading in annotate mode,
also renders with SitePing's own styles after the fix: the textarea is
359px wide, buttons are translucent white or SitePing's accent, and none
take the Blog's blue `button` style. Screenshot checked by eye.

## Regression check
`scripts/test-siteping-browser.cjs` (`npm run test:siteping`) fails
before the CSS change (`Cancel fills the annotate toolbar:
{"toolbar":393,"cancel":365,...}`) and passes after it.

## Contact form unchanged
Computed width, height, padding, margin, font, border, background, color,
cursor and display of every `/contact/` input, textarea and button, at 393px
and 1280px: identical before and after (`diff` of the two snapshots printed
nothing).

## Suite
- `npm test`: 50/50 node tests, Pa11y public-page audit (25 pages) and
  `test:siteping` passed.
- `npm run typecheck`: passed.
