'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Braces, Calculator, GitBranch, ScanSearch, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeading } from '@/components/site/section';

type Step = {
  id: string;
  index: string;
  name: string;
  metric: string;
  icon: typeof Braces;
  title: string;
  description: string;
  bullets: string[];
  trace: { tone: 'muted' | 'pass' | 'warn' | 'cobalt'; text: string }[];
};

const steps: Step[] = [
  {
    id: 'preflight',
    index: '00',
    name: 'Preflight',
    metric: '0 tokens',
    icon: ScanSearch,
    title: 'Prove the spec can be satisfied before touching the GPU',
    description:
      'The compiled spec is checked for feasibility with interval contraction, container feasibility, exact affine reasoning and strict-bound refutation. If the constraints contradict each other, you find out in milliseconds — with relaxation hints.',
    bullets: [
      'Interval contraction over every field',
      'AGDecode container feasibility',
      'Exact affine + strict-bound refutation',
      'Checked string & format witnesses',
    ],
    trace: [
      { tone: 'muted', text: 'veritas check-spec portfolio_spec.py' },
      { tone: 'cobalt', text: 'compile  Portfolio → VIR (4 fields, 6 constraints)' },
      { tone: 'muted', text: 'contract  weights ∈ [0.05, 0.50]^3 ∩ Σ = 1' },
      { tone: 'warn', text: 'witness   dynamic map → verdict UNKNOWN, never a guessed SAT' },
      { tone: 'pass', text: 'contradictions refuted · 0 LLM tokens spent' },
    ],
  },
  {
    id: 'tier0',
    index: '01',
    name: 'Tier 0 · Grammar',
    metric: '0.23 ms',
    icon: Braces,
    title: 'A JSON pushdown automaton masks every illegal token',
    description:
      'A byte-level PDA tracks the grammar stack per step and builds an exact mask over your vocabulary. Strings are masked by length and by their JSON-Schema pattern compiled to a Thompson NFA. EOS is only allowed when the document is complete.',
    bullets: [
      'Exact masks over the supplied vocabulary',
      'Pattern NFA + length windows for strings',
      'Verified format witnesses (date-time, UUID, IP)',
      'Canonical rendering + incremental parsing',
    ],
    trace: [
      { tone: 'muted', text: 'step 42 · field weights.NVDA · depth 2' },
      { tone: 'cobalt', text: 'PDA   accepts "0.2" → number state' },
      { tone: 'pass', text: 'mask  641 / 1000 tokens allowed' },
      { tone: 'warn', text: 'block  "}" would close the object before NVDA' },
      { tone: 'pass', text: 'mask built in 0.23 ms · native accelerator' },
    ],
  },
  {
    id: 'tier1',
    index: '02',
    name: 'Tier 1 · Numerics',
    metric: '3.9 µs',
    icon: Calculator,
    title: 'Interval and affine contractors prune numbers mid-prefix',
    description:
      'Outward-rounded IEEE-754 intervals and affine forms narrow the reachable region for every numeric prefix. If the first digit commits you outside the bound, the next token is masked before the model can choose it.',
    bullets: [
      'Outward-rounded intervals — never a false accept',
      'Affine noise symbols preserve correlation',
      'Dynamic-container residual accumulators',
      'Open bounds use adjacent representable values',
    ],
    trace: [
      { tone: 'muted', text: 'prefix "0." · residual Σ = 0.65 unallocated' },
      { tone: 'cobalt', text: 'HC4   NVDA ∈ [0.05, 0.25]' },
      { tone: 'pass', text: 'digit 0.2 → interval [0.20, 0.25]' },
      { tone: 'warn', text: 'digit 0.3 → empty interval · masked' },
      { tone: 'pass', text: 'contract 3.9 µs' },
    ],
  },
  {
    id: 'tier2',
    index: '03',
    name: 'Tier 2 · Search',
    metric: '0 calls',
    icon: GitBranch,
    title: 'Deterministic search, jumpback, and zero-DoF splices',
    description:
      'A nano-solver handles the small linear systems and returns minimal unsat cores. On conflict, CDCL jumps back to the guilty field with a half-space cut. When a field is fully determined, Veritas computes it and splices the bytes in.',
    bullets: [
      'Deterministic solver with unsat cores',
      'Entropy-weighted CDCL culprit scoring',
      'Topological key ordering for derived fields',
      'BPE boundary healing on spliced values',
    ],
    trace: [
      { tone: 'muted', text: 'branch weights.NVDA = 0.30 → residual +0.05' },
      { tone: 'warn', text: 'UNSAT  conflict with sharp ≥ 0.65 · culprit weights.NVDA' },
      { tone: 'cobalt', text: 'cdcl   rewind 3 tokens · cut w_NVDA ≤ 0.28' },
      { tone: 'pass', text: 'splice expected_return, volatility, sharpe (24 tok)' },
      { tone: 'pass', text: '0 forward passes for 3 derived fields' },
    ],
  },
  {
    id: 'verify',
    index: '04',
    name: 'Verify',
    metric: 'SHA-256',
    icon: ShieldCheck,
    title: 'Nothing is returned until the concrete object passes',
    description:
      'A total evaluator re-checks every constraint on the finished object, fills derived values, and reports per-constraint outcomes. INCOMPLETE is never treated as a pass. The result can carry an offline-verifiable certificate.',
    bullets: [
      'Total evaluator over the concrete instance',
      'PASS / FAIL / INCOMPLETE — never optimistic',
      'Minimal unsat cores + relaxation hints',
      'SMT-LIB2 certificate with SHA-256 digests',
    ],
    trace: [
      { tone: 'muted', text: 'verify weights, bounds, simplex, derivations' },
      { tone: 'pass', text: 'PASS  6/6 constraints · 3 derived fields filled' },
      { tone: 'pass', text: 'digest  sha256:9f2c…a71e · spec 4b81…0c9d' },
      { tone: 'pass', text: 'smt2   complete · certificate written' },
      { tone: 'pass', text: 'veritas verify-proof proof.json → ok' },
    ],
  },
];

