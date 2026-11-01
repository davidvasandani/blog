---
title: Projects
metaDescription: Personal projects and open-source contributions, from self-hosted AI tools to this blog.
date: 2026-11-01
permalink: /projects/index.html
eleventyNavigation:
  key: Projects
  order: 5
---
A catalog of the personal projects and open-source contributions documented on this site.

## Self-hosted AI coding platform

I extended a fork of Vibe Kanban for my own use, then brought it to work. It connects coding agents to Jira, Slack, GitHub, AWS and ChatGPT, so they can carry work through without manual logins or copying tickets. It grew from one machine into a six-server cluster that preserves agent work through restarts and opens repair tickets when something breaks.

## SitePing contributions

I helped expand an open-source website feedback tool to phones, directing AI-assisted implementation and adding 48 regression tests. The work shipped upstream in SitePing v0.11.0.

## Household content and workflow platform

A personal platform built with AI coding agents to manage a household archive and recurring tasks. Media and metadata imports can resume after interruptions, validate attachments and recover failed downloads. Email triage uses Jev classification and Johnny.Decimal-based labels, with action verification and human feedback.

## Personal blog

This site is also a project: an Eleventy blog with a Gemini capsule, a Decap editor and a resume generated from source with RenderCV. Cloudflare Workers serves the site and its API. Builds check published pages and accessibility before changes ship.

[Browse the blog](/blog/) or [view the source on GitHub](https://github.com/davidvasandani/blog).

## Diagram publishing workflow

As part of this blog, I built a workflow that keeps Mermaid diagrams as editable sources and publishes styled SVG versions using diagram-design. Source and export checks catch drift, while the published diagrams include accessible titles, descriptions and full-size links.

[Read about Mermaid and diagram-design](/posts/mermaid-and-diagram-design/).
