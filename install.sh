#!/usr/bin/env bash
# Universal 1-Command Installer for rsh (Replit Terminal CLI)
# Works on Linux, macOS, WSL, and Android (Termux)
set -e

echo -e "\033[1;34m=== Installing rsh (Universal Replit Terminal CLI) ===\033[0m"

INSTALL_DIR="$HOME/.rsh-cli"

if [ -f "./rsh/package.json" ]; then
  REPO_DIR="$(pwd)"
else
  echo "→ Downloading latest replit-cli repository..."
  if command -v git >/dev/null 2>&1; then
    if [ -d "$INSTALL_DIR" ]; then
      rm -rf "$INSTALL_DIR"
    fi
    git clone --depth 1 https://github.com/The-habib/replit-cli.git "$INSTALL_DIR"
    REPO_DIR="$INSTALL_DIR"
  else
    echo "Error: git is required to clone the repository. Please install git." >&2
    exit 1
  fi
fi

cd "$REPO_DIR"

if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is required (v18+). Please install Node.js first." >&2
  exit 1
fi

NODE_VER=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VER" -lt 18 ]; then
  echo "Error: Node.js v18 or higher is required. Found Node.js $(node -v)." >&2
  exit 1
fi

if command -v pnpm >/dev/null 2>&1; then
  PM="pnpm"
elif command -v npm >/dev/null 2>&1; then
  PM="npx pnpm"
else
  echo "Error: npm or pnpm is required to build rsh." >&2
  exit 1
fi

echo "→ Installing dependencies..."
cd "$REPO_DIR/rsh"
$PM install

echo "→ Building TypeScript binary..."
$PM run build

chmod +x "$REPO_DIR/rsh/dist/cli/index.js"

if command -v termux-fix-shebang >/dev/null 2>&1; then
  echo "→ Applying Termux shebang fix..."
  termux-fix-shebang "$REPO_DIR/rsh/dist/cli/index.js"
fi

if [ -n "$PREFIX" ] && [ -d "$PREFIX/bin" ]; then
  TARGET_BIN_DIR="$PREFIX/bin"
elif [ -w "/usr/local/bin" ]; then
  TARGET_BIN_DIR="/usr/local/bin"
else
  TARGET_BIN_DIR="$HOME/.local/bin"
  mkdir -p "$TARGET_BIN_DIR"
fi

echo "→ Linking binaries ('rsh' and 'replit-cli') into $TARGET_BIN_DIR..."
ln -sf "$REPO_DIR/rsh/dist/cli/index.js" "$TARGET_BIN_DIR/rsh"
ln -sf "$REPO_DIR/rsh/dist/cli/index.js" "$TARGET_BIN_DIR/replit-cli"

if command -v termux-fix-shebang >/dev/null 2>&1; then
  termux-fix-shebang "$TARGET_BIN_DIR/rsh" 2>/dev/null || true
  termux-fix-shebang "$TARGET_BIN_DIR/replit-cli" 2>/dev/null || true
fi

if [[ ":$PATH:" != *":$TARGET_BIN_DIR:"* ]]; then
  echo "→ Adding $TARGET_BIN_DIR to PATH in shell profile..."
  SHELL_PROFILE=""
  if [ -n "$ZSH_VERSION" ] || [ -f "$HOME/.zshrc" ]; then
    SHELL_PROFILE="$HOME/.zshrc"
  elif [ -f "$HOME/.bashrc" ]; then
    SHELL_PROFILE="$HOME/.bashrc"
  elif [ -f "$HOME/.profile" ]; then
    SHELL_PROFILE="$HOME/.profile"
  fi

  if [ -n "$SHELL_PROFILE" ]; then
    if ! grep -q "$TARGET_BIN_DIR" "$SHELL_PROFILE" 2>/dev/null; then
      echo "export PATH=\"$TARGET_BIN_DIR:\$PATH\"" >> "$SHELL_PROFILE"
    fi
  fi
  export PATH="$TARGET_BIN_DIR:$PATH"
fi

echo -e "\033[1;32m→ Running rsh System Diagnostics...\033[0m"
rsh doctor

echo -e "\n\033[1;32m✔ rsh successfully installed! You can now run 'rsh' or 'replit-cli' from any terminal.\033[0m"
