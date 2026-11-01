# Agent instructions

## Resume changes go through /voice

Every change to the resume's wording goes through the `/voice` skill before it's committed. That covers `resume/David_Vasandani_CV.yaml` and any tailored copy of it: the summary, role themes and summaries, highlights, and project and open-source entries. It applies to new bullets, edits and one-word fixes alike, whoever asked for the change and wherever the draft came from.

1. Write or edit the line.
2. Run it through `/voice` (in Claude Code, invoke the `voice` skill with the text). Agents without the skill should read `~/.claude/skills/voice/SKILL.md` and follow its process. Its last step asks "what makes this obviously AI generated?"
3. Check that the rewrite kept every fact, number, qualifier ("likely", "reported", "postponed") and ownership claim, and added none. `knowledge-base/resume-voice.md` lists the mistakes that slip in most often.
4. Run `npm run resume:voice`. It flags the tells a script can find (dashes, curly quotes, "AI" more than once in a line, the skill's word lists). `npm test` runs the same check, so CI fails on them too. A clean result doesn't replace step 2.

This repository is public. Don't name the POS vendor, or any product the hiring repository marks confidential, in the resume, specs, knowledge pages or commit messages.
