# Long build time: technical specification

Task: f0b9-long-build-time
Scope: davidvasandani/blog only.

## Observed problem
The supplied Cloudflare Workers build screenshot (build #0c04b000, commit 2191598) shows 3m17s in Installing, before Building starts. Logs last show Python 3.13.18 installation, after Node 24.22.3 installation. This evidence does not establish that Eleventy or RenderCV rendering is slow.

## Required outcome
Identify the installation bottleneck and make the smallest supported Blog configuration change to avoid unnecessary runtime installation while retaining reproducible resume generation and published assets. Preserve Node 24 support, RenderCV requirements, resume content, and deployment behavior. Do not change other services.

## Investigation and acceptance
Inspect existing project knowledge and supported Cloudflare runtime selection before choosing a fix. Distinguish measured timing from hypotheses. Validate changed configuration and relevant resume/build tests. Document any dashboard setting required, since a dashboard override can defeat a repository version file. Do not claim improved deployed build times without actual evidence. Follow the requested SpecKit stages, independent Codex review, knowledge recording, and PR merge.
