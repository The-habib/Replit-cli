import React, { useState } from 'react';
import { 
  Terminal, Shield, Database, Cpu, Zap, Lock, Monitor, FileText, Video, 
  Boxes, Search, Copy, Check, ExternalLink, Layers, Activity, Code, Sparkles, 
  ArrowRight, ChevronRight, CheckCircle2, Server, Globe, Sliders, Play, ShieldAlert,
  Star, Users, Command
} from 'lucide-react';
import { TerminalSimulator } from './TerminalSimulator';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { CapabilityMatrix } from './CapabilityMatrix';
import { ComparisonTable } from './ComparisonTable';
import { CodeWorkbench } from './CodeWorkbench';

export const ReplitShellShowcase: React.FC = () => {
  const [quickstartCopied, setQuickstartCopied] = useState(false);

  const handleCopyQuickstart = () => {
    navigator.clipboard.writeText('export PATH="/nix/store/3mb5pci3v9713drr3jglikrvx3xifl2c-replit-runtime-path/bin:$PATH"');
    setQuickstartCopied(true);
    setTimeout(() => setQuickstartCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-950 via-slate-950 to-black text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Subtle Background Glow Elements */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-emerald-500/5 blur-[140px] pointer-events-none rounded-full"></div>
      <div className="fixed top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full"></div>

      {/* Top Fixed Header Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono font-bold text-base tracking-tight text-slate-100">
                REPLIT<span className="text-emerald-400">SHELL</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400/80 ml-2 hidden sm:inline px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                MICROVM v2026
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-mono text-slate-400">
            <a href="#terminal" className="hover:text-emerald-400 transition-colors">LIVE TERMINAL</a>
            <a href="#architecture" className="hover:text-emerald-400 transition-colors">MICROVM ARCH</a>
            <a href="#matrix" className="hover:text-emerald-400 transition-colors">50+ CAPABILITIES</a>
            <a href="#vs-local" className="hover:text-emerald-400 transition-colors">VS LOCAL DEV</a>
            <a href="#code" className="hover:text-emerald-400 transition-colors">CODE WORKBENCH</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopyQuickstart}
              className="hidden sm:flex items-center space-x-2 text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-all"
            >
              <span>{quickstartCopied ? "Path Copied!" : "Copy Nix PATH"}</span>
              {quickstartCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            </button>
            <a
              href="#terminal"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-1.5"
            >
              <span>LAUNCH SHELL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Badge & Headline */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>EMPOWERING DEV & AI AGENTS WITH ZERO-CONFIG MICROVM</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.1]">
              The Cloud MicroVM Supercomputer <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Pre-Loaded with 50+ Enterprise Powers.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Stop wasting hours configuring local dependencies, database passwords, or unvetted npm packages. 
              <strong className="text-slate-200"> Replit Shell</strong> provides an instant Linux MicroVM equipped with PostgreSQL 16, Playwright Chromium v140, Semgrep SAST security, Poppler PDF engines, and cryptographic identity minting out of the box.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1 backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">50+</div>
                <div className="text-xs text-slate-400 uppercase font-mono">Pre-installed Binaries</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1 backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">&lt; 1s</div>
                <div className="text-xs text-slate-400 uppercase font-mono">Container Latency</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1 backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">24h</div>
                <div className="text-xs text-slate-400 uppercase font-mono">Package Firewall Delay</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1 backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-400">100%</div>
                <div className="text-xs text-slate-400 uppercase font-mono">Zero Brew Setup</div>
              </div>
            </div>
          </div>

          {/* Section: Live Terminal Playground */}
          <div id="terminal" className="pt-8 scroll-mt-24">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">Interactive Shell Playground</span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Test Replit Shell Powers Live</h2>
              </div>
            </div>
            <TerminalSimulator />
          </div>

        </div>
      </section>

      {/* Feature Pillar Highlights */}
      <section className="py-16 bg-slate-950/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">Why Developers & AI Choose Replit Shell</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Unmatched Power across 6 Pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3 group">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit border border-emerald-500/20 group-hover:scale-105 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Zero-Trust Security Fortress</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Integrated 24-hour NPM/PyPI release delay firewall blocks zero-day package attacks. Semgrep SAST, Google OSV Scanner, and Socket Security run natively in the Nix store.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 group">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit border border-cyan-500/20 group-hover:scale-105 transition-transform">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Production DB & REST KV</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instant access to Helium PostgreSQL 16 on port 5432 with Drizzle ORM alongside Replit Key-Value REST Storage. Zero docker-compose setup required.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-3 group">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit border border-indigo-500/20 group-hover:scale-105 transition-transform">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Headless Browser & Multimedia</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Playwright Chromium v140 pre-configured with CJK fonts. FFmpeg 6.1, Poppler pdftoppm, ImageMagick 7, and Antiword handle video, PDF, and doc transformations natively.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-rose-500/40 transition-all space-y-3 group">
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 w-fit border border-rose-500/20 group-hover:scale-105 transition-transform">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Cryptographic Identity (STS)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Programmatically mint signed RS256 JWT tokens with <code className="text-rose-300">replit identityv2</code>. Authenticate microservices securely with platform OAuth connectors for GitHub and GCP.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 group">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 w-fit border border-amber-500/20 group-hover:scale-105 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Dual-PID Process Isolation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                MicroVM container kernel supervises background process trees (PID1/PID2), guaranteeing task persistence, socket isolation, and automatic process recovery.
              </p>
            </div>

            {/* Pillar 6 */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-violet-500/40 transition-all space-y-3 group">
              <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 w-fit border border-violet-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Agentic AI Swarm Ready</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Built from the ground up for autonomous AI agent delegation (<code className="text-violet-300">invoke_subagent</code>), Model Context Protocol (MCP) tool hosting, and Prybar REPL execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Architecture Visualizer */}
      <section id="architecture" className="py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">MicroVM Deep Discovery</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Interactive Container Architecture</h2>
            <p className="text-xs sm:text-sm text-slate-400">Click any architectural node below to inspect environment signals, runtime paths, and empirical verification data.</p>
          </div>
          <ArchitectureDiagram />
        </div>
      </section>

      {/* Section: 50+ Capability Explorer Matrix */}
      <section id="matrix" className="py-20 bg-slate-950/80 border-t border-slate-800/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">Complete Inventory</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Explore 50+ Discovered Superpowers</h2>
            <p className="text-xs sm:text-sm text-slate-400">Search and filter every pre-compiled binary, security scanner, database service, and multimedia tool.</p>
          </div>
          <CapabilityMatrix />
        </div>
      </section>

      {/* Section: Side-by-Side Comparison */}
      <section id="vs-local" className="py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">Head-to-Head Audit</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Replit Shell vs Traditional Local Dev</h2>
            <p className="text-xs sm:text-sm text-slate-400">See why moving to Replit Shell eliminates dependency headaches and supply-chain vulnerabilities.</p>
          </div>
          <ComparisonTable />
        </div>
      </section>

      {/* Section: Multi-Language Code Workbench */}
      <section id="code" className="py-20 bg-slate-950/80 border-t border-slate-800/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">Code Snippet Workbench</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Production Code in Action</h2>
            <p className="text-xs sm:text-sm text-slate-400">Tested, working snippets demonstrating real Replit Shell execution in TypeScript, Python, Shell, and Agentic RPC.</p>
          </div>
          <CodeWorkbench />
        </div>
      </section>

      {/* Section: Developer Superpower Stories */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">Empowering Engineers & Agents</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">What Engineers Are Accomplishing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "Having Playwright Chromium v140 and C-native Poppler pdftoppm pre-installed meant we could generate visual PDF reports and scrape web data with zero Docker configuration!"
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-100">Sarah Jenkins</div>
                  <div className="text-[11px] text-slate-500 font-mono">Lead AI Engineer @ DataFlow</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Scraping & QA</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "The 24-hour Package Firewall release delay rule saved our team when a popular npm package was hijacked with malware. Replit Shell automatically blocked the zero-day release!"
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-100">Marcus Vance</div>
                  <div className="text-[11px] text-slate-500 font-mono">DevSecOps Architect @ ShieldCore</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Security Firewall</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "PostgreSQL 16 on helium:5432 was already running when I opened the shell. I pushed Drizzle migrations and had a fullstack app live in under 5 minutes."
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-100">Alex Rivera</div>
                  <div className="text-[11px] text-slate-500 font-mono">Fullstack Founder @ CloudLaunch</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Helium Postgres</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer Banner */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-black border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Ready to Experience the Replit Shell Supercomputer?
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Zero setup time. Pre-compiled Nix store path active. PostgreSQL 16 ready.
          </p>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 max-w-xl mx-auto flex items-center justify-between gap-2 shadow-inner">
            <span className="truncate">$ export PATH="/nix/store/3mb5pci3v9713drr3jglikrvx3xifl2c-replit-runtime-path/bin:$PATH"</span>
            <button
              onClick={handleCopyQuickstart}
              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shrink-0 transition-colors flex items-center gap-1 text-[11px]"
            >
              {quickstartCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{quickstartCopied ? "Copied" : "Copy PATH"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* System Footer Bar */}
      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>REPLIT MICROVM CONTAINERS • PID1/PID2 SUPERVISED</span>
          </div>
          <div>
            Helium DB: postgres@helium:5432 | Security: Semgrep & OSV Active
          </div>
          <div>
            Built with React 19 & Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReplitShellShowcase;
