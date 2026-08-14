# Contributing to `rsh`

Thank you for your interest in contributing to `rsh` — the universal command-line companion for Replit!

## Development Setup

1. **Clone and Install Dependencies**:
   ```bash
   git clone https://github.com/replit/rsh.git
   cd rsh
   pnpm install
   ```

2. **Build and Test**:
   ```bash
   # Run TypeScript build
   pnpm run build

   # Run automated test suite
   pnpm test
   ```

3. **Running the Dev CLI**:
   ```bash
   pnpm run dev whoami
   ```

## Code Guidelines
- Write TypeScript in strict mode.
- Add Vitest unit and integration tests for every new subcommand or feature in `tests/`.
- Ensure zero secrets or sensitive session cookies are leaked in logs.
