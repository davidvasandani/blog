# Research: clarify volume in the loyalty-scan bullet

## Decision: use David's wording as given
"32 of 272 restaurants" becomes "32 of our highest volume restaurants". David gave the exact text. Alternatives:
- "32 of our busiest restaurants": shorter, and the POS crash bullet above already says "the busiest stores". Not used, because David asked for specific wording and "volume" is his word.
- "highest-volume" with a hyphen: the usual style for a compound modifier. Not used, for the same reason (spec clarification 1).
- Keep 272 as well ("32 of our highest volume restaurants, out of 272"): adds length and brings back the number David wants gone.

## Source of the claim
The hiring repository's loyalty-scan resume material (read-only) gives the 7-day fleet numbers: 46 freezes on 34 registers at 32 stores, out of 272 stores. It notes freezes rose at lunch and the test store was high-volume, but it doesn't rank the 32 by volume. "Our highest volume restaurants" is David's own description in this task.

## Before and after

| Before | After | Facts |
| --- | --- | --- |
| Found the likely cause of loyalty-scan freezes at 32 of 272 restaurants, a hidden reward dialog that blocked the register's screen. Used AI to decompile the vendor's DLLs and read fleet logs, documented 46 forced restarts in a week, and sent the vendor the evidence to confirm. | Found the likely cause of loyalty-scan freezes at 32 of our highest volume restaurants, a hidden reward dialog that blocked the register's screen. Used AI to decompile the vendor's DLLs and read fleet logs, documented 46 forced restarts in a week, and sent the vendor the evidence to confirm. | "272" is gone and "our highest volume" is new, both as David asked. Unchanged: "likely", 32, the hidden reward dialog, the register's screen, AI once, the vendor's DLLs, fleet logs, 46 forced restarts in a week, "the evidence to confirm". Nothing else added. |

## The `/voice` pass
- No AI vocabulary, "is" substitutes, dashes, curly quotes, "-ing" tails or filler. "AI" appears once. Both sentences are active with the implied subject kept.
- "Our" matches the resume's existing "our remote-access software".
- Rule 28 (dense sentences): the longer phrase puts more words between "cause" and its appositive ("a hidden reward dialog..."). It still reads without backtracking, and splitting it would rewrite more than David asked, so it stays.
- Self-audit: no new tells. The rest of the bullet already went through `/voice` in #160.
- Result: no changes beyond David's phrase.

## Follow-up, 2026-11-02
David asked for the hyphen. The bullet now reads "32 of our highest-volume restaurants". `/voice` pass: a hyphenated compound modifier before the noun is standard style and adds no tell. No other change, and the facts column above still holds.
