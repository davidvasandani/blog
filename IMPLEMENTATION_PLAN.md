# Implementation plan

1. Complete SpecKit constitution, specification, clarification, technical plan, tasks, and analysis, using SPEC.md and PRIOR_KNOWLEDGE.md.
2. Install the existing lockfile and add minimal Node test-runner tooling. Exclude planning/test/knowledge artifacts from both generators.
3. Add rendered frontend regressions, CMS configuration/preview/identity tests, and serverless request tests. Run all against existing application dependency versions and record baseline results.
4. Inspect registry versions and migration documentation. Upgrade dependencies in compatible groups; pin browser dependencies, declare direct imports, align Node and type tooling, remove obsolete packages where justified.
5. Run clean install, complete tests, both builds, and typecheck; record advisories and limitations. Add CI and local instructions.
6. Run independent Codex diff review, fix confirmed findings and repeat validation/review.
7. Commit reusable Blog knowledge with task identifier and index.
8. Open PR against main, check required checks, and merge.
