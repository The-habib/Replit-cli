import React, { useState, useRef, useEffect } from 'react';
import { Play, Copy, Check, RefreshCw, Terminal as TerminalIcon, Cpu, Shield, Database, Activity, Code2, Server } from 'lucide-react';

interface PresetCommand {
  label: string;
  cmd: string;
  category: 'security' | 'db' | 'media' | 'sts' | 'system';
  output: string[];
}

const PRESET_COMMANDS: PresetCommand[] = [
  {
    label: "Mint STS RS256 JWT Token",
    cmd: "replit identityv2 create --audience api.internal.mesh",
    category: "sts",
    output: [
      "[INFO] Executing Security Token Service (STS) RS256 identity minting...",
      "Signing identity request with platform key REPL_IDENTITY_KEY...",
      "HTTP 200 OK -> https://sts.replit.com/v2/token",
      "",
      "\x1b[32m✔ RS256 JWT Token Created Successfully:\x1b[0m",
      "eyJhbGciOiJSUzI1NiIsImtpZCI6InJlcGxpdC1zdHMtMjAyNiJ9.eyJzYW5kYm94X2lkIjoiNmVhMmR...[TRUNCATED]",
      "",
      "Claims Verified:",
      "  - issuer: https://sts.replit.com",
      "  - audience: api.internal.mesh",
      "  - sandbox_id: microvm-replit-node-24",
      "  - repl_id: 3960df96-02d3-477a-ba04-0647a0f2da89"
    ]
  },
  {
    label: "Semgrep SAST Security Sweep",
    cmd: "semgrep --config p/ci .",
    category: "security",
    output: [
      "\x1b[36m⚡ Running Semgrep SAST v1.152.0 across workspace...\x1b[0m",
      "Using Nix Store runtime: /nix/store/3mb5pci3v9713drr3jglikrvx3xifl2c-replit-runtime-path/bin/semgrep",
      "",
      "Analyzing 42 files across TypeScript, Python, and SQL...",
      "  [1/42] src/server.ts ........................... PASSED",
      "  [2/42] lib/db.ts ................................ PASSED (Helium DB safe connection)",
      "  [3/42] scripts/security-audit.sh ................ PASSED",
      "",
      "\x1b[32m✔ 0 High Severity Vulnerabilities Found.\x1b[0m",
      "✔ 0 Hardcoded Secrets Found (Replit OAuth Connectors active).",
      "✔ Supply-chain verification complete."
    ]
  },
  {
    label: "Helium Serverless Postgres Status",
    cmd: "psql $DATABASE_URL -c 'SELECT version(), current_database();'",
    category: "db",
    output: [
      "[INFO] Connecting to Helium PostgreSQL 16 on IP 172.24.0.3:5432...",
      "SSL Connection: Enabled (TLS v1.3)",
      "",
      "                                       version                                       | current_database ",
      "-------------------------------------------------------------------------------------+------------------",
      " PostgreSQL 16.2 (Ubuntu 16.2-1.pgdg22.04+1) on x86_64-pc-linux-gnu, 64-bit | heliumdb",
      "(1 row)",
      "",
      "\x1b[32m✔ Database Status: HEALTHY | Active Connections: 2 | Latency: 0.4ms\x1b[0m"
    ]
  },
  {
    label: "Poppler PDF to Image + FFmpeg Transcode",
    cmd: "pdftoppm -png -r 150 doc.pdf page && ffmpeg -i video.mp4 output.webp",
    category: "media",
    output: [
      "[INFO] Initializing C-native Poppler PDF Page Extraction...",
      "Extracted 4 PDF pages -> page-1.png, page-2.png, page-3.png, page-4.png (150 DPI).",
      "",
      "[INFO] Invoking FFmpeg 6.1.2 Video Transcoder...",
      "Input #0, mov,mp4,m4a, from 'video.mp4': Duration 00:00:12.4, bitrate: 4500 kb/s",
      "Output #0, webp, to 'output.webp': 60 fps animated WebP target",
      "frame=  744 fps=182 q=-0.0 Lsize=    1420kB time=00:00:12.40 bitrate= 938.1kbits/s",
      "",
      "\x1b[32m✔ Transcode complete in 4.12s. File reduction: -68.4%\x1b[0m"
    ]
  },
  {
    label: "NPM Package Firewall Proxy Status",
    cmd: "npm config get registry && socket audit",
    category: "security",
    output: [
      "Current NPM Registry:",
      "\x1b[36mhttp://package-firewall.replit.local/npm/\x1b[0m",
      "",
      "[SECURITY RULE ACTIVE] minimumReleaseAge: 1440 mins (24 Hours)",
      "Checking zero-day release queue...",
      "  - @replit/connectors-sdk ......... ALLOWED (Platform trusted)",
      "  - express@5.2.1 .................. ALLOWED (Age: 14 days)",
      "  - vitest@4.1.10 .................. ALLOWED (Age: 8 days)",
      "",
      "\x1b[32m✔ Package Firewall Active: Zero-day npm supply-chain attacks automatically blocked.\x1b[0m"
    ]
  }
];

