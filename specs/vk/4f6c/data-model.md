# Browser selection and recovery

| Selection or state | Inputs and outcome |
| --- | --- |
| System executable or non-Chrome default | Effective Puppeteer configuration selects the browser. Skip managed cache checks and let Puppeteer launch it. |
| Healthy managed Chrome | Cache root, platform and build ID identify one installation. Its expected executable is a regular file with execute access. Continue without writes or an installer call. |
| Missing or incomplete managed Chrome | An absent directory needs installation only. An existing build with a missing executable needs removal before installation. Sibling builds and browser caches are outside the deletion target. |
| Recovery succeeded | One installer attempt completed and the executable passes the same check. Continue to launch. |
| Recovery failed | Cleanup or installation failed, or the executable still fails the check. Stop before launch and include the build ID and expected executable path in the error. |

Selection and recovery state are local to the audit process. The cache is the only persistent state.
