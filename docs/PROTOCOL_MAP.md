# Replit Communication Protocol Map & Architectural Specification

## 1. Global Protocol Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Developer Terminal (`rsh`)                         │
└──────┬──────────────────────┬───────────────────────┬───────────────────────┘
       │                      │                       │
       │ HTTP / TLS 1.3       │ WSS / Protobuf        │ TCP :5432
       │ (APQ GraphQL)        │ (Crosis Goval)        │ (PostgreSQL)
       ▼                      ▼                       ▼
┌──────────────┐     ┌──────────────────┐    ┌─────────────────┐
│ Replit Cloud │     │ Container Eval   │    │ Helium Database │
│ Gateway      │     │ Gateway (wsv2)   │    │ (MicroVM / DB)  │
│ (replit.com) │     │ (eval.repl.it)   │    │ (helium:5432)   │
└──────────────┘     └────────┬─────────┘    └─────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │ MicroVM Container  │
                    │ - pid1 supervisor  │
                    │ - /bin/bash PTY    │
                    │ - Nix toolchains   │
                    └────────────────────┘
```

---

## 2. Authentication & Identity Layer

| Protocol / Token Type | Format / Endpoint | Issuer / Authority | Cryptographic Mechanism |
| :--- | :--- | :--- | :--- |
| **Session Cookie** | `connect.sid=s%3A...` | `replit.com` | HMAC-SHA256 signed Express session |
| **Replit STS Token** | `at+jwt` format (RS256) | `https://sts.replit.com` | Container-level identity minted via `$REPLIT_CLI identityv2` |
| **Goval Connection Token** | Signed Protobuf payload | Container Manager (`conman`) | Signed container connection descriptor with audience verification |
| **Cloudflare Clearance** | `__cf_bm`, `_cfuvid` | Cloudflare Edge | Bot management / WAF token cookie |

---

## 3. Communication Channels Comparison

| Subsystem | Transport Protocol | Serialization Format | Multiplexing Model |
| :--- | :--- | :--- | :--- |
| **GraphQL Gateway** | HTTPS POST (`/graphql`) | JSON / Apollo APQ | Request-Response with Persisted Query Hashes |
| **Container Shell (Goval)** | WebSocket (`/wsv2/...`) | Protocol Buffers (`@replit/protocol`) | Full Duplex Multiplexed Channels (`@replit/crosis`) |
| **Database Connectors** | TCP Wire Protocol | PostgreSQL Wire Protocol v3.0 | Stateful connection pool |
| **Browser Bridge** | HTTP Local Loopback (`:8484`) | URL encoded / JSON POST | Ephemeral authorization exchange |
