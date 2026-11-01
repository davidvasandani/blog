# Rewrite the resume in David's voice

Task: 76c7f44d-6efd-4fda-abfc-9f3b31eeb12f (My Voice)

## Problem

The resume reads like it was written by an AI. David's example:

> Enabled AI-driven POS troubleshooting through AI-assisted development of remote-support tools with read-only defaults, approval controls and audit logs.

Nobody talks like that. "AI" shows up three times, the verb ("Enabled") hides what he built, and the reader can't tell what the tool does. Other bullets have the same tells: "-ing" tails ("unblocking automation while preserving manual intervention"), stacked nouns, "leveraging", "evangelized", "increasing developer velocity", passive voice.

## Goal

Run every sentence in `resume/David_Vasandani_CV.yaml` through the `/voice` skill (identical to the attached `SKILL (1).md`, which is named `unslopify` in the attachment). The resume should sound like David explaining his work to another engineer: plain verbs, what the thing does, then the result.

## The skill

The attached skill is already installed as `voice` in the user skills directory (`~/.claude/skills/voice`, a managed catalog link). Apart from the name, its text matches the attachment exactly, so there is nothing to install. The skill isn't copied into this repository.

## Rules for the rewrite

1. Keep every fact: numbers, dates, titles, counts, scope qualifiers ("likely cause", "planned cutover was postponed", "as reported"). No new claims. Where a bullet is vague, the plainer version may name what the existing evidence says the thing does (for example the remote-support tool runs PowerShell on store POS devices). It must not add outcomes or numbers that aren't already there.
2. Keep the role attribution from `knowledge-base/resume-role-timeline.md`: no bullet moves between roles, no recovery or rollout claims the evidence doesn't support.
3. Keep confidential details off the page (vendor security findings, store names, people, tickets). Vendor names already on the page (Paytronix, Datadog and so on) can stay, except the POS vendor, which David asked to leave unnamed.
4. Say "AI" once per bullet at most, and only where it matters (the role's theme is AI-assisted work, so it should still be visible).
5. Follow the skill: active voice, plain words, no em dashes, no "-ing" tails, no puffery, no rule-of-three padding, sentence case.
6. Resume conventions still apply: implied first person (no "I" in Sweetgreen bullets), past tense for finished work, one or two short sentences per bullet. The open-source section already uses "my"; that can stay.
7. Leave structure alone: same sections, same entries, same dates, same `TODO` comment, same schema line, theme and settings.

## Out of scope

- The hiring repository (read-only for this task).
- Adding or removing accomplishments, changing dates or titles.
- Layout, theme or RenderCV changes.

## Acceptance

- Every highlight, summary and theme line has been reviewed against the skill. Lines that already read plainly may stay as they are.
- A fact check table maps each changed line to the original and confirms no fact changed.
- `npm test` resume checks pass, and `npm run resume` renders the PDF and Markdown.
- An independent Codex review finds no significant issues.
- Knowledge is recorded, and the change merges through a PR.
