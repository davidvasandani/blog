# David Vasandani’s blog

## Cloudflare Workers deployment

The blog runs on Cloudflare using `wrangler.jsonc` and `workers/index.ts`. Static files come
from `_site`; `/api/*` runs the existing Express app through Cloudflare's Node
HTTP adapter, and `/hello` keeps its existing response. The shared application
lives in `api/app.ts`.

Use Node 24 and Python 3.12+:

```sh
npm ci
npm run workers:build
npm run typecheck
npm run test:admin
# test:admin rebuilds _site, so prepare the Worker assets again:
node scripts/workers-assets.cjs
npm run test:workers
npx wrangler deploy
```

`workers:build` renders the resume PDF, builds Eleventy and validates the required assets.

Set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the deployment
environment. Add the runtime secrets through Cloudflare's dashboard or the
interactive commands below; never commit their values:

```sh
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npx wrangler secret put SLACK_WEBHOOK_URL
```

The GitHub OAuth App callback stays
`https://david.vasandani.me/api/callback`. The workers.dev preview can verify the
authorization redirect, but completing CMS sign-in requires the production
hostname and its registered callback. Do not submit a real contact message
during smoke tests: it sends to Slack. `test:workers` uses a dummy client ID,
rejects an invalid callback and tests contact validation without sending a message.

Regenerate runtime types with `npm run workers:types` after changing Wrangler
configuration. The approved production custom domain `david.vasandani.me` is
declared in `wrangler.jsonc`. The zone uses `kai.ns.cloudflare.com` and
`kami.ns.cloudflare.com`; the Route 53 hosted zone remains as a fallback.
Set runtime secrets on **david-vasandani-blog**, the Worker named in this
configuration. A separate Worker named `blog` is not this deployment.

### Automatic GitHub deployments

Connect `davidvasandani/blog` to **david-vasandani-blog** under the Worker's
**Settings > Builds** after the Worker configuration is merged to `main`.
Use these settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | Repository root |
| Build command | `npm run workers:build` |
| Deploy command | `npx wrangler deploy` |
| Preview deploy command | `npx wrangler preview` |
| Node version | `24` |
| Python version | `3.13` |

Set `NODE_VERSION=24` and `PYTHON_VERSION=3.13` in build variables. Keep the
three application secrets in the Worker's runtime settings. The build renders
the resume PDF, builds Eleventy, and prepares the static assets before deploying.
The Git connection must target the same Worker name as `wrangler.jsonc`.
The empty `previews` block enables branch previews. Preview secrets are configured
separately in Cloudflare's Previews Base settings; production secrets are not
automatically inherited. CMS sign-in and contact delivery require appropriate
preview credentials to work there.

## Local development

Use Node 24. Clone `https://github.com/davidvasandani/blog`, run `npm ci`, then
`npm start` for Eleventy and the local Decap editor proxy. `npm run serve` runs
the public site alone; `npm run build` produces `_site`.

Site metadata lives in `_data/metadata.json`; posts and pages use Markdown and
Nunjucks templates. Resume rendering instructions are in `resume/README.md`.
The project originated from Dan Urbanowicz’s Eleventy boilerplate; its MIT
copyright attribution is retained in LICENSE.

## Local validation and dependency maintenance

Use Node 24 (`nvm install && nvm use`) and install the committed lockfile:

```sh
npm ci
npm test
npm run typecheck
npm run gemini:server:build
```

`npm test` removes generated output, builds the website and Gemini output,
compiles the shared API, and runs frontend and admin/API regressions with
Node's test runner. No production credentials or remote content writes are needed.
After installation, these checks use local content and dependencies.

For focused checks, run `npm run test:frontend` or `npm run test:admin`.
The tests cover rendered pages/navigation, author/tag links, dates, responsive
images, contact fields, CMS schema and preview components, the local CMS
backend using disposable post fixtures, and serverless API responses, including
CMS sign-in and the contact form with GitHub and Slack mocked. They do not call
the real GitHub or Slack, or run the third-party CMS UI in a real browser.

Run `npm start` for the local site plus the pinned Decap proxy, or `npm run serve`
for the public site alone. Local CMS edits write to this checkout. The optional
Gemini server starts with `npm run gemini:server:start` after building its output.

