'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

const CALLS = [
  { label: 'PDA mask', value: '0.23 ms', tone: 'cobalt' },
  { label: 'HC4 / AF2', value: '3.9 µs', tone: 'pass' },
  { label: '0-DoF splice', value: '24 tok', tone: 'cobalt' },
  { label: 'CDCL rewind', value: '≤ 8 steps', tone: 'warn' },
  { label: 'SHA-256', value: 'witness', tone: 'pass' },
  { label: 'Preflight', value: '0 tokens', tone: 'cobalt' },
];

const TONE_CLASS: Record<string, string> = {
  cobalt: 'text-sky-400 dark:text-cobalt-300 border-sky-500/30 bg-sky-500/10',
  pass: 'text-emerald-400 dark:text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
  warn: 'text-amber-400 dark:text-amber-300 border-amber-500/30 bg-amber-500/10',
};

export function FlutedContractorVisual() {
  const reduce = useReducedMotion();

  return (
    <section
      id="contractor"
      className="section-y relative overflow-hidden border-y border-border-subtle bg-bg-inset/50"
    >
      {/* background cobalt orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#0047FF]/30 via-[#1E5EFF]/15 to-transparent blur-[80px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[15%] right-1/2 translate-x-1/2 w-[560px] h-[560px] rounded-full bg-gradient-to-tr from-[#6E56FF]/25 via-[#1E5EFF]/15 to-transparent blur-[64px]"
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center mb-14">
          <span className="eyebrow">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cobalt-600" />
            The interval contractor
          </span>
          <h2 className="display-lg mt-3 text-ink-primary">
            Slicing chaos into verified intervals
          </h2>
          <p className="mt-4 max-w-md mx-auto text-[15px] leading-relaxed text-ink-secondary">
            The vertical glass louvers you see are HC4 / Affine interval cuts. Each louver prunes an
            illegal numeric prefix before the model can sample it — turning continuous probability into
            discrete, bounded truth.
          </p>
        </div>

        <div
          className="relative mx-auto max-w-4xl h-[240px] sm:h-[420px] lg:h-[520px] rounded-[34px] vexx-fluted-glass border border-white/30 shadow-[var(--vt-shadow-lift)]"
        >
          <div className="vexx-fluted-louvers" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-black/10" />

          {/* callout columns floating inside the glass */}
          <div className="pointer-events-none absolute inset-0 hidden items-end justify-between p-8 sm:flex sm:p-12">
            {CALLS.map((call, i) => {
              const delay = i * 0.08;
              const x = (i / (CALLS.length - 1)) * 100;
              return (
                <motion.div
                  key={call.label}
                  className="absolute flex flex-col items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em]"
                  style={{
                    left: `${x}%`,
                    transform: `translateX(-50%)`,
                  }}
                  initial={reduce ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-semibold',
                      TONE_CLASS[call.tone],
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        call.tone === 'cobalt'
                          ? 'bg-sky-400 dark:bg-cobalt-300'
                          : call.tone === 'pass'
                            ? 'bg-emerald-400 dark:bg-emerald-300'
                            : 'bg-amber-400 dark:bg-amber-300',
                      )}
                    />
                    {call.label}
                  </span>
                  <span className="text-xs font-bold text-white">{call.value}</span>
                </motion.div>
              );
            })}
          </div>

          {/* bottom legend */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-mono text-xs text-white/80 backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-sky-400" />
              <span>Tier 0 · PDA grammar mask</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              <span>Tier 1 · HC4 / affine contractor</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-amber-400" />
              <span>Tier 2 · CDCL jumpback</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 text-center">
          {[
            { icon: '0.23 ms', label: 'per JSON mask step', tone: 'cobalt' },
            { icon: '3.9 µs', label: 'per numeric prefix', tone: 'pass' },
            { icon: '0', label: 'LLM tokens for preflight', tone: 'cobalt' },
          ].map((item, i) => (
            <div key={item.label} className="rounded-xl border border-border-subtle bg-bg-elevated p-4 sm:p-6 shadow-[var(--vt-shadow-card)]">
              <p className="font-display text-xl font-extrabold tracking-tight text-ink-primary sm:text-2xl">
                {item.icon}
              </p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
