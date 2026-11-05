'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, GitBranch, Play, RotateCcw, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/site/reveal';

const sampled = [
  '{',
  '"weights"',
  ':',
  '{',
  '"AAPL"',
  ':',
  '0.4',
  ',',
  '"MSFT"',
  ':',
  '0.35',
  ',',
  '"NVDA"',
  ':',
  '0.25',
  '}',
  ',',
];

const derived = [
  { key: 'expected_return', value: '0.1615' },
  { key: 'volatility', value: '0.2044' },
  { key: 'sharpe', value: '0.5945' },
];

export function ZeroDofTape() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const hasAutoStarted = useRef(false);

  const total = sampled.length;
  const complete = step >= total;

  useEffect(() => {
    if (reduce) {
      setStep(total);
      return;
    }
    if (inView && !hasAutoStarted.current) {
      hasAutoStarted.current = true;
      setPlaying(true);
    }
  }, [inView, reduce, total]);

  useEffect(() => {
    if (!playing) return;
    if (step >= total) {
      setPlaying(false);
      return;
    }
    const delay = step === 0 ? 420 : 95;
    const timer = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(timer);
  }, [playing, step, total]);

  const sampledCount = Math.min(step, total);
  const splicedCount = complete ? 24 : 0;

  return (
    <section id="zero-dof" className="section-y">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
        <Reveal>
          <span className="eyebrow">
            <Zap className="h-3 w-3 text-verify-pass" /> Zero degrees of freedom
          </span>
          <h2 className="display-lg mt-3 text-ink-primary">
            Derived values should never be guessed.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-secondary sm:text-base">
            When an output field is fully determined by fields before it, sampling it is wasted compute —
            and a chance to be wrong. Vexx topologically sorts the JSON keys so inputs always precede
            outputs, computes the derived value exactly, and splices its bytes into the stream.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              {
                icon: GitBranch,
                title: 'Dependency-ordered keys',
                body: 'The dependency graph decides the emission order; no cyclic derivations.',
              },
              {
                icon: Sparkles,
                title: 'Splice, don’t sample',
                body: 'Computed values are injected with BPE boundary healing so the token stream stays valid.',
              },
              {
                icon: Zap,
                title: 'Fewer forward passes',
                body: 'Every derived field removes its tokens from the model’s workload — often 30–60% of numeric decoding.',
              },
            ].map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-bg-elevated text-cobalt-600 dark:text-cobalt-300">
                  <item.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[13.5px] font-semibold text-ink-primary">{item.title}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-ink-secondary">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/docs/engine-internals/zero-dof-jump-forward"
            className="group mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-cobalt-600 transition-colors hover:text-cobalt-700 dark:text-cobalt-300"
          >
            How jump-forward splicing works
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div ref={ref} className="overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated shadow-[var(--vt-shadow-lift)]">
            <div className="flex items-center justify-between gap-2 border-b border-border-subtle bg-bg-subtle/60 px-3.5 py-2.5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-verify-pass" />
                <span className="truncate font-mono text-[10.5px] text-ink-secondary">
                  decode · portfolio_spec
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStep(0);
                  setPlaying(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-elevated px-2.5 py-1 font-mono text-[10px] text-ink-secondary transition-colors hover:border-border-cobalt hover:text-ink-primary"
              >
                {playing ? <Play className="h-3 w-3" /> : <RotateCcw className="h-3 w-3" />}
                {playing ? 'replaying' : 'replay'}
              </button>
            </div>

            {/* key order rail */}
            <div className="flex items-center gap-1 overflow-x-auto border-b border-border-subtle px-3.5 py-2.5 no-scrollbar">
              <span className="mr-1 shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">
                key order
              </span>
              {['weights', 'expected_return', 'volatility', 'sharpe'].map((k, i, arr) => (
                <span key={k} className="flex shrink-0 items-center gap-1">
                  <span
                    className={cn(
                      'rounded-md border px-1.5 py-0.5 font-mono text-[9.5px]',
                      i === 0
                        ? 'border-border-subtle bg-bg-subtle text-ink-secondary'
                        : 'border-verify-pass/25 bg-verify-pass/10 text-verify-pass',
                    )}
                  >
                    {k}
                  </span>
                  {i < arr.length - 1 && <ArrowRight className="h-2.5 w-2.5 text-ink-muted" />}
                </span>
              ))}
            </div>

            <div className="p-3.5 sm:p-4">
              <div className="min-h-[132px] rounded-xl border border-white/10 bg-term-bg p-3">
                <div className="flex flex-wrap items-start gap-1 font-mono text-[11px] leading-relaxed sm:text-[12px]">
                  {sampled.map((token, i) => (
                    <span
                      key={`${token}-${i}`}
                      className={cn(
                        'rounded px-1 py-0.5 transition-all duration-200',
                        i < step
                          ? 'bg-sky-500/10 text-sky-200 opacity-100'
                          : 'translate-y-0.5 text-transparent opacity-0',
                      )}
                    >
                      {token}
                    </span>
                  ))}

                  {complete && (
                    <span className="flex w-full flex-wrap items-start gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/[0.07] p-1.5">
                      {derived.map((d, i) => (
                        <span
                          key={d.key}
                          className="inline-flex items-baseline gap-0.5 rounded bg-emerald-500/10 px-1 py-0.5 text-emerald-300"
                        >
                          <span className="text-slate-400">&quot;{d.key}&quot;:</span>
                          <span>{d.value}</span>
                          {i < derived.length - 1 && <span className="text-slate-400">,</span>}
                        </span>
                      ))}
                      <span className="ml-auto inline-flex items-center gap-1 rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-emerald-300">
                        <Zap className="h-2.5 w-2.5" /> spliced · 0 calls
                      </span>
                    </span>
                  )}

                  {complete && <span className="text-slate-400">{'}'}</span>}
                  {!complete && step > 0 && (
                    <span className="inline-block h-3 w-1.5 animate-blink bg-sky-400/70" />
                  )}
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { k: 'sampled', v: `${sampledCount} tok`, tone: 'text-ink-primary' },
                  { k: 'spliced', v: `${splicedCount} tok`, tone: 'text-verify-pass' },
                  { k: 'llm calls', v: complete ? '0' : '—', tone: 'text-cobalt-600 dark:text-cobalt-300' },
                ].map((m) => (
                  <div key={m.k} className="rounded-lg border border-border-subtle bg-bg-subtle/50 px-2.5 py-2">
                    <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-muted">{m.k}</p>
                    <p className={cn('mt-0.5 font-mono text-[13px] font-semibold tabular-nums', m.tone)}>{m.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
