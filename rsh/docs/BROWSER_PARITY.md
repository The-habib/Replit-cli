# Replit Browser Parity Matrix — `rsh`

| Browser Feature | CLI Equivalent | Verified | Evidence | Platform Limitation | Next Action |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **Workspace Creation** | `rsh new <title>` | **YES** | `rsh new "App"` creates Repl record & slug | GraphQL APQ requires cookie/STS for unlisted mutations | Container fallback resolver active |
| **Project Fork / Duplicate** | `rsh duplicate <repl>` | **YES** | `rsh duplicate repl "Copy"` | APQ on public gateway | Clones workspace files & forks template |
| **Project Deletion** | `rsh delete <repl>` | **YES** | `rsh delete repl --yes` | Requires write permissions | Prompt confirmation with `--yes` override |
| **Interactive Terminal Shell** | `rsh shell [repl]` | **YES** | Crosis v13 WebSocket + PTY raw mode | Requires WebSocket connectivity | Local container fast path when in-container |
| **Command Execution** | `rsh exec <repl> <cmd>` | **YES** | Runs commands & streams exit codes | Long running interactive processes need `rsh shell` | Dedicated exec channel |
| **Secrets Management** | `rsh secrets [ls/set/rm]` | **YES** | Reads/writes `.env` & container env | Encrypted at rest | Masked output values |
| **Database Connectors** | `rsh db [info/query]` | **YES** | `psql` to `helium:5432` / SQLite | PostgreSQL server must be running | Interactive query runner |
| **Deployments Management** | `rsh deploy [status/logs]` | **YES** | Queries cluster `pike` & ingress logs | Deployments require paid subscription for autoscale | Live ingress status streamer |
| **Container Supervisor Logs**| `rsh logs [repl]` | **YES** | Streams pid1 supervisor stdout/stderr | Non-persistent on ephemeral containers | Real-time log follower |
| **Autonomous AI Assistant** | `rsh ask`, `rsh agent` | **YES** | Multi-step agent loop (inspect ➔ edit ➔ verify)| Requires Gemini API key for advanced reasoning | Heuristic fallback engine included |
| **GitHub Import** | `rsh import <url>` | **YES** | Clones repo into new Repl directory | Private GitHub repos require git auth | Git credential integration |
| **Preferences & Settings** | `rsh config [ls/get/set]` | **YES** | Manages editor, defaultRepl, telemetry | Local preference store | Cross-platform JSON config |
| **Multi-Account Switching** | `rsh accounts ls`, `rsh switch` | **YES** | Multi-profile AES-256-GCM vault | None | Instant account switching |
