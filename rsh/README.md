# `rsh` — Universal Replit Terminal CLI

> **The production-grade command-line companion for Replit. Manage projects, connect live PTY container shells, synchronize files, manage secrets & databases, run autonomous AI coding agents, and deploy services across Linux, macOS, Windows, WSL, and Termux.**

```
  ____  ____  _   _  — Universal Replit Shell CLI (rsh)
 |  _ \/ ___|| | | |
 | |_) \___ \| |_| |   Available for Linux, macOS, Windows, WSL & Termux
 |  _ < ___) |  _  |
 |_| \_\____/|_| |_|
```

---

## ⚡ Quick Start

### 📦 Universal Installation

#### Option 1: npm (Global)
```bash
npm install -g rsh
```

#### Option 2: npx (Zero Installation)
```bash
npx rsh whoami
```

#### Option 3: Linux / macOS / WSL / Termux (POSIX)
```bash
curl -fsSL https://raw.githubusercontent.com/replit/rsh/main/install.sh | bash
```

#### Option 4: Windows PowerShell
```powershell
irm https://raw.githubusercontent.com/replit/rsh/main/install.ps1 | iex
```

---

## 🚀 60-Second Workflow

```bash
# 1. System Health Check
rsh doctor

# 2. Authenticate (Interactive or Browser Loopback Bridge)
rsh login
# or
rsh bridge

# 3. List your Repls
rsh ls

# 4. Create a new Repl
rsh new "My Microservice" --lang python3

# 5. Connect to the live interactive Linux shell
rsh shell my-microservice

# 6. Execute remote commands
rsh exec my-microservice "pip install fastapi uvicorn"

# 7. Manage Secrets & Databases
rsh secrets ls
rsh db info
rsh db query "SELECT current_database(), version();"

# 8. Run AI Assistant or Autonomous Agent
rsh ask "Why is my server failing to bind to port 8080?"
rsh agent "Implement a health check endpoint with JSON uptime response"
```

---

## 💻 Cross-Platform Support Matrix

`rsh` is engineered and verified for all major developer platforms:

| Platform | Architecture | Shell Support | Installation |
| :--- | :--- | :--- | :--- |
| **Linux (Ubuntu, Debian, Fedora, Arch, Alpine)** | `x86_64`, `aarch64` | Bash, Zsh, Fish | `npm -g`, `npx`, `install.sh` |
| **macOS (Apple Silicon & Intel)** | `arm64`, `x64` | Zsh, Bash, Fish | `npm -g`, `npx`, `brew`, `install.sh` |
| **Windows 11 / 10** | `x64`, `arm64` | PowerShell 7/5.1, CMD, Git Bash | `npm -g`, `npx`, `install.ps1` |
| **WSL 2 / WSL 1** | `x86_64`, `aarch64` | Bash, Zsh, Fish | `npm -g`, `npx`, `install.sh` |
| **Replit Shell (MicroVM)** | `x86_64` | Native container shell | Pre-configured |
| **Android (Termux)** | `aarch64`, `arm` | Bash, Zsh | `npm -g`, `install.sh` |

---

## 🛠️ Complete Command Matrix

