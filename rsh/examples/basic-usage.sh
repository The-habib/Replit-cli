#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLI="$DIR/../dist/cli/index.js"

echo "=== 1. Check Authenticated Identity ==="
node "$CLI" whoami

echo -e "\n=== 2. List Replit Projects ==="
node "$CLI" ls

echo -e "\n=== 3. Execute a Command Remotely ==="
node "$CLI" exec current "uname -a && uptime"

echo -e "\n=== 4. Ask AI Assistant a Question ==="
node "$CLI" ask "How do I optimize Node.js startup time?"
