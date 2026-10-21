# Research

- Node test runner avoids adding a test framework. A DOM parser is justified for semantic HTML assertions; js-yaml for CMS configuration; htm/date-fns for executing existing preview templates locally. Browser helper versions should match the browser imports.
- Compile API tests using the existing TypeScript compiler to test actual serverless-http integration without opening a port or mocking Express.
- Existing image config directly imports markdown-it and @11ty/eleventy-img without declaring them; make those dependencies explicit during upgrades.
- Version selections and migration evidence will be appended after baseline tests pass.

# Contracts
GET /api/hello => 200, Hello World!; GET /api/echo => JSON containing method, /echo path, headers, query and OS hostname; unknown routes => 404. CMS blog/pages schemas and previews remain compatible. No persistence model changes.
