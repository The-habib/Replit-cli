# Phase 7 Evidence — Remote Shell Certification

## 1. Terminal Driver Capabilities

### 1.1 Dual-Engine Architecture
1. **In-Container Local Fast-Path (`LocalPtyEngine` / `LocalShellSession`)**:
   - Zero-overhead native child process PTY.
   - Cross-platform shell resolution (Windows `powershell.exe`/`cmd.exe`, Linux/macOS `$SHELL`/`/bin/bash`).
2. **Remote Container WebSocket Engine (`CrosisShellSession`)**:
   - Direct integration with `@replit/crosis` v13.7.0 and `@replit/protocol` v0.4.29.
   - Channel 0 handshake and dedicated `exec` service channel.

### 1.2 Interactive Features Matrix
- [x] **Interactive Typing**: Bidirectional standard streams (`stdin` ➔ `stdout`).
- [x] **Ctrl+C Forwarding**: Sends byte `\x03` over raw stdin to interrupt in-container child processes without dropping CLI session.
- [x] **Terminal Resizing**: Listens on `SIGWINCH` and transmits `ResizeTerm { rows, cols }` to container evaluator.
- [x] **Package Manager Exec**: Verified running `npm install`, `node`, `git` inside container.
- [x] **Clean Disconnection**: Restores terminal raw mode (`process.stdin.setRawMode(false)`), resumes cursor, and unhooks listeners on exit.

## Status: **PASS (Certified)**
