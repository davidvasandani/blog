# Resume voice and public-repo confidentiality

Task: 76c7f44d-6efd-4fda-abfc-9f3b31eeb12f (My Voice)
Updated: 2026-11-01 (follow-up: /voice required for every resume change; task a29016bd-821a-4444-a8ae-2402820da029, Clarify volume)

## The rule
David asked that every resume update go through `/voice`. Three places enforce it. `AGENTS.md`, which `CLAUDE.md` imports, gives agents the steps. Constitution principle 10 makes it part of every SpecKit task. `scripts/resume-voice.cjs` (`npm run resume:voice`, and also run by `npm test`) fails CI on dashes, curly quotes, "AI" said more than once in a line and the skill's word lists. The script can't tell whether a line was actually rewritten with the skill, so running `/voice` is still required. Run against the resume from before #160, the script flags David's original example bullet (two "AI"s) and a "leveraging".

## Voice
David wants the resume to sound like him, not like AI. His example of what not to write: "Enabled AI-driven POS troubleshooting through AI-assisted development of remote-support tools with read-only defaults, approval controls and audit logs." Write every resume line with the `/voice` skill (installed for agents as `~/.claude/skills/voice`, the same skill as the attachment named `unslopify`).

What worked:
- Say what was built or found, then what happened. "Built a tool that lets AI agents run PowerShell on store POS devices ..." beats "Enabled AI-driven troubleshooting".
- Mention AI once per bullet at most. The Senior Manager role is about AI-assisted work, so it still shows up, just not three times in one line.
- Avoid "-ing" tails ("unblocking automation while preserving manual intervention"). Split into two short sentences instead.
- Keep qualifiers word for word: "likely cause", "reported" costs, "postponed" cutover.
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
