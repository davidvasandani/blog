# Feature specification: resume in David's voice

Feature dir: `specs/vk/76c7-my-voice/`
Status: Specified through `/speckit.specify`

The resume is accurate but reads like AI wrote it. David's example: "Enabled AI-driven POS troubleshooting through AI-assisted development of remote-support tools with read-only defaults, approval controls and audit logs." It says "AI" three times and never says what the tool does. Interviewers at Netflix read every line before their round, and they read polish without substance as a warning sign. Each bullet should say what David built or found, how it works in plain words, and what happened.

## User stories
- As David, I want the resume to sound like me explaining my work to another engineer, so the page and the interview match.
- As a recruiter skimming for 6 seconds, I want each bullet to name the thing and the result without decoding jargon.
- As an interviewer, I want claims I can ask about, with the same facts and limits as before.

## Functional requirements
- FR-1: Apply the `/voice` skill to every visible line: the summary, role themes and summary lines, highlights, open-source and project entries, and skill labels.
- FR-2: Keep every fact: numbers, dates, counts, titles, named systems and vendors, and qualifiers such as "likely", "postponed" and "as reported". Add no new outcomes or numbers.
- FR-3: Keep each accomplishment under its current role and entry. Keep the existing order unless a merge or split is needed for clarity, and say so in the research notes.
- FR-4: Where a bullet is too vague to read plainly, name what the thing does, using only committed evidence (the hiring timeline and resume material).
- FR-5: Mention AI at most once per bullet, and keep it where the AI-assisted work is the point.
- FR-6: Follow the skill's style rules: active voice, plain words, no em dashes, no "-ing" tails, no puffery, sentence case.
- FR-7: Record each changed line next to its original in the research notes, with a fact check.

## Out of scope
New accomplishments, date or title changes, layout or theme changes, the hiring repository, and installing the skill (it's already installed as `voice` and matches the attachment).

## Acceptance criteria
- Every visible line has been checked against the skill. The research notes list each change with its original and a fact check.
- No line has an em dash or says "AI" more than once.
- The resume tests pass, and `npm run resume` renders the PDF and Markdown.
- An independent review finds no changed facts and no significant style problems.

## Open questions
Resolved through `/speckit.clarify` (no answers were supplied with the command, so these follow the task text and existing evidence):
- Point of view: keep the implied-subject resume style in the summary and Sweetgreen bullets. The skill allows "I" but doesn't require it, and the summary was written to Matt Ryan's guidance in that style. The open-source entry already says "my" and keeps it.
- Senior-era bullets: rewrite their wording like the rest. Their claims stay exactly as imported from the 2021 resume, with no new specifics, because the newer timeline doesn't verify them.
- Naming tools: a bullet may say what a tool does when the evidence supports it. Products already named on the page stay. Products the hiring material lists as confidential (such as the remote-access and camera tools) stay off, even when the evidence names them. Vendor security findings, store names, people and ticket numbers stay off.

No open questions remain.
