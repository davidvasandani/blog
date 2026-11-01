# Clarify volume in the loyalty-scan bullet

Task: a290 (Claify Volume)

## Objective
David asked that the loyalty-scan bullet stop citing the fleet size. The phrase "loyalty-scan freezes at 32 of 272 restaurants" should read "loyalty-scan freezes at 32 of our highest volume restaurants".

## Scope
- One highlight in `resume/David_Vasandani_CV.yaml`, under Sweetgreen, Senior Manager, IT Infrastructure & Innovation.
- Only the phrase "32 of 272 restaurants" changes. The rest of the bullet stays as it is: "likely cause", the hidden reward dialog, decompiling the vendor's DLLs, fleet logs, 46 forced restarts in a week, and sending the vendor the evidence to confirm.
- No other resume entries, templates, pages or tooling change.
- The hiring repository stays read-only (constitution principle 1). Its resume material still says "32 of 272 stores"; that's a record of the investigation, not the published resume.

## Source of the new claim
The hiring notes give 32 stores out of 272 in the fleet over 7 days. They don't say the 32 were the highest-volume stores, though they do say freezes rose at lunch and the test store was high-volume. "Our highest volume restaurants" comes from David's own instruction in this task (2026-11-01). It's his description of his own work, so it's used as given, and the spec records where it came from.

## Requirements
1. The bullet contains "loyalty-scan freezes at 32 of our highest volume restaurants".
2. The bullet no longer contains "272".
3. Every other fact, number, qualifier ("likely") and ownership claim in the bullet is unchanged, and nothing is added.
4. The line goes through the `/voice` skill (AGENTS.md, constitution principle 10). David's wording is kept word for word, including "highest volume" without a hyphen, because he gave the exact text.
5. `npm run resume:voice` passes.
6. The resume still renders (RenderCV) with the same page count, if the local tooling is available.
7. Nothing committed names the POS vendor or any confidential product.

## Acceptance
- `git diff` shows a one-line change in the resume YAML (plus the task's planning and knowledge files).
- `npm run resume:voice` reports no problems.
- `npm test` passes, or any failure is shown to predate this change.
