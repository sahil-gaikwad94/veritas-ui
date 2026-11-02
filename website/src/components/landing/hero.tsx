'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, AlertTriangle, Check, Play, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { heroStats, siteConfig } from '@/lib/site';
import { CopyCommand } from '@/components/site/copy-command';
import { cn } from '@/lib/utils';

type Mode = 'json' | 'veritas';

const WEIGHTS = [
  { asset: 'AAPL', good: 0.4, bad: 0.5 },
  { asset: 'MSFT', good: 0.35, bad: 0.45 },
  { asset: 'NVDA', good: 0.25, bad: 0.3 },
];

function SpecCode() {
  return (
    <pre className="whitespace-pre font-mono text-[10.5px] leading-[1.75] text-slate-300 sm:text-[11.5px] lg:text-[12px]">
      <span className="text-slate-400">@verified_schema()</span>
      {'\n'}
      <span className="text-sky-300">def</span> <span className="text-amber-200">portfolio</span>
      <span className="text-slate-400">(</span>p<span className="text-slate-400">:</span>{' '}
      <span className="text-emerald-300">Portfolio</span>
      <span className="text-slate-400">):</span>
      {'\n  '}
      <span className="text-slate-400"># structural</span>
      {'\n  '}require(keys_subset(p.weights, ASSETS))
      {'\n  '}
      <span className="text-slate-400"># cross-field algebra</span>
      {'\n  '}require(sum(p.weights.values()) == 1.0, tol=1e-6)
      {'\n  '}require(forall(p.weights.values(), lambda w: (0.05 &lt;= w) &amp; (w &lt;= 0.50)))
      {'\n\n  '}
      <span className="text-slate-400"># zero degrees of freedom → splice, never sample</span>
      {'\n  '}
      <span className="text-emerald-300">derive</span>(p.expected_return == dot(p.weights, RETURNS))
      {'\n  '}
      <span className="text-emerald-300">derive</span>(p.volatility == sqrt(quad_form(p.weights, COV)))
      {'\n  '}
      <span className="text-emerald-300">derive</span>(p.sharpe == (p.expected_return - 0.04) / p.volatility)
    </pre>
  );
}

function JsonLine({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: 'pass' | 'fail' | 'cobalt';
}) {
  const color =
    accent === 'pass'
      ? 'text-emerald-300'
      : accent === 'fail'
        ? 'text-rose-300'
        : accent === 'cobalt'
          ? 'text-sky-300'
          : 'text-slate-200';
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-slate-400">&quot;{label}&quot;:</span>{' '}
      <span className={`font-medium ${color}`}>{value}</span>
      <span className="text-slate-400">,</span>
    </div>
  );
}

