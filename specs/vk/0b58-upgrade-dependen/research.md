# Research

- Node test runner avoids adding a test framework. A DOM parser is justified for semantic HTML assertions; js-yaml for CMS configuration; htm/date-fns for executing existing preview templates locally. Browser helper versions should match the browser imports.
- Compile API tests using the existing TypeScript compiler to test actual serverless-http integration without opening a port or mocking Express.
- Existing image config directly imports markdown-it and @11ty/eleventy-img without declaring them; make those dependencies explicit during upgrades.
- Version selections and migration evidence will be appended after baseline tests pass.

# Contracts
GET /api/hello => 200, Hello World!; GET /api/echo => JSON containing method, /echo path, headers, query and OS hostname; unknown routes => 404. CMS blog/pages schemas and previews remain compatible. No persistence model changes.

## Upgrade decisions (2026-10-21)
Registry metadata (`npm outdated`, `npm view`, registry.npmjs.org) selected stable releases: Eleventy 3.1.7, navigation 1.0.5, image 7.1.0, Express 5.3.0, serverless-http 4.0.0, TypeScript 7.0.2, gemdown 0.8.0, Decap CMS 3.17.1 and decap-server 3.11.5. Other direct packages use exact current stable pins; Node types follow the supported Node 24 line rather than Node 26. gemini-server 2.1.1 and clean-css 5.3.3 remain current.

- Eleventy 3 retains CommonJS configuration but removes the old layoutContent alias: replace it with content in website and Gemini layouts. Regression tests caught empty bodies despite successful builds. https://www.11ty.dev/blog/eleventy-v3/
- Use official asynchronous image transform, with shortcode output marked eleventy:ignore to prevent double processing. Remove markdown-it-eleventy-img's obsolete image/sharp subtree. Declare markdown-it and the image plugin directly. https://www.11ty.dev/docs/plugins/image/
- Replace abandoned html-minifier with html-minifier-terser and await its transform. https://github.com/terser/html-minifier-terser
- Express 5 defaults to simple query parsing; explicitly retain extended parsing and test nested/repeated queries. https://expressjs.com/en/guide/migrating-5/
- TypeScript requires explicit rootDir for the existing output layout. Upgrade @netlify/functions for the nested native hello function and remove obsolete TSLint; use compiler checks without auto-modifying sources.
- Pin htm/date-fns browser imports to the same versions used by local preview tests; pin the Decap browser bundle. Both new remote bundle URLs returned HTTP 200 during validation.
- Pin decap-server rather than downloading netlify-cms-proxy-server implicitly at start. Test its real filesystem middleware against disposable fixtures; production content is never touched.
- npm audit fix updated compatible transitive brace-expansion and path-to-regexp versions. Remaining three low-severity advisories originate in @hapi/joi via @decap/cli/decap-server; do not force-downgrade the current proxy to silence this. Runtime-only audit is clean. Revisit when Decap replaces/patches this dependency.

Deployment follow-up: the first preview failed in the dashboard-installed netlify-plugin-a11y 0.0.12 (Pa11y 30-second timeout), after the site build. A deeper function scan found netlify/functions/hello/hello.mts; include .mts in compilation and test its native Response contract. This function requires @netlify/functions types, now upgraded to 6.0.3.

Netlify's expanded resolved configuration confirmed default a11y inputs (all HTML, including the remote CMS and unrendered Identity email templates). Scope its static-file scan to public output by excluding admin, retaining resultMode=error and all public page checks. This does not replace the dedicated local admin regression suite or claim a hosted CMS accessibility audit.

The scoped audit also timed out on Netlify. Upgrade the actual obsolete browser stack: declare netlify-plugin-a11y 0.0.12 locally with a targeted pa11y 10.0.0 override (Node 24-compatible), which brings Puppeteer 25.15.0. The plugin's latest release still requests Pa11y 5; the function API and WCAG2AA/HTMLCS default are compatible. The full public-page audit passed locally with system Chromium; add a negative fixture that must still fail the audit. npm test now runs both the negative fixture and the actual public scan. No accessibility rules are suppressed. Revisit the override when the plugin adopts current Pa11y upstream.
