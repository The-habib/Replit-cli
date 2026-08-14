# Verified Features Matrix — `rsh`

All items in this document have been tested and proven to work with live test scripts and automated Vitest verification.

## 1. Authentication & Security
- [x] **In-Container Auto-Identity**: Detects `$REPLIT_USER`, `$REPL_OWNER`, `$REPL_ID`, `$REPL_SLUG`, and `$REPLIT_CLI`.
- [x] **Secure Session Storage**: Stored configuration in `~/.config/rsh/config.json` encrypted with **AES-256-GCM** and permissions locked to `0600`.
- [x] **Environment Variable Priority**: Correctly respects `REPLIT_TOKEN`, `REPLIT_CONNECT_SID`, `REPLIT_API_KEY`, and CLI override flags.
- [x] **Session Deletion**: `rsh logout` clears all stored keys and in-memory caches.

## 2. Remote Shell & Execution
- [x] **Local Container Fast-Path**: Spawns native bash sessions with full TTY capabilities when executing inside the target container.
- [x] **Crosis WebSocket Adapter**: Handles `@replit/crosis` Client initialization, connection state transitions (`CONNECTING` ➔ `CONNECTED`), Channel multiplexing, and message routing.
- [x] **Terminal State Management**: Manages raw mode (`process.stdin.setRawMode(true)`), captures `SIGWINCH` resize signals, passes `\x03` (Ctrl+C), and safely restores terminal state on exit.
- [x] **Non-Interactive Command Exec**: `rsh exec <repl> "<command>"` streams output and returns process exit code accurately.

## 3. Project Management & Synchronization
- [x] **Repl Listing (`rsh ls`)**: Lists user Repls with ANSI table formatting.
- [x] **Repl Creation (`rsh new`)**: Generates new project descriptors with slugging and language templates.
- [x] **Project Cloning (`rsh clone`)**: Creates local workspace folders, `.replit.json` metadata, and starter code.
- [x] **Bidirectional Sync (`rsh pull` / `rsh push`)**: Scans workspace directories and manages file synchronization.

## 4. AI Development Integration
- [x] **`rsh ask`**: Fast contextual Q&A with knowledge of workspace files and common Replit issues.
- [x] **`rsh agent`**: Multi-step autonomous agent: inspects files, creates code, executes commands, and verifies outcomes.
