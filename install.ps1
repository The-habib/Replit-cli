# Universal Windows PowerShell Installer for rsh (Replit Shell CLI)
# Usage: irm https://raw.githubusercontent.com/The-habib/replit-cli/main/install.ps1 | iex

$ErrorActionPreference = "Stop"

Write-Host "=== Installing rsh (Replit Shell CLI) for Windows ===" -ForegroundColor Cyan

# 1. Check Node.js
if (-not (Get-Command "node" -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js is required to run rsh. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
}

# 2. Check npm / pnpm
Write-Host "Installing rsh CLI globally..." -ForegroundColor Yellow
if (Get-Command "pnpm" -ErrorAction SilentlyContinue) {
    pnpm add --global rsh
} else {
    npm install -g https://github.com/The-habib/replit-cli.git
}

Write-Host "`n✔ rsh successfully installed!" -ForegroundColor Green
Write-Host "Run 'rsh doctor' or 'rsh login' to get started." -ForegroundColor Cyan
