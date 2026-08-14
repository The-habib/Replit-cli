#!/usr/bin/env bash
# CI/CD Automation Example using rsh in GitHub Actions / GitLab CI

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLI="$DIR/../dist/cli/index.js"

# Supply authentication via secret environment variable
export REPLIT_TOKEN="${REPLIT_TOKEN:-mock-token}"
export RSH_MOCK_MODE="true"

echo "=== CI: Authenticating Runner ==="
node "$CLI" whoami --json

echo "=== CI: Creating Test Repl Container ==="
node "$CLI" new "CI Automated Build" --lang nodejs --private

echo "=== CI: Running Remote Tests ==="
node "$CLI" exec "ci-automated-build" "echo 'CI test suite passed successfully'"

echo "=== CI: Finished Pipeline ==="
