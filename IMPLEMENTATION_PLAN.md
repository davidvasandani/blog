# Implementation plan: Resume Heading Design (task 0d66)

1. Baseline. Render the resume (`npm run resume -- --dont-generate-png`),
   build the site, and screenshot `/resume/` at 1280px and 393px.
2. In `scripts/resume-page.cjs`, add a markdown-it core rule (a small local
   plugin) that walks the token stream after parsing:
   - After each `h3` heading, collect the following plain-text paragraphs
     (a single text token, no trailing period). If one of them is a date or
     a duration, the run up to the last such paragraph is the meta block.
     Replace it with one `<p class="resume-meta">` holding a `<span>` per
     item, ordered dates, duration, location.
   - In an `h3` whose inline starts with `**Company**` followed by
     `, Title`, wrap the company in `<span class="resume-org">`, the comma
     in `<span class="visually-hidden">`, and the title in
     `<span class="resume-role">`.
   - A paragraph that is only `**Theme: sentence**` becomes
     `<p class="resume-theme"><span class="resume-label">Theme:</span>
     sentence</p>`.
   Injected markup is fixed strings in `html_inline` tokens; resume text
   stays in `text` tokens, so it is still escaped.
   Export a `renderResume(markdown)` helper so tests can call it.
3. Add scoped styles to `_includes/assets/css/inline.css` under
   `.resume-*` and a `.visually-hidden` utility: eyebrow (small caps,
   letter-spaced, muted), heading spacing, meta line with `·` separators
   (CSS `content` with empty alt text), theme accent bar, extra space
   before each role. Check muted colours for 4.5:1 contrast on `#FFF0EB`.
4. Tests in `tests/resume.test.cjs`: meta grouping and order, year-only
   meta, a summary sentence that isn't meta, eyebrow split with heading
   text unchanged, theme paragraph, and escaping of `<` in resume text.
5. Verify: rebuild, screenshot both widths, run `npm test` with Chromium
   (Pa11y, voice check, outline test).
