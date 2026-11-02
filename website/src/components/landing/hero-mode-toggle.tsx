'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Terminal,
  ArrowRight,
  Check,
  Copy,
} from 'lucide-react';

export function HeroModeToggle() {
  const [veritasEnabled, setVeritasEnabled] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText('pip install veritas-ai');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      className="relative min-h-[92vh] bg-[#FAF9F6] text-[#14151A] overflow-hidden pt-20 pb-32 px-6"
    >
      {/* Concentric Cobalt Horizon Rings (Reference 1 Bottom Dome) */}
      <div
        className="pointer-events-none absolute left-1/2 -bottom-[420px] -translate-x-1/2 w-[1100px] h-[1100px] rounded-full bg-gradient-to-t from-[#0047FF]/35 via-[#1E5EFF]/15 to-transparent blur-2xl"
      />
      <div
        className="pointer-events-none absolute left-1/2 -bottom-[520px] -translate-x-1/2 w-[920px] h-[920px] rounded-full border border-[#1E5EFF]/25 shadow-[inset_0_12px_36px_rgba(255,255,255,0.85)] bg-gradient-to-b from-[#4B83FF]/25 to-[#0047FF]/45"
      />
      <div
        className="pointer-events-none absolute left-1/2 -bottom-[640px] -translate-x-1/2 w-[680px] h-[680px] rounded-full border border-white/60 shadow-[inset_0_10px_28px_rgba(255,255,255,0.95)] bg-gradient-to-b from-[#8AB4FF]/40 to-[#1E5EFF]/65"
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-black/5 shadow-sm mb-8">
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#1E5EFF] text-white">
            v2.0 Rust Core
          </span>
          <span className="text-xs font-medium text-[#4A5060]">
            17.9x faster native PDA masking (0.23 ms) &bull; 499 passing tests
          </span>
        </div>

        {/* Display Headline with Embedded 3D Cobalt Toggle */}
        <h1 className="text-4xl sm:text-6xl md:text-[4.25rem] font-extrabold tracking-tight leading-[1.08] max-w-4xl mb-6">
          Turn LLM{' '}
          <span
            className={
              veritasEnabled
                ? 'line-through decoration-[#7B8398]/50 text-[#7B8398]'
                : 'text-[#E11D48]'
            }
          >
            Guessing
          </span>{' '}
          <button
            onClick={() => setVeritasEnabled(!veritasEnabled)}
            aria-label="Toggle Veritas Solver Mode"
            className={`inline-flex items-center align-middle mx-2 p-1.5 w-20 sm:w-24 h-11 sm:h-13 rounded-full transition-colors duration-300 cursor-pointer shadow-inner ${
              veritasEnabled
                ? 'bg-gradient-to-r from-[#1E5EFF] to-[#0047FF] shadow-[0_10px_25px_-5px_rgba(30,94,255,0.55),inset_0_2px_4px_rgba(255,255,255,0.4)]'
                : 'bg-zinc-300 shadow-inner'
            }`}
          >
            <motion.span
              layout
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              className={`block w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md ${
                veritasEnabled ? 'ml-auto' : 'ml-0'
              }`}
            />
          </button>{' '}
          <span className="bg-gradient-to-r from-[#0047FF] to-[#1E5EFF] bg-clip-text text-transparent">
            Into Verified Truth
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-[#4A5060] max-w-2xl leading-relaxed mb-10">
          Pydantic ergonomics on the surface; dependency-free Rust theorem proving underneath.
          Veritas intercepts LLM logits in real time using Pushdown Automata, HC4/Affine interval
          contractors, Zero-DoF token splicing, and CDCL backjumping.
        </p>

        {/* Primary CTA Row + 1-Click pip install */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href="/docs/getting-started"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white bg-gradient-to-b from-[#2B68FF] to-[#0043F0] shadow-[0_14px_28px_-6px_rgba(20,78,255,0.45),inset_0_2px_3px_rgba(255,255,255,0.5)] hover:translate-y-[-2px] transition-transform"
          >
            Read the Docs <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={copyInstall}
            className="inline-flex items-center gap-3 px-5 py-3.5 rounded-full bg-white border border-black/10 text-sm font-mono text-[#14151A] shadow-sm hover:border-[#1E5EFF]/40 transition-colors cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-[#1E5EFF]" />
            <span>pip install veritas-ai</span>
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4 text-[#7B8398]" />
            )}
          </button>
        </div>

        {/* Live Split Card: Reference 2 Fluted Glass + Live Token Trace */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-black/10 bg-white shadow-[0_32px_64px_-16px_rgba(6,27,82,0.18)] text-left">
          {/* Left 7 Cols: Live Python Spec + Token Stream */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-[#0A0D14] text-slate-100 font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <span className="text-slate-400">
                portfolio_spec.py &rarr; DecodeEngine
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold ${
                  veritasEnabled
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {veritasEnabled
                  ? 'VERITAS NATIVE (0.23 ms/step)'
                  : 'STANDARD JSON MODE (UNVERIFIED)'}
              </span>
            </div>

            <pre className="text-slate-300 leading-relaxed overflow-x-auto mb-6">
{`@verified_schema
def valid_portfolio(p: Portfolio):
    require(sum(p.weights.values()) == 1.0, tol=1e-6)
    require(forall(p.weights.values(), lambda w: (0.05 <= w) & (w <= 0.50)))
    derive(p.expected_return == dot(p.weights, RETURNS))
    derive(p.sharpe_ratio == (p.expected_return - 0.04) / p.volatility)
    require(p.sharpe_ratio >= 0.65)`}
            </pre>

            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="text-xs text-slate-400 mb-2">Decoded JSON Stream:</div>
              <AnimatePresence mode="wait">
                {veritasEnabled ? (
                  <motion.div
                    key="veritas-on"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 space-y-1.5"
                  >
                    <div>
                      {`{"weights": {"AAPL": 0.40, "MSFT": 0.35, "NVDA": `}
                      <span
                        className="px-1.5 py-0.5 rounded bg-[#1E5EFF]/40 text-white font-semibold"
                        title="HC4 Contractor narrowed NVDA to [0.25, 0.25]"
                      >
                        0.25
                      </span>
                      {`},`}
                    </div>
                    <div className="text-emerald-400">
                      {` "expected_return": 0.1615, "volatility": 0.1892, "sharpe_ratio": 0.6422}`}
                      <span className="ml-2 inline-block px-2 py-0.5 text-[11px] rounded bg-emerald-500/20 text-emerald-300">
                        ⚡ 0-DoF Spliced (24 tokens, 0 LLM calls)
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="veritas-off"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200 space-y-1.5"
                  >
                    <div>
                      {`{"weights": {"AAPL": 0.50, "MSFT": 0.45, "NVDA": 0.30},`}
                    </div>
                    <div className="text-rose-400">
                      {` "expected_return": 0.2100, "volatility": 0.1400, "sharpe_ratio": 1.214}`}
                      <span className="ml-2 inline-block px-2 py-0.5 text-[11px] rounded bg-rose-500/20 text-rose-300">
                        ✗ Hallucinated: sum(weights) = 1.25 != 1.0
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right 5 Cols: Reference 2 Fluted Glass Interval Slicer */}
          <div className="lg:col-span-5 relative min-h-[420px] veritas-fluted-glass flex flex-col justify-between p-7 text-white">
            <div className="veritas-fluted-louvers" />
            <div className="relative z-10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-white/80">
              <span>Tier-1 HC4 + AF2</span>
              <span>3.9 &mu;s Prefix Bound</span>
            </div>

            <div className="relative z-10 my-auto py-6">
              <div className="text-xs font-mono uppercase tracking-widest text-white/75 mb-1">
                {veritasEnabled ? 'Active Contractor State' : 'Contractor Disabled'}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {veritasEnabled ? '100% Soundness' : 'Silent Math Failure'}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-white/85 leading-relaxed">
                {veritasEnabled
                  ? 'Every vertical louver represents an affine interval cut pruning illegal token prefixes before sampling.'
                  : 'Without interval contractors, JSON mode emits valid syntax that violates conservation laws.'}
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-white/20 text-left font-mono text-xs">
              <div>
                <div className="text-white/60">PDA Mask</div>
                <div className="font-semibold">
                  {veritasEnabled ? '0.23 ms' : 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-white/60">0-DoF Saved</div>
                <div className="font-semibold">
                  {veritasEnabled ? '24 tok' : '0 tok'}
                </div>
              </div>
              <div>
                <div className="text-white/60">Witness</div>
                <div className="font-semibold">
                  {veritasEnabled ? 'SHA-256' : 'None'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
