# Validation

## Baseline before application dependency upgrades
2026-10-21, Node 24.15.0 / npm 11.12.1. Original npm ci succeeded (426 packages; 37 advisories). Added test-only DOM/YAML/preview helpers and test scripts; application dependency ranges unchanged. npm test passed all 12 tests, including website and Gemini builds and API TypeScript compilation. Eleventy remained 2.0.1 and Express 4.18.2. Test tooling caused normal transitive hoisting changes; date-fns 2.7.0 matches the original browser import.

Coverage: generated navigation/pages, post date/content/archives, contact form semantics, responsive image files, Gemini content, internal-document exclusion, CMS schema/previews/registration/Identity callbacks, actual serverless hello/HEAD/echo/query/missing-route behavior.
