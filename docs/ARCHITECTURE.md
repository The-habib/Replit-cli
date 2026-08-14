# Architecture Specification — Replit Terminal CLI (`rsh`)

## 1. System Overview

`rsh` is an autonomous, production-ready command-line interface engineered to interact with Replit accounts, workspaces, containers, and AI services from any developer terminal.

```
                    ┌────────────────────────┐
                    │      rsh CLI Core      │
                    │  (Commander, Ink, Zod) │
                    └───────────┬────────────┘
                                │
   ┌──────────────────┬─────────┴───────┬──────────────────┬─────────────────┐
   │                  │                 │                  │                 │
┌──▼────────┐   ┌─────▼───────┐   ┌─────▼───────┐    ┌─────▼───────┐   ┌─────▼───────┐
│   Auth    │   │     API     │   │    Shell    │    │    Core     │   │     AI      │
│  Manager  │   │   Client    │   │  (Crosis &  │    │  (Projects  │   │   (Gemini   │
│ (Keyring) │   │  (GraphQL)  │   │ Local PTY)  │    │   & Sync)   │   │  & Agent)   │
└──┬────────┘   └─────┬───────┘   └─────┬───────┘    └─────┬───────┘   └─────┬───────┘
   │                  │                 │                  │                 │
   └──────────────────┴─────────────────┼──────────────────┴─────────────────┘
                                        │
                    ┌───────────────────▼───────────────────┐
                    │          Replit Cloud APIs            │
                    │  - https://replit.com/graphql         │
                    │  - wsv2.replit.com / Goval Protocol   │
                    │  - Local Container MicroVM (fallback) │
                    └───────────────────────────────────────┘
```

---

## 2. Component Subsystems

### 2.1 `@rsh/auth` (Authentication Engine)
- **Token Resolution**: Multi-tiered resolution hierarchy:
  1. CLI arguments / runtime flags (`--token`, `--sid`).
  2. Environment variables (`REPLIT_TOKEN`, `REPLIT_CONNECT_SID`, `REPLIT_API_KEY`).
  3. Secure encrypted disk storage (`~/.config/rsh/config.json`).
  4. Live container identity detection (`$REPLIT_CLI`, `REPLIT_USER`, `REPL_OWNER`, `REPL_ID`).
- **Cryptographic Storage**: Tokens on disk are encrypted using AES-256-GCM with PBKDF2 / scrypt-derived host machine keys and restricted file permissions (`0600`).

### 2.2 `@rsh/api` (Replit API Gateway)
- **GraphQL Protocol**: Connects to `https://replit.com/graphql` with authentic browser request headers (`X-Requested-With`, `Referer`, `Origin`, `User-Agent`).
- **Queries & Mutations**:
  - `CurrentUser`: Profile, tier, user ID, subscription.
  - `UserRepls`: Paginated list of user Repls with metadata, language, visibility, and timestamps.
  - `CreateRepl`: Repl instantiation.
  - `DeleteRepl`: Repl deletion.
  - `ReplByUrlInfo`: URL slug resolution.
  - `ReplConnectionMetadata`: Goval connection token, `gurl`, and `conmanURL`.

### 2.3 `@rsh/shell` (Remote Shell & Container Multiplexing)
- **Crosis Integration**: Uses `@replit/crosis` v13 and `@replit/protocol` Protobuf wire messages over persistent WebSockets.
- **PTY Terminal Emulation**:
  - Terminal raw mode toggle (`process.stdin.setRawMode(true)`).
  - Terminal window resizing via `ResizeTerm` commands.
  - Signal propagation (`SIGINT` -> `\x03`, `SIGTERM`).
  - Duplex stream piping between local terminal and remote container bash process.
- **Dual Execution Engine**:
  - `Remote Engine`: External developer terminal -> WebSocket gateway -> container.
  - `Local Engine`: In-container fast path utilizing direct process spawning.

### 2.4 `@rsh/core` (Project Management & File Synchronization)
- `clone`: Downloads metadata and code files into a local folder.
- `pull`: Synchronizes remote changes into the local working directory.
- `push`: Synchronizes local file modifications to the container.
- `run` / `restart`: Triggers program execution and container lifecycle events.

### 2.5 `@rsh/ai` (Autonomous AI Engine)
- **`rsh ask`**: Context-aware Q&A analyzing current workspace files and terminal diagnostics.
- **`rsh agent`**: Autonomous multi-step loop:
  1. Inspect directory structure and parse code.
  2. Synthesize fix / feature plan.
  3. Apply code modifications to disk.
  4. Run runtime verification commands.
  5. Check output and iterate until the goal is achieved.
