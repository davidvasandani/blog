# Local validation
Use Node 24. Run npm ci, npm test, npm run typecheck, npm run gemini:server:build, npm audit and npm audit --omit=dev.
On NixOS set PUPPETEER_SKIP_DOWNLOAD=true for installation and PUPPETEER_EXECUTABLE_PATH to system Chromium for npm test. Expect all tests/builds to pass and both audits to report zero vulnerabilities. Local CMS tests use temporary fixtures, never hosted publishing.
