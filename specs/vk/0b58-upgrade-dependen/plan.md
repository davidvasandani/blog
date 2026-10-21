# Technical plan

Read SPEC.md and PRIOR_KNOWLEDGE.md. Use Node's built-in test runner, compile the existing API with TypeScript and invoke its serverless handler directly. Parse generated HTML with a DOM parser; evaluate admin previews in an isolated VM with their real template helpers. Parse CMS YAML and simulate Identity callbacks. No hosted credentials or content writes.

## Files and sequence
1. package.json: test scripts and minimal dev tooling. tests/: frontend, CMS and API regressions. tsconfig.test.json: API compilation. .eleventyignore: internal artifacts.
2. Run baseline against original locked application packages. Save outcome in VALIDATION.md.
3. package.json/package-lock.json and admin browser imports: reviewed upgrades. .eleventy.js/image config: compatibility adaptations. .nvmrc/tsconfig.json: runtime alignment.
4. .github/workflows/test.yml and README.md: same clean local checks in CI.
5. Review, knowledge-base/index.md and topic page, PR merge.

## Constitution check
All seven principles satisfied. No external service mutations; tests precede upgrades; documents excluded from both outputs.

## Risks
Major Eleventy/Express changes, image native binaries, unpinned CDN packages, deprecated tooling and transitive advisories. Hosted Identity/Git Gateway and CDN availability require separate live checks and are not claimed by local tests.
