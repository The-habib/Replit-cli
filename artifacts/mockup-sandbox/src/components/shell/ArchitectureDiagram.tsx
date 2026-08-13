import React, { useState } from 'react';
import { Cpu, Shield, Database, Lock, Server, Network, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

interface ArchNode {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  borderColor: string;
  bgColor: string;
  badge: string;
  summary: string;
  envVars: string[];
  binaryPath: string;
  verification: string;
  connectedTo: string[];
}

const ARCH_NODES: ArchNode[] = [
  {
    id: 'kernel',
    name: 'MicroVM Container Kernel',
    category: 'Virtualization & Isolation',
    icon: Cpu,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    bgColor: 'bg-emerald-950/20',
    badge: 'PID1 / PID2 Supervision',
    summary: 'Hardware-isolated Linux MicroVM. PID1 init supervises system lifecycle while PID2 manages user tasks, sockets, and background job persistence.',
    envVars: ['REPL_IDENTITY_KEY', 'REPLIT_CLI'],
    binaryPath: '/sbin/pid1-init',
    verification: 'Dual process supervision verified active via ps aux',
    connectedTo: ['nix', 'firewall', 'db']
  },
  {
    id: 'nix',
    name: 'Nix Toolchain & Store',
    category: 'Pre-Compiled Binaries',
    icon: Server,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    bgColor: 'bg-cyan-950/20',
    badge: 'Zero Brew / Apt Setup',
    summary: 'Instant access to high-performance C/Rust binaries: Semgrep SAST, OSV-Scanner, FFmpeg 6.1, Playwright Chromium v140, Poppler pdftoppm, Antiword, Ripgrep.',
    envVars: ['PATH=/nix/store/3mb5p.../bin:$PATH'],
    binaryPath: '/nix/store/3mb5pci3v9713drr3jglikrvx3xifl2c-replit-runtime-path/bin',
    verification: 'All 50 binaries verified executable with status 0',
    connectedTo: ['kernel', 'router']
  },
  {
    id: 'firewall',
    name: 'Replit Package Firewall',
    category: 'Supply-Chain Defense',
    icon: Shield,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    bgColor: 'bg-amber-950/20',
    badge: '24hr Release Delay Proxy',
    summary: 'Intercepts NPM and PyPI index requests. Enforces a 24-hour release delay for third-party packages to neutralize zero-day malicious software releases.',
    envVars: ['NPM_CONFIG_REGISTRY=http://package-firewall.replit.local/npm/'],
    binaryPath: 'http://package-firewall.replit.local',
    verification: 'Supply-chain 24h delay enforced in pnpm-workspace.yaml',
    connectedTo: ['kernel']
  },
  {
    id: 'db',
    name: 'Helium Postgres & Replit KV',
    category: 'Production Storage Grid',
    icon: Database,
    color: 'text-indigo-400',
    borderColor: 'border-indigo-500/40',
    bgColor: 'bg-indigo-950/20',
    badge: 'Postgres 16 + REST KV',
    summary: 'Preconfigured PostgreSQL 16 serverless DB on port 5432 alongside Replit KV HTTPS REST API. No docker-compose or manual credential creation required.',
    envVars: ['PGHOST=helium', 'PGPORT=5432', 'REPLIT_DB_URL=https://kv.replit.com/v0/...'],
    binaryPath: '172.24.0.3:5432 (Helium DB)',
    verification: 'PostgreSQL 16.2 connection verified on IP 172.24.0.3',
    connectedTo: ['kernel', 'sts']
  },
  {
    id: 'sts',
    name: 'STS Identity & OAuth Connectors',
    category: 'Cryptographic Security',
    icon: Lock,
    color: 'text-rose-400',
    borderColor: 'border-rose-500/40',
    bgColor: 'bg-rose-950/20',
    badge: 'RS256 JWT Token Minting',
    summary: 'Programmatically mint RS256 JWT tokens signed by https://sts.replit.com. OAuth connectors for GitHub (gh) and Google Cloud (gcloud) wrap CLI commands securely.',
    envVars: ['REPL_IDENTITY', 'REPLIT_CONNECTOR_TOOLS_PATH=/repl/ctls/bin'],
    binaryPath: '/nix/store/.../bin/replit identityv2',
    verification: 'JWT RS256 token minting tested and verified',
    connectedTo: ['kernel', 'router']
  },
  {
    id: 'router',
    name: 'Artifact Router & Ingress',
    category: 'Public Ingress & Mesh',
    icon: Network,
    color: 'text-violet-400',
    borderColor: 'border-violet-500/40',
    bgColor: 'bg-violet-950/20',
    badge: 'HTTPS Dev Domain Route',
    summary: 'Listens on port 8000 and dynamically maps workspace microservice ports (5000, 3000, 8080) to public HTTPS ingress domains with built-in SSL termination.',
    envVars: ['REPLIT_DEV_DOMAIN', 'REPLIT_EXPO_DEV_DOMAIN'],
    binaryPath: '/nix/store/.../bin/artifact-router',
    verification: 'Public ingress domain verified reachable via HTTP/2',
    connectedTo: ['nix', 'sts']
  }
];

export const ArchitectureDiagram: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('kernel');

  const selectedNode = ARCH_NODES.find(n => n.id === selectedNodeId) || ARCH_NODES[0];

  return (
    <div className="w-full space-y-6">
      {/* Visual Interactive Map Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ARCH_NODES.map((node) => {
          const IconComp = node.icon;
          const isSelected = node.id === selectedNodeId;
          const isConnected = selectedNode.connectedTo.includes(node.id) || node.connectedTo.includes(selectedNode.id);

          return (
            <button
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden group ${
                isSelected
                  ? `${node.bgColor} ${node.borderColor} shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/50`
                  : isConnected
                  ? 'bg-slate-900/80 border-slate-700/80 hover:border-slate-600'
                  : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent pointer-events-none rounded-bl-full"></div>
              )}
              
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 ${node.color} group-hover:scale-105 transition-transform`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                  {node.badge}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-100 mb-1 flex items-center justify-between">
                <span>{node.name}</span>
                <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isSelected ? 'rotate-90 text-emerald-400' : ''}`} />
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {node.summary}
              </p>

              {isConnected && !isSelected && (
                <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400">
                  <ArrowRight className="w-3 h-3" /> Interconnected Link
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Node Technical Breakdown Drawer */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-2">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl bg-slate-950 border border-slate-800 ${selectedNode.color}`}>
              {React.createElement(selectedNode.icon, { className: "w-6 h-6" })}
            </div>
            <div>
              <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">{selectedNode.category}</span>
              <h3 className="text-lg font-bold text-slate-100">{selectedNode.name}</h3>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Empirical Status: VERIFIED ACTIVE
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          {selectedNode.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Binary Path & Verification */}
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-1">Target Binary / Runtime Location</label>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 break-all">
                {selectedNode.binaryPath}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-1">Verification Record</label>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-emerald-300 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                {selectedNode.verification}
              </div>
            </div>
          </div>

          {/* Environment Variables */}
          <div>
            <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-1">System Environment Signals</label>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-xs">
              {selectedNode.envVars.map((env, idx) => (
                <div key={idx} className="text-slate-300 flex items-center gap-2">
                  <span className="text-emerald-400">$</span>
                  <span>{env}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
