# Prior knowledge

Task: 7e87-star-method. Searched `blog/knowledge-base/` (index plus every resume page) and the hiring repository's `knowledge-base/`, `netflix/resume-material/`, `netflix/evidence/` and `netflix/research/` for resume wording rules, measured outcomes and claim limits.

## Rules that bind this rewrite

- **Resume voice** (`resume-voice.md`): every change goes through `/voice`; keep qualifiers ("reported", "postponed") and ownership; "AI" at most once per line; no dashes or curly quotes; write a before-and-after table with a facts column. David-supplied wording is used as given and its source recorded in the spec. Facts David dropped on 2026-11-02 (314 crashes, the memory cause, 18 registers, 32 stores, 46 restarts) are not restored "unless he asks". This task is that ask: the hiring manager wants measured outcomes and David agreed.
- **Confidentiality** (`resume-voice.md`): the hiring repository's confidential lists apply to everything committed here, including specs and commit messages. "Our POS vendor", never the name.
- **Relevance audits** (`resume-relevance-audit.md`): separate relevance from evidence strength and chronology; a merged change is not a shipped rollout; locations can include labs (343 POS locations are not 343 restaurants); requeued is not completed. Partner-support evidence outranks generic cost savings.
- **Role attribution** (`resume-role-timeline.md`): Senior Manager from 2026-02-23; log coverage of 222/252 belongs to the Lead role; cutover planning to Senior Lead.
- **Validation and partner stories** (`resume-voice.md`): keep roughly 12,039 approximate; DoorDash confirmed and fixed its migration; the webhook escalation is not a permanent fix; 62 imported and 63 requeued stay separate.
- **Release versions** (`resume-rendercv.md`): bump `resume/VERSION`; major for changed positioning.

## Measured outcomes already on file

| Story | Numbers in the evidence | Where |
| --- | --- | --- |
| POS register crashes | 314 crashes in a month, 20-thread registers, 2 GB address space, 610 MB freed per register, 18 registers in 2 weeks, about 7 crashes a day before the fix; the evidence file asked for a re-run of the crash query | hiring `netflix/evidence/pos-register-oom.md` |
| Loyalty-scan freezes | 46 forced restarts at 32 of 272 stores in 7 days, 53,617 scans on 483 registers, 158 stalls, 2 min 41 s freeze | hiring `netflix/resume-material/loyalty-scan-freeze.md` |
| Vendor settings contract | 104 read operations, 12,136 lines, 12 sampled stores, 343 POS locations in about 6 minutes | the hiring resume-material page on the POS vendor's undocumented interface |
| Sales-date corrections | 5 stores in the first week; vendor report overstated 2 stores by about $55.6K, regenerated to match finance | the same page and its per-project resume blocks; the $55.6K line was held back from the public page for David to decide |
| Log pipeline | 222 of 252 restaurants by May 2025; nearly a year from proposal to fleet approval; David's phrase "the fleet of nearly 300 restaurants" | hiring `knowledge-base/pos-log-pipeline.md` |
| Network architecture | roughly ten months to all-market approval; David designed and implemented it | hiring `knowledge-base/meraki-hub-and-spoke.md` |
| Partner auth caching | reported $3,500 to $1,000 a month | resume line, timeline audit R014 |
| Data handoff | roughly 12,039 items restored, 8,605 files parsed | resume line, `specs/vk/5ab2-timeline-audit-a/resume-stories.md` |
| Earlier roles | deployments from weekly to over 400 a month; 15+ services standardized | resume lines |
| Coding platform fork | 6 servers, about 10 outside platforms, 4 agent types; commit counts kept off the resume at David's request | hiring `netflix/resume-material/vibe-kanban-fork.md` |

## What the knowledge base does not have

No dollar figure for Datadog agent licensing avoided, no hours figure for manual settings audits or vendor-emailed corrections, and no revenue figure for register downtime. The candidate-fit research marked all of these "[verify]". They can only come from David, so the rewrite lists them for him instead of inventing them.

## Hiring-manager guidance already recorded

The 2026-10-26 call notes: lead with the reverse-engineering story, present an AI-first scrappy builder rather than a senior software engineer, and shorten the older roles. The resume-summary research (`08`): one number in the summary is enough, name the capability and leave the story to the bullets, and every claim must survive a 20-minute drill-down.
