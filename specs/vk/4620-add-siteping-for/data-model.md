# Data model and contracts

A BlogFeedback Durable Object stores `feedback(id TEXT PRIMARY KEY, record TEXT NOT NULL)`. Each record follows Siteping FeedbackRecord, including annotations, comments, clientId dedup key, status and timestamps. JSON timestamps are revived on load. No OAuth tokens are persisted.

GET /api/siteping/session: bearer token required; 200 with verified GitHub login, 401 absent/invalid credential, 403 no Blog push permission, 503 GitHub unavailable. All responses no-store.

/api/siteping: authenticated SitePing GET/POST/PATCH/DELETE protocol. Only project `david-vasandani-blog`. No CORS sharing. Nonmatching Origin rejected. Unsupported methods rejected. Max request body 64 KiB. Widget credentials are fetched from Decap storage at request time.

The Durable Object is reached only through the Worker binding after authorization. Its implementation does not trust client-supplied identity headers; the Worker overwrites the internal identity after GitHub verification. Each deployment has its own object namespace.
