# Automatic PR branch updates

The autoupdate workflow runs on pushes and merges each advanced base branch into
eligible open PR branches. PRs with any `decap-cms/` label are excluded. Conflicts
are logged and skipped for manual resolution; other update errors still fail.

## Incident on 2026-10-30

[Run 41101719778](https://github.com/davidvasandani/blog/actions/runs/41101719778)
failed after commit `463024620c061ed312582d58f2e5cd6f59859da1`.
The [job log](https://github.com/davidvasandani/blog/actions/runs/41101719778/job/124219962380)
records six successful updates, then conflicts on PRs #98, #103, #65, #109,
#111, and #112. The first failure, at 17:49:21 UTC, reads:

```text
Merge conflict error trying to update branch
Caught error running merge, skipping and continuing with remaining PRs
HttpError: Merge conflict
```

The action defaults to `MERGE_CONFLICT_ACTION=fail`. Its catch handler marks the
job failed even though it continues processing PRs. Setting this option to
`ignore` skips conflicts while preserving failures for other merge errors.

A separate configuration bug caused the six CMS PRs to update. The action splits
`EXCLUDED_LABELS` on commas and compares exact names with `includes`; it does not
interpret `decap-cms/*` as a wildcard. The preparation step now lists all repository
labels with that prefix, including future CMS labels, and passes their exact names.

Sources: [action configuration](https://github.com/chinthakagodawita/autoupdate#configuration),
[filter and merge implementation](https://github.com/chinthakagodawita/autoupdate/blob/master/src/autoupdater.ts),
[label parsing](https://github.com/chinthakagodawita/autoupdate/blob/master/src/config-loader.ts).

## Credentials and protections

Keep the repository Actions secret `AUTOUPDATE_TOKEN` set to a fine-grained PAT
restricted to `davidvasandani/blog`, with Contents, Workflows, and Pull requests
read/write access. Workflows access allows updates that include workflow changes.
Renew the secret when the PAT expires or is revoked. Never log its value.
The workflow now fails clearly if the secret is missing instead of falling back
to `GITHUB_TOKEN`, whose pushes do not trigger subsequent CI.

No credential rotation was needed during investigation. Secret metadata showed
an update on 2026-10-27. The original run successfully merged workflow changes,
and [Blog tests run 41101748820](https://github.com/davidvasandani/blog/actions/runs/41101748820)
passed on the resulting PR #115 head `ebf8ea6cea8cef3ddb33f1a7f66cbcfd9c922515`.
This establishes that authentication and CI triggering worked for that run.

Main branch protection was inspected and left unchanged. Production hosting,
DNS, deployment workflows, and application dependencies are outside this fix.

## GitHub Actions validation

Validation used temporary draft PRs targeting the fix branch, so main and existing
PR branches were not changed. `actionlint` passed for the edited workflow.

- [Initial no-op run](https://github.com/davidvasandani/blog/actions/runs/41113151710)
  succeeded with zero PRs to update.
- [Base-advance run, attempt 1](https://github.com/davidvasandani/blog/actions/runs/41113235447/attempts/1)
  succeeded. Its log skipped the conflict on #150, excluded #149 for its
  `decap-cms/draft` label, and then updated eligible PR #148. Processing the
  eligible PR after the conflict proves a conflict does not block other updates.
- PR #148 advanced from `e50a4631c01e50345db7f263fd7949c8371313ba` to
  `be9555198b3e25e54ec0dbad8326c53d2e69b424`. The CMS and conflicted PR heads
  were unchanged.
- The update triggered [Blog tests](https://github.com/davidvasandani/blog/actions/runs/41113284661)
  through a `pull_request` event on the new head. Its test, resume, and diagrams
  jobs all passed. The update also triggered a push-triggered
  [autoupdate no-op](https://github.com/davidvasandani/blog/actions/runs/41113274001).
- [Rerun, attempt 2](https://github.com/davidvasandani/blog/actions/runs/41113235447/attempts/2)
  succeeded without changing any of the three heads. The eligible PR logged
  `Branch update not required, branch is already up-to-date.` The upstream
  summary counts this HTTP 204 response as an update, so the unchanged head SHA
  is the evidence for the no-op. CMS exclusion and conflict skipping still worked.

Temporary PRs #148, #149, and #150 were closed without merging and their branches
were deleted after validation.
