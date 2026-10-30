# PR branch updates

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
