# Research: Fix SitePing UI on phones

## Root cause (measured)
Chromium, iPhone 15 Pro profile (393px), `/` with a mocked editor session,
annotate mode open, before the fix:
- toolbar 393x187px, Cancel 365x40px, instruction span 0px wide (wraps one
  word per line). Matches David's iPhone screenshot.

`@siteping/widget` 0.12.0 source (`src/annotator.ts`): the toolbar is a
flex row appended to `document.body`, after `isolateFromHost` (which stops
event bubbling; it doesn't reset CSS). Cancel's inline style sets height,
padding, border, background, font and `flex-shrink:0` but not `width` or
`margin`. The Blog's `input, textarea, button { width:100%; margin-bottom:1em }`
then wins for those properties. `src/popup.ts` appends its root, textarea and
buttons to `document.body` the same way.

## Options considered
1. **Scope the Blog's rules to `form` (chosen).** It fixes the cause, it's
   a three-selector change, and the contact form (the only Blog control) is
   inside a `<form>`. Specificity rises from (0,0,1) to (0,0,2). Nothing
   else in `inline.css` targets these elements, so no rule changes winner.
2. Add `[data-siteping-ignore] button { width:auto; margin:0 }` overrides.
   This treats the symptom and has to track every property the Blog sets
   (padding, font, border, background, color), and the popup's elements.
3. Patch or fork the widget so it sets `width:auto`. This is outside the
   Blog's code, gets overwritten on upgrade, and only covers the properties
   we patch.
4. Scope to `form[name="contact"]`. Tighter, but a future Blog form would
   lose its styling with no gain; `form` is enough.

## Test approach
The widget's shadow root is closed. The test wraps `attachShadow` before
page scripts run so it can click the FAB menu like an editor would. This
changes nothing the widget renders into the page body.
