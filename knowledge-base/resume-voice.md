# Resume voice and public-repo confidentiality

Task: 76c7f44d-6efd-4fda-abfc-9f3b31eeb12f (My Voice)
Updated: 2026-11-01

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

## Confidentiality in this public repo
`davidvasandani/blog` is public, so the "Confidential" lists in the hiring repo's resume material apply to everything committed here, including specs, knowledge pages and commit messages, not just the resume. Before committing:
- `git diff origin/main | grep -i` for the product names those lists name. That includes the POS product and the remote-access and camera tools. Don't write the names here, even in this note.
- Don't cite hiring files whose names contain a product name. Use a neutral alias and describe the file instead.
- If a name slips into a local commit, amend it before the first push. The PR keeps every pushed commit, even after a squash merge.

Don't name the POS vendor anywhere in this repo, not even by its short company name. David asked for that on 2026-11-01, and the resume now says "our POS vendor". Other vendors already on the resume (Paytronix, Datadog, Meraki) are fine. Ask David before adding new vendor names.

## Checks
A whole-file rewrite is safe to verify mechanically. Parse the old and new YAML with ruamel from `resume/.venv` (system Python has no PyYAML), compare the shapes, and confirm only summary and highlight strings changed. Then scan for dashes, curly quotes, "AI" counts and the skill's word list. Render both versions to compare page counts (3 pages here).
