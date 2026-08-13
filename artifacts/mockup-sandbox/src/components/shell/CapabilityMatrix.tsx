import React, { useState, useMemo } from 'react';
import { Search, Shield, Database, Video, Cpu, Network, Sparkles, Copy, Check, Terminal, ExternalLink, Code2, ChevronDown, ChevronUp } from 'lucide-react';
import { CAPABILITIES_DATA, TOP_COMBINATIONS, Capability } from './data/capabilitiesData';

export const CapabilityMatrix: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const categories = ['All', 'Security', 'Database', 'Media', 'AI & Agents', 'System & CLI', 'Network'];

  const filteredCapabilities = useMemo(() => {
    return CAPABILITIES_DATA.filter((cap) => {
      const matchesCategory = selectedCategory === 'All' || cap.category === selectedCategory;
      const matchesSearch = 
        cap.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cap.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cap.binaryOrPath.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cap.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Security': return <Shield className="w-4 h-4 text-amber-400" />;
      case 'Database': return <Database className="w-4 h-4 text-indigo-400" />;
      case 'Media': return <Video className="w-4 h-4 text-rose-400" />;
      case 'AI & Agents': return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case 'Network': return <Network className="w-4 h-4 text-violet-400" />;
      default: return <Cpu className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Controls Bar: Search & Category Chips */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 50+ capabilities (e.g. semgrep, postgres, ffmpeg, sts)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all font-mono"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>

          {/* Results Count Badge */}
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto">
            Showing <span className="text-emerald-400 font-bold">{filteredCapabilities.length}</span> of {CAPABILITIES_DATA.length} Capabilities
          </span>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {getCategoryIcon(cat)}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Capability Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCapabilities.map((cap) => {
          const isExpanded = expandedId === cap.id;

          return (
            <div
              key={cap.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-slate-900/90 border-emerald-500/40 shadow-xl shadow-emerald-950/20'
                  : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              {/* Header Row */}
              <div 
                onClick={() => setExpandedId(isExpanded ? null : cap.id)}
                className="p-4 cursor-pointer flex items-start justify-between gap-3 select-none"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0 mt-0.5">
                    {getCategoryIcon(cap.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800">
                        #{cap.id}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                        {cap.status}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {cap.category}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-100">{cap.name}</h3>
                    <div className="text-xs font-mono text-cyan-400/90 mt-0.5 truncate max-w-xs sm:max-w-md">
                      {cap.binaryOrPath}
                    </div>
                  </div>
                </div>

                <button className="text-slate-500 hover:text-slate-300 p-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Collapsible Content Body */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-slate-800/80 pt-3 space-y-3 bg-slate-950/40">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {cap.description}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">Architectural Impact</span>
                    <p className="text-xs text-slate-200 font-medium">{cap.impact}</p>
                  </div>

                  {/* Code Snippet Box */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Code2 className="w-3 h-3 text-cyan-400" /> Executive Command / Code Example:
                      </span>
                      <button
                        onClick={() => handleCopyCode(cap.id, cap.codeExample)}
                        className="text-[11px] font-mono text-slate-400 hover:text-emerald-400 flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-800"
                      >
                        {copiedId === cap.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        {copiedId === cap.id ? "Copied" : "Copy Code"}
                      </button>
                    </div>
                    <pre className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-emerald-300/90 border border-slate-800/80 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                      {cap.codeExample}
                    </pre>
                  </div>

                  {/* Filter Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {cap.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Top 4 Capability Combination Highlights */}
      <div className="pt-8 space-y-4 border-t border-slate-800">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-slate-100">Featured High-Impact Capability Combos</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOP_COMBINATIONS.map((combo) => (
            <div key={combo.id} className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  {combo.title}
                </h4>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {combo.tools.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                    {t}
                  </span>
                ))}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {combo.description}
              </p>

              <pre className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800 overflow-x-auto whitespace-pre-wrap">
                {combo.codeSnippet}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
