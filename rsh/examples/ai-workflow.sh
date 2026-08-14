#!/usr/bin/env bash
# AI Assisted Development Workflow with rsh

set -e

WORK_DIR="/tmp/rsh-ai-demo-$(date +%s)"
mkdir -p "$WORK_DIR"
cd "$WORK_DIR"

echo "=== 1. Starting AI Workflow ==="
node /home/runner/workspace/rsh/dist/cli/index.js ask "How should I structure a modular express server?"

echo -e "\n=== 2. Launching Autonomous AI Agent ==="
node /home/runner/workspace/rsh/dist/cli/index.js agent "Create a high-performance HTTP server with health check"

echo -e "\n=== 3. Inspecting Generated Project Files ==="
ls -la "$WORK_DIR"
cat "$WORK_DIR/index.js"

echo -e "\n=== AI Workflow Completed ==="