Before future upgrades, run the tests on the existing lockfile, then update
packages and rerun the same checks. Keep browser import versions and their local
test helpers aligned. See VALIDATION.md and the feature research notes for the
upgrade evidence and limitations. Internal specs, tests, and knowledge pages
are excluded from both published outputs.

The test suite runs a blocking Pa11y accessibility audit of every public HTML
page, excluding the remote CMS application. Pa11y and Puppeteer are pinned
direct dependencies. An inaccessible fixture proves the audit fails on errors.
Puppeteer downloads Chrome during installation; for a system browser, install
with `PUPPETEER_SKIP_DOWNLOAD=true` and set `PUPPETEER_EXECUTABLE_PATH` when
testing. Run `npm run test:a11y` to audit an existing build.

## Build tooling

The Worker build sets `RESUME_VENV=node_modules/.cache/resume-venv` for the
pinned RenderCV environment. Local resume commands default to `resume/.venv`.
Setup checks the cached interpreter and reconciles `resume/requirements.txt`.
The accessibility browser cache lives in `node_modules/.cache/puppeteer`.
GitHub Actions uses runner Chrome and a separate Python resume job.

### CMS sign-in

`/admin/` uses Decap's GitHub backend. Sign-in runs through `/api/auth` and
`/api/callback` on `david.vasandani.me` (`base_url` in `admin/config.yml`),
which asks GitHub for the `public_repo` scope. Create a GitHub OAuth App with:

- Homepage URL: `https://david.vasandani.me`
- Authorization callback URL: `https://david.vasandani.me/api/callback`

Then set its `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` as environment
secrets on the Cloudflare Worker. Editors need write access to the
repository. Locally, `npm start` keeps using the Decap proxy instead.

### Contact form

The contact form posts to `/api/contact`, which sends each message to Slack
through an incoming webhook and then shows `/contact/thanks/`. A hidden
`company` field catches bots; those submissions are dropped. Create an incoming
webhook for the channel that should receive messages and set it as
`SLACK_WEBHOOK_URL`, on the same Worker. Without it the form answers
with an error rather than losing messages silently.

### SitePing feedback

Sign in to the CMS at `/admin/` with your existing GitHub account, then open the
Blog in the same browser. SitePing appears for accounts with push permission on
`davidvasandani/blog`. There is no separate SitePing login. Open its feedback
panel and select all pages to review shared feedback, reply, or change status.
Signing out of Decap removes the widget from other open tabs. Focus and a
60-second check revalidate access; every feedback API request independently
checks GitHub permissions. GitHub outages disable feedback without blocking reading.

Feedback belongs to the Blog's `BlogFeedback` SQLite Durable Object, bound as
`BLOG_FEEDBACK`. The `siteping-v1` Wrangler migration creates its namespace on
deployment. Production and branch previews have separate storage. No additional
secrets or external SitePing service are needed. Do not remove the binding or
migration when updating the Worker. Back up/export feedback from the panel
before any deliberate storage reset. The collection adapter scans feedback and
rewrites the collection on mutation; it is intended for this small editor-only
Blog, not a public high-volume feedback service.

The browser reuses the `decap-cms-user` token format of pinned Decap 3.17.1;
recheck that contract when upgrading Decap. Tokens go only to the same-origin
API and GitHub verification, never to feedback storage. Screenshots and console
or network capture are disabled. Public readers load the small bootstrap only;
the widget is imported after successful verification. Plain Eleventy preview
has no feedback API; use Wrangler for local feedback integration.

`node --test tests/siteping.test.cjs` covers authentication, browser lifecycle,
and the actual Worker with mocked GitHub plus durable feedback across runtime
restarts. It never uses real GitHub credentials or writes production feedback.

### Projects catalog

`pages/projects.md` is the top-level `/projects/` catalog of personal projects and open-source contributions documented on this site. Edit its Markdown directly or use the existing **Page** collection in Decap. Add an h2 heading, a factual summary and any known public reference for each project; distinguish contributions from projects you own. Keep entries aligned with the resume's personal/open-source sections and published blog work. Professional role accomplishments remain in the resume.

Keep the permalink and navigation key stable. Navigation order 5 places Projects after Contact; no new template or data file is needed. Like other `pages/` content, this catalog is HTML-only; the Gemini build continues to publish posts.
