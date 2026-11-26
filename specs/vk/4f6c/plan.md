# Repair interrupted Chrome downloads

**Branch** `vk/4f6c-recover-incomple` · **Date** 2026-11-26 · [Feature spec](spec.md)

## Summary

Run Chrome preflight in `audit(directory)` immediately before Puppeteer launches. Both the public-page audit and the inaccessible fixture use this entry point. Reuse a healthy managed browser and leave browser selection to Puppeteer when a system executable or a non-Chrome default is configured.

## Technical context

Node 24, CommonJS, Pa11y 10.0.0 and Puppeteer 25.15.0. Declare `@puppeteer/browsers` 3.2.5 as a direct dev dependency, reusing the locked version. Recovery operates in Puppeteer's configured local cache. The healthy path performs filesystem checks without writing or downloading. Recovery makes one installer attempt per preflight.

## Constitution check

- Before research. Scope is the blog's local accessibility tooling. Existing audit callers and results are preserved. No published content, resume prose or hosted settings are in scope.
- After design. Temporary-directory tests inject the installer and require no network or credentials. The real download and audit run are separate validation steps. The lockfile change declares an existing dependency at its locked version. Keep planning files out of published output, document the recovery behavior in `knowledge-base/dependency-testing.md`, and obtain independent review before merging through a PR with required checks.

## Implementation

1. Add a small preflight helper under `scripts/`, called from `scripts/test-a11y.cjs`. Preserve the existing launch options and the exported audit interface.
2. Read effective Puppeteer configuration first. Bypass managed repair for an explicit executable or non-Chrome default. For managed Chrome, resolve the expected build, platform, executable and build directory as described in [research](research.md). Fail before any deletion if these inputs cannot safely identify one managed build.
3. Reuse an existing regular file. After an install, also verify execute access. If missing, remove only the exact build directory if present, run the local installer once and check the resolved executable again. Report the build and expected path on repair failure and retain the underlying error. Serialize repairs across processes with a per-build lock. Recheck the executable under the lock before deleting the incomplete build.
4. Add focused Node tests for the [recovery states](data-model.md) and run the [validation guide](quickstart.md). Keep the existing accessibility fixture and CI entry points.

This is an internal change to the existing test commands. Their interface is unchanged.
