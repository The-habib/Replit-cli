import React from 'react';
import { Check, X, Shield, Zap, Database, Terminal, Sparkles } from 'lucide-react';

interface RowItem {
  feature: string;
  category: string;
  replitValue: string;
  replitSubtext: string;
  localValue: string;
  localSubtext: string;
  isReplitWinner: boolean;
}

const COMPARISON_DATA: RowItem[] = [
  {
    feature: "Initial Dev Environment Provisioning",
    category: "Developer Velocity",
    replitValue: "< 1 Second",
    replitSubtext: "Pre-compiled Nix environment ready immediately in MicroVM container",
    localValue: "30 - 60 Minutes",
    localSubtext: "Manual brew/apt installs, node version mismatches, missing system headers",
    isReplitWinner: true
  },
  {
    feature: "Zero-Day Supply Chain Defense",
    category: "Security Fortress",
    replitValue: "24h Release Delay Firewall",
    replitSubtext: "Package Firewall proxy automatically blocks fresh malicious npm releases",
    localValue: "Zero Protection",
    localSubtext: "Immediate npm install of compromised 0-day packages exposes machine",
    isReplitWinner: true
  },
  {
    feature: "Production Relational Database",
    category: "Database Infrastructure",
    replitValue: "Instant Helium Postgres 16",
    replitSubtext: "Pre-connected on helium:5432 with Drizzle ORM pre-loaded",
    localValue: "Manual Docker Setup",
    localSubtext: "Must configure docker-compose, ports, volumes, and credentials",
    isReplitWinner: true
  },
  {
    feature: "Headless Browser & CJK Rendering",
    category: "Scraping & Visual QA",
    replitValue: "Pre-compiled Chromium 140",
    replitSubtext: "Includes full CJK international font rendering out of the box",
    localValue: "Heavy Driver Install",
    localSubtext: "Requires download of 300MB binaries + manual font packages",
    isReplitWinner: true
  },
  {
    feature: "SAST & Vulnerability Scanners",
    category: "Code Quality",
    replitValue: "Semgrep + OSV-Scanner",
    replitSubtext: "Pre-installed in Nix store for instant millisecond code audits",
    localValue: "Separate Licensing & Install",
    localSubtext: "Requires manual CLI installation and configuration",
    isReplitWinner: true
  },
  {
    feature: "Cryptographic Identity Service",
    category: "Microservice Auth",
    replitValue: "Replit STS (identityv2)",
    replitSubtext: "Mints RS256 JWT tokens programmatically via single CLI call",
    localValue: "Hardcoded API Keys",
    localSubtext: "High risk of leaking secrets in git repos or local environment files",
    isReplitWinner: true
  },
  {
    feature: "Multimedia Processing Stack",
    category: "Media Pipeline",
    replitValue: "FFmpeg 6.1 + Poppler + ImageMagick",
    replitSubtext: "Extract PDF text/images, transcode video/audio at native C speeds",
    localValue: "Missing Native Codecs",
    localSubtext: "Requires installing multiple native C dependencies and shared libraries",
    isReplitWinner: true
  }
];

export const ComparisonTable: React.FC = () => {
  return (
    <div className="w-full space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-xs font-mono">
                <th className="py-4 px-5 text-slate-400 font-semibold w-1/3">Core Capability</th>
                <th className="py-4 px-5 text-emerald-400 font-bold bg-emerald-950/20 border-x border-emerald-500/20 w-1/3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Replit Shell MicroVM</span>
                  </div>
                </th>
                <th className="py-4 px-5 text-slate-400 font-semibold w-1/3">Traditional Local Environment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  {/* Feature & Category */}
                  <td className="py-4 px-5 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">{row.category}</span>
                    <span className="font-bold text-slate-100 text-sm block">{row.feature}</span>
                  </td>

                  {/* Replit Shell Winner Column */}
                  <td className="py-4 px-5 bg-emerald-950/10 border-x border-emerald-500/20 space-y-1">
                    <div className="flex items-center space-x-2 text-emerald-300 font-bold text-sm">
                      <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{row.replitValue}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 pl-6 leading-relaxed">
                      {row.replitSubtext}
                    </p>
                  </td>

                  {/* Traditional Local Column */}
                  <td className="py-4 px-5 space-y-1 opacity-80">
                    <div className="flex items-center space-x-2 text-slate-400 font-medium text-sm">
                      <div className="p-1 rounded-full bg-slate-800 text-slate-500 shrink-0">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <span>{row.localValue}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                      {row.localSubtext}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
