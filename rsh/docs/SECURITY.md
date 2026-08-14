# Security Policy & Credential Management — Replit Terminal CLI (`rsh`)

## 1. Security Architecture Principles

1. **Zero Secret Leakage**:
   - Tokens, cookies, and secret keys are never echoed to standard output, error dumps, or logs.
   - Credentials passed via flags are sanitized in process memory.

2. **At-Rest Encryption**:
   - Stored credentials at `~/.config/rsh/config.json` are encrypted using AES-256-GCM.
   - The encryption key is derived dynamically using `scrypt` with a machine-bound signature and salt.
   - Permissions on config files are enforced to `0600` (read/write only by file owner).

3. **In-Transit Protection**:
   - All network traffic to `https://replit.com/graphql` uses TLS 1.3.
   - All container WebSocket connections use WSS (`wss://eval.repl.it/wsv2/...`) with strict certificate validation.

4. **Container Sandboxing & Isolation**:
   - Remote shell sessions execute within isolated Linux MicroVMs managed by Replit Container Manager (`conman`).
   - Process privileges follow standard non-root `runner` container restrictions.

---

## 2. Authentication Best Practices

- **Session Cookie (`connect.sid`)**:
  - Treat your `connect.sid` cookie with the same confidentiality as your Replit account password.
  - Do not commit `.config/rsh/` or `.env` files to source control.
- **CI / CD Pipelines**:
  - In automated CI/CD runners (GitHub Actions, GitLab CI), supply `REPLIT_TOKEN` or `REPLIT_CONNECT_SID` via repository secrets.
- **Revoking Sessions**:
  - Run `rsh logout` to clear credentials locally.
  - Log out of your browser session at `https://replit.com` to invalidate the active session cookie.
