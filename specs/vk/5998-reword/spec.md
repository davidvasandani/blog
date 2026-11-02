# Feature specification: reword the POS crash and loyalty-scan bullets

Feature dir: `specs/vk/5998-reword/`
Task: 2714e137-7187-48a4-a394-3f05e06a30ee (Reword)
Status: Shipped in #170 on 2026-11-02

David gave new wording for the first two Senior Manager highlights under Sweetgreen (the POS crash bullet and the loyalty-scan bullet, lines 35 and 36 of `resume/David_Vasandani_CV.yaml`) and asked for it to be reworded.

## Functional requirements
- FR-1: The crash bullet says AI was used to trace POS crashes that hit dozens of high-volume stores during the lunch rush, that David reverse-engineered the POS executable, and that he shipped a workaround that starts the app on fewer cores.
- FR-2: The loyalty-scan bullet says the same work turned up loyalty-scan freezes, where a hidden reward dialog blocked the register screen, and that David used AI to decompile the vendor's loyalty DLL, found that it logs nothing when the reward dialog opens, and shared the findings with the vendor as evidence.
- FR-3: Both lines go through `/voice` (constitution 10). "AI" appears at most once per line.
- FR-4: Nothing committed names the POS vendor or a product the hiring repository marks confidential.

## Where the claims come from
These come from David's instruction in this task, not the hiring notes. Reviewers checking the resume against the hiring evidence should treat them as his statements:
- "dozens of high-volume stores" and "during the lunch rush"
- reverse-engineering the POS executable
- the loyalty DLL logs nothing when the reward dialog opens. David wrote "found missing logging". When asked whether to say exactly what was missing, he said to "say it outright", and approved this wording.

## Removed at David's request
The new bullets drop these facts, which the hiring notes do support: 314 crashes, the 32-bit memory limit in the vendor's app (it reserves memory for every CPU core), the rollout to 18 registers in 2 weeks, "likely cause", 32 stores, reading fleet logs, and 46 forced restarts in a week. Don't add them back unless David asks.

## Clarifications
- Item 1 of David's request ("trace POS crashes ...") was a fragment meant to follow "Used AI to".
- "We uncovered" became "The same work turned up". The resume leaves the subject out of its bullets, and this keeps the shared ownership vague, the same way "we" did. David approved it.
- The TODO above the crash bullet (add the crash reduction around 2026-11-08) still applies.

## Out of scope
Other bullets, the resume layout, and the hiring repository's copies (read-only for blog tasks).
