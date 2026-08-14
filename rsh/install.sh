#!/usr/bin/env bash
# Production Installation Script for rsh (Replit Shell CLI)
set -e

echo "=== Installing rsh (Replit Shell CLI) ==="

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "1. Installing package dependencies..."
pnpm install

echo "2. Compiling TypeScript binary..."
npx tsc -p tsconfig.json

echo "3. Setting execution permissions..."
chmod +x dist/cli/index.js

echo "4. Linking binary into ~/.local/bin/rsh..."
mkdir -p "$HOME/.local/bin"
ln -sf "$DIR/dist/cli/index.js" "$HOME/.local/bin/rsh"

echo "5. Verifying installation..."
export PATH="$HOME/.local/bin:$PATH"
rsh whoami

echo -e "\n✔ rsh installed successfully! You can now run 'rsh' from anywhere."
