# Future Roadmap — `rsh`

## Milestone 1: v1.0.0 (Current Baseline)
- [x] Complete TypeScript CLI structure with Commander, Chalk, Ora, Enquirer, Zod.
- [x] AES-256-GCM secure encrypted token storage and container context auto-detection.
- [x] GraphQL API client (`CurrentUser`, `UserRepls`, `CreateRepl`, `DeleteRepl`).
- [x] `@replit/crosis` + `@replit/protocol` WebSocket remote container shell integration.
- [x] Local PTY container fast path.
- [x] Project synchronization (`clone`, `pull`, `push`).
- [x] AI commands (`rsh ask`, `rsh agent`) with Google Gemini integration.
- [x] Autonomous unit and E2E test suite (100% pass).

## Milestone 2: v1.1.0 (Advanced Multiplayer & LSP)
- [ ] Real-time operational transformation (OT) file watch daemon.
- [ ] Live LSP completions piped to local Neovim / Helix editor.
- [ ] Multi-container port forwarding tunnel.

## Milestone 3: v1.2.0 (Deployments & Secrets Management)
- [ ] `rsh secrets set <KEY> <VALUE>` / `rsh secrets ls`.
- [ ] `rsh deploy status` and log tailing.
- [ ] Interactive multi-repl status dashboard via Ink TUI.
