# Replit Terminal CLI (rsh) — Deep Research & Technical Findings

## 1. Executive Summary

This research investigates the technical architecture, protocols, authentication mechanics, and APIs required to build a production-grade terminal CLI for Replit (`rsh`).

Replit's platform architecture combines:
1. **Frontend / Gateway Layer**: Next.js web application and GraphQL API gateway at `https://replit.com/graphql`.
2. **Authentication Layer**: Session cookie (`connect.sid`), personal API tokens, Replit Identity STS tokens (`replit identity`), and browser-assisted OAuth/session capture.
3. **Container & Execution Layer**: Ephemeral or persistent Linux MicroVM containers orchestrated by Container Manager (`conman`) and accessed via WebSocket gateways (`wsv2` / Goval protocol).
4. **Multiplexed Channel Protocol**: `@replit/crosis` + `@replit/protocol` (Protobuf-based binary wire protocol multiplexing shell PTY, exec, file sync, OT, LSP, and package management).
5. **Local Workspace & Direct Execution Layer**: Native shell execution when running inside or beside a Replit container environment.

---

## 2. Authentication Mechanics

### 2.1 Authentication Methods Comparison

| Mechanism | Stability | Scope / Permissions | Implementation Complexity | Primary Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Session Cookie (`connect.sid`)** | High (Used across entire web app) | Full account permissions (Repls, teams, billing, secrets) | Medium (Extracted via browser login helper or CLI prompt) | Primary CLI authentication for interactive user management |
| **Replit Personal Access Token / API Token** | Official / Modern | Scoped API access to deployments, webhooks, and REST endpoints | Low (Direct Bearer header) | CI/CD automation and headless operations |
| **Replit Identity STS Tokens (`$REPLIT_CLI identity`)** | Official container-level | Container identity verification and inter-repl communication | Low (CLI binary interface inside container) | Autonomous agent & internal container validation |
| **Browser OAuth / Device Flow** | Restricted (Enterprise SCIM only) | Replit does not have a public OAuth2 PKCE endpoint for 3rd parties | High (Requires browser loopback daemon) | Interactive browser-assisted login |

### 2.2 Token Storage & Keyring Security
- **Location**: `~/.config/rsh/config.json` (XDG-compliant) or OS keychain / encrypted AES-256-GCM vault with machine-bound key derived from machine ID / user salt.
- **Environment Overrides**: `REPLIT_TOKEN`, `REPLIT_CONNECT_SID`, `REPLIT_API_KEY`.
- **Security Rule**: Tokens are never logged or exposed in stack traces; sensitive output is masked.

---

## 3. Replit GraphQL & REST API Map

### 3.1 GraphQL Gateway
- **Endpoint**: `https://replit.com/graphql`
- **Required Headers**:
  - `User-Agent: rsh-cli/1.0.0`
  - `X-Requested-With: XMLHttpRequest`
  - `Referer: https://replit.com`
  - `Origin: https://replit.com`
  - `Cookie: connect.sid=<TOKEN>` or `Authorization: Bearer <TOKEN>`
  - `Content-Type: application/json`

### 3.2 Core GraphQL Operations
1. **Current User (`CurrentUser` / `UserByUsername`)**:
   ```graphql
   query CurrentUser {
     currentUser {
       id
       username
       email
       bio
       isSubscribed
       plan { id name }
       image
     }
   }
   ```
2. **List Repls (`DashboardRepls` / `UserRepls`)**:
   ```graphql
   query UserRepls($username: String!, $after: String) {
     userByUsername(username: $username) {
       id
       username
       repls(after: $after, count: 50) {
         items {
           id
           title
           slug
           url
           isPrivate
           timeCreated
           timeUpdated
           language
         }
         pageInfo {
           hasNextPage
           nextCursor
         }
       }
     }
   }
   ```
3. **Create Repl (`CreateRepl`)**:
   ```graphql
   mutation CreateRepl($input: CreateReplInput!) {
     createRepl(input: $input) {
       ... on Repl {
         id
         title
         slug
         url
         language
         isPrivate
       }
       ... on UserError {
         message
       }
     }
   }
   ```
4. **Delete / Update Repl (`DeleteRepl`, `UpdateRepl`)**:
   ```graphql
   mutation DeleteRepl($id: String!) {
     deleteRepl(id: $id) {
       id
     }
   }
   ```
5. **Repl Connection Metadata / Goval Token (`ReplConnectionInfo`)**:
   Fetches connection metadata containing the signed Goval token, WebSocket URL (`gurl`), and connection manager URL (`conmanURL`).

---

## 4. Container Connection & Crosis Protocol Architecture

### 4.1 What is Crosis?
`@replit/crosis` is Replit's official client library managing multiplexed channels over a single WebSocket connection to the Goval evaluator daemon in a Repl's container.

### 4.2 Multiplexed Services via Protobuf (`@replit/protocol`):
- **`exec` / `shell` / `interp`**:
  - PTY allocation and raw byte streaming.
  - Interactive terminal input (`input: string`).
  - Terminal output streaming (`output: string`, `stderr: string`).
  - Terminal resizing (`resizeTerm: { rows, cols }`).
  - Exit code notification (`exitCodeEvent`).
- **`files`**:
  - File tree exploration (`readdir: { path }` -> `files`).
  - File reading (`read: { path }` -> `file`).
  - File writing (`write: { path, content }`).
  - File deletion (`remove: { path }`).
  - File stats (`stat: { path }` -> `statRes`).
- **`ot` / `otLinkFile`**:
  - Operational Transformation engine for real-time multi-cursor collaborative code editing.
- **`packager` / `nix`**:
  - Package search, package installation (`nixPackageAddRequest`), package removal.
- **`lsp`**:
  - Language Server Protocol integration for code completions and diagnostics.

---

## 5. Shell & Terminal Execution Modes

The `rsh` CLI supports a **Dual-Engine Architecture**:
1. **Remote Engine (Goval / Crosis + WebSocket Client)**: Connects from any external laptop or developer terminal across the internet directly into the remote Replit container using the Goval WebSocket protocol.
2. **Local / MicroVM Native Engine**: When executed within a Replit container workspace, directly interfaces with the local PTY/subprocesses with zero latency while synchronizing status and metadata with Replit cloud.
3. **SSH Remote Mode**: For users on Replit Core/Teams with SSH keys configured, provides standard SSH tunnels directly into `ssh.replit.com`.

---

## 6. AI Agent Integration Architecture

Inspired by modern terminal AI agents (Claude Code, Gemini CLI, GitHub Copilot CLI), `rsh ask` and `rsh agent` provide autonomous development capabilities:
- **`rsh ask "<query>"`**: Fast, context-aware Q&A with knowledge of the local/remote project structure, files, and dependencies.
- **`rsh agent "<goal>"`**: Autonomous multi-step loop:
  1. Inspect directory structure and read relevant files.
  2. Synthesize plan.
  3. Apply diffs / file edits.
  4. Run verification commands / test suites.
  5. Check output and iterate until the goal is achieved.
