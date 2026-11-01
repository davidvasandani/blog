# Research

- Inspected davidvasandani/siteping README at commit 7629a14488a75dbd21e517c43810a397898b091d via GitHub API. It offers framework-independent widget and Fetch-compatible server adapters.
- Inspected published @siteping/widget 0.12.0, @siteping/server 0.2.0 and @siteping/adapter-kit 0.2.0 declarations. The adapter kit exposes createCollectionStore with serialized mutations and atomic dedup within one instance. A singleton Durable Object supplies that ownership boundary. SQLite transactionSync persists a whole snapshot atomically.
- Inspected the pinned Decap 3.17.1 browser distribution. Its AuthStore reads/writes `decap-cms-user` and removes that key at logout. Reusing this credential avoids competing sessions. Server authorization checks repository push permission, not the browser's identity fields.
- Prefer Blog-owned Durable Object storage to adding Prisma, an external database service, or another SitePing deployment. No new secrets are needed. Shared feedback is available in the widget's all-pages panel.
