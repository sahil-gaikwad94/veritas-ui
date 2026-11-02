'use client';

import { motion } from 'framer-motion';
import { Database, Shield, Zap, Network, Code, Brain } from 'lucide-react';

const cartridges = [
  {
    name: 'quant',
    label: 'Quantitative Finance',
    desc: 'Portfolio simplex, Cholesky covariance, Black-Scholes, VaR',
    icon: <Database className="w-5 h-5" />,
    color: 'border-cobalt-500/30 bg-cobalt-500/10 text-cobalt-700',
  },
  {
    name: 'sql',
    label: 'Text-to-SQL Safety',
    desc: 'Catalog-aware schema alignment, FK validation, injection blocking',
    icon: <Shield className="w-5 h-5" />,
    color: 'border-cobalt-400/30 bg-cobalt-400/10 text-cobalt-600',
  },
  {
    name: 'sec',
    label: 'Security & IAM',
    desc: 'Cloud RBAC least-privilege policies & tool-call guardrails',
    icon: <Shield className="w-5 h-5" />,
    color: 'border-cobalt-600/30 bg-cobalt-600/10 text-cobalt-500',
  },
  {
    name: 'or_sched',
    label: 'Operations Research',
    desc: 'Job-shop scheduling, capacity bounds, non-overlap logic',
    icon: <Zap className="w-5 h-5" />,
    color: 'border-cobalt-700/30 bg-cobalt-700/10 text-cobalt-600',
  },
  {
    name: 'chem',
    label: 'Chemistry (SMILES)',
    desc: 'Molecular parser, valence limits, formal charge',
    icon: <Brain className="w-5 h-5" />,
    color: 'border-cobalt-500/30 bg-cobalt-500/10 text-cobalt-500',
  },
  {
    name: 'phys',
    label: 'Physics',
    desc: 'SI dimensional analysis Q⁷ & conservation laws',
    icon: <Network className="w-5 h-5" />,
    color: 'border-cobalt-400/30 bg-cobalt-400/10 text-cobalt-400',
  },
  {
    name: 'stat',
    label: 'Statistics',
    desc: 'Probability simplexes, confidence intervals, moment constraints',
    icon: <BarChartIcon className="w-5 h-5" />,
    color: 'border-cobalt-600/30 bg-cobalt-600/10 text-cobalt-600',
  },
  {
    name: 'code',
    label: 'Code Analysis & Synthesis',
    desc: 'AST complexity limits, forbidden node detection, grammar-safe synthesis',
    icon: <Code className="w-5 h-5" />,
    color: 'border-cobalt-700/30 bg-cobalt-700/10 text-cobalt-700',
  },
];

const bridges = [
  { name: 'vLLM', label: 'vLLM Adapter' },
  { name: 'SGLang', label: 'SGLang Adapter' },
  { name: 'llama.cpp', label: 'llama.cpp Adapter' },
  { name: 'Outlines', label: 'Outlines Adapter' },
  { name: 'Guidance', label: 'Guidance Adapter' },
  { name: 'LMQL', label: 'LMQL Adapter' },
  { name: 'Pydantic', label: 'Pydantic Bridge' },
];

function BarChartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 3v18h18" />
      <path d="M5 5h4" />
      <path d="M5 9h7" />
      <path d="M5 13h10" />
    </svg>
  );
}

export function CartridgeFloatingGrid() {
  return (
    <section className="py-24 px-6 bg-[#FAF9F6] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14151A] mb-4">
            9 Domain Cartridges &bull; 7 Runtime Bridges
          </h2>
          <p className="text-lg text-[#4A5060] max-w-2xl mx-auto leading-relaxed">
            Composable constraint modules for every domain, with drop-in adapters for
            every inference engine.
          </p>
        </div>

        {/* Cartridge Grid */}
        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-20 perspective-1000">
          {cartridges.map((cartridge, i) => (
            <motion.div
              key={cartridge.name}
              whileHover={{ y: -8, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
              style={{ transform: `rotateY(${i % 2 === 0 ? -5 : 5}deg)` }}
            >
              <div
                className={`veritas-cobalt-squircle p-6 flex flex-col items-center text-center h-48 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 mb-4">
                  {cartridge.icon}
                </div>
                <div className={`text-xs font-mono uppercase tracking-wider font-semibold mb-2 ${cartridge.color}`}>
                  {cartridge.label}
                </div>
                <p className="text-[10px] text-white/70 leading-tight text-center px-2">
                  {cartridge.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bridges Strip */}
        <div className="flex flex-wrap justify-center gap-4">
          <span className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-6 block w-full text-center">
            Runtime Bridges
          </span>
          {bridges.map((bridge) => (
            <motion.div
              key={bridge.name}
              whileHover={{ scale: 1.05 }}
              className="px-5 py-2.5 rounded-full border border-border-subtle bg-white text-xs font-mono text-ink-secondary hover:border-cobalt-500 hover:text-cobalt-500 transition-all"
            >
              {bridge.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
