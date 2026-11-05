'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { AlertTriangle, Check, ShieldCheck, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const weights = [
  { asset: 'AAPL', bad: 0.5, good: 0.4 },
  { asset: 'MSFT', bad: 0.45, good: 0.35 },
  { asset: 'NVDA', bad: 0.3, good: 0.25 },
];

function WeightRows({ mode, animate }: { mode: 'bad' | 'good'; animate: boolean }) {
  const reduce = useReducedMotion();
  const total = weights.reduce((sum, w) => sum + (mode === 'bad' ? w.bad : w.good), 0);
  const max = 0.5;

  return (
    <div className="space-y-2.5">
      {weights.map((w, i) => {
        const value = mode === 'bad' ? w.bad : w.good;
        return (
          <div key={w.asset} className="flex items-center gap-3">
            <span className="w-11 shrink-0 font-mono text-[10.5px] text-ink-muted">{w.asset}</span>
            <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-bg-subtle">
              <motion.div
                initial={animate ? { width: 0 } : false}
                animate={{ width: `${(value / max) * 100}%` }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'absolute inset-y-0 left-0 rounded-md',
                  mode === 'bad'
                    ? 'bg-gradient-to-r from-rose-500/80 to-rose-400/60'
                    : 'bg-gradient-to-r from-cobalt-600 to-cobalt-400',
                )}
              />
              <span className="absolute inset-y-0 right-2 flex items-center font-mono text-[10.5px] font-medium text-ink-primary">
                {value.toFixed(2)}
              </span>
            </div>
          </div>
        );
      })}

      <div className="flex items-center gap-3 pt-1">
        <span className="w-11 shrink-0 font-mono text-[10.5px] font-semibold text-ink-secondary">Σ</span>
        <div
          className={cn(
            'flex flex-1 items-center justify-between rounded-md border px-2 py-1.5',
            mode === 'bad'
              ? 'border-rose-500/30 bg-rose-500/10'
              : 'border-verify-pass/30 bg-verify-pass/10',
          )}
        >
          <span
            className={cn(
              'font-mono text-[11px] font-semibold',
              mode === 'bad' ? 'text-verify-fail' : 'text-verify-pass',
            )}
          >
            {total.toFixed(2)}
          </span>
          <span
            className={cn(
              'font-mono text-[9.5px] uppercase tracking-wide',
              mode === 'bad' ? 'text-verify-fail' : 'text-verify-pass',
            )}
          >
            {mode === 'bad' ? 'expected 1.00' : 'simplex satisfied'}
          </span>
        </div>
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  ok,
  expected,
}: {
  label: string;
  value: string;
  ok: boolean;
  expected?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-border-subtle py-2 first:border-t-0">
      <span className="font-mono text-[10.5px] text-ink-muted">{label}</span>
      <span className="flex items-center gap-2">
        <span className="font-mono text-[11px] text-ink-primary">{value}</span>
        {ok ? (
          <Check className="h-3.5 w-3.5 text-verify-pass" />
        ) : (
          <X className="h-3.5 w-3.5 text-verify-fail" />
        )}
        {!ok && expected && (
          <span className="hidden font-mono text-[9.5px] text-verify-fail sm:inline">≠ {expected}</span>
        )}
      </span>
    </div>
  );
}

export function SyntaxMath() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="why" className="section-y relative overflow-hidden">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <span aria-hidden className="h-1 w-1 rounded-full bg-verify-fail" />
            The failure nobody catches
          </span>
          <h2 className="display-lg mt-3 text-ink-primary">
            Valid JSON is not
            <br className="hidden sm:block" /> valid math.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-secondary sm:text-base">
            A schema can promise that <code className="font-mono text-[13px]">weights</code> is an object of
            floats. It cannot promise they add up to one — or that the Sharpe ratio agrees with the covariance
            matrix. Grammar tools stop at syntax. Pydantic finds out too late. Vexx catches the math
            <em>while the tokens are being chosen</em>, not after you’ve already paid for the retry loop.
          </p>
        </div>

        <div ref={ref} className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-2 lg:gap-5">
          {/* JSON mode */}
          <div className="group relative overflow-hidden rounded-[26px] border border-rose-500/20 bg-bg-elevated p-5 shadow-[var(--vt-shadow-card)] sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-verify-fail">
                  Standard JSON mode
                </p>
                <h3 className="mt-1.5 text-[1.05rem] font-semibold text-ink-primary">
                  Syntax valid · arithmetic wrong
                </h3>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-rose-500/10 px-2 py-1 font-mono text-[9.5px] uppercase tracking-wide text-verify-fail">
                <AlertTriangle className="h-3 w-3" /> fail
              </span>
            </div>

            <div className="mt-5">
              <WeightRows mode="bad" animate={inView} />
            </div>

            <div className="mt-4 rounded-xl border border-border-subtle bg-bg-subtle/60 px-3 py-1.5">
              <ResultRow label="expected_return" value="0.2100" ok={false} expected="0.1615" />
              <ResultRow label="sharpe_ratio" value="1.2140" ok={false} expected="0.5945" />
              <ResultRow label="schema validation" value="PASS" ok />
            </div>

            <p className="mt-4 flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-secondary">
              <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-500/10 font-mono text-[9px] text-verify-fail">
                14
              </span>
              retries later you either ship the bad number, or pay for the prompt again.
            </p>
          </div>

          {/* Vexx */}
          <div className="relative overflow-hidden rounded-[26px] border border-verify-pass/25 bg-bg-elevated p-5 shadow-[var(--vt-shadow-card)] sm:p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-verify-pass/10 blur-2xl"
            />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-verify-pass">
                  Vexx solver mode
                </p>
                <h3 className="mt-1.5 text-[1.05rem] font-semibold text-ink-primary">
                  Valid syntax · verified algebra
                </h3>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-verify-pass/10 px-2 py-1 font-mono text-[9.5px] uppercase tracking-wide text-verify-pass">
                <ShieldCheck className="h-3 w-3" /> pass
              </span>
            </div>

            <div className="relative mt-5">
              <WeightRows mode="good" animate={inView} />
            </div>

            <div className="relative mt-4 rounded-xl border border-border-subtle bg-bg-subtle/60 px-3 py-1.5">
              <ResultRow label="expected_return" value="0.1615" ok />
              <ResultRow label="volatility" value="0.2044" ok />
              <ResultRow label="sharpe_ratio" value="0.5945" ok />
            </div>

            <p className="mt-4 flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-secondary">
              <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-verify-pass/10">
                <Check className="h-2.5 w-2.5 text-verify-pass" />
              </span>
              Derived fields are spliced, not sampled — 24 tokens the model never has to guess.
            </p>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-[12px] leading-relaxed text-ink-muted">
          Same prompt. Same model. Same JSON shape. The difference is a compiled specification that every
          layer of decoding can actually read — before the model guesses, not after you pay.
        </p>
      </div>
    </section>
  );
}
