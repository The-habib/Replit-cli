import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, Play, FileCode, Shield, Database, Sparkles } from 'lucide-react';

interface CodeTab {
  id: string;
  label: string;
  language: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  code: string;
  simulatedOutput: string[];
}

const CODE_TABS: CodeTab[] = [
  {
    id: 'fullstack',
    label: 'TypeScript & Helium DB',
    language: 'typescript',
    icon: Database,
    description: 'Connect directly to Helium PostgreSQL 16 using Drizzle ORM while leveraging Replit KV REST API for state caching.',
    code: `// server.ts - Native Node 24 + Helium PostgreSQL 16 + Replit KV API
import express from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const app = express();
app.use(express.json());

// 1. Preconfigured Helium Serverless Postgres
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

// 2. Instant Replit Key-Value REST Storage Access
async function getCachedSession(sessionId: string) {
  const kvRes = await fetch(\`\${process.env.REPLIT_DB_URL}/\${sessionId}\`);
  return kvRes.ok ? await kvRes.text() : null;
}

app.get('/api/user/:id', async (req, res) => {
  const session = await getCachedSession(req.params.id);
  res.json({ status: 'active', session, database: 'Helium Postgres 16' });
});

app.listen(5000, () => console.log('⚡ Express 5 server active on port 5000'));`,
    simulatedOutput: [
      "[INFO] Starting Express 5 microservice on port 5000...",
      "PostgreSQL 16 connection established to host 'helium:5432'.",
      "REPLIT_DB_URL key-value REST endpoint verified.",
      "✔ HTTP 200 GET /api/user/session_9921 -> Response latency 0.8ms"
    ]
  },
  {
    id: 'python-media',
    label: 'Python 3.13 & Media Pipeline',
    language: 'python',
    icon: FileCode,
    description: 'Execute Playwright web scraping alongside C-native FFmpeg and Poppler image rendering in Python 3.13.',
    code: `# media_processor.py - Python 3.13 + Playwright + FFmpeg 6.1
import os
import subprocess
from playwright.sync_api import sync_playwright

def generate_report():
    print("⚡ Launching Playwright Chromium v140 (CJK Enabled)...")
    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path=os.environ.get("REPLIT_PLAYWRIGHT_CHROMIUM_EXECUTABLE")
        )
        page = browser.new_page()
        page.goto("https://replit.com")
        page.pdf(path="report.pdf")
        browser.close()
        
    print("✔ Extracted PDF. Converting pages using Poppler pdftoppm...")
    subprocess.run(["pdftoppm", "-png", "-r", "150", "report.pdf", "page"])
    
    print("✔ Transcoding video demo with FFmpeg 6.1...")
    subprocess.run(["ffmpeg", "-y", "-i", "demo.mp4", "preview.webp"])
    print("✔ Media pipeline complete!")

if __name__ == "__main__":
    generate_report()`,
    simulatedOutput: [
      "⚡ Launching Playwright Chromium v140 (CJK Enabled)...",
      "Saved PDF to report.pdf (1.4 MB).",
      "✔ Extracted PDF. Converting pages using Poppler pdftoppm...",
      "  Extracted page-1.png (150 DPI)",
      "✔ Transcoding video demo with FFmpeg 6.1...",
      "✔ Media pipeline complete in 2.8s!"
    ]
  },
  {
    id: 'security-bash',
    label: 'Zero-Trust Security (Bash)',
    language: 'bash',
    icon: Shield,
    description: 'Run Semgrep SAST code audits, OSV vulnerability checks, and STS token identity minting directly from shell scripts.',
    code: `#!/usr/bin/env bash
# security_audit.sh - Zero-Trust CI Security Verification
set -euo pipefail

export PATH="/nix/store/3mb5pci3v9713drr3jglikrvx3xifl2c-replit-runtime-path/bin:$PATH"

echo "=== 1. SAST Static Security Scan ==="
semgrep --config p/ci .

echo "=== 2. Dependency Vulnerability Audit ==="
osv-scanner -r .

echo "=== 3. Mint Cryptographic STS Identity Token ==="
TOKEN=$(/nix/store/*-replit-cli-*/bin/replit identityv2 create --audience microservice-grid)
echo "Minted Signed RS256 JWT Token:"
echo "$TOKEN" | cut -c 1-50...

echo "=== 4. Replit Package Firewall Verification ==="
npm config get registry`,
    simulatedOutput: [
      "=== 1. SAST Static Security Scan ===",
      "  ✔ 0 Vulnerabilities found across 42 source files.",
      "=== 2. Dependency Vulnerability Audit ===",
      "  ✔ 0 CVE security risks detected in package manifests.",
      "=== 3. Mint Cryptographic STS Identity Token ===",
      "  Minted Signed RS256 JWT Token: eyJhbGciOiJSUzI1NiIsImtpZCI6InJlcGxpdC1z...",
      "=== 4. Replit Package Firewall Verification ===",
      "  http://package-firewall.replit.local/npm/ (24h Delay Rule Active)"
    ]
  },
  {
    id: 'subagents',
    label: 'AI Multi-Agent RPC',
    language: 'typescript',
    icon: Sparkles,
    description: 'Spawn parallel autonomous background subagents with isolated workspaces using the native invoke_subagent protocol.',
    code: `// agent_orchestrator.ts - Autonomous Multi-Agent Mesh
import { invoke_subagent } from '@replit/agents-sdk';

async function launchSecurityAuditTeam() {
  console.log("⚡ Spawning autonomous research & security subagents...");

  // 1. Research Subagent (Codebase Exploration)
  const researchAgent = await invoke_subagent({
    TypeName: "research",
    Role: "Codebase Security Researcher",
    Prompt: "Audit all REST endpoints for input validation and database query safety."
  });

  // 2. Self Subagent (Parallel Fix Execution)
  const patchAgent = await invoke_subagent({
    TypeName: "self",
    Role: "Automated Patching Engineer",
    Prompt: "Update package manifests and apply security patches automatically."
  });

  console.log("Subagents launched with Conversation IDs:");
  console.log("  Research:", researchAgent.conversationId);
  console.log("  Patching:", patchAgent.conversationId);
}`,
    simulatedOutput: [
      "⚡ Spawning autonomous research & security subagents...",
      "Subagents launched with Conversation IDs:",
      "  Research: subagent-conv-8842-a9b",
      "  Patching: subagent-conv-8842-c11",
      "✔ Background tasks running asynchronously in isolated workspaces."
    ]
  }
];

