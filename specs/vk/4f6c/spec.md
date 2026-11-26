# Feature specification: Repair interrupted Chrome downloads

**Feature directory** `specs/vk/4f6c`
**Created** 2026-11-26
**Status** Draft
**Input** [Technical spec](technical-spec.md) and [prior knowledge](prior-knowledge.md)

## Clarifications

### Session 2026-11-26

No open clarifications. Confirmed that Chrome preflight must also run before the inaccessible fixture in `npm test`. The fixture calls the audit directly from the Node tests, before `npm run test:a11y`.

## User Scenarios & Testing

### P1. Run accessibility tests after an interrupted download

As a blog maintainer, I want accessibility test setup to repair an incomplete Chrome download so I can run the suite without clearing the cache by hand.

1. Given an incomplete build for the current platform and expected Chrome revision, when setup runs, it removes only that build directory, installs the expected build once, and starts the suite once the executable passes the setup check. Other cached builds remain intact.
2. Given an installer error or an executable that still fails the setup check after installation, when recovery ends, setup fails before the suite starts. The error identifies the expected build and executable path.

### P2. Reuse an available browser

As a blog maintainer, I want accessibility tests to use a healthy browser that is already available so I can rerun the suite without another download.

1. Given a healthy executable for the current platform and expected build in the configured cache, when setup runs, it starts the suite with zero installer calls or cache writes.
2. Given an explicitly configured system executable, when setup runs, the suite retains that selection and setup leaves the managed cache alone.

### Edge Cases

- If the expected build directory is absent, setup installs the build once without deleting any cached builds.
- If the expected directory exists but its executable is missing, setup treats that build as incomplete. A healthy executable in a sibling directory has no effect on that decision.

## Requirements

### Functional Requirements

- **FR-001** Before the accessibility suite starts, setup must honor the system executable override. Otherwise it must identify and check the expected executable using the installed test tooling's pinned Chrome revision, the current platform and the configured cache root.
- **FR-002** A healthy managed executable must end setup without writes or installation. Selecting a system executable must bypass managed cache repair and installation.
- **FR-003** If the managed executable is missing, setup must remove only the directory for that platform and revision if it exists, invoke the repository's pinned installer once, and check the resulting executable before starting the suite.
- **FR-004** An installation error or failed check after installation must stop setup and identify the build and expected executable path in the error.
- **FR-005** In `npm test`, Chrome preflight must succeed before the inaccessible fixture launches Chrome.

### Key Entities

- **Managed Chrome build**. The cached browser selected by platform and pinned revision. The configured cache root determines its location.
- **System executable override**. An explicit executable selection that takes precedence over the managed build.

## Success Criteria

### Measurable Outcomes

- **SC-001** After a recoverable interruption, one setup run and one installation attempt let the browser-backed accessibility suite complete successfully with zero manual cleanup and zero changes to sibling builds.
- **SC-002** Both browser reuse cases pass with zero installer calls and zero cache writes.
- **SC-003** Both recovery failure cases stop before the suite starts. In each case the error gives maintainers the build and executable path they need to locate the failed installation.
- **SC-004** With a recoverable incomplete Chrome build, `npm test` repairs Chrome before the inaccessible fixture runs, and the fixture still fails its audit for accessibility issues.

## Assumptions

- Recovery depends on the repository's existing pinned browser installer. The feature covers accessibility test setup in this repository.
- Verify recovery, sibling preservation, failure reporting and healthy reuse in temporary directories with a substitute installer. Use the existing browser-backed accessibility suite to verify recovery end to end.
