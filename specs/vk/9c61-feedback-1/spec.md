# Feature specification: resume positioning cut after the second review

Feature dir: `specs/vk/9c61-feedback-1/`
Task: 9c61-feedback-1 (Feedback 1)
Status: Draft

## Summary

On 2026-11-05 a second reviewer read resume version 2.0.0 and said it reads like an engineering case log: the title says IT leader, the evidence says hands-on engineer, ten current-role bullets carry equal weight, the summary narrates a case study that the first bullet repeats, the fleet counts differ without explanation, and "used AI" recurs where the reader wants to see decisions. The target has not changed: the Netflix Solutions Engineer 5 opening, a hands-on individual-contributor role. This feature restructures `resume/David_Vasandani_CV.yaml` so that a reader finds the differentiator (solving opaque production problems in vendor systems and turning the fixes into controlled, repeatable tools) without working for it, and bumps the resume to version 3.0.0.

## User stories

- As a recruiter scanning the top third of the page, I want the summary to say what kind of engineer this is, at what scope, and what sets him apart, so that I place the resume in seconds without reading a case study.
- As an interviewer, I want the strongest three stories first and the supporting ones compressed, so that I spend my preparation on the claims that matter.
- As a reader comparing numbers, I want each fleet count to say what it counts, so that nearly 300, 272, 343 and 18 do not read as contradictions.
- As a reader judging engineering judgment, I want the controls (read-only defaults, named approver, refusal to retry an irreversible change, a contract that fails the build) to stand out more than the tool that helped.
- As David, I want every fact, qualifier and ownership claim from version 2.0.0 to survive unless the spec lists it as cut, and the questions only I can answer listed for me rather than guessed.

## Functional requirements

- FR-1: The summary is at most four sentences and about 60 to 75 words. It states the target (hands-on engineer at the boundary with vendors and partners), scope (seven years at Sweetgreen, three promotions, running IT Operations for a chain of nearly 300 restaurants while still doing the engineering) and differentiator. It names "AI" at most once and contains no case study or crash figure.
- FR-2: The current role has exactly seven highlights in this order: POS crash investigation and workaround; vendor settings contract and fleet audit; sales-date corrections with the $55K report discrepancy as its closing sentence; loyalty-scan freezes compressed to the evidence-to-vendor story; agent tooling merged from the remote-command and browser-service bullets, led by its controls; DoorDash merged from the three-store incident and the paused restaurant; the data handoff compressed.
- FR-3: Each fleet count says what it counts: the 18 registers are the ones that had crashed in the previous 30 days; 272 is the restaurants that took loyalty scans in the measured week; 343 is POS locations with lab and sandbox included; "nearly 300 restaurants" is the chain.
- FR-4: "AI" appears in the summary once and in at most three current-role highlights. Where it leaves a line, the line still says who did the work ("directed agents", "had an agent", or the action itself when David owned it), so no ownership claim changes.
- FR-5: The role summaries lose their bold Theme lines and the sentence about reporting to the VP. They keep the promotion lines and the team of three as one clause.
- FR-6: The rendered resume shows no elapsed durations beside experience dates.
- FR-7: The 2019 to 2021 role replaces its three vague outcomes ("developers shipped faster", "costs went down", "new engineers got up to speed faster") with the concrete operational change each bullet already implies, adding no new result. The replaced phrases are listed for David to restore with a figure if he has one.
- FR-8: Earlier employers keep their lines and dates. The 2016 to 2019 and 2016 to 2018 overlap is not explained on the page; the question goes to David in the hiring repository.
- FR-9: The household project keeps two highlights (resumable imports with validation; email triage with a plain-words description of the classifier) and drops the recovery bullet with the 62 and 63 counts and the classifier's product name. The coding platform and SitePing entries are unchanged.
- FR-10: Skills are ordered for the target (APIs and troubleshooting first, then AI agents and automation, observability and IT operations, infrastructure and delivery, AWS, technical leadership) and the "Data & content workflows" row is removed. No Python, Java, SQL or media-format skill is added.
- FR-11: Every David-supplied phrase, qualifier and ownership claim from version 2.0.0 survives unchanged except where this spec lists a cut. Merging two highlights keeps every fact from both.
- FR-12: Every changed, merged or compressed line goes through `/voice`; `npm run resume:voice` passes.
- FR-13: Nothing committed to the blog names the POS vendor or product, the remote-access or camera tools, a store, a register hostname, a ticket, the hiring manager or the second reviewer; file names included.
- FR-14: `resume/VERSION` becomes 3.0.0.
- FR-15: `pages/projects.md` describes the household platform's classifier in the same plain words as the resume.
- FR-16: The hiring repository records the review text, the new lines with a claim-to-evidence map, the merged and cut lines, and the questions only David can answer.

## Out of scope

Interview stories, the resume page layout and transform, the Gemini output, new numbers or estimates, new vendor names, and any claim about Python, Java, SQL or media formats.

## Acceptance criteria

- [ ] `npm run resume:voice` reports no problems.
- [ ] `npm run resume -- --dont-generate-png` renders a PDF of at most three pages, and the Markdown output contains no line matching a bare duration such as "10 months" or "4 years 6 months".
- [ ] The Markdown output contains no "Theme:" text.
- [ ] A count of `\bAI\b` in the YAML gives one hit in the summary and at most three in the current role's highlights.
- [ ] `node --test tests/resume.test.cjs` and `npm run build` pass.
- [ ] A YAML comparison against `origin/main` shows only prose strings changed or removed, the highlight lists shortened as FR-2 and FR-9 describe, one design option added and the version changed.
- [ ] A grep of tracked and untracked changes finds none of the confidential names.
- [ ] `specs/vk/9c61-feedback-1/research.md` has a before-and-after table with a facts column for every changed line, including merged and cut lines.
- [ ] Codex review reports no significant findings.

## Clarifications (2026-11-05)

- **Data-handoff bullet.** Kept, compressed to two sentences. It is the closest story on the page to the posting's "partner deliverables are validated and conformed". The counts (roughly 12,039 items, 8,605 files) stay because they are the measured result.
- **Loyalty bullet.** Kept fourth, compressed to the evidence-to-vendor story: the fleet measurement (53,617 scans, 46 restart-only freezes at 32 of the 272 restaurants that took scans that week), the decompiled DLL that logs nothing when the reward dialog opens, the findings shared with the vendor, the three metrics added. The first reviewer called this work the model story for the role, so it stays; the second reviewer's point is answered by cutting its length, not the story.
- **"Dozens of high-volume stores".** David's phrase stays. The bullet adds the 18-register denominator beside it (the registers that had crashed in the previous 30 days), and the PR asks David whether he wants the phrase narrowed, because the evidence puts most crashes at 8 stores.
- **Skills row.** "Data & content workflows" is removed. The household import bullet keeps "metadata" and "deduplication" in its wording, and the knowledge base's relevance rule says a skills-row label is not proof of proficiency anyway.

- **Humanitarian OpenStreetMap Team (2016 to 2018).** On 2026-11-05, after the 3.0.0 merge, David said "Remove Humanitarian OpenStreetMap". The entry is removed in resume 3.1.0, which also settles the overlap question the reviewer raised. FR-8 no longer applies to that role.

## Open questions

None for implementation. Two questions go to David in the hiring repository rather than onto the page: whether he has figures for the 2019 to 2021 outcomes this task rewrites, and whether he wants "dozens of high-volume stores" narrowed.
