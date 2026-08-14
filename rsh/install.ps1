# Universal Windows PowerShell Installer for rsh (Replit Shell CLI)
# Usage: irm https://raw.githubusercontent.com/replit/rsh/main/install.ps1 | iex

$ErrorActionPreference = "Stop"

Write-Host "=== Installing rsh (Replit Shell CLI) for Windows ===" -ForegroundColor Cyan

# 1. Check Node.js
if (-not (Get-Command "node" -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js is required to run rsh. Please install Node.js 18+ from https://nodejs.org/"
}

# 2. Check npm
if (-not (Get-Command "npm" -ErrorAction SilentlyContinue)) {
    Write-Error "npm is required to install rsh."
}

Write-Host "Installing rsh globally via npm..." -ForegroundColor Yellow
npm install -g rsh

Write-Host "`n✔ rsh successfully installed!" -ForegroundColor Green
Write-Host "Run 'rsh doctor' or 'rsh login' to get started." -ForegroundColor Cyan