export const CodeWorkbench: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState('fullstack');
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const activeTab = CODE_TABS.find(t => t.id === activeTabId) || CODE_TABS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setShowOutput(false);
    setTimeout(() => {
      setIsSimulating(false);
      setShowOutput(true);
    }, 500);
  };

  return (
    <div className="w-full space-y-4">
      {/* Code Tabs Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CODE_TABS.map((tab) => {
          const IconComp = tab.icon;
          const isActive = tab.id === activeTabId;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTabId(tab.id);
                setShowOutput(false);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-md'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <IconComp className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Code Frame Box */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        {/* Code Bar */}
        <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono text-slate-300">{activeTab.description}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5"
            >
              <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? 'Executing...' : 'Run Snippet'}</span>
            </button>
            <button
              onClick={handleCopy}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors text-xs flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="font-mono text-xs">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Code Lines */}
        <div className="p-4 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed bg-slate-950/90">
          <pre className="whitespace-pre text-emerald-300/90">
            {activeTab.code}
          </pre>
        </div>

        {/* Simulated Terminal Output Box */}
        {(showOutput || isSimulating) && (
          <div className="p-4 border-t border-slate-800 bg-slate-900/80 space-y-2 font-mono text-xs">
            <div className="flex items-center space-x-2 text-slate-400 text-[11px] uppercase font-bold tracking-wider">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Simulated Replit MicroVM Execution Result:</span>
            </div>
            {isSimulating ? (
              <div className="text-slate-400 animate-pulse">Running in Nix container environment...</div>
            ) : (
              <div className="space-y-1 text-slate-300 border-l-2 border-emerald-500/40 pl-3">
                {activeTab.simulatedOutput.map((out, idx) => (
                  <div key={idx} className={out.includes('✔') ? 'text-emerald-400 font-semibold' : 'text-slate-300'}>
                    {out}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
