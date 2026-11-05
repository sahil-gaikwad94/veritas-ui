'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Check,
  Play,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { heroStats, siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

type Mode = 'json' | 'vexx';

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
      <span className="text-slate-400"># structure</span>
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

function HeroDemo({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const reduce = useReducedMotion();
  const isVexx = mode === 'vexx';

  return (
    <div className="vx-ink-island relative overflow-hidden rounded-[22px]">
      {/* top bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-white/[0.03] px-3 py-2.5 sm:px-4">
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

        <div role="tablist" aria-label="Decoding mode" className="flex items-center rounded-full bg-white/5 p-0.5">
          <button
            role="tab"
            aria-selected={!isVexx}
            onClick={() => setMode('json')}
            className={cn(
              'rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide transition-colors sm:px-3 sm:text-[10.5px]',
              !isVexx ? 'bg-rose-500/20 text-rose-200' : 'text-slate-400 hover:text-slate-200',
            )}
          >
            JSON mode
          </button>
          <button
            role="tab"
            aria-selected={isVexx}
            onClick={() => setMode('vexx')}
            className={cn(
              'rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide transition-colors sm:px-3 sm:text-[10.5px]',
              isVexx ? 'bg-emerald-500/20 text-emerald-200' : 'text-slate-400 hover:text-slate-200',
            )}
          >
            Vexx
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        {/* spec panel */}
        <div className="relative border-b border-white/10 p-3.5 sm:p-4 lg:border-b-0 lg:border-r">
          <div className="mb-2 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.14em] text-slate-400">
            <span>compiled spec</span>
            <span>VIR · vexx1.5</span>
          </div>
          <div
            tabIndex={0}
            role="region"
            aria-label="Compiled specification source"
            className="no-scrollbar max-h-[228px] overflow-x-auto overflow-y-auto [mask-image:linear-gradient(to_right,#000_90%,transparent)] lg:[mask-image:none]"
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
                isVexx ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300',
              )}
            >
              <span className="relative flex h-1 w-1">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                <span className="relative inline-flex h-1 w-1 rounded-full bg-current" />
              </span>
              {isVexx ? 'verified' : 'unverified'}
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
                      <span className={isVexx ? 'text-emerald-300' : 'text-rose-300'}>
                        {(isVexx ? w.good : w.bad).toFixed(2)}
                      </span>
                      <span className="text-slate-400">,</span>
                    </span>
                    {isVexx && w.asset === 'NVDA' && (
                      <span className="rounded bg-sky-500/15 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-sky-300">
                        contracted
                      </span>
                    )}
                  </div>
                ))}
                <div className="text-slate-400">{'}'},</div>
                <JsonLine
                  label="expected_return"
                  value={isVexx ? '0.1615' : '0.21'}
                  accent={isVexx ? 'pass' : 'fail'}
                />
                <JsonLine
                  label="volatility"
                  value={isVexx ? '0.2044' : '0.14'}
                  accent={isVexx ? 'pass' : 'fail'}
                />
                <JsonLine
                  label="sharpe"
                  value={isVexx ? '0.5945' : '1.214'}
                  accent={isVexx ? 'pass' : 'fail'}
                />
              </div>
              <div className="text-slate-400">{'}'}</div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-3 border-t border-white/10 pt-2.5">
            {isVexx ? (
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

      <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-white/[0.02]">
        {[
          { k: 'PDA mask', v: isVexx ? '0.23 ms' : 'off' },
          { k: '0-DoF saved', v: isVexx ? '24 tok' : '0 tok' },
          { k: 'Witness', v: isVexx ? 'SHA-256' : 'none' },
        ].map((m) => (
          <div key={m.k} className="px-3 py-2.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400">{m.k}</p>
            <p
              className={cn(
                'mt-0.5 font-mono text-[11px] font-medium sm:text-[12px]',
                isVexx ? 'text-slate-100' : 'text-slate-400',
              )}
            >
              {m.v}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrbCallout({
  className,
  label,
  value,
  align = 'left',
}: {
  className?: string;
  label: string;
  value: string;
  align?: 'left' | 'right';
}) {
  return (
    <span className={cn('vx-orb-label', align === 'right' && 'text-right', className)}>
      {label}
      <b>{value}</b>
    </span>
  );
}

export function Hero() {
  const [demoMode, setDemoMode] = useState<Mode>('vexx');
  const reduce = useReducedMotion();

  return (
    <>
      {/* ================= The sheet's opening composition ================= */}
      <section className="relative">
        <div className="grid lg:grid-cols-[minmax(0,1.03fr)_minmax(0,0.97fr)]">
          {/* ---- left: printed copy ---- */}
          <div className="vx-rise relative z-10 px-5 pb-9 pt-6 sm:px-9 sm:pb-11 sm:pt-8 lg:px-12 lg:pb-14 lg:pt-10">
            <div className="flex items-center justify-between gap-3">
              <span className="vx-mono inline-flex items-center gap-2 text-ink-primary">
                <span className="vx-dot bg-cobalt-600" /> vexx
              </span>
              <span className="vx-mono text-ink-muted">release vexx1.5</span>
            </div>

            <div className="mt-10 sm:mt-12 lg:mt-14">
              <span className="vx-chip">
                <Sparkles className="h-3 w-3 text-cobalt-600" />
                audit-hardened · 1.5
              </span>

              <h1 className="vx-display mt-5 text-ink-primary">
                Make the model{' '}
                <button
                  aria-label="Toggle Vexx solver mode"
                  aria-pressed={demoMode === 'vexx'}
                  onClick={() => setDemoMode(demoMode === 'vexx' ? 'json' : 'vexx')}
                  className="mx-1 inline-flex h-[0.62em] w-[1.3em] cursor-pointer items-center rounded-full p-[0.055em] align-middle transition-transform active:scale-95"
                  style={{
                    background:
                      demoMode === 'vexx'
                        ? 'linear-gradient(90deg, #4F7CFF 0%, #1230B4 100%)'
                        : 'linear-gradient(90deg, #C6CAD5 0%, #8A90A0 100%)',
                    boxShadow:
                      demoMode === 'vexx'
                        ? '0 0.3em 0.7em -0.2em rgba(18,48,180,0.6), inset 0 2px 4px rgba(255,255,255,0.45)'
                        : '0 0.3em 0.7em -0.25em rgba(16,17,23,0.35), inset 0 2px 4px rgba(255,255,255,0.5)',
                  }}
                >
                  <motion.span
                    layout
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    className={cn(
                      'block h-[0.5em] w-[0.5em] rounded-full bg-white shadow-md',
                      demoMode === 'vexx' ? 'ml-auto' : '',
                    )}
                  />
                </button>{' '}
                prove it.
              </h1>

              <p className="mt-5 max-w-[47ch] text-[15px] leading-relaxed text-ink-secondary sm:text-[16.5px]">
                Vexx compiles your Pydantic schema — and the algebra between its fields — straight into
                the decoder. Illegal tokens never get a chance to be sampled, derived values are computed
                instead of guessed, and every result can ship with a receipt that verifies offline.
              </p>

              <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-ink-muted">
                Same prompt · same model · no plausible nonsense
              </p>

              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <Link href="/docs/getting-started/quickstart" className="vx-btn vx-btn-dark h-11 px-5">
                  Start in 60 seconds
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/playground" className="vx-btn vx-btn-light h-11 px-5">
                  <Play className="h-3.5 w-3.5 fill-cobalt-500 text-cobalt-500" />
                  Break the decoder
                </Link>
              </div>

              <div className="mt-4 flex items-center gap-x-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-muted">
                <span className="text-ink-secondary">pip install vexx-ai</span>
                <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-border-strong" />
                <span className="whitespace-nowrap">{siteConfig.version}</span>
                <span aria-hidden className="hidden h-1 w-1 shrink-0 rounded-full bg-border-strong sm:inline-block" />
                <span className="hidden sm:inline">Python + Rust</span>
              </div>
            </div>
          </div>

          {/* ---- right: fluted cobalt orb ---- */}
          <div className="vx-orb-panel relative min-h-[300px] border-t border-white/10 sm:min-h-[360px] lg:min-h-[568px] lg:border-l lg:border-t-0">
            <div aria-hidden className="vx-orb" />
            <div aria-hidden className="vx-flutes" />
            <div aria-hidden className="vx-flutes--soft" />
            <div aria-hidden className="vx-flutes-sheen" />

            <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-between p-5 sm:min-h-[360px] sm:p-7 lg:min-h-[568px]">
              <div className="flex items-start justify-between gap-3">
                <span className="vx-mono text-white/70">solver-guided decoding</span>
                <span className="vx-mono text-white/45">cobalt / 1.5</span>
              </div>

              <div className="pointer-events-none absolute inset-0 hidden sm:block">
                <OrbCallout className="left-[7%] top-[57%]" label="mask" value="0.23 ms" />
                <OrbCallout className="left-[31%] top-[24%]" label="spliced" value="0 LLM calls" />
                <OrbCallout
                  className="right-[7%] top-[70%]"
                  label="witness"
                  value="SHA-256"
                  align="right"
                />
                <OrbCallout
                  className="right-[6%] top-[22%]"
                  label="suite"
                  value="425 tests"
                  align="right"
                />
              </div>

              <div className="relative flex flex-1 items-center justify-center py-8">
                <motion.span
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="vx-orb-word"
                >
                  vexx
                </motion.span>
              </div>

              <div className="relative flex flex-col items-start gap-2.5 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
                <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-white/65">
                  425 python · 69 rust · 0 mandatory crates
                </p>
                <Link
                  href="/docs/getting-started/how-vexx-works"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/85 backdrop-blur transition-colors hover:bg-white/20 hover:text-white"
                >
                  the engine
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= The demo ================= */}
      <section className="vx-band relative bg-bg-canvas px-5 pb-10 pt-9 sm:px-9 sm:pb-12 sm:pt-11 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="vx-mono text-ink-muted">the whole pitch in one screen</span>
            <h2 className="display-lg mt-2 text-ink-primary">Same prompt. Two universes.</h2>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-ink-secondary sm:text-right">
            Flip the decoder above. One universe produces plausible nonsense; the other produces
            arithmetic that holds and a witness that proves it.
          </p>
        </div>

        <div className="mt-6">
          <HeroDemo mode={demoMode} setMode={setDemoMode} />
        </div>

        <div className="mt-7 grid grid-cols-2 overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated sm:grid-cols-4">
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                'px-4 py-4 sm:px-5 sm:py-4',
                i % 2 === 1 && 'border-l border-border-subtle',
                i > 1 && 'border-t border-border-subtle sm:border-t-0',
                i > 0 && 'sm:border-l sm:border-border-subtle',
              )}
            >
              <p className="font-display text-[1.4rem] font-extrabold tracking-tight text-ink-primary sm:text-[1.65rem]">
                {stat.value}
                <span className="ml-0.5 text-[0.8rem] font-semibold text-cobalt-600 dark:text-cobalt-300">
                  {stat.unit}
                </span>
              </p>
              <p className="mt-1 font-mono text-[9.5px] uppercase leading-tight tracking-[0.12em] text-ink-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">
          measured by the repo benchmark suite · GitHub Actions runner · 605-token vocabulary
        </p>
      </section>
    </>
  );
}
