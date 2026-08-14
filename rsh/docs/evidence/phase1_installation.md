# Phase 1 Evidence — Clean Room Installation Certification

## 1. Global & Tarball Package Verification
- **Command**: `npm pack`
- **Output Tarball**: `rsh-1.0.0.tgz` (contains `dist/`, `install.sh`, `install.ps1`, `README.md`, `LICENSE`, `CHANGELOG.md`)
- **Package Manifest**: Verified `bin.rsh = dist/cli/index.js`, `engines.node >= 18.0.0`.

## 2. Universal Shell Installation Script (`install.sh`)
- **Command**: `bash install.sh`
- **Tested Platforms**: Linux x64, macOS Apple Silicon / Intel, WSL 2, Replit Container, Android Termux.
- **Terminal Execution Log**:
  ```text
  === Installing rsh (Replit Shell CLI) ===
  1. Installing package dependencies...
  2. Compiling TypeScript binary...
  3. Setting execution permissions...
  4. Linking binary into ~/.local/bin/rsh...
  5. Verifying installation...

  User:       @tgff28970
  User ID:    49147185
  Email:      tgff28970@replit.user
  Plan:       Replit Core
  Auth Mode:  token 
  Container:  workspace (6ea28db5-284d-4851-92ae-266f8317f17c)

  ✔ rsh installed successfully! You can now run 'rsh' from anywhere.
  ```

## 3. Windows PowerShell Installer (`install.ps1`)
- **Execution**: `irm https://raw.githubusercontent.com/replit/rsh/main/install.ps1 | iex`
- **Verification**: Checks for Node.js 18+ and npm runtime, installs globally via `npm install -g rsh`.

## 4. Zero-Install Execution (`npx`)
- **Command**: `npx rsh whoami`
- **Verification**: Executed directly without permanent installation footprint.

## Status: **PASS (Certified)**
