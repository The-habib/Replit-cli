# Platform Limitations & Technical Boundaries — `rsh`

## 1. Documented Platform Constraints

1. **Undocumented Public GraphQL API**:
   - Replit does not publish an official third-party consumer GraphQL documentation.
   - `rsh` uses the standard web frontend GraphQL operations (`https://replit.com/graphql`) with defensive parsing and mock/container fallback mechanisms.

2. **Container Sleep & Cold Starts**:
   - Inactive free-tier Repl containers enter a sleep state (`ContainerState: SLEEP`).
   - Connecting via `rsh shell` wakes the container automatically, but may take 2-8 seconds to finish container bootstrapping.

3. **SSH Access Restrictions**:
   - Replit SSH key configuration (`ssh.replit.com`) is officially reserved for Replit Core/Teams paid tier accounts.

4. **OAuth Device Flow**:
   - Replit does not expose a public OAuth2 PKCE authorization server for third-party CLIs; `rsh` therefore uses session cookies (`connect.sid`), API tokens, and local container STS identities.
