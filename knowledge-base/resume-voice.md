# Resume voice and public-repo confidentiality

Task: 76c7f44d-6efd-4fda-abfc-9f3b31eeb12f (My Voice)
Updated: 2026-11-04 (task 7e87-star-method, STAR Method: measured outcomes and STAR-shaped bullets). Earlier: 2026-11-02 (task 2714e137-7187-48a4-a394-3f05e06a30ee, Reword: David rewrote the crash and loyalty-scan bullets). Earlier follow-up 2026-11-01: /voice required for every resume change; task a29016bd-821a-4444-a8ae-2402820da029, Clarify volume

## The rule
David asked that every resume update go through `/voice`. Three places enforce it. `AGENTS.md`, which `CLAUDE.md` imports, gives agents the steps. Constitution principle 10 makes it part of every SpecKit task. `scripts/resume-voice.cjs` (`npm run resume:voice`, and also run by `npm test`) fails CI on dashes, curly quotes, "AI" said more than once in a line and the skill's word lists. The script can't tell whether a line was actually rewritten with the skill, so running `/voice` is still required. Run against the resume from before #160, the script flags David's original example bullet (two "AI"s) and a "leveraging".

## Voice
David wants the resume to sound like him, not like AI. His example of what not to write: "Enabled AI-driven POS troubleshooting through AI-assisted development of remote-support tools with read-only defaults, approval controls and audit logs." Write every resume line with the `/voice` skill (installed for agents as `~/.claude/skills/voice`, the same skill as the attachment named `unslopify`).

What worked:
- Say what was built or found, then what happened. "Built a tool that lets AI agents run PowerShell on store POS devices ..." beats "Enabled AI-driven troubleshooting".
- Mention AI once per bullet at most. The Senior Manager role is about AI-assisted work, so it still shows up, just not three times in one line.
- Avoid "-ing" tails ("unblocking automation while preserving manual intervention"). Split into two short sentences instead.
- Keep qualifiers word for word: "reported" costs, "postponed" cutover. Only David can drop one. He dropped "likely cause" from the loyalty-scan bullet on 2026-11-02 (Reword task).
- Keep the implied subject in work bullets. The open-source entry uses "my".
- Write a before-and-after table with a facts column (see `specs/vk/76c7-my-voice/research.md`). It's the quickest way for a reviewer to catch a changed claim.

Two mistakes the review caught, both easy to repeat:
- An outcome slipped in while simplifying a vague benefit ("more sustainable" became "less code to maintain"). When the original is vague, keep its purpose instead of inventing a result.
- A causal rewrite dropped ownership ("leading the team to improve" became "It led the team"). Keep the subject.

## Claims David supplies himself
Task a29016bd-821a-4444-a8ae-2402820da029 (Clarify volume, 2026-11-01). Sometimes David gives the exact wording of a claim the notes don't contain. He changed "32 of 272 restaurants" to "32 of our highest volume restaurants". The hiring notes give 32 stores out of 272 and don't rank them by volume.
- Use his wording as given. Style fixes are fine to suggest in the PR: he wrote "highest volume", then asked for the hyphen ("highest-volume") on 2026-11-02.
- Write down in the task's spec that the claim came from David's instruction, not the notes. Later reviewers checking against the hiring evidence will otherwise flag it.
- The edit still goes through `/voice`, but the pass is about the rest of the bullet. Don't rewrite his phrase.
- Leave the hiring repo's copies alone ("32 of 272 stores" there is the investigation record). It's read-only for blog tasks.

Task 2714e137-7187-48a4-a394-3f05e06a30ee (Reword, 2026-11-02). David rewrote the crash and loyalty-scan bullets in his own words, so neither one says "32 of our highest-volume restaurants" any more. New claims from him: "dozens of high-volume stores", the lunch rush, reverse-engineering the POS executable, and the loyalty DLL logging nothing when the reward dialog opens. At his request the bullets also dropped facts the notes support (314 crashes, the memory-limit cause, 18 registers, 32 stores, 46 forced restarts). `specs/vk/5998-reword/spec.md` lists both sets. Don't add the dropped facts back unless he asks.
- When David's wording is vague ("found missing logging"), ask what he means and use his answer instead of guessing.

## Confidentiality in this public repo
`davidvasandani/blog` is public, so the "Confidential" lists in the hiring repo's resume material apply to everything committed here, including specs, knowledge pages and commit messages, not just the resume. Before committing:
- `git diff origin/main | grep -i` for the product names those lists name. That includes the POS product and the remote-access and camera tools. Don't write the names here, even in this note.
- Don't cite hiring files whose names contain a product name. Use a neutral alias and describe the file instead.
- If a name slips into a local commit, amend it before the first push. The PR keeps every pushed commit, even after a squash merge.

Don't name the POS vendor anywhere in this repo, not even by its short company name. David asked for that on 2026-11-01, and the resume now says "our POS vendor". Other vendors already on the resume (Paytronix, Datadog, Meraki) are fine. Ask David before adding new vendor names.

## Checks
A whole-file rewrite is safe to verify mechanically. Parse the old and new YAML with ruamel from `resume/.venv` (system Python has no PyYAML), compare the shapes, and confirm only summary and highlight strings changed. Then scan for dashes, curly quotes, "AI" counts and the skill's word list. Render both versions to compare page counts (3 pages here).

## Camera check in remote support

