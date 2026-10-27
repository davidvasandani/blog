# Partner content delivery

These are the Mermaid sources for the post "Mermaid and diagram-design". GitHub renders them in place. They describe a generic partner content delivery, not any company's internal system.

Block 0: what happens to a delivery between submission and launch.

```mermaid
flowchart LR
  P([Partner]) -->|POST package| A[Authenticate submission]
  A --> V{Schema valid?}
  V -- no --> R[Remediate with partner]
  R -->|resubmit| A
  V -- yes --> O[Orchestrate metadata, artwork, video]
  O --> M[(Metadata store)]
  O --> AV[Set availability window]
  AV --> L([Ready to launch])
```

Block 1: the API exchange behind the "Schema valid?" decision.

```mermaid
sequenceDiagram
  autonumber
  participant P as Partner
  participant API as Delivery API
  participant Val as Validator
  P->>API: POST /deliveries (JSON manifest)
  API->>Val: validate(manifest)
  alt schema mismatch
    Val-->>API: errors[]
    API-->>P: 422 Unprocessable Entity
  else valid
    Val-->>API: ok
    API-->>P: 202 Accepted
  end
```

After editing a block, redraw it and run `npm run diagrams:check` (see [README.md](README.md)).
