# Follow-up: group roles under one company heading

Requested by David on 2026-11-02 after #169 ("Show me a PR of the four
Sweetgreen roles grouped under one company heading"). This reverses the
spec's "out of scope" note on grouping.

## Behaviour
- Adjacent entries whose heading starts with the same `**Company**` form a
  group. A group of two or more renders as:
  `<section class="resume-company">` with an h3 company name, a meta line
  with the overall range (oldest start to newest end, from the roles' own
  date lines) and the location when every role shares it, then
  `<div class="resume-roles">` holding each role as an h4 with its own
  dates and duration (and its location only when locations differ).
- Single-role companies, Open Source and Projects keep the #169 layout.
- No duration is shown at company level: RenderCV doesn't compute one, and
  adding up role durations would double-count the overlapping months.
- Words, YAML and PDF are unchanged; `/voice` has nothing to review.

## Validation (2026-11-02)
- `npm test`: 55/55 pass, including two new grouping tests. Pa11y passed
  on 26 pages, `/resume/` included.
- Built page: Sweetgreen shows "Aug 2019 – present · Culver City, CA", with
  four roles on a timeline. LearnZillion, HOT and Warby Parker are
  unchanged. Screenshots checked at 1280px and 393px.
- Codex review: no significant findings.