Task 5ab27642-ab10-41bf-83d9-2bafb85d0287, follow-up 2026-11-02. David supplied the security-camera integration and managers' back-office device scope for the remote-support bullet. It checks whether someone might be using the computer before business-hours changes. This is user-provided evidence, not newly verified by the older timeline. Preserve uncertainty and existing approval/logging controls; do not turn the check into guaranteed occupancy detection or a claimed automatic block.


## Validation and partner-support stories

Task 5ab27642-ab10-41bf-83d9-2bafb85d0287, follow-up 2026-11-02. David approved the Spyce/Wonder validation story and two DoorDash stories for the resume. Preserve these distinctions when editing:

- The transfer story is about export parsing, completeness checks and restoring missing items before handoff. Legal set redaction criteria and a colleague did the initial drive review. Keep roughly 12,039 approximate.
- The three-store DoorDash incident is contributed investigation; DoorDash confirmed and fixed the configuration migration. The separate paused-store story has a successful manual REST recovery, but the webhook escalation does not establish a shipped permanent fix.
- Household ingestion is a personal project. Validation, metadata extraction, deduplication and recovery are supported; 63 requeued downloads are not 63 completed downloads.

Evidence mapping and the voice pass are recorded in `specs/vk/5ab2-timeline-audit-a/resume-stories.md`.

## Content recovery claims

Task VAS-965, c2fbb0ca-6f57-45bd-b382-038719fc40ea, 2026-11-02. The household project's recovery bullet now leads with restored content imports. Keep its two results separate: 62 new items imported, 63 failed downloads requeued. Requeuing is not proof of completion. The hiring timeline audit's F08/R041 retained these prior resume figures without retrieving the underlying run, so a wording edit does not add corroboration or justify a stronger outcome. See [the fact comparison](../specs/vk/4fff-this-is-borning/research.md).

## Measured outcomes and STAR bullets

Task 7e87-star-method, 2026-11-04. The hiring manager asked for every bullet to set up the business problem, say what was built or found, and measure the result in hard numbers, estimates allowed, with fewer framework names. Resume version 2.0.0 is written that way. Rules that came out of it:

- A number goes on the resume only with a source row: a hiring evidence page, David's recorded instruction, or a dated re-run of a query recorded in hiring with its window and caveats. Estimates only David can make (licensing avoided, hours returned, lost sales) are listed for him in hiring, never invented here.
- "Don't add dropped facts back unless David asks" was satisfied by his reply to the hiring manager ("They all need measured outcomes") plus opening the task with the feedback attached. Record the reason in the spec when restoring a fact he once removed.
- Framework names leave a bullet when they are decoration and stay when they are the subject or a scope qualifier ("the POS devices Ansible manages"). The skills list keeps them all. Removing a name is not a fact change, but say so in the facts column.
- A colon followed by a space inside an unquoted YAML highlight turns the line into a mapping and fails the render. Use a comma or quote the string.
- Long entries need `design.entries.allow_page_break: true`, or RenderCV moves the whole entry to the next page and leaves a gap. A second paragraph in an entry `summary` renders as monospace raw text; join the theme line and the paragraph with a single newline instead of a blank line.
- Grep tracked and untracked changes for confidential names (`git diff --name-only origin/main` plus `git ls-files --others --exclude-standard`). A `git diff` alone skips new spec files, which is where two private file names carrying confidential words slipped in before the Codex review caught them. Describe hiring sources generically here instead of pasting their paths.
- A STAR rewrite grows the text by about 15 percent. Hold three pages by cutting the lowest-relevance bullets from the oldest roles first and listing every cut in the spec.

## Cutting for positioning

Task: 9c61-feedback-1, 2026-11-05. A second reviewer read version 2.0.0 and asked for positioning, not more evidence: a summary that states target, scope and differentiator; the current role cut to the three strongest stories plus compressed support; denominators explained; "AI" named less often than the decisions it served; no theme lines or elapsed durations. Version 3.0.0 is the result. Rules that came out of it:

- A positioning cut changes weight and order, never numbers. Merge bullets that tell the same story (two agent-tool bullets, two partner-incident bullets, a dollar figure that belongs to the bullet whose tool found it) and keep every fact from both lines; the research table lists the facts of each source line beside the merged text so a reviewer can see nothing fell out.
- Explain a count rather than unify it: "the 18 registers that had crashed in the previous 30 days", "32 of the 272 restaurants scanning that week", "343 POS locations, lab and sandbox included". Each count is correct; the friction was that they counted different things.
- Budget "AI": once in the summary and only in bullets where the tool is the point. Where it leaves a line, keep attribution some other way ("Decompiled ... with an agent", "built an agent that") so no ownership claim changes.
- Rewriting a vague outcome to "the concrete operational change" is the easiest place to invent a result. Keep the original clause when it is true and vague ("a bad change could break less") and restate only what the sentence already says; "only its own slice" and "never again" were absolutes the Codex review caught. List the replaced phrases for David to restore with a figure.
- RenderCV's classic theme prints "10 months" beside experience dates by default; `design.sections.show_time_spans_in: []` removes them. The page transform (`scripts/resume-page.cjs`) treats the duration line and the theme callout as optional, so the source can drop both without a script change.
- Questions only David can answer (how two overlapping roles were arranged, whether his own phrase should narrow, figures for old outcomes, language proficiency) go in hiring as a table, not onto the page and not into the PR as a blocker.
- A major version bump: fewer bullets, a new summary and a reordered skills list is "changed positioning" under the README's rule even though no number changed.