function HeroDemo({
  mode,
  setMode,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
}) {
  const reduce = useReducedMotion();
  const isVeritas = mode === 'veritas';

  return (
    <div className="relative">
      {/* floating annotations (desktop only) */}
      <div className="pointer-events-none absolute -left-4 top-24 z-20 hidden 2xl:block">
        <div className="animate-float rounded-2xl border border-verify-pass/30 bg-bg-elevated/90 px-3 py-2 shadow-lg backdrop-blur">
          <p className="font-mono text-[10px] uppercase tracking-wider text-verify-pass">0-DoF splice</p>
          <p className="mt-0.5 font-mono text-[11px] text-ink-secondary">24 tokens · 0 calls</p>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-5 top-10 z-20 hidden 2xl:block">
        <div className="animate-float rounded-2xl border border-border-cobalt bg-bg-elevated/90 px-3 py-2 shadow-lg backdrop-blur [animation-delay:1.4s]">
          <p className="font-mono text-[10px] uppercase tracking-wider text-cobalt-600 dark:text-cobalt-300">
            Tier 0 · PDA
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-ink-secondary">0.23 ms / step</p>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-3 bottom-14 z-20 hidden 2xl:block">
        <div className="animate-float rounded-2xl border border-border-subtle bg-bg-elevated/90 px-3 py-2 shadow-lg backdrop-blur [animation-delay:0.7s]">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">Certificate</p>
          <p className="mt-0.5 font-mono text-[11px] text-ink-secondary">SHA-256 · PASS</p>
        </div>
      </div>

      <div className="glass-island relative overflow-hidden rounded-[24px] sm:rounded-[30px] border border-white/20">
        {/* top bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-term-elevated px-3 py-2.5 sm:px-4">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
            </span>
            <span className="ml-1 truncate font-mono text-[10.5px] text-slate-400 sm:text-[11.5px]">
              portfolio_spec.py
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Decoding mode"
            className="flex items-center rounded-full bg-white/5 p-0.5"
          >
            <button
              role="tab"
              aria-selected={!isVeritas}
              onClick={() => setMode('json')}
              className={cn(
                'rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide transition-colors sm:px-3 sm:text-[10.5px]',
                !isVeritas ? 'bg-rose-500/20 text-rose-200' : 'text-slate-400 hover:text-slate-200',
              )}
            >
              JSON mode
            </button>
            <button
              role="tab"
              aria-selected={isVeritas}
              onClick={() => setMode('veritas')}
              className={cn(
                'rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide transition-colors sm:px-3 sm:text-[10.5px]',
                isVeritas ? 'bg-emerald-500/20 text-emerald-200' : 'text-slate-400 hover:text-slate-200',
              )}
            >
              Veritas
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          {/* spec panel */}
          <div className="relative border-b border-white/10 p-3.5 sm:p-4 lg:border-b-0 lg:border-r">
            <div className="mb-2 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.14em] text-slate-400">
              <span>compiled spec</span>
              <span className="text-slate-400">VIR v1.1</span>
            </div>
            <div
              tabIndex={0}
              role="region"
              aria-label="Compiled specification source"
              className="max-h-[228px] overflow-x-auto overflow-y-auto no-scrollbar [mask-image:linear-gradient(to_right,#000_90%,transparent)] lg:[mask-image:none]"
            >
              <SpecCode />
            </div>
          </div>

          {/* output panel */}
          <div className="relative p-3.5 sm:p-4">
            <div className="mb-2 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.14em] text-slate-400">
              <span>decoded stream</span>
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] tracking-normal',
                  isVeritas
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : 'bg-rose-500/15 text-rose-300',
                )}
              >
                <span className="relative flex h-1 w-1">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                  <span className="relative inline-flex h-1 w-1 rounded-full bg-current" />
                </span>
                {isVeritas ? 'verified' : 'unverified'}
              </span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                className="font-mono text-[11px] leading-[1.9] sm:text-[12px]"
              >
                <div className="text-slate-400">{'{'}</div>
                <div className="pl-3">
                  <div className="text-slate-400">
                    &quot;weights&quot;: <span className="text-slate-400">{'{'}</span>
                  </div>
                  {WEIGHTS.map((w) => (
                    <div key={w.asset} className="flex items-baseline justify-between gap-4 pl-3">
                      <span className="text-slate-400">
                        &quot;{w.asset}&quot;:{' '}
                        <span className={isVeritas ? 'text-emerald-300' : 'text-rose-300'}>
                          {(isVeritas ? w.good : w.bad).toFixed(2)}
                        </span>
                        <span className="text-slate-400">,</span>
                      </span>
                      {isVeritas && w.asset === 'NVDA' && (
                        <span className="rounded bg-sky-500/15 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-sky-300">
                          contracted
                        </span>
                      )}
                    </div>
                  ))}
                  <div className="text-slate-400">{'}'},</div>
                  <JsonLine
                    label="expected_return"
                    value={isVeritas ? '0.1615' : '0.21'}
                    accent={isVeritas ? 'pass' : 'fail'}
                  />
                  <JsonLine
                    label="volatility"
                    value={isVeritas ? '0.2044' : '0.14'}
                    accent={isVeritas ? 'pass' : 'fail'}
                  />
                  <JsonLine
                    label="sharpe"
                    value={isVeritas ? '0.5945' : '1.214'}
                    accent={isVeritas ? 'pass' : 'fail'}
                  />
                </div>
                <div className="text-slate-400">{'}'}</div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-3 border-t border-white/10 pt-2.5">
              {isVeritas ? (
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 font-mono text-[9.5px] text-emerald-300">
                    <Check className="h-3 w-3" /> Σ weights = 1.000000
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-sky-500/10 px-2 py-1 font-mono text-[9.5px] text-sky-300">
                    <Zap className="h-3 w-3" /> 24 tokens spliced
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 font-mono text-[9.5px] text-slate-300">
                    <ShieldCheck className="h-3 w-3" /> PASS
                  </span>
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/10 px-2 py-1 font-mono text-[9.5px] text-rose-300">
                    <AlertTriangle className="h-3 w-3" /> Σ weights = 1.250000
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/10 px-2 py-1 font-mono text-[9.5px] text-rose-300">
                    <AlertTriangle className="h-3 w-3" /> sharpe ≠ derived
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 font-mono text-[9.5px] text-slate-400">
                    retry loop
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-term-elevated/60">
          {[
            { k: 'PDA mask', v: isVeritas ? '0.23 ms' : 'off' },
            { k: '0-DoF saved', v: isVeritas ? '24 tok' : '0 tok' },
            { k: 'Witness', v: isVeritas ? 'SHA-256' : 'none' },
          ].map((m) => (
            <div key={m.k} className="px-3 py-2.5">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400">{m.k}</p>
              <p
                className={cn(
                  'mt-0.5 font-mono text-[11px] font-medium sm:text-[12px]',
                  isVeritas ? 'text-slate-100' : 'text-slate-400',
                )}
              >
                {m.v}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-2.5 flex items-center justify-center gap-1.5 font-mono text-[10px] text-ink-muted">
        <Sparkles className="h-3 w-3" />
        Same prompt. Same model. Different guarantees.
      </p>
    </div>
  );
}

export function Hero() {
  const [demoMode, setDemoMode] = useState<Mode>('veritas');

  return (
    <section className="relative overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-14">
      {/* floating dark nav sits above this — nothing else */}

      {/* ghost watermark (NEOPAY) */}
      <div
        aria-hidden
        className="ghost-word left-1/2 top-[-10px] -translate-x-1/2 select-none text-[clamp(6rem,17vw,15rem)]"
      >
        VERITAS
      </div>
      <div
        aria-hidden
        className="ghost-word -bottom-6 left-1/2 hidden -translate-x-1/2 text-[clamp(5rem,11vw,10rem)] opacity-60 sm:block"
      >
        verified
      </div>

      {/* mizu-style camera glow + halftone ring */}
      <div
        aria-hidden
        className="glow-orb left-1/2 top-[68px] h-[520px] w-[520px] -translate-x-1/2 opacity-70"
      />
      <div
        aria-hidden
        className="halftone-ring left-1/2 top-[30px] h-[600px] w-[600px] -translate-x-1/2"
      />

      {/* concentric cobalt horizon rings retained (Connectly ref) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[420px] left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-t from-[#0047FF]/16 via-[#1E5EFF]/8 to-transparent blur-3xl"
      />

      <div className="container-page relative">
        {/* ===== the big rounded "screen" ===== */}
        <div className="mx-auto max-w-6xl">
          <div className="screen-card px-4 pb-2 pt-12 sm:px-8 sm:pt-16">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              {/* pill badge */}
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-elevated/85 px-3 py-1.5 text-[11px] shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-border-cobalt">
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-cobalt-600 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-white">
                    <Sparkles className="h-2.5 w-2.5" /> veritas1.1
                  </span>
                  <span className="truncate text-ink-secondary">
                    <span className="sm:hidden">The anti-hallucination layer</span>
                    <span className="hidden sm:inline">The anti-hallucination layer for structured output</span>
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-elevated/85 px-3 py-1.5 text-[11px] font-semibold text-ink-secondary backdrop-blur">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cobalt-600" />
                  ₹0 architecture · 419 tests
                </span>
              </div>

              {/* headline with the DoF toggle — centered like NEOPAY */}
              <h1
                className="display-xl mt-7 max-w-[none] text-balance text-ink-primary sm:mt-9"
                style={{ fontSize: 'clamp(2.4rem, 5.4vw, 4.15rem)' }}
              >
                Turn probabilistic guessing{" "}
                <button
                  aria-label="Toggle Veritas Solver Mode"
                  aria-pressed={demoMode === 'veritas'}
                  onClick={() => setDemoMode(demoMode === 'veritas' ? 'json' : 'veritas')}
                  className="mx-1 inline-flex h-[0.72em] w-[1.45em] cursor-pointer items-center rounded-full p-[3px] align-middle shadow-inner transition-transform active:scale-95"
                  style={{
                    background:
                      demoMode === 'veritas'
                        ? 'linear-gradient(90deg, #1E5EFF 0%, #0047FF 100%)'
                        : 'linear-gradient(90deg, #9CA3AF 0%, #6B7280 100%)',
                    boxShadow:
                      '0 0.4em 0.9em -0.25em rgba(30,94,255,0.55), inset 0 2px 4px rgba(255,255,255,0.4)',
                  }}
                >
                  <motion.span
                    layout
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    className={`block h-[0.5em] w-[0.5em] rounded-full bg-white shadow-md ${
                      demoMode === 'veritas' ? 'ml-auto' : ''
                    }`}
                  />
                </button>{" "}
                into{' '}
                <span className="bg-gradient-to-r from-[#0038CC] to-[#4B83FF] bg-clip-text text-transparent">
                  verified truth
                </span>
              </h1>

              <p className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-ink-secondary sm:mt-6 sm:text-[17px]">
                Pydantic on the surface. Rust theorem proving underneath. Veritas sits inside the token
                loop — masking illegal tokens, doing the arithmetic itself, and handing you a proof you
                can check offline. No vibes. No retry roulette.
              </p>

              <div className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <Link
                  href="/docs/getting-started/quickstart"
                  className="btn-pill-cobalt group h-12 w-full px-6 text-sm font-semibold sm:w-auto"
                >
                  Ship verified JSON
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/playground"
                  className="btn-pill-white h-12 w-full px-5 text-sm font-semibold sm:w-auto"
                >
                  <Play className="h-3.5 w-3.5 fill-cobalt-500 text-cobalt-500" />
                  Break the decoder
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                <span>{siteConfig.license}</span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-border-strong" />
                <span>419 tests with native</span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-border-strong" />
                <span>zero mandatory deps in Rust core</span>
              </div>
            </div>

            {/* live demo emerging from the screen's bottom edge, NEOPAY mockup-style */}
            <div className="relative mx-auto mt-10 max-w-5xl sm:mt-14">
              <HeroDemo mode={demoMode} setMode={setDemoMode} />
            </div>

            {/* stats pinned to the screen bottom */}
            <div className="mx-auto mt-10 max-w-4xl pb-8 sm:mt-12">
              <div className="card-luxe grid grid-cols-2 overflow-hidden sm:grid-cols-4">
                {heroStats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`px-4 py-4 sm:px-5 sm:py-5 ${
                      i % 2 === 1 ? 'border-l border-border-subtle' : ''
                    } ${i > 1 ? 'border-t border-border-subtle sm:border-t-0' : ''} ${
                      i > 0 ? 'sm:border-l sm:border-border-subtle' : ''
                    }`}
                  >
                    <p className="font-display text-2xl font-extrabold tracking-tight text-ink-primary sm:text-[1.75rem]">
                      {stat.value}
                      <span className="ml-0.5 text-sm font-semibold text-cobalt-600 dark:text-cobalt-300">
                        {stat.unit}
                      </span>
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-[0.1em] text-ink-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-2.5 text-center font-mono text-[10px] text-ink-muted">
                Measured by the repository benchmark suite · GitHub Actions runner · 605-token vocabulary
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
