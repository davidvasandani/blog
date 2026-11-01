# Implementation plan: resume voice rewrite

1. Confirm the `voice` skill is installed and matches the attachment. Done: `~/.claude/skills/voice/SKILL.md` matches the attachment exactly once the name is changed from unslopify to voice.
2. Walk the YAML top to bottom and apply the skill to every line a reader sees: the summary, each role's theme and summary line, every highlight, the open-source and project entries, and the skill labels.
3. For each changed bullet, check its facts against the original and against the evidence listed in `PRIOR_KNOWLEDGE.md`. Record the before and after text in `specs/vk/76c7-my-voice/research.md`.
4. Self-audit with the skill's last step ("what makes this obviously AI generated?"). Check for em dashes, "AI" said more than once per bullet, "-ing" tails, passive voice and the banned word list.
5. Run `node --test tests/resume.test.cjs` and `npm run resume`. Read the rendered Markdown to check the line wrapping and page count.
6. Commit on `vk/76c7-my-voice`, get a Codex review, fix what it confirms, then record knowledge, open the PR and merge it.
