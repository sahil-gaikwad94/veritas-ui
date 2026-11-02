'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Clock, Gauge, Terminal, Zap } from 'lucide-react';
import { SectionHeading } from '@/components/site/section';
import { CopyCommand } from '@/components/site/copy-command';
import { cn } from '@/lib/utils';

import { benchmarks } from '@/lib/benchmarks';

function Bar({
  label,
  value,
  max,
  tone,
  unit,
  animate,
}: {
  label: string;
  value: number;
  max: number;
  tone: 'python' | 'native';
  unit: string;
  animate: boolean;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span
          className={cn(
            'font-mono text-[10px] uppercase tracking-[0.1em]',
            tone === 'native' ? 'text-cobalt-600 dark:text-cobalt-300' : 'text-ink-muted',
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            'font-mono text-[11px] tabular-nums',
            tone === 'native' ? 'font-semibold text-ink-primary' : 'text-ink-secondary',
          )}
        >
          {value} {unit}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-bg-subtle">
        <motion.div
          initial={animate ? { width: 0 } : false}
          animate={{ width: `${Math.max((value / max) * 100, 3)}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'h-full rounded-full',
            tone === 'native'
              ? 'bg-gradient-to-r from-cobalt-600 to-cobalt-400'
              : 'bg-gradient-to-r from-ink-muted/60 to-ink-muted/30',
          )}
        />
      </div>
    </div>
  );
}

export function BenchmarkSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const reduce = useReducedMotion();
  const animate = inView && !reduce;

  return (
    <section id="benchmarks" className="section-y border-y border-border-subtle bg-bg-inset/50">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Measured, not marketed"
              title="Fast enough to sit inside the token loop."
              description="The native accelerator is a Rust port of the same engine, not a shortcut. It is used only when available, and every wrapper falls back to pure Python — a native regression costs speed, never soundness."
            />

            <div className="mt-6 grid grid-cols-3 gap-2 sm:max-w-md">
              {[
                { icon: Zap, value: '17.9×', label: 'mask speedup' },
                { icon: Gauge, value: '0.23', label: 'ms per step' },
                { icon: Clock, value: '3.9', label: 'µs per prefix' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-border-subtle bg-bg-elevated px-3 py-3">
                  <s.icon className="h-3.5 w-3.5 text-cobalt-500" />
                  <p className="mt-2 font-display text-lg font-extrabold tracking-tight text-ink-primary">
                    {s.value}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-muted">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:items-start">
              <CopyCommand command="python benchmarks/native_speedup.py" className="w-full sm:w-auto" />
              <p className="text-[11.5px] leading-relaxed text-ink-muted">
                GitHub Actions runner, 605-token vocabulary. Your hardware will differ — reproduce it before
                quoting it.
              </p>
            </div>

            <Link
              href="/benchmarks"
              className="group mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-cobalt-600 transition-colors hover:text-cobalt-700 dark:text-cobalt-300"
            >
              Full benchmarks & methodology
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div
            ref={ref}
            className="overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated p-5 shadow-[var(--vt-shadow-card)] sm:p-6"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border-subtle pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-cobalt-500" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-secondary">
                  native vs reference
                </span>
              </div>
              <span className="rounded-full border border-border-subtle bg-bg-subtle px-2 py-0.5 font-mono text-[9px] text-ink-muted">
                lower is better
              </span>
            </div>

            <div className="mt-5 space-y-6">
              {benchmarks.map((b) => (
                <div key={b.name}>
                  <div className="mb-2.5 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[11.5px] font-medium text-ink-primary">{b.name}</p>
                      <p className="mt-0.5 text-[11px] text-ink-muted">{b.detail}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-verify-pass/25 bg-verify-pass/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-verify-pass">
                      {b.speedup}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Bar
                      label="Python reference"
                      value={b.python}
                      max={b.python}
                      unit={b.unit}
                      tone="python"
                      animate={animate}
                    />
                    <Bar
                      label="Rust native"
                      value={b.native}
                      max={b.python}
                      unit={b.unit}
                      tone="native"
                      animate={animate}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-border-subtle pt-4">
              <div className="rounded-lg border border-border-subtle bg-bg-subtle/50 px-2.5 py-2">
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-muted">Preflight gate</p>
                <p className="mt-0.5 font-mono text-[13px] font-semibold text-verify-pass">0 LLM tokens</p>
              </div>
              <div className="rounded-lg border border-border-subtle bg-bg-subtle/50 px-2.5 py-2">
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-muted">Derived fields</p>
                <p className="mt-0.5 font-mono text-[13px] font-semibold text-cobalt-600 dark:text-cobalt-300">
                  0 forward passes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
