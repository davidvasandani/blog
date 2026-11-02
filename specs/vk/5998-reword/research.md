# Research: reword the POS crash and loyalty-scan bullets

## Before and after

| Before | After | Facts |
| --- | --- | --- |
| Used AI to trace 314 POS crashes at the busiest stores to a 32-bit memory limit in the vendor's app, which reserves memory for every CPU core. Shipped a workaround that starts the app on fewer cores to 18 registers in 2 weeks. | Used AI to trace POS crashes that hit dozens of high-volume stores during the lunch rush. Reverse-engineered the POS executable, then shipped a workaround that starts the app on fewer cores. | New, from David: dozens of high-volume stores, the lunch rush, reverse-engineering the executable. Removed at his request: 314, the memory-limit cause, 18 registers, 2 weeks. Kept: AI once, tracing, the fewer-cores workaround. |
| Found the likely cause of loyalty-scan freezes at 32 of our highest-volume restaurants, a hidden reward dialog that blocked the register's screen. Used AI to decompile the vendor's DLLs and read fleet logs, documented 46 forced restarts in a week, and sent the vendor the evidence to confirm. | The same work turned up loyalty-scan freezes, where a hidden reward dialog blocked the register screen. Used AI to decompile the vendor's loyalty DLL, found that it logs nothing when the reward dialog opens, and shared the findings with the vendor as evidence. | New, from David: the freezes surfaced during the crash work, the missing logging. Removed at his request: "likely cause", 32 stores, fleet logs, 46 forced restarts. Kept: the hidden reward dialog, the register screen, AI once, decompiling, sending the vendor evidence. |

## The `/voice` pass
- David's draft: "trace POS crashes during busy lunch rushes at dozens of high-volume stores", "Reverse-engineered the POS executable and shipped a workaround ...", "During this process, we uncovered loyalty-scan freezes in which ... found missing logging, and shared it with the vendor as evidence."
- Changes: "busy lunch rushes" became "the lunch rush" (filler). "During this process, we uncovered" became "The same work turned up" (filler, and it matches the resume's implied subject). "in which" became "where". "found missing logging" became the concrete finding (rule 27, David's call). "shared it" became "shared the findings" so "it" doesn't point at the DLL.
- Self-audit: no AI vocabulary, dashes, curly quotes, "-ing" tails or forced groups of three. "AI" once per line.
