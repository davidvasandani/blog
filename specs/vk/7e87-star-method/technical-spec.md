# Technical specification

Task: 7e87-star-method (workspace "STAR Method", branch `vk/7e87-star-method`). Written 2026-11-04. The hiring repository holds the private copy with evidence links.

## Request

The Netflix hiring manager reviewed the referred resume and texted feedback on 2026-11-04 (transcript in the private hiring repository). The resume has to stand on its own after the referral. They asked for measured impact in hard numbers (money saved, losses avoided, headcount returned, sales secured, estimates allowed), more detail on why the work was hard, fewer framework names, bullets that set up the business problem, describe the novel solution and measure the result (STAR), and the proudest work jumping off the page. David agreed ("They all need measured outcomes").

## Deliverables

1. **Hiring (private).** The feedback transcript. A STAR rewrite page under `netflix/resume-material/` with every new bullet, a claim-to-evidence map, the voice pass, the list of numbers only David can estimate, and the facts the rewrite drops or restores. An update to `netflix/evidence/pos-register-oom.md` with the post-rollout crash re-run the file asked for.
2. **Blog (public).** `resume/David_Vasandani_CV.yaml` rewritten in STAR form with measured outcomes, `resume/VERSION` bumped to 2.0.0 (changed positioning), SpecKit artifacts under `specs/vk/7e87-star-method/`, a constitution review entry, and a knowledge-base update.

## Evidence rules

- Every number on the public resume traces to a file in this repository, to David's own recorded instruction, or to the Datadog re-run recorded in the evidence file. Estimates say "about" or "estimated".
- Facts David removed on 2026-11-02 (314 crashes, the 32-bit memory cause, 18 registers in 2 weeks, 32 of 272 stores, 46 forced restarts) come back because this task asks for measured outcomes. The spec records that this is the reason.
- David-supplied phrases stay as written: "dozens of high-volume stores", "during the lunch rush", "the fleet of nearly 300 restaurants", the loyalty DLL "logs nothing when the reward dialog opens".
- Qualifiers stay: "reported" costs, "postponed" cutover, "about" counts, shared ownership on the log pipeline and the Meraki rollout, DoorDash owning its fix, requeued downloads not being completed downloads.
- Numbers only David can estimate (licensing avoided, hours returned, lost sales avoided) go in the hiring page as candidate derivations for him to confirm. They do not go on the public resume until he does.

## Confidentiality

The blog is public. No vendor or product names from the confidential lists (the POS vendor and product, the remote-access and camera tools), no store names, register hostnames, ticket numbers or people's names in the resume, specs, knowledge pages or commit messages. The hiring manager is "the hiring manager" in blog artifacts.

## Crash re-run (2026-11-04)

Datadog query from the evidence file, 2026-10-13 to 2026-11-04, grouped by register and day. The 15 registers with crashes from Oct 13 to 23 (all later enrolled in the 18-register rollout) had 77 crashes in those 11 days, about 7 a day, and 2 crashes from Oct 25 to Nov 4, also 11 days. The 7 crashes on Oct 24 hit registers that moved to 6 CPUs at the overnight relaunch. Fleet-wide the count went from 7 a day to about 1.3 a day; the remaining 12 crashes were on registers outside the rollout, 7 of them at one store that had no crashes in the 30 days before enrollment.

## Validation

`npm run resume:voice`, `npm run resume` (3 pages or fewer), `npm run build`, `node --test tests/resume.test.cjs`, a YAML shape comparison showing only prose and the version changed, a confidentiality grep of the blog diff, `git diff --check`, and an independent Codex review of both repositories' diffs.

## Out of scope

Interview stories, the canonical timeline, and changes to the blog's resume page layout. New vendor names on the resume (DoorDash, Spyce/Wonder, Paytronix, Datadog, Meraki and AWS are already approved).
