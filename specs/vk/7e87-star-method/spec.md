# Feature specification: STAR resume rewrite with measured outcomes

Feature dir: `specs/vk/7e87-star-method/`
Task: 7e87-star-method (STAR Method)
Status: Draft

## Summary

On 2026-11-04 the Netflix hiring manager told David the referred resume needs to stand on its own: each bullet should set up the business problem, describe what David built or found that was new, and measure the result in hard numbers, estimates included. Framework names add little because the target company runs its own stack. The proudest work should be the first thing a reader sees. David agreed. This feature rewrites `resume/David_Vasandani_CV.yaml` in that shape, backed by the private evidence in the hiring repository, and bumps the resume version.

## User stories

- As a recruiter skimming the top third of the page, I want the summary to name the headline result so that I know within seconds what kind of problem David solves and how well.
- As an interviewer reading before a round, I want each bullet to state the problem, the approach and a measured outcome so that I can pick a claim and drill into it.
- As David, I want every number traceable to recorded evidence or my own instruction so that no claim fails a drill-down.
- As David, I want the numbers only I can estimate listed separately so that I can decide what to add rather than have them invented.

## Functional requirements

- FR-1: The summary states tenure, promotions, current scope and one headline measured result, with "AI" at most once.
- FR-2: Each highlight under the three most recent Sweetgreen roles reads as problem, action, measured result where the evidence has a measurement. Where it has none, the bullet still states the problem and the action and claims no number.
- FR-3: The crash bullet carries the measured reduction from the 2026-11-04 Datadog re-run recorded in the hiring repository, with its date window.
- FR-4: The loyalty bullet, settings-contract bullet and sales-date bullet carry the fleet counts already recorded in the hiring repository (46 restarts at 32 of 272 restaurants, 53,617 scans; 104 operations, 343 locations, about 6 minutes; 5 stores in the first week).
- FR-5: The vendor report discrepancy (about $55K across two stores, regenerated to match finance) appears as a measured outcome. The hiring research left this to David; the PR flags it for his decision.
- FR-6: David-supplied phrases and every qualifier survive unchanged. Facts he removed on 2026-11-02 return because this task asks for measured outcomes.
- FR-7: Tool and framework names leave bullets where they are decoration; they stay where they are the subject (the configuration-management scope of the reboot change, the monitored vendor APIs) and in the skills section.
- FR-8: The 2019 to 2021 role and the three earlier employers keep their strongest bullets and lose the rest, so the rendered PDF stays at three pages or fewer. The spec lists what was cut.
- FR-9: Every changed line goes through `/voice`; `npm run resume:voice` passes.
- FR-10: Nothing committed names the POS vendor, its product, the remote-access or camera tools, a store, a register hostname, a ticket or the hiring manager.
- FR-11: `resume/VERSION` becomes 2.0.0.

## Out of scope

Interview stories, the resume page layout, the Gemini output, new vendor names, and any estimate only David can make (licensing avoided, hours returned, lost sales avoided). Those are listed in the hiring repository for him.

## Acceptance criteria

- [ ] `npm run resume:voice` reports no problems.
- [ ] `npm run resume -- --dont-generate-png` renders a PDF of at most three pages.
- [ ] `node --test tests/resume.test.cjs` and `npm run build` pass.
- [ ] A YAML shape comparison shows only summary, highlight and project summary strings changed, plus removed highlights listed in the spec.
- [ ] `git diff origin/main` contains none of the confidential names.
- [ ] The research page has a before-and-after table with a facts column for every changed line.
- [ ] Codex review reports no significant findings.

## Clarifications (2026-11-04)

- **Vendor report discrepancy.** Included as "about $55K" across two unnamed stores, with no vendor name. The PR description flags it so David can veto it before merge, because the hiring research left that decision to him.
- **Facts dropped on 2026-11-02.** Restored (314 crashes in a month, the 32-bit app reserving memory for every CPU core, 18 registers in 2 weeks, 32 of 272 restaurants, 46 forced restarts in a week). The knowledge base said not to add them back unless David asks. His reply to the hiring manager, "They all need measured outcomes", followed by creating this task with the feedback attached, is that ask. His own 2026-11-02 phrases stay.
- **Earlier-role cuts.** The 2019 to 2021 role keeps the Terraform split, blue-green deploys, Datadog rollout and the 15+ services standardization, and drops the Ember split, the on-call rotation, local development (LocalStack, hot reloading, bastion access) and the Gruntwork modules. LearnZillion keeps the managed-services move and drops the Docker for Mac and CircleCI upgrade. Humanitarian OpenStreetMap Team keeps the Swarm migration and drops the weekly community meetings. Warby Parker keeps the immutable infrastructure and the deployments-per-month bullets and drops the VPC, autoscaling and monitoring bullets. All cut lines remain in git history (resume version 1.1.1).

## Open questions

None. Estimates only David can make are deliberately not on the resume; they are listed for him in the hiring repository.
