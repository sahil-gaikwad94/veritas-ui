'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Atom,
  CalendarClock,
  Check,
  Code2,
  Database,
  FlaskConical,
  LineChart,
  ShieldCheck,
  Sigma,
} from 'lucide-react';
import { cartridges } from '@/lib/site';
import { cn } from '@/lib/utils';
import { SectionHeading } from '@/components/site/section';
import { CopyButton } from '@/components/ui/copy-button';

const icons: Record<string, typeof LineChart> = {
  quant: LineChart,
  sql: Database,
  sec: ShieldCheck,
  or_sched: CalendarClock,
  stat: Sigma,
  phys: Atom,
  chem: FlaskConical,
  code: Code2,
};

const KEYWORDS = /\b(def|return|from|import|lambda|forall|require|derive|prefer|True|False|None|and|or|not|if|in)\b/;

function renderCodeLine(line: string, key: number) {
  const hashIndex = findCommentIndex(line);
  const codePart = hashIndex >= 0 ? line.slice(0, hashIndex) : line;
  const comment = hashIndex >= 0 ? line.slice(hashIndex) : '';
  const tokens = codePart.split(/("[^"]*"|\b\d+\.?\d*\b|\w+|\s+|[^\w\s])/g).filter(Boolean);

  return (
    <div key={key} className="whitespace-pre">
      {tokens.map((token, i) => {
        let className = 'text-slate-300';
        if (KEYWORDS.test(token)) className = 'text-violet-300';
        else if (/^"/.test(token)) className = 'text-emerald-300';
        else if (/^\d/.test(token)) className = 'text-amber-200';
        else if (/^(require|derive|prefer|forall)$/.test(token)) className = 'text-sky-300';
        return (
          <span key={i} className={className}>
            {token}
          </span>
        );
      })}
      {comment && <span className="text-slate-400">{comment}</span>}
    </div>
  );
}

function findCommentIndex(line: string) {
  let inString = false;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '"' && line[i - 1] !== '\\') inString = !inString;
    if (!inString && line[i] === '#') return i;
  }
  return -1;
}

export function CartridgesShowcase() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const cartridge = cartridges[active];
  const Icon = icons[cartridge.id] ?? LineChart;

  return (
    <section id="cartridges" className="section-y">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Domain cartridges"
            title="Reasoning that knows your domain."
            description="Composable constraint modules for the fields where “roughly right” is wrong. Each one is a deterministic reference implementation — no NumPy, Z3 or SymPy required."
          />
          <Link
            href="/docs/cartridges/overview"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-subtle bg-bg-elevated px-4 py-2 text-[13px] font-semibold text-ink-primary transition-colors hover:border-border-cobalt"
          >
            All 8 cartridges
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-8 grid gap-3.5 sm:mt-10 lg:grid-cols-[300px_1fr] lg:gap-5">
          {/* selector */}
          <div
            role="tablist"
            aria-label="Cartridges"
            className="snap-row no-scrollbar pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0"
          >
            {cartridges.map((c, i) => {
              const CIcon = icons[c.id] ?? LineChart;
              const selected = i === active;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  className={cn(
                    'group flex shrink-0 snap-start items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all lg:w-full',
                    selected
                      ? 'border-border-cobalt bg-bg-elevated shadow-[var(--vt-shadow-card)]'
                      : 'border-transparent hover:bg-bg-elevated/60',
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors',
                      selected ? 'text-white' : 'bg-bg-subtle text-ink-muted group-hover:text-ink-secondary',
                    )}
                    style={selected ? { backgroundColor: c.accent } : undefined}
                  >
                    <CIcon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        'block whitespace-nowrap text-[12.5px] font-semibold lg:whitespace-normal',
                        selected ? 'text-ink-primary' : 'text-ink-secondary',
                      )}
                    >
                      {c.label}
                    </span>
                    <span className="mt-0.5 hidden font-mono text-[10px] text-ink-muted lg:block">
                      {c.blurb}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* panel */}
          <div className="lift overflow-hidden rounded-[28px] border border-border-subtle bg-bg-elevated shadow-[var(--vt-shadow-card)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={cartridge.id}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border-subtle p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <span
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: cartridge.accent }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-[1.05rem] font-semibold text-ink-primary">{cartridge.label}</h3>
                      <p className="mt-0.5 max-w-xl text-[12.5px] leading-relaxed text-ink-secondary">
                        {cartridge.description}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-border-subtle bg-bg-subtle px-2 py-1 font-mono text-[9.5px] text-ink-muted">
                    cartridges/{cartridge.id}.py
                  </span>
                </div>

                <div className="grid gap-0 md:grid-cols-[1fr_220px]">
                  <div className="relative overflow-hidden border-b border-white/10 bg-term-bg md:border-b-0 md:border-r">
                    <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-slate-400">
                        spec sketch
                      </span>
                      <CopyButton
                        value={cartridge.code}
                        size="sm"
                        className="h-6 border-0 bg-transparent px-1.5 py-0 text-slate-400 shadow-none hover:text-white"
                      />
                    </div>
                    <div className="overflow-x-auto p-3 font-mono text-[10px] leading-[1.85] [mask-image:linear-gradient(to_right,#000_93%,transparent)] sm:text-[11px] lg:[mask-image:none]">
                      {cartridge.code.split('\n').map((line, i) => renderCodeLine(line, i))}
                    </div>
                  </div>

                  <div className="p-3.5">
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-muted">
                      what gets checked
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {cartridge.checks.map((check) => (
                        <li key={check} className="flex items-start gap-1.5 text-[11.5px] leading-snug text-ink-secondary">
                          <Check className="mt-0.5 h-3 w-3 shrink-0 text-verify-pass" />
                          {check}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/docs/cartridges/${cartridge.slug}`}
                      className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] font-medium text-cobalt-600 hover:underline dark:text-cobalt-300"
                    >
                      read the guide <ArrowRight className="h-2.5 w-2.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-4 text-center text-[11.5px] text-ink-muted">
          Cartridges compose: run portfolio math, SQL safety and IAM policy checks on the same verified
          object — no extra dependencies, no second source of truth.
        </p>
      </div>
    </section>
  );
}
