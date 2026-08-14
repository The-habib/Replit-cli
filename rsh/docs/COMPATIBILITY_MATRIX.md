# Universal Cross-Platform Compatibility Matrix — `rsh`

`rsh` is engineered to run seamlessly across all modern operating systems and developer environments.

---

## 1. Operating System & Architecture Support

| Operating System | Architecture | Installation Method | Shell / Terminal | Verified Status |
| :--- | :--- | :--- | :--- | :---: |
| **Linux (Ubuntu, Debian, Fedora, Arch, Alpine)** | `x86_64`, `aarch64` | `npm -g`, `npx`, `install.sh` | Bash, Zsh, Fish | **FULL SUPPORT (PASS)** |
| **macOS (Apple Silicon M1/M2/M3/M4)** | `arm64` | `npm -g`, `npx`, `brew`, `install.sh` | Zsh, Bash, Fish | **FULL SUPPORT (PASS)** |
| **macOS (Intel Core)** | `x64` | `npm -g`, `npx`, `brew`, `install.sh` | Zsh, Bash, Fish | **FULL SUPPORT (PASS)** |
| **Windows 11 / 10** | `x64`, `arm64` | `npm -g`, `npx`, `install.ps1` | PowerShell 7/5.1, Windows Terminal, CMD, Git Bash | **FULL SUPPORT (PASS)** |
| **WSL 2 / WSL 1 (Windows Subsystem for Linux)** | `x86_64`, `aarch64` | `npm -g`, `npx`, `install.sh` | Bash, Zsh, Fish | **FULL SUPPORT (PASS)** |
| **Replit Shell (MicroVM Container)** | `x86_64` | Native container pre-installed / `npm link` | Bash | **FULL SUPPORT (PASS)** |
| **Android (Termux)** | `aarch64`, `arm` | `npm -g`, `install.sh` | Bash, Zsh | **FULL SUPPORT (PASS)** |

---

## 2. Platform Feature Compatibility

| Feature Area | Linux | macOS | Windows (PowerShell/CMD) | WSL | Replit Container | Termux (Android) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Encrypted Vault Storage** | `~/.config/rsh` | `~/Library/Application Support/rsh` | `%APPDATA%\rsh` | `~/.config/rsh` | Container `$HOME/.config/rsh` | `~/.config/rsh` |
| **PTY Raw Mode & Terminal Resize** | ✔ Yes | ✔ Yes | ✔ Yes (VT100) | ✔ Yes | ✔ Yes | ✔ Yes |
| **Browser Session Bridge (`rsh bridge`)** | ✔ Yes | ✔ Yes | ✔ Yes | ✔ Yes | ✔ Yes (Loopback) | ✔ Yes (Loopback) |
| **PostgreSQL & SQLite Connectors** | ✔ Yes | ✔ Yes | ✔ Yes | ✔ Yes | ✔ Yes (`helium:5432`) | ✔ Yes |
| **Code Sync (`rsh push/pull`)** | ✔ Yes | ✔ Yes | ✔ Yes (CRLF auto) | ✔ Yes | ✔ Yes | ✔ Yes |
| **Autonomous AI Agent (`rsh agent`)** | ✔ Yes | ✔ Yes | ✔ Yes | ✔ Yes | ✔ Yes | ✔ Yes |
| **Shell Completions** | Bash/Zsh/Fish | Zsh/Bash/Fish | PowerShell/Bash | Bash/Zsh/Fish | Bash | Bash/Zsh |
| **System Diagnostics (`rsh doctor`)** | ✔ Yes | ✔ Yes | ✔ Yes | ✔ Yes | ✔ Yes | ✔ Yes |

---

## 3. Cross-Platform Path & Storage Directives

1. **Path Resolution**: `rsh` strictly avoids hardcoded `/` or `\` paths, leveraging Node.js `path.join()` and `path.sep`.
2. **Line Endings**: Stream handlers automatically normalize between `\r\n` (CRLF on Windows) and `\n` (LF on POSIX).
3. **Color Formatting**: Automatically detects VT100 / Windows ConEmu / ANSI 256-color support without leaking escape codes on legacy command prompts.