export const TerminalSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'telemetry' | 'pid'>('terminal');
  const [commandHistory, setCommandHistory] = useState<Array<{ cmd: string; output: string[] }>>([
    {
      cmd: "replit identityv2 create --audience api.internal.mesh",
      output: PRESET_COMMANDS[0].output
    }
  ]);
  const [inputCmd, setInputCmd] = useState('');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commandHistory]);

  const executeCommand = (cmdText: string, customOutput?: string[]) => {
    if (!cmdText.trim()) return;
    setIsRunning(true);

    let output = customOutput;
    if (!output) {
      const match = PRESET_COMMANDS.find(p => p.cmd.toLowerCase() === cmdText.toLowerCase() || cmdText.includes(p.category));
      if (match) {
        output = match.output;
      } else {
        output = [
          `[SHELL EXEC] Executing '${cmdText}' in Replit MicroVM container...`,
          `Path pre-loaded: /nix/store/3mb5pci3v9713drr3jglikrvx3xifl2c-replit-runtime-path/bin`,
          `\x1b[32m✔ Command executed with status code 0.\x1b[0m`,
          `Result logged to microvm event stream.`
        ];
      }
    }

    setTimeout(() => {
      setCommandHistory(prev => [...prev, { cmd: cmdText, output: output! }]);
      setIsRunning(false);
      setInputCmd('');
    }, 300);
  };

  const handleCopyAll = () => {
    const text = commandHistory.map(item => `$ ${item.cmd}\n${item.output.join('\n')}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setCommandHistory([]);
  };

  return (
    <div className="w-full rounded-2xl border border-emerald-500/20 bg-slate-950/90 shadow-2xl shadow-emerald-950/30 overflow-hidden backdrop-blur-xl transition-all hover:border-emerald-500/40">
      {/* Top Window Bar */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-sm"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-sm"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm"></span>
          </div>
          <span className="text-xs font-mono text-slate-400 pl-2 flex items-center gap-1.5 border-l border-slate-800">
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
            replit-microvm-shell -- bash (nix-store v24)
          </span>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'terminal' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Shell
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'telemetry' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Telemetry & Nix
          </button>
          <button
            onClick={() => setActiveTab('pid')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'pid' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            PID1 / PID2 Supervision
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyAll}
            className="p-1.5 rounded-md text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
            title="Copy Terminal Logs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>
          <button
            onClick={handleClear}
            className="p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors text-xs"
            title="Clear Terminal"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Preset Quick Execution Pills */}
      <div className="px-4 py-2.5 bg-slate-900/50 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 flex items-center gap-1 shrink-0">
          <Play className="w-3 h-3 text-emerald-400" /> Try Power Command:
        </span>
        {PRESET_COMMANDS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => executeCommand(preset.cmd, preset.output)}
            className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-emerald-950/60 hover:text-emerald-300 border border-slate-700/60 hover:border-emerald-500/40 text-slate-300 font-mono transition-all flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            {preset.label}
          </button>
        ))}
      </div>

      {/* Terminal Viewport */}
      {activeTab === 'terminal' && (
        <div className="p-4 font-mono text-xs sm:text-sm h-[380px] overflow-y-auto space-y-4 bg-slate-950/95 scrollbar-thin scrollbar-thumb-slate-800">
          <div className="text-slate-500 text-xs leading-relaxed border-b border-slate-900 pb-3">
            <div>Replit Cloud MicroVM Environment v2026.8 [Linux x86_64]</div>
            <div>Type any command or click a power preset above to execute with zero setup.</div>
          </div>

          {commandHistory.map((item, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center space-x-2 text-emerald-400">
                <span className="text-cyan-400 font-semibold">runner@replit-microvm:~/workspace$</span>
                <span className="text-slate-100 font-medium">{item.cmd}</span>
              </div>
              <div className="pl-4 text-slate-300 whitespace-pre-wrap leading-relaxed space-y-0.5 border-l-2 border-slate-800">
                {item.output.map((line, lIdx) => {
                  const isSuccess = line.includes('✔') || line.includes('PASSED') || line.includes('SUCCESS');
                  const isWarn = line.includes('[SECURITY') || line.includes('INFO');
                  const isPath = line.includes('/nix/store') || line.includes('http');
                  
                  return (
                    <div
                      key={lIdx}
                      className={
                        isSuccess ? 'text-emerald-400 font-semibold' :
                        isWarn ? 'text-cyan-300' :
                        isPath ? 'text-amber-300/90' : 'text-slate-300'
                      }
                    >
                      {line}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {isRunning && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              <span>Executing binary from Nix Store...</span>
            </div>
          )}

          <div ref={terminalEndRef} />

          {/* Interactive Shell Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeCommand(inputCmd);
            }}
            className="flex items-center space-x-2 pt-2 border-t border-slate-900"
          >
            <span className="text-cyan-400 font-semibold shrink-0">runner@replit-microvm:~/workspace$</span>
            <input
              type="text"
              value={inputCmd}
              onChange={(e) => setInputCmd(e.target.value)}
              placeholder="e.g. semgrep --config auto .  or  replit identityv2 create"
              className="flex-1 bg-transparent text-slate-100 outline-none font-mono text-xs sm:text-sm placeholder:text-slate-600 focus:ring-0"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 rounded text-xs font-mono font-medium transition-colors"
            >
              Run
            </button>
          </form>
        </div>
      )}

      {/* Telemetry & Nix Tab */}
      {activeTab === 'telemetry' && (
        <div className="p-6 h-[380px] overflow-y-auto bg-slate-950/95 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Nix System Path</span>
                <Server className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xs font-mono text-emerald-300 break-all bg-slate-950 p-2 rounded border border-slate-800">
                /nix/store/3mb5pci3v9713drr3jglikrvx3xifl2c-replit-runtime-path/bin
              </div>
              <p className="text-[11px] text-slate-400">Pre-compiled system binaries: semgrep, osv-scanner, ffmpeg, pdftoppm, antiword, rg, sd, upm.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Helium PostgreSQL 16</span>
                <Database className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-sm font-semibold text-slate-100">IP: 172.24.0.3:5432</div>
              <div className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                ACTIVE | Serverless Postgres
              </div>
              <p className="text-[11px] text-slate-400">Zero-config DB connection preconfigured for Drizzle & Prisma ORMs.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Package Firewall Proxy</span>
                <Shield className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xs font-mono text-amber-300 bg-slate-950 p-2 rounded border border-slate-800">
                http://package-firewall.replit.local
              </div>
              <p className="text-[11px] text-slate-400">Enforces 24-hour npm release delay rule to block zero-day malware packages.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-400 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> Active System Environment Signals
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-2 bg-slate-950 rounded border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">NODE_VERSION</span>
                <span className="text-slate-200">v24.x (ESM Native)</span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">PYTHON_VERSION</span>
                <span className="text-slate-200">3.13 (Venv active)</span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">PLAYWRIGHT_CHROMIUM</span>
                <span className="text-emerald-400">v140 (CJK Enabled)</span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">REPLIT_DEV_DOMAIN</span>
                <span className="text-cyan-400 truncate block">pike.replit.dev</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PID Supervision Tab */}
      {activeTab === 'pid' && (
        <div className="p-6 h-[380px] overflow-y-auto bg-slate-950/95 space-y-4">
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
            <Cpu className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-emerald-300">Dual-PID Process Supervision (pid1 & pid2)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Replit Shell runs inside a MicroVM container with PID1 init supervision. If a subservice crashes, PID supervisor automatically restarts background processes without losing container state.
              </p>
            </div>
          </div>

          <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
            <div className="bg-slate-900 px-4 py-2 text-slate-400 border-b border-slate-800 grid grid-cols-5 font-semibold text-[11px]">
              <span>PID</span>
              <span>USER</span>
              <span>STAT</span>
              <span>COMMAND</span>
              <span>SUPERVISION</span>
            </div>
            <div className="divide-y divide-slate-900 text-slate-300">
              <div className="px-4 py-2.5 grid grid-cols-5 items-center">
                <span className="text-emerald-400 font-bold">1</span>
                <span>root</span>
                <span className="text-emerald-400">S+</span>
                <span>/sbin/pid1-init</span>
                <span className="text-xs text-emerald-400 font-semibold">CONTAINER INIT</span>
              </div>
              <div className="px-4 py-2.5 grid grid-cols-5 items-center">
                <span className="text-emerald-400 font-bold">2</span>
                <span>runner</span>
                <span className="text-emerald-400">S+</span>
                <span>pid2-supervisor</span>
                <span className="text-xs text-emerald-400 font-semibold">PROCESS MONITOR</span>
              </div>
              <div className="px-4 py-2.5 grid grid-cols-5 items-center">
                <span className="text-cyan-400">142</span>
                <span>postgres</span>
                <span className="text-emerald-400">S</span>
                <span>helium-postgres:5432</span>
                <span className="text-xs text-slate-400">AUTO-MANAGED</span>
              </div>
              <div className="px-4 py-2.5 grid grid-cols-5 items-center">
                <span className="text-cyan-400">308</span>
                <span>runner</span>
                <span className="text-emerald-400">S</span>
                <span>artifact-router :8000</span>
                <span className="text-xs text-slate-400">AUTO-MANAGED</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
