# Replit Terminal CLI (rsh) — System Architecture

```
                                  ┌────────────────────────┐
                                  │      rsh CLI Core      │
                                  │  (Commander, Ink, Zod) │
                                  └───────────┬────────────┘
                                              │
         ┌──────────────────┬─────────────────┴─────────────────┬──────────────────┐
         │                  │                                   │                  │
┌────────▼─────────┐ ┌──────▼───────────┐             ┌────────▼─────────┐ ┌───────▼────────┐
│   Auth Engine    │ │  Project Engine  │             │   Shell Engine   │ │    AI Engine    │
│ (Token / Cookie /│ │  (GraphQL / REST │             │ (Crosis/WS/PTY / │ │ (Gemini/Agentic │
│  Keyring Storage)│ │   Project CRUD)  │             │  SSH / Local)    │ │   Autonomous)   │
└────────┬─────────┘ └──────┬───────────┘             └────────┬─────────┘ └───────┬────────┘
         │                  │                                  │                   │
         │                  │                                  │                   │
┌────────▼──────────────────▼──────────────────────────────────▼───────────────────▼────────┐
│                                Replit Cloud / Gateway Services                             │
│  - https://replit.com/graphql  (User profile, repl metadata, creation)                   │
│  - wsv2.replit.com / gurl      (Crosis container multiplexing, exec, PTY, files, LSP)     │
│  - ssh.replit.com              (Direct OpenSSH transport)                                 │
└────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Modular Subsystem Design

### 1.1 CLI Front-End (`@rsh/cli`)
- **Framework**: `commander` for command definitions, flags, and help formatting.
- **Rendering & Output**: `chalk` for color styling, `ora` for spinners, `enquirer` for interactive prompts.
- **Input Sanitization**: `zod` schema validation for all flags, environment parameters, and API responses.

### 1.2 Auth Subsystem (`@rsh/auth`)
- **Keyring & Storage**: Cross-platform configuration store (`~/.config/rsh/config.json`) with token obfuscation/AES encryption.
- **Session Manager**: Manages session state (`connect.sid` cookie, API bearer token, or STS token).
- **Resolver**: Auto-resolves credentials from CLI flags, environment variables (`REPLIT_TOKEN`, `REPLIT_CONNECT_SID`), or saved credentials file.

### 1.3 API Subsystem (`@rsh/api`)
- **GraphQL Client**: Robust GraphQL client with automatic error classification, retry logic, and pagination handling.
- **REST Client**: Direct endpoints for deployments, templates, and raw file sync.
- **Repl Metadata Resolver**: Resolves Repl slugs (`username/repl-name`), URLs (`https://replit.com/@user/repl`), or UUIDs (`6ea28db5-...`) to full Repl descriptors.

### 1.4 Shell & Remote Execution Subsystem (`@rsh/shell`)
- **Crosis Client Adapter**: Real-time duplex streaming channel wrapper over `@replit/crosis` + `@replit/protocol`.
- **Channel 0 / Control Channel**: Handles boot status, ping/pong, and container state (`SLEEP` -> `READY`).
- **Exec / Interp Channel**:
  - Sets up PTY terminal with matching rows and columns (`process.stdout.rows`, `process.stdout.columns`).
  - Attaches `process.stdin` (raw mode) to `channel.send({ input: str })`.
  - Attaches `channel.onCommand({ output: str })` to `process.stdout.write`.
  - Listens to terminal resize (`process.stdout.on('resize')`) and dispatches `ResizeTerm` commands.
  - Intercepts signals (`SIGINT`, `SIGTERM`) and dispatches corresponding channel signals.
- **Local Fallback Engine**: When running inside the target Replit container (detected via `REPL_ID` matching target), seamlessly delegates to local child process / PTY for zero-latency execution.

### 1.5 Sync & Git Engine (`@rsh/core`)
- **Pull**: Fetches files from remote Repl via Crosis `files` service or archive download and synchronizes with local directory.
- **Push**: Uploads local workspace files to remote Repl container via Crosis `files` write commands.
- **Run / Restart**: Dispatches `runMain` or restart trigger to the container evaluator.

### 1.6 AI Workflow Engine (`@rsh/ai`)
- **Agent Loop**:
  - Context Provider: Extracts file trees, git diffs, package configurations, and error outputs.
  - Multi-turn Tool Executor: Implements file viewing, file editing, command execution, and test verification.
  - Model Integration: Connects to Google Gemini (`@google/genai`) or user-configured LLM endpoints.