const toneClass = {
  muted: 'text-slate-400',
  pass: 'text-emerald-400',
  warn: 'text-amber-400',
  cobalt: 'text-sky-400',
} as const;

export function TierPipeline() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const reduce = useReducedMotion();
  const Icon = step.icon;

  return (
    <section id="engine" className="section-y relative overflow-hidden border-y border-border-subtle bg-bg-inset/50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 dot-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_75%)]"
      />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="The engine"
          title="Five layers between a token and a lie."
          description="Each layer is useful on its own and additive in sequence. No Z3 in the token loop, no Rust toolchain required — the Python reference engine is complete and the native accelerator is optional."
        />

        <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-[320px_1fr] lg:gap-6">
          {/* selector */}
          <div
            role="tablist"
            aria-label="Engine layers"
            className="snap-row no-scrollbar pb-1 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0"
          >
            {steps.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`panel-${s.id}`}
                  id={`tab-${s.id}`}
                  onClick={() => setActive(i)}
                  className={cn(
                    'group relative flex shrink-0 snap-start items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all lg:w-full lg:px-3.5 lg:py-3',
                    selected
                      ? 'border-border-cobalt bg-bg-elevated shadow-[var(--vt-shadow-card)]'
                      : 'border-transparent hover:bg-bg-elevated/60',
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors',
                      selected
                        ? 'border-transparent bg-cobalt-600 text-white'
                        : 'border-border-subtle bg-bg-subtle text-ink-muted group-hover:text-ink-secondary',
                    )}
                  >
                    <s.icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-baseline gap-1.5">
                      <span className="font-mono text-[9.5px] text-ink-muted">{s.index}</span>
                      <span
                        className={cn(
                          'whitespace-nowrap text-[13px] font-semibold lg:whitespace-normal',
                          selected ? 'text-ink-primary' : 'text-ink-secondary',
                        )}
                      >
                        {s.name}
                      </span>
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] text-ink-muted">{s.metric}</span>
                  </span>
                  <ArrowRight
                    className={cn(
                      'ml-auto hidden h-3.5 w-3.5 shrink-0 transition-all lg:block',
                      selected ? 'translate-x-0 text-cobalt-500 opacity-100' : '-translate-x-1 opacity-0',
                    )}
                  />
                </button>
              );
            })}

            <div className="hidden items-center gap-2 px-3.5 pt-3 lg:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-verify-pass animate-pulse-ring" />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                deterministic · fallback-safe
              </span>
            </div>
          </div>

          {/* panel */}
          <div
            className="relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated shadow-[var(--vt-shadow-card)]"
            role="tabpanel"
            id={`panel-${step.id}`}
            aria-labelledby={`tab-${step.id}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="p-5 sm:p-6 lg:p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cobalt-600 text-white shadow-[var(--vt-shadow-cobalt)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                        {step.index} · {step.name}
                      </p>
                      <p className="mt-0.5 font-mono text-[11px] font-medium text-cobalt-600 dark:text-cobalt-300">
                        {step.metric}
                      </p>
                    </div>
                  </div>
                  <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-border-subtle bg-bg-subtle px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-wide text-ink-muted sm:inline-flex">
                    <span className="h-1 w-1 rounded-full bg-verify-pass" /> active
                  </span>
                </div>

                <h3 className="mt-5 text-[1.15rem] font-semibold leading-snug tracking-tight text-ink-primary sm:text-[1.3rem]">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink-secondary sm:text-sm">
                  {step.description}
                </p>

                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {step.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 rounded-lg border border-border-subtle bg-bg-subtle/50 px-2.5 py-2 text-[12px] text-ink-secondary"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cobalt-500" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-term-bg">
                  <div className="flex items-center justify-between border-b border-white/10 bg-term-elevated px-3 py-2">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-slate-400">
                      veritas inspect · trace
                    </span>
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                    </span>
                  </div>
                  <div className="space-y-1.5 overflow-x-auto p-3 font-mono text-[10.5px] leading-relaxed sm:text-[11.5px]">
                    {step.trace.map((line, i) => (
                      <motion.div
                        key={line.text}
                        initial={reduce ? false : { opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.06 }}
                        className="flex gap-2 whitespace-pre"
                      >
                        <span className="select-none text-slate-400/80">{String(i + 1).padStart(2, '0')}</span>
                        <span className={toneClass[line.tone]}>{line.text}</span>
                      </motion.div>
                    ))}
                    <span className="inline-block h-3 w-1.5 animate-blink bg-slate-500" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
