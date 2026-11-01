# Prior knowledge: resume voice rewrite

Read-only search of `blog/knowledge-base` for resume, wording, voice and tone. No page covers writing style, so the rules for this task come from the `/voice` skill. Two pages constrain the rewrite:

- `resume-role-timeline.md`: each accomplishment belongs to a specific Sweetgreen role, based on ChartHop dates and the hiring timeline. Don't move bullets between roles. The virtual POS cutover never ran, so don't imply a rollout. Incident remediation must not imply David restored stores himself (vendors and field technicians did). The Senior highlights came from the 2021 resume and aren't newly verified, so keep their claims as they are.
- `resume-rendercv.md`: the YAML follows the RenderCV 2.8 schema. `tests/resume.test.cjs` checks the schema tag, name and theme. Render with `npm run resume` before building, and check the HTML page and PDF together. Pa11y audits `/resume/`.

From the hiring repository (read-only), used as evidence for what each bullet means:

- The POS vendor integration page in `resume-material/` and its research folder: the sales-date fix needs a preview and a named approver. The settings contract work covers 343 POS locations, a count that includes lab and sandbox locations. Vendor security findings stay off the page.
- `canonical-timeline/sources/work.json` E126: the remote-support tool is an MCP server for store POS devices, built on the stores' remote-access product. The product name is confidential (LSF). It runs PowerShell, takes screenshots and moves files. Commands are read-only by default, and every command is allowlisted and audited.
- `personal.json` hl-firecrawl: the browser service keeps sessions with saved profiles and has a live view a person can use.
- `research/08-resume-summary.md`: the summary was written to Matt Ryan's guidance. The facts in it were checked on 2026-10-27, and the rewrite must keep them.
