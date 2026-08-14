# Replit Terminal CLI (rsh) — Risks, Security & Edge Cases

## 1. Protocol & API Stability Risks

| Risk | Impact | Probability | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Undocumented GraphQL Schema Changes** | API calls (e.g. `currentUser`, `createRepl`) may fail if field names change | Medium | Implement defensive parsing with fallback queries, versioned schemas, and explicit error diagnostics. |
| **Goval / Crosis Protocol Evolution** | WebSocket framing or protobuf definition updates | Low (Protobuf maintains backward compatibility) | Use official `@replit/protocol` and `@replit/crosis` peer packages; support graceful reconnection and fallback to local/SSH modes. |
| **Rate Limiting / Cloudflare / WAF** | Rapid requests to `replit.com/graphql` or WebSocket connections blocked | Medium | Implement exponential backoff with jitter, connection reuse, and proper browser headers (`User-Agent`, `Referer`, `Origin`). |

---

## 2. Security & Credential Management Risks

| Risk | Impact | Probability | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **`connect.sid` Token Exposure** | Attacker gains full account access | High if mishandled | Store in encrypted local config file (`~/.config/rsh/config.json`) with strict `0600` file permissions; never log tokens or print in error dumps. |
| **Remote Shell Hijacking / Man-in-the-Middle** | Insecure communication to container | Low (TLS / WSS enforced) | Enforce WSS/HTTPS with strict certificate validation; reject insecure downgraded endpoints. |
| **Command Injection via AI Agent** | Malicious prompt execution | Medium | AI Agent requires interactive confirmation before running potentially destructive commands (`rm -rf`, `git push --force`). |

---

## 3. Terminal & PTY Emulation Edge Cases

| Edge Case | Description | Solution |
| :--- | :--- | :--- |
| **Raw Mode Handshake** | Terminal keypresses (Ctrl+C, arrows, tab completion) must not be intercepted locally by Node | Switch `process.stdin.setRawMode(true)` on connection; restore cooked mode on exit / SIGINT. |
| **Terminal Resize Signals** | Terminal dimensions mismatch causing corrupted ANSI rendering (vim, htop, nano) | Listen to `process.stdout.on('resize')` and dispatch immediate `ResizeTerm` protobuf commands. |
| **Network Drops / Container Sleep** | Replit containers sleep when idle, causing WebSocket disconnection | Implement heartbeat pinging (`Ping`/`Pong`) every 15s and automatic reconnection with backoff. |
| **Non-Interactive Execution (`rsh exec`)** | Running single commands without allocating a persistent interactive TTY | Run command with non-interactive exec request, capture stdout/stderr streams cleanly, and exit with container exit code. |
