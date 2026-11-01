# Feature specification: clarify volume in the loyalty-scan bullet

Feature dir: `specs/vk/a290-claify-volume/`
Status: Specified through `/speckit.specify`

The Senior Manager loyalty-scan bullet says the freezes happened "at 32 of 272 restaurants". David wants it to read "at 32 of our highest volume restaurants". A reader sees "32 of 272" as a small slice of the fleet, about 12%. Saying they were the highest-volume restaurants tells the reader why the freezes mattered: they hit the stores where a frozen register costs the most.

## User stories
- As David, I want the bullet to say which restaurants were hit, so the reader sees the business stakes and not a small fraction.
- As an interviewer, I want the rest of the bullet unchanged, so the claims I ask about match the evidence David brings.

## Functional requirements
- FR-1: The bullet reads "loyalty-scan freezes at 32 of our highest volume restaurants" where it now reads "loyalty-scan freezes at 32 of 272 restaurants".
- FR-2: The fleet size (272) no longer appears in the bullet.
- FR-3: Every other fact in the bullet stays: "likely cause", the hidden reward dialog that blocked the register's screen, using AI to decompile the vendor's DLLs and read fleet logs, 46 forced restarts in a week, and sending the vendor the evidence to confirm. Nothing is added.
- FR-4: The edited line goes through the `/voice` skill (constitution 10).
- FR-5: The spec records where "highest volume" comes from, since the committed hiring notes give 32 of 272 stores and don't rank them by volume.
- FR-6: Nothing committed names the POS vendor or a product the hiring repository marks confidential.

## Out of scope
Other bullets, the resume layout and theme, the resume page and PDF pipeline, and the hiring repository's resume material (read-only for this task).

## Acceptance criteria
- [ ] The resume YAML has the new phrase and no "32 of 272".
- [ ] Parsing the old and new YAML shows that only this highlight string changed.
- [ ] `npm run resume:voice` passes.
- [ ] RenderCV renders the resume at the same page count (3).
- [ ] `npm test` passes.
- [ ] An independent review finds no changed or added facts.

## Clarifications
Resolved through `/speckit.clarify` on 2026-11-01. No separate answers were supplied, so each was resolved from the task text and the constitution.

- Hyphenation: keep "highest volume" exactly as David wrote it. The task says the phrase "should read" that text, and `npm run resume:voice` doesn't check hyphens. If David prefers "highest-volume", it's a one-character follow-up.
- Evidence: David's instruction in this task is the source. He's describing his own work, and the hiring notes don't contradict it (they say freezes rose at lunch and the test store was high-volume). The notes don't rank the 32 stores by volume, so the knowledge page records the source of the claim.
- Hiring repository: unchanged. Constitution principle 1 keeps this task in the blog repository, and earlier reviews treat the hiring repository as read-only. Its "32 of 272 stores" is the investigation record, not the published resume.

## Open questions
None.
