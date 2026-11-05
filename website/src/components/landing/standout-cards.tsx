'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Fingerprint, Sparkles, Terminal, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const ICONS: Record<string, typeof Zap> = {
  zap: Zap,
  check: Check,
  fingerprint: Fingerprint,
  sparkles: Sparkles,
  terminal: Terminal,
  arrow: ArrowRight,
};

const CARDS = [
  {
    id: 'version',
    tone: 'cobalt' as const,
    icon: 'sparkles',
    label: 'vexx1.5',
    sub: 'the release',
    body: 'Soundness fixes first, then an agentic layer: verifying proxy, tool firewall, KL receipts, relaxation wizard.',
    href: '/docs/release-notes',
    cta: 'Read the notes',
  },
  {
    id: 'speed',
    tone: 'pass' as const,
    icon: 'zap',
    label: '0.23 ms',
    sub: 'native mask',
    body: 'One JSON mask step across a 605-token vocabulary — 17.9× faster than the Python reference.',
    href: '/benchmarks',
    cta: 'Benchmarks',
  },
  {
    id: 'serve',
    tone: 'cobalt' as const,
    icon: 'terminal',
    label: '422',
    sub: 'vexx serve',
    body: 'An OpenAI-compatible proxy that refuses schema violations before your app ever buffers them.',
    href: '/docs/proofs-rl-and-cli/cli-reference',
    cta: 'How it works',
  },
  {
    id: 'mcp',
    tone: 'warn' as const,
    icon: 'fingerprint',
    label: 'LTLf',
    sub: 'MCP firewall',
    body: 'Tool ordering, spend caps and taint tracking for agents that are one hallucination away from expensive.',
    href: '/docs/cartridges/security-and-iam-policies',
    cta: 'The firewall',
  },
  {
    id: 'receipts',
    tone: 'pass' as const,
    icon: 'check',
    label: '−log P',
    sub: 'KL receipts',
    body: 'Exactly how much probability your mask removed, per field and per step. Served with the result.',
    href: '/docs/proofs-rl-and-cli/proof-certificates',
    cta: 'Receipts',
  },
  {
    id: 'tests',
    tone: 'cobalt' as const,
    icon: 'arrow',
    label: '425 + 69',
    sub: 'tests',
    body: 'Python tests plus Rust unit tests, including the ones written after the audit found real unsoundness.',
    href: '/benchmarks',
    cta: 'See the suites',
  },
] as const;

const TONE_BG: Record<string, string> = {
  cobalt: 'bg-cobalt-500/10 text-cobalt-600 dark:text-cobalt-400 border-cobalt-500/20',
  pass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  warn: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
};

const TONE_ACCENT: Record<string, string> = {
  cobalt: 'bg-cobalt-600 text-white shadow-[var(--vt-shadow-cobalt)] hover:bg-cobalt-700',
  pass: 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:bg-emerald-600',
  warn: 'bg-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:bg-amber-600',
};

export function StandoutCards() {
  const reduce = useReducedMotion();

  return (
    <section id="standout" className="section-y relative overflow-hidden border-y border-border-subtle bg-bg-inset/30">
      {/* airy aura + halftone (mizu ref) instead of heavy violet blur */}
      <div aria-hidden className="glow-orb -top-56 left-[6%] opacity-50" />
      <div aria-hidden className="halftone-ring -right-64 top-1/3 h-[460px] w-[460px] opacity-60" />

      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="eyebrow">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cobalt-500" />
            The receipts
          </span>
          <h2 className="display-lg mt-3 text-ink-primary">
            Six claims, all checkable.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-secondary">
            Every number here lives in the repo, the release notes or the benchmark suite. Click
            through and audit us.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => {
            const delay = i * 0.06;
            const Icon = ICONS[card.icon] ?? Zap;
            const toneBg = TONE_BG[card.tone];
            const toneAccent = TONE_ACCENT[card.tone];
            return (
              <motion.div
                key={card.id}
                className="group relative overflow-hidden rounded-[26px] border border-border-subtle bg-bg-elevated p-6 shadow-[var(--vt-shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-border-cobalt hover:shadow-[var(--vt-shadow-lift)] sm:p-8"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-cobalt-500/10 blur-xl transition-opacity group-hover:opacity-70"
                />
                <div className="relative z-10 flex items-center gap-2 mb-4">
                  <div className={`flex shrink-0 items-center justify-center rounded-lg p-1.5 ${toneBg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                    {card.sub}
                  </span>
                </div>
                <div className="relative z-10">
                  <p className="font-display text-2xl font-extrabold tracking-tight text-ink-primary sm:text-3xl">
                    {card.label}
                  </p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-secondary sm:text-sm">
                    {card.body}
                  </p>
                </div>
                <Link
                  href={card.href}
                  className={cn(
                    'relative z-10 mt-6 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wide transition-all hover:-translate-y-0.5',
                    toneAccent,
                  )}
                >
                  {card.cta} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