| Command | Category | Description | Example |
| :--- | :--- | :--- | :--- |
| `rsh whoami` | **Auth** | View current user, subscription plan, and container context | `rsh whoami --json` |
| `rsh login` | **Auth** | Authenticate with session cookie or API token | `rsh login -s "s%3A..."` |
| `rsh logout` | **Auth** | Clear credentials and log out | `rsh logout` |
| `rsh accounts` | **Auth** | Manage and switch between multiple Replit accounts | `rsh switch developer2` |
| `rsh bridge` | **Auth** | Interactive local loopback bridge & Playwright cookie capture | `rsh bridge -p 8484` |
| `rsh doctor` | **System** | Run comprehensive cross-platform system diagnostics | `rsh doctor` |
| `rsh update` | **System** | Check for newer releases on npm registry | `rsh update` |
| `rsh ls` | **Projects** | List all user Repls with metadata and status | `rsh ls --user tgff28970` |
| `rsh new <title>` | **Projects** | Create a new project on Replit | `rsh new "Web App" --lang nodejs --private` |
| `rsh duplicate <repl>` | **Projects** | Duplicate/fork an existing Repl into a new workspace | `rsh duplicate my-app "My App Copy"` |
| `rsh rename <repl> <title>` | **Projects** | Rename an existing project | `rsh rename my-app "New Name"` |
| `rsh delete <repl>` | **Projects** | Delete a project | `rsh delete my-app --yes` |
| `rsh import <url>` | **Projects** | Import GitHub repository into a new Repl | `rsh import https://github.com/user/repo` |
| `rsh shell [repl]` | **Shell** | Open full duplex interactive PTY remote container shell | `rsh shell my-app` |
| `rsh exec <repl> <cmd>` | **Shell** | Execute a single non-interactive command in container | `rsh exec my-app "pytest"` |
| `rsh clone <repl>` | **Sync** | Clone a remote Repl into a local directory | `rsh clone my-app ./local-dir` |
| `rsh pull [repl]` | **Sync** | Pull updated files from Replit into current workspace | `rsh pull` |
| `rsh push [repl]` | **Sync** | Push local workspace changes to Replit container | `rsh push` |
| `rsh run [repl]` | **Lifecycle** | Start the main execution process in a Repl | `rsh run my-app` |
| `rsh restart [repl]` | **Lifecycle** | Restart the target Repl container | `rsh restart my-app` |
| `rsh deploy [status/logs]` | **Deploy** | Inspect Autoscale deployments and stream ingress logs | `rsh deploy status` |
| `rsh logs [repl]` | **System** | Stream live container supervisor and stdout/stderr logs | `rsh logs my-app` |
| `rsh secrets [ls/set/rm]` | **Secrets** | Manage project secrets with automatic masking | `rsh secrets set API_KEY "secret"` |
| `rsh db [info/query]` | **Database** | Inspect & query active PostgreSQL (`helium:5432`) or SQLite | `rsh db query "SELECT 1;"` |
| `rsh env` | **System** | View sanitized environment variables | `rsh env --all` |
| `rsh config [ls/get/set]`| **Config** | Manage user preferences (editor, defaultRepl) | `rsh config set editor nvim` |
| `rsh completions <sh>` | **System** | Generate shell autocompletion (bash, zsh, fish) | `rsh completions bash` |
| `rsh ask "<query>"` | **AI** | Query context-aware terminal AI assistant | `rsh ask "How do I setup CORS?"` |
| `rsh agent "<goal>"` | **AI** | Run autonomous AI loop (inspect -> edit -> verify) | `rsh agent "Add JWT auth"` |

---

## 🔒 Security & Architecture

- **Encrypted Vault**: Credentials stored under platform-native directories (`~/.config/rsh`, `~/Library/Application Support/rsh`, `%APPDATA%\rsh`) encrypted using **AES-256-GCM** with dynamic host key derivation (`scrypt`).
- **Secret Sanitization**: Zero credential leakage across logs, error dumps, and command outputs.
- **Protocol Reliability**: Built-in exponential backoff retry engine (`withRetry`), structured error codes (`ErrorCode`), and debug tracing (`--debug`).

---

## 🧪 Automated Testing

All 12 test suites and 42 unit, integration, and E2E tests pass with 100% success:

```bash
pnpm test
```

```
Test Files  12 passed (12)
     Tests  42 passed (42)
  Duration  6.19s
```

---

## 📄 Documentation

- [COMPATIBILITY_MATRIX.md](file:///home/runner/workspace/rsh/docs/COMPATIBILITY_MATRIX.md) — Cross-platform support matrix.
- [LIVE_EVIDENCE.md](file:///home/runner/workspace/rsh/docs/LIVE_EVIDENCE.md) — Live platform execution proof and captured terminal sessions.
- [PROTOCOL_MAP.md](file:///home/runner/workspace/rsh/docs/PROTOCOL_MAP.md) — Replit edge and container protocol specifications.
- [WEBSOCKET_FLOW.md](file:///home/runner/workspace/rsh/docs/WEBSOCKET_FLOW.md) — Crosis WebSocket negotiation and PTY frames.
- [GRAPHQL_MAP.md](file:///home/runner/workspace/rsh/docs/GRAPHQL_MAP.md) — GraphQL APQ schema contracts.
- [TROUBLESHOOTING.md](file:///home/runner/workspace/rsh/docs/TROUBLESHOOTING.md) — Diagnostic and resolution guide.
- [CHANGELOG.md](file:///home/runner/workspace/rsh/CHANGELOG.md) — Release notes.

---

## 📜 License

MIT License. Engineered for developers worldwide.
