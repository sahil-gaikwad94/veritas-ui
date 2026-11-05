'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Bot, Check, CreditCard, Laptop, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const ICONS: Record<string, typeof Zap> = {
  quant: Zap,
  sql: CreditCard,
  sec: ShieldCheck,
  chem: Bot,
  code: Laptop,
};

const USE_CASES = [
  {
    id: 'quant',
    tone: 'cobalt' as const,
    icon: 'quant',
    title: 'Portfolio weights that actually sum to one',
    scenario: 'Your model emits {"AAPL": 0.55, "MSFT": 0.45, "NVDA": 0.30}. Valid JSON, broken math — weights sum to 1.30 and the Sharpe ratio contradicts the covariance matrix.',
    fix: 'Vexx masks illegal digits mid-prefix, contracts intervals in 3.9 µs, and splices derived fields — so the decoded object is provably sound before a single token is sampled.',
    cta: 'See quant cartridge',
  },
  {
    id: 'sql',
    tone: 'pass' as const,
    icon: 'sql',
    title: 'Text-to-SQL that never invents tables',
    scenario: 'The LLM writes `SELECT * FROM users WHERE tenant_id = 5` but your schema has no `tenant_id` column — or worse, it joins a table that doesn\'t exist.',
    fix: 'Vexx tokenizes real SQL with catalog-aware table, column, and alias resolution. Invented joins and missing tenant predicates are rejected before execution.',
    cta: 'See SQL cartridge',
  },
  {
    id: 'sec',
    tone: 'warn' as const,
    icon: 'sec',
    title: 'Agent tool calls with LTLf guardrails',
    scenario: 'An autonomous agent tries to call `transfer_funds` without first asserting `authenticated` — violating your temporal safety policy.',
    fix: 'Declare tools, preconditions, effects, and budgets. Vexx checks every call against the plan and evaluates LTLf trace policies over the whole execution.',
    cta: 'See security cartridge',
  },
  {
    id: 'chem',
    tone: 'cobalt' as const,
    icon: 'chem',
    title: 'SMILES molecules that obey valence',
    scenario: 'The model generates a SMILES string with carbon forming 5 bonds — chemically impossible, but syntactically valid.',
    fix: 'Vexx parses SMILES token-by-token, closes rings and branches correctly, and enforces valence, formal charge, and molecular weight constraints.',
    cta: 'See chemistry cartridge',
  },
  {
    id: 'code',
    tone: 'pass' as const,
    icon: 'code',
    title: 'Generated code without division by zero',
    scenario: 'The LLM emits `result = total / count` where `count` could be 0 — a runtime crash waiting to happen.',
    fix: 'Scope-aware undefined identifier detection, literal division-by-zero checks, and index bounds validation — before the generated code ever runs.',
    cta: 'See code cartridge',
  },
] as const;

const TONE_CLASS: Record<string, string> = {
  cobalt: 'border-cobalt-500/25 bg-cobalt-500/10 text-cobalt-600 dark:text-cobalt-300',
  pass: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
  warn: 'border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-300',
};

export function UseCases() {
  const reduce = useReducedMotion();

  return (
    <section id="use-cases" className="section-y border-y border-border-subtle bg-bg-inset/50">
      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="eyebrow">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-acid" />
            What people actually build
          </span>
          <h2 className="display-lg mt-3 text-ink-primary">
            Verified output, not vibes.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-secondary">
            Real scenarios where “roughly right” is wrong — and Vexx makes it right.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((useCase, i) => {
            const delay = i * 0.06;
            const Icon = ICONS[useCase.icon] ?? Zap;
            const tone = TONE_CLASS[useCase.tone];
            return (
              <motion.div
                key={useCase.id}
                className={cn(
                  'group relative overflow-hidden rounded-[26px] border p-6 shadow-[var(--vt-shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--vt-shadow-lift)] sm:p-8',
                  tone,
                )}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/20 blur-xl transition-opacity group-hover:opacity-40"
                />
                <div className="relative z-10 flex items-center gap-2 mb-4">
                  <div className={`flex shrink-0 items-center justify-center rounded-lg p-1.5 ${tone.replace('text-', 'bg-').replace('-600', '-100')}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                    {useCase.id}
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="font-display text-xl font-extrabold tracking-tight text-ink-primary sm:text-2xl">
                    {useCase.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-secondary sm:text-sm">
                    <span className="block mb-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                      The messy scenario
                    </span>
                    {useCase.scenario}
                  </p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink-secondary sm:text-sm">
                    <span className="block mb-1.5 font-mono text-[11px] uppercase tracking-wide text-verify-pass">
                      How Vexx fixes it
                    </span>
                    {useCase.fix}
                  </p>
                </div>
                <Link
                  href={useCase.cta === 'See quant cartridge' ? '/docs/cartridges/quantitative-finance' : useCase.cta === 'See SQL cartridge' ? '/docs/cartridges/sql-and-database-safety' : useCase.cta === 'See security cartridge' ? '/docs/cartridges/security-and-iam-policies' : useCase.cta === 'See chemistry cartridge' ? '/docs/cartridges/chemistry-smiles' : '/docs/cartridges/code-analysis-and-synthesis'}
                  className="relative z-10 mt-6 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wide transition-all hover:-translate-y-0.5"
                  style={{
                    borderColor: useCase.tone === 'cobalt' ? '#1e5eff' : useCase.tone === 'pass' ? '#10b981' : '#f59e0b',
                    color: useCase.tone === 'cobalt' ? '#1e5eff' : useCase.tone === 'pass' ? '#10b981' : '#f59e0b',
                  }}
                >
                  {useCase.cta}
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 flex items-center justify-center gap-3 text-[11.5px] text-ink-muted">
          <Check className="h-3.5 w-3.5 text-verify-pass" />
          <span>Every scenario runs entirely client-side — zero server cost, zero model calls for verification.</span>
        </div>
      </div>
    </section>
  );
}
