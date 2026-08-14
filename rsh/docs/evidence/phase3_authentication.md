# Phase 3 Evidence — Authentication Certification & Attack Testing

## 1. Authentication Lifecycle Verification

### 1.1 In-Container Auto-STS Detection
- **Command**: `rsh whoami`
- **Output**: Resolves `@tgff28970`, user ID `49147185`, plan `Replit Core`, container `workspace (6ea28db5-284d-4851-92ae-266f8317f17c)`.

### 1.2 Encrypted Storage Vault
- **Storage Location**: `~/.config/rsh/config.json`
- **File Mode**: `0600` (Read/Write user only).
- **Cipher**: AES-256-GCM with PBKDF/scrypt machine-derived key.
- **Raw On-Disk Payload Structure**:
  ```json
  {
    "token": "a1b2...iv:tag:ciphertext...",
    "connectSid": "c3d4...iv:tag:ciphertext...",
    "apiUrl": "https://replit.com/graphql",
    "accounts": { ... }
  }
  ```

### 1.3 Multi-Account Switching Attack Test
- **Test Command**: `rsh switch developer2`
- **Automated Vitest Verification**: `tests/accounts.test.ts` (100% PASS)
- **Account Profiles**: Stored as distinct profiles; switching re-binds active session without wiping alternate credentials.

### 1.4 Secret Leakage & Output Sanitization
- All CLI logs pass through `Logger.mask()`.
- Bearer tokens, passwords, cookies, and database connection strings replace secret segments with `••••`.

## Status: **PASS (Certified)**
