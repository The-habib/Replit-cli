# Migration Guide — `rsh` v1.0.0

## Upgrading to `rsh` v1.0.0

`rsh` v1.0.0 is the first production release of the Replit Terminal CLI.

### Changes from Early Prototypes

1. **Multi-Account Storage**:
   - Configuration is stored under `~/.config/rsh/config.json` with AES-256-GCM encryption.
   - You can now manage multiple accounts via `rsh accounts ls` and switch seamlessly using `rsh switch <username>`.

2. **Browser Session Bridge**:
   - Replaces manual cookie copy-pasting with `rsh bridge` (loopback web listener & automated browser capture).

3. **Crosis v13 Protocol**:
   - Direct integration with `@replit/crosis` v13.7.0 and `@replit/protocol` v0.4.29.
