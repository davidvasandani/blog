# Implementation plan: Fix SitePing UI (task 91b3)

1. Reproduce. Build the site, open `/` at an iPhone viewport with a mocked
   editor session, open annotate mode, and measure the toolbar. Before the
   fix: Cancel 365px of a 393px viewport, instruction text 0px wide.
2. Record the contact form's computed styles (input, textarea, button:
   width, padding, margin, font, border, background, color) at desktop and
   phone widths as a baseline.
3. In `_includes/assets/css/inline.css`, change the selectors
   `input, textarea, button` to `form input, form textarea, form button`,
   and `input, textarea` / `button` the same way. No property values change.
4. Extend `scripts/test-siteping-browser.cjs`: in a touch, 393px-wide page,
   open annotate mode through the widget's menu and assert that Cancel is
   narrower than half the toolbar and that the instruction text is at
   least 200px wide. Also assert that the contact form button still fills
   its form. The widget's shadow root is closed, so the test opens it in
   `evaluateOnNewDocument` (test only).
5. Add an npm script `test:siteping` and run it from `npm test` after the
   build, so CI catches a regression.
6. Check the fix: rerun step 1 (screenshot) and diff step 2's styles.
   Run `npm test`, `npm run typecheck`.
7. Codex review, knowledge page update, PR, merge.
