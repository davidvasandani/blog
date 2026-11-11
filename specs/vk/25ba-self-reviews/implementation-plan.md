# Implementation plan

Task: 25ba-self-reviews. Sanitized copy.

1. In the private repository: keep the three review documents, cross-check each claim against dated records, update the private work timeline and notes, and draft proposed resume lines through `/voice` with an evidence row and a recommendation each.
2. Here: constitution review entry, SpecKit `spec.md`, `plan.md` and `tasks.md` in this directory, and a knowledge note on review documents as resume evidence. The resume YAML and version stay as they are.
3. Validate: `npm run resume:voice`, `npm test`, `git diff origin/main -- resume/` empty, confidentiality grep over tracked and untracked changes.
4. Independent Codex review of both diffs, knowledge capture, then a pull request in each repository.
