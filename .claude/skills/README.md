# Project skills

## ResumeSkills

The 22 skill folders here are copied unmodified from [Paramchoudhary/ResumeSkills](https://github.com/Paramchoudhary/ResumeSkills) at commit `74ae19e7c62b0516d1c298328e5544976c12da5d` (2026-06-19). They are MIT licensed. The license is in `LICENSE-ResumeSkills.txt`.

| Area | Skills |
|------|--------|
| Resume writing | `resume-ats-optimizer`, `resume-bullet-writer`, `resume-quantifier`, `resume-formatter`, `resume-section-builder` |
| Job search | `job-description-analyzer`, `resume-tailor`, `resume-version-manager`, `offer-comparison-analyzer` |
| Supporting documents | `cover-letter-generator`, `linkedin-profile-optimizer`, `portfolio-case-study-writer`, `reference-list-builder`, `cold-email-writer`, `application-form-filler` |
| Interviews and offers | `interview-prep-generator`, `salary-negotiation-prep` |
| Specialised roles | `tech-resume-optimizer`, `executive-resume-writer`, `academic-cv-builder`, `creative-portfolio-resume`, `career-changer-translator` |

Each skill is one `SKILL.md` with a name and a description. None of them runs a script or asks for tool permissions.

### Updating

Clone the source and copy its `skills/` folder over this one, then update the commit above.

```bash
git clone --depth 1 https://github.com/Paramchoudhary/ResumeSkills.git /tmp/ResumeSkills
```

```bash
cp -r /tmp/ResumeSkills/skills/. .claude/skills/
```

### How they fit with this repository's resume rules

These skills give general resume advice. `AGENTS.md` still decides what goes into `resume/`. Every wording change goes through `/voice`, wherever the draft came from. `resume-quantifier` and `resume-bullet-writer` suggest estimating a number when there is no exact figure, but `knowledge-base/resume-voice.md` only allows a number that has a source.
