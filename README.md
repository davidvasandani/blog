[![Netlify Status](https://api.netlify.com/api/v1/badges/bbf28a84-4bdb-407b-a2fa-32628d27fa3d/deploy-status)](https://app.netlify.com/sites/eleventy-netlify-boilerplate/deploys)

# Eleventy Netlify Boilerplate

### Click the button below to try it out!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/danurbanowicz/eleventy-netlify-boilerplate&stack=cms)

## What is it?

A simple template for building a fast, pre-generated HTML website using the [Eleventy](https://www.11ty.dev/) static site generator. With [Decap CMS](https://www.decapcms.org/) (formerly Netlify CMS) baked-in, ready to deploy to [Netlify](https://www.netlify.com) in a couple of clicks.

Use it as a starter for your own Jamstack projects, or as an easy way to get started building websites with Eleventy.

Based on the [Eleventy Base Blog](https://github.com/11ty/eleventy-base-blog) repo (see there for additional info on Eleventy usage).

## [Demo Site](https://eleventy-netlify-boilerplate.netlify.app/)

## Features

* Uses Eleventy v3
* Sample pages and a blog with tag support
* Decap CMS with editor previews (thanks [@biilmann](https://github.com/biilmann)!)
* Scores 100/100/100/100 in Lighthouse performance tests 🔥
* Maintenance-free post author archives
* Automatic navigation menus with [Eleventy Navigation](https://www.11ty.dev/docs/plugins/navigation/)
* Includes a working contact form
* CSS 2kb minified, inlined for fastest page render
* Optional pipeline for minified inline JS
* Pre-builds and minifies your HTML too
* Uses Markdown files for content
* Uses Nunjucks (or Liquid) templates for layout
* 100% Javascript framework free
* Continuous Deployment workflow via Netlify

## Want to try it out now?

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/danurbanowicz/eleventy-netlify-boilerplate&stack=cms)

Clicking the button above will deploy a copy of the demo website to your Netlify
account (you can create an account during this process if you don't have one)
and everything needed for running the CMS:

* A new repository in your GitHub account with the code
* Full Continuous Deployment to Netlify's global CDN network
* Control users and access with Netlify Identity
* Manage content with Decap CMS
* Process form data with Netlify Forms

### Set Up Authentication

After deploying this project, Netlify Identity will add you as a CMS user and
will email you an invite. It is not necessary to accept this invite if you wish
to use an
[OAuth provider](https://www.netlify.com/docs/identity/#external-provider-login)
(e.g. Github) to manage authentication for your CMS.

It is recommended to use this method of authentication as it removes the need
for an email & password to log in to the CMS and is generally more secure. You
will need to add an OAuth provider in your Netlify app settings under
"Settings" > "Identity" > "External providers".

Once you've added an OAuth provider, navigate to `/admin` on your site, select your provider from the
list, and you should then be logged into your CMS. Cool huh?

### Set Up Identity Email Templates

In order for Netlify Identity service emails (Signup, Reset Password etc) to function correctly with Decap CMS, you will need to tell Netlify where your email templates are located.

Inside this repo under `/admin/email-templates/` are four Netlify Identity email templates. Inside your Netlify site settings, you will need to navigate to: "Site Settings > Identity" and look there for the four email template configuration boxes: Invitation template, Confirmation template, Recovery template, and Email change template. Inside each, edit the "Path to template" field to match the root-relative path to each template. For example:

`/admin/email-templates/invitation.html`

Now you're all set; you can invite new CMS users and begin editing content!

## Gotchas

If you change the repo that was created at deploy time from public to private, you'll need to regenerate your token,
as the token generated using the deploy to Netlify button can only access public repositories. To
regenerate your token, head to "Settings" in your Netlify site dashboard, go to the "Identity"
section, then scroll to "Services" where you'll see an "Edit settings" button. Click that and you'll
see a text link to "Generate access token in GitHub".

If you need any help with setting up Decap CMS, you can reach out to the Netlify team in the [Decap CMS Gitter](https://gitter.im/netlify/netlifycms).

## Local development

### 1. Clone this repository:

```
git clone https://github.com/danurbanowicz/eleventy-netlify-boilerplate.git my-blog-name
```


### 2. Navigate to the directory

```
cd my-blog-name
```

Specifically have a look at `.eleventy.js` to see if you want to configure any Eleventy options differently.

### 3. Install dependencies locally

```
npm ci
```

### 4. Edit _data/metadata.json

This file contains your site title and author details, and can be used to store any other commonly used site data.

### 5. Run Eleventy (builds the site)

```
npx @11ty/eleventy
```

Or build automatically when a template changes:
```
npx @11ty/eleventy --watch
```

Or build and host locally for local development:
```
npx @11ty/eleventy --serve
```

Or in debug mode:
```
DEBUG=* npx @11ty/eleventy
```

## Bug reports, feature requests, etc

This is an ongoing project and I welcome contributions and suggestions! Feel free to submit a PR.

If you need any help with setting up Decap CMS, you can reach out to the Netlify team in the [Decap CMS Gitter](https://gitter.im/netlify/netlifycms).


## Local validation and dependency maintenance

Use Node 24 (`nvm install && nvm use`) and install the committed lockfile:

```sh
npm ci
npm test
npm run typecheck
npm run gemini:server:build
```

`npm test` removes generated output, builds the website and Gemini output,
compiles the Netlify API, and runs frontend and admin/API regressions with
Node's test runner. No production credentials or remote content writes are needed.
After installation, these checks use local content and dependencies.

For focused checks, run `npm run test:frontend` or `npm run test:admin`.
The tests cover rendered pages/navigation, author/tag links, dates, responsive
images, contact fields, CMS schema and preview components, Identity callbacks,
the local CMS backend using disposable post fixtures, and serverless API responses. They do not exercise hosted Netlify Identity,
Git Gateway publishing, or the third-party CMS UI in a real browser.

Run `npm start` for the local site plus the pinned Decap proxy, or `npm run serve`
for the public site alone. Local CMS edits write to this checkout. The optional
Gemini server starts with `npm run gemini:server:start` after building its output.

Before future upgrades, run the tests on the existing lockfile, then update
packages and rerun the same checks. Keep browser import versions and their local
test helpers aligned. See VALIDATION.md and the feature research notes for the
upgrade evidence and limitations. Internal specs, tests, and knowledge pages
are excluded from both published outputs.

The test suite also runs the same blocking public-page accessibility audit as
Netlify. Puppeteer downloads Chromium during `npm ci`; on NixOS or machines
using a system Chromium, install with `PUPPETEER_SKIP_DOWNLOAD=true` and set
`PUPPETEER_EXECUTABLE_PATH` to that browser when running tests. To rerun only the
public audit after a build, use `npm run test:a11y`. The legacy Netlify plugin is
pinned with a targeted Pa11y 10 override, verified with both accessible output
and an intentionally inaccessible fixture.

## Netlify build and caching

The build command in `netlify.toml` runs three steps before Eleventy:

```sh
npx puppeteer browsers install chrome                # browser for the Pa11y audit
npm run resume:setup                                 # RenderCV (Python) virtualenv
npm run resume -- --dont-generate-png && eleventy    # render the resume, build the site
```

Eleventy then publishes the resume at `/resume/` (HTML) and
`/resume/David_Vasandani_CV.pdf` (see `resume/README.md`). A failure in any step
fails the deploy, so the live site keeps its last good version.

### What is cached, and where

Netlify restores a dependency cache before each build and saves it afterwards.
That cache includes `node_modules/`, so both heavy tools are kept inside it:

| Tool | Location | Configured by | Cold | Cached |
|---|---|---|---|---|
| Chrome for Pa11y (~415MB on disk) | `node_modules/.cache/puppeteer` | `.puppeteerrc.cjs` | download | ~1s |
| RenderCV virtualenv (~470MB on disk) | `node_modules/.cache/resume-venv` | `RESUME_VENV` in `netlify.toml` | ~16s | ~1s |

Netlify also keeps pip's wheel cache, so even a cold virtualenv reuses
downloaded packages; the cold cost is installing them. Measured on deploy
previews, the build took about 62s before the virtualenv was cached and about
52s with it.

### How the cached steps stay correct

- `npx puppeteer browsers install chrome` installs the Chrome build that the
  pinned Puppeteer expects. It is a no-op when that build is already cached and
  downloads the new one after a Puppeteer upgrade. (`package.json` `allowScripts`
  also approves Puppeteer's own postinstall, which npm 11.19+ otherwise skips;
  re-approve it with `npm install-scripts approve puppeteer` after upgrading.)
- `npm run resume:setup` (`scripts/resume.cjs`) first checks that the cached
  virtualenv's Python still runs. The virtualenv links to the build image's
  Python, so an image update can break it; setup then recreates it with
  `python -m venv --clear`. It always runs `pip install -r resume/requirements.txt`,
  which is a ~1s no-op when nothing changed and installs the new pin after a
  RenderCV version bump.

### Clearing the cache

In the Netlify UI, choose **Deploys → Trigger deploy → Clear cache and deploy
site**. The next build is cold (Chrome download plus a full RenderCV install)
and saves a fresh cache. Clear it if a cached tool misbehaves in a way the
checks above don't catch.

### Local and CI builds

Locally, the virtualenv defaults to `resume/.venv`; set `RESUME_VENV` (a path
relative to the repository root) to put it elsewhere. GitHub Actions does not
use either cache: the `test` job uses the runner's Chrome
(`PUPPETEER_EXECUTABLE_PATH`), and the `resume` job installs RenderCV with
`actions/setup-python`'s pip cache.

## Vercel build (migration in progress)

`vercel.json` builds the same site on Vercel while Netlify still serves
`david.vasandani.me`. Its build command renders the resume and runs Eleventy,
like Netlify's, keeping the RenderCV virtualenv in
`node_modules/.cache/resume-venv`. Vercel builds skip Puppeteer's Chrome
download (`.puppeteerrc.cjs`) because they run no Pa11y audit; GitHub Actions
still runs it.

The serverless endpoints are Vercel Functions in `api/functions/`, reached
through the same public paths via rewrites:

| Path | Netlify | Vercel |
|---|---|---|
| `/api/*` | `netlify/functions/api.ts` | `api/functions/api.ts` (same Express app) |
| `/hello` | `netlify/functions/hello/hello.mts` | `api/functions/hello.ts` |

`npm run typecheck` also checks `api/` (`api/tsconfig.json`). Netlify Identity
(the CMS's `git-gateway` login) and Netlify Forms (the contact form) have no
Vercel equivalent yet, so those keep working only on Netlify for now.
