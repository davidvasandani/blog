# Fix the SitePing toolbar on phones

Task: 91b3 (Fix SitePing UI)

## Problem
On a phone, SitePing's annotate toolbar is broken. The instruction "Tap an
element or drag to select an area" wraps one word per line down the left
edge, and a full-width Cancel pill sits over it (David's iPhone screenshot,
2026-11-02, on /resume/).

## Cause
SitePing puts its annotate toolbar, comment popup, markers and tooltip in
the page's own DOM (`document.body`), not in its shadow root. The Blog's
contact-form rule in `_includes/assets/css/inline.css` styles every
`input`, `textarea` and `button` on the page:

```css
input, textarea, button { width: 100%; padding: 1em; margin-bottom: 1em; ... }
button { border: 1px solid var(--primary); background-color: var(--primary); ... }
```

The toolbar's Cancel button has inline height, padding, border and
background but no width or margin, and `flex-shrink: 0`. It takes the
global `width: 100%`, fills the flex row, and leaves the instruction
`<span>` with no width. Reproduced in Chromium at 393px: Cancel 365px wide,
instruction 0px wide, toolbar 187px tall. The comment popup's `textarea`
and buttons sit in the same DOM and get the same rule.

## Change
Scope the contact-form control rules to `form` (`form input`,
`form textarea`, `form button`). The only `input`, `textarea` and `button`
elements in the Blog's own templates are in the contact form
(`_includes/components/form.njk`), so it looks the same. SitePing's
body-level controls are not inside a `<form>`, so they keep the widget's
own styles. Don't patch or fork `@siteping/widget`.

## Requirements
1. On a 393px-wide touch viewport, the annotate toolbar's instruction text
   is readable on at most two lines, and Cancel keeps its intrinsic width
   (well under the viewport width), not the full row.
2. The contact form's inputs, textarea and submit button keep the same
   computed width, padding, margin, font, border and colors.
3. Public readers still don't load the widget; sign-in, cross-tab logout
   and the API are unchanged.
4. A browser regression test covers requirement 1 and runs in
   `scripts/test-siteping-browser.cjs`.
5. `npm test` passes.

## Out of scope
Upstream SitePing changes, theming the widget to match the Blog, and any
other service.
