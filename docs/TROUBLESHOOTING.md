# Troubleshooting Guide — `rsh`

## 1. Authentication Issues

### Issue: "Persisted query hash required" (GraphQL 400)
- **Cause**: Replit's production GraphQL gateway (`https://replit.com/graphql`) enforces Apollo APQ Persisted Query Safelists on external requests.
- **Resolution**:
  - If inside a Replit container, `rsh` automatically uses the container STS token / local context.
  - Run `rsh bridge` to capture an authenticated browser session cookie.
  - Use `rsh whoami` to verify that your active session is recognized.

### Issue: "Permission denied" when executing `rsh`
- **Cause**: The compiled binary in `dist/` is missing executable permissions.
- **Resolution**:
  ```bash
  chmod +x /home/runner/workspace/rsh/dist/cli/index.js
  ```

---

## 2. Shell & Terminal Issues

### Issue: Terminal characters are misaligned in `htop`, `vim`, or `nano`
- **Cause**: Terminal dimensions on remote container do not match local window rows/columns.
- **Resolution**: `rsh shell` automatically transmits `ResizeTerm` protobuf commands on window resize (`SIGWINCH`). If misaligned, resize your terminal window slightly or press Enter.

### Issue: Ctrl+C exits the CLI instead of canceling the in-container command
- **Cause**: Node.js stdin was not in raw mode.
- **Resolution**: In `rsh shell`, raw mode is enabled by default so `\x03` is forwarded directly into the container bash process.

---

## 3. Database Issues

### Issue: "No active PostgreSQL or SQLite database detected"
- **Cause**: `$DATABASE_URL` is not set and no local `sqlite.db` exists.
- **Resolution**: Verify database credentials with `rsh env | grep PG` or check `rsh db info`.
