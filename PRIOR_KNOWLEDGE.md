# Prior knowledge: Clarify volume (a290)

Pages searched in `knowledge-base/`: index, resume-voice, resume-rendercv, resume-role-timeline. Nothing in the knowledge base mentions the loyalty-scan bullet, the 272-store fleet or store volume.

## What applies
- **Every resume change goes through `/voice`** (resume-voice.md, AGENTS.md, constitution 10), even a one-phrase edit. Keep qualifiers word for word ("likely cause"), keep the implied subject, and add no outcomes. `npm run resume:voice` (also run by `npm test`) catches dashes, curly quotes, "AI" twice in a line and the skill's word lists. It doesn't check hyphens, so "highest volume" passes either way.
- **Confidentiality** (resume-voice.md): the repo is public. Don't name the POS vendor, even by its short name, in the resume, specs, knowledge pages or commit messages. Check `git diff origin/main` before pushing. The resume already says "the vendor" in this bullet.
- **Claims follow evidence** (resume-role-timeline.md, constitution reviews). The hiring repo is read-only. Its loyalty-scan notes say 32 stores of 272 over 7 days; they don't rank the 32 by volume. The new wording comes from David's instruction in this task, so the spec records it as the source.
- **Rendering** (resume-rendercv.md): `npm run resume:setup` then `npm run resume` writes ignored output to `resume/rendercv_output/`. The voice rewrite checked a 3-page result. Use ruamel from `resume/.venv` to compare YAML shapes; system Python has no PyYAML.
- **Local `npm test`** needs Chrome for Pa11y. On this NixOS host set `PUPPETEER_EXECUTABLE_PATH` to a nix-built chromium.
- **Before-and-after table with a facts column** is the quickest way for a reviewer to catch a changed claim (resume-voice.md).
