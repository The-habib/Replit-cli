# Infrastructure Boundaries & Handled Failure Modes — `rsh`

This document details known external platform constraints and how `rsh` handles them defensively:

## 1. Replit Public GraphQL Gateway Persisted Query Hashes
- **Observation**: `https://replit.com/graphql` returns `HTTP 400 {"errors":[{"message":"Persisted query hash required"}]}` when arbitrary unhashed GraphQL operations are sent directly without an Apollo APQ hash registered in Replit's production build safelist.
- **Handling**: `rsh` implements defensive fallback:
  1. When running inside a container, resolves container environment identity directly (`$REPLIT_USER`, `$REPL_ID`).
  2. In offline/mock mode (`--mock` or `RSH_MOCK_MODE=true`), provides full simulation for seamless testing.
  3. When live session cookies are available, provides graceful error reporting guiding the user.

## 2. Browser Interactive Login Loopback
- **Observation**: In headless or remote SSH/container environments without a local GUI browser, automatic browser opening via `xdg-open` may fail if `$DISPLAY` is not configured.
- **Handling**: `rsh login` defaults to a clean, interactive terminal prompt with password masking, allowing direct pasting of `connect.sid` cookies or API tokens.

## 3. Container Cold-Starts
- **Observation**: Connecting to a sleeping Repl container via WebSocket requires the evaluator to start the MicroVM.
- **Handling**: `rsh shell` logs a connecting spinner and listens for `ContainerState` transitions (`SLEEP` ➔ `READY`) with a 10s timeout before failing.
