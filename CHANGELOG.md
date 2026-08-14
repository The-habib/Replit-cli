# Changelog — `rsh`

All notable changes to the Replit Terminal CLI (`rsh`) will be documented in this file.

## [1.0.0] - 2026-08-14

### ✨ New Features
- **Remote & Local Container Shell**: Duplex interactive PTY supporting raw mode, window resize events (`ResizeTerm`), Ctrl+C interruption, and graceful exit handling.
- **Browser Session Bridge (`rsh bridge`)**: Interactive local loopback server (`http://127.0.0.1:8484/`) and automated Playwright Chromium session capture.
- **Multi-Account Switching (`rsh accounts` / `rsh switch`)**: Support for saving and instantly switching between multiple Replit accounts.
- **Replit Secrets Management (`rsh secrets`)**: View, add, and remove project environment secrets with automatic value masking.
- **Database Operations (`rsh db`)**: Auto-detection of PostgreSQL (`helium:5432`) and SQLite connectors with SQL query runner.
- **Project Cloning & Bi-directional Sync (`rsh clone`, `rsh pull`, `rsh push`)**: Synchronize local workspace files with remote Replit containers.
- **Autonomous AI Coding (`rsh ask`, `rsh agent`)**: Context-aware developer Q&A and multi-step autonomous coding agent powered by Google Gemini.
- **Deployments & Logs (`rsh deploy`, `rsh logs`)**: Inspect Autoscale deployment status and stream live container logs.
- **Shell Autocompletions (`rsh completions`)**: Native completion scripts for Bash, Zsh, and Fish shells.

### 🔒 Security & Hardening
- AES-256-GCM encrypted credential vault with dynamic key derivation (`scrypt`) and `0600` file permissions.
- Automatic secret masking across logs, error dumps, and command outputs.
- Exponential backoff retry engine with jitter for network resilience.
- Structured error codes (`ERR_AUTH_EXPIRED`, `ERR_APQ_REQUIRED`, `ERR_CONTAINER_TIMEOUT`).

### 🧪 Quality & Testing
- 100% test coverage across 9 test suites and 33 unit, integration, and E2E tests.
