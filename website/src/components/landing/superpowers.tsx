'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, GitBranch, Layers, ShieldCheck, Sparkles, X, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SectionHeading } from '@/components/site/section';
import { Reveal } from '@/components/site/reveal';

function CardShell({
  children,
  className,
  kicker,
  title,
  body,
  metric,
  href,
}: {
  children?: React.ReactNode;
  className?: string;
  kicker: string;
  title: string;
  body: string;
  metric: string;
  href: string;
}) {
  return (
    <Reveal className={cn('h-full', className)}>
      <Link
        href={href}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated p-5 shadow-[var(--vt-shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:border-border-cobalt hover:shadow-[var(--vt-shadow-lift)] sm:p-6"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-cobalt-500/[0.07] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="relative flex items-start justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cobalt-600 dark:text-cobalt-300">
            {kicker}
          </p>
          <span className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-bg-subtle px-2 py-0.5 font-mono text-[9.5px] text-ink-muted">
            {metric}
            <ArrowUpRight className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
        </div>

        {children && <div className="relative mt-4">{children}</div>}

        <div className="relative mt-auto pt-5">
          <h3 className="text-[1.02rem] font-semibold leading-snug tracking-tight text-ink-primary">{title}</h3>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-secondary">{body}</p>
        </div>
      </Link>
    </Reveal>
  );
}

function DofVisual() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border-subtle bg-bg-subtle/50 p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1.5">
          {['AAPL', 'MSFT', 'NVDA'].map((a) => (
            <div key={a} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cobalt-500" />
              <span className="font-mono text-[10px] text-ink-secondary">{a}</span>
            </div>
          ))}
        </div>
        <svg width="46" height="58" viewBox="0 0 46 58" fill="none" className="shrink-0 text-border-strong">
          <path d="M2 8h16c6 0 10 4 10 8v4" stroke="currentColor" strokeDasharray="2 3" />
          <path d="M2 29h26" stroke="currentColor" strokeDasharray="2 3" />
          <path d="M2 50h16c6 0 10-4 10-8v-4" stroke="currentColor" strokeDasharray="2 3" />
        </svg>
        <div className="space-y-1.5">
          {['expected_return', 'volatility', 'sharpe'].map((k) => (
            <div
              key={k}
              className="flex items-center gap-1.5 rounded-md border border-verify-pass/25 bg-verify-pass/10 px-1.5 py-0.5"
            >
              <Check className="h-2.5 w-2.5 text-verify-pass" />
              <span className="font-mono text-[9.5px] text-verify-pass">{k}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2.5 flex items-center gap-1.5 border-t border-border-subtle pt-2">
        <Zap className="h-3 w-3 text-verify-pass" />
        <span className="font-mono text-[9.5px] text-ink-muted">
          computed, not sampled · 24 tokens spliced
        </span>
      </div>
    </div>
  );
}

function CraneVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="rounded-xl border border-border-subtle bg-term-bg p-3">
      <div className="flex items-center gap-1.5 font-mono text-[10px]">
        <span className="rounded bg-violet-500/15 px-1.5 py-0.5 text-violet-300">&lt;think&gt;</span>
        <span className="flex-1 border-b border-dashed border-white/15" />
        <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-emerald-300">&lt;emit&gt;</span>
      </div>
      <div className="relative mt-3 h-1 rounded-full bg-white/10">
        <motion.span
          className="absolute -top-1 h-3 w-3 rounded-full bg-cobalt-400 shadow-[0_0_12px_rgba(75,131,255,0.9)]"
          animate={reduce ? { left: '60%' } : { left: ['8%', '48%', '48%', '8%'] }}
          transition={{ duration: 5, repeat: reduce ? 0 : Infinity, ease: 'easeInOut', times: [0, 0.35, 0.75, 1] }}
        />
      </div>
      <p className="mt-2.5 font-mono text-[9.5px] text-slate-400">
        free-form reasoning → strict grammar + solver
      </p>
    </div>
  );
}

function CdclVisual() {
  return (
    <div className="rounded-xl border border-border-subtle bg-bg-subtle/50 p-3">
      <div className="flex items-center gap-1">
        {['{', 'w', ':', '0', '.', '3', '0'].map((t, i) => (
          <span
            key={i}
            className={cn(
              'inline-flex h-5 min-w-5 items-center justify-center rounded font-mono text-[9.5px]',
              i >= 4
                ? 'border border-rose-500/30 bg-rose-500/10 text-verify-fail line-through'
                : 'border border-border-subtle bg-bg-elevated text-ink-secondary',
            )}
          >
            {t}
          </span>
        ))}
        <span className="ml-auto inline-flex items-center gap-1 rounded bg-amber-500/10 px-1.5 py-0.5 font-mono text-[9px] text-verify-warn">
          ↺ rewind 3
        </span>
      </div>
      <div className="mt-2 flex items-center gap-1.5 border-t border-border-subtle pt-2">
        <span className="h-1 w-1 rounded-full bg-verify-warn" />
        <span className="font-mono text-[9.5px] text-ink-muted">
          cut w<sub>NVDA</sub> ≤ 0.28 · tabu prefix stored
        </span>
      </div>
    </div>
  );
}

function ProofVisual() {
  return (
    <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
      <div className="rounded-xl border border-border-subtle bg-bg-subtle/50 p-3 font-mono text-[9.5px] leading-relaxed">
        <div className="flex justify-between gap-3">
          <span className="text-ink-muted">spec_digest</span>
          <span className="truncate text-ink-secondary">4b81…0c9d</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-ink-muted">witness_sha256</span>
          <span className="truncate text-ink-secondary">9f2c…a71e</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-ink-muted">smt2</span>
          <span className="text-verify-pass">complete</span>
        </div>
      </div>
      <div className="flex items-center justify-center rounded-xl border border-verify-pass/25 bg-verify-pass/[0.07] px-4 py-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-verify-pass">
          <ShieldCheck className="h-3.5 w-3.5" /> verified
        </span>
      </div>
    </div>
  );
}

function PreflightVisual() {
  return (
    <div className="rounded-xl border border-border-subtle bg-bg-subtle/50 p-3">
      <div className="flex items-center justify-between gap-2 font-mono text-[9.5px]">
        <span className="rounded bg-cobalt-500/10 px-1.5 py-0.5 text-cobalt-600 dark:text-cobalt-300">
          compile
        </span>
        <span className="text-ink-muted">→</span>
        <span className="rounded bg-cobalt-500/10 px-1.5 py-0.5 text-cobalt-600 dark:text-cobalt-300">
          contract
        </span>
        <span className="text-ink-muted">→</span>
        <span className="rounded bg-verify-pass/15 px-1.5 py-0.5 text-verify-pass">SAT</span>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-border-subtle pt-2">
        <span className="font-mono text-[9.5px] text-ink-muted">GPU tokens spent</span>
        <span className="font-mono text-[11px] font-semibold text-verify-pass">0</span>
      </div>
    </div>
  );
}

function RlVisual() {
  return (
    <div className="space-y-1.5">
      {[
        { ok: true, label: 'verified completion', tag: 'chosen', value: '+1.00' },
        { ok: false, label: 'UNSAT branch at NVDA', tag: 'rejected', value: '−0.42' },
      ].map((row) => (
        <div
          key={row.label}
          className={cn(
            'flex items-center gap-2 rounded-lg border px-2 py-1.5 font-mono text-[9.5px]',
            row.ok
              ? 'border-verify-pass/25 bg-verify-pass/[0.06]'
              : 'border-rose-500/20 bg-rose-500/[0.05]',
          )}
        >
          {row.ok ? (
            <Check className="h-3 w-3 shrink-0 text-verify-pass" />
          ) : (
            <X className="h-3 w-3 shrink-0 text-verify-fail" />
          )}
          <span className="truncate text-ink-secondary">{row.label}</span>
          <span
            className={cn(
              'ml-auto rounded px-1 uppercase tracking-wide',
              row.ok ? 'text-verify-pass' : 'text-verify-fail',
            )}
          >
            {row.tag}
          </span>
          <span className="text-ink-muted">{row.value}</span>
        </div>
      ))}
      <p className="font-mono text-[9px] text-ink-muted">→ DPO / Process-GRPO pairs, step-level</p>
    </div>
  );
}

export function Superpowers() {
  return (
    <section id="superpowers" className="section-y border-y border-border-subtle bg-bg-inset/50">
      <div className="container-page">
        <SectionHeading
          eyebrow="Beyond constraints"
          title="Six things a regex cannot do."
          description="Grammar masking is a good start and a bad finish. Veritas follows the decode from the first brace to the final receipt — including the arithmetic your schema never sees."
          align="left"
        />

        <div className="mt-9 grid gap-3.5 sm:mt-11 sm:grid-cols-2 lg:grid-cols-3">
          <CardShell
            className="lg:col-span-2"
            kicker="Zero-DoF splicing"
            title="Derived fields cost zero forward passes"
            body="Keys are topologically sorted so inputs precede outputs. When the free variables close, Veritas computes the derived value and splices it into the stream — healing BPE boundaries on the way."
            metric="0 LLM calls"
            href="/docs/engine-internals/zero-dof-jump-forward"
          >
            <DofVisual />
          </CardShell>

          <CardShell
            kicker="CRANE reasoning"
            title="Think freely. Emit strictly."
            body="Reason inside <think> without a grammar lock, then switch to strict solver-guided decoding at <emit>. Candidate equations get mined along the way."
            metric="dual mode"
            href="/docs/engine-internals/crane-dual-mode-reasoning"
          >
            <CraneVisual />
          </CardShell>

          <CardShell
            kicker="CDCL jumpback"
            title="Learn from dead ends"
            body="On UNSAT, an entropy-weighted culprit score finds the earlier field to blame, rewinds the stream and records a half-space cut plus a tabu prefix."
            metric="≤ 8 rewinds"
            href="/docs/engine-internals/cdcl-jumpback-and-domain-cuts"
          >
            <CdclVisual />
          </CardShell>

          <CardShell
            className="lg:col-span-2"
            kicker="Proof certificates"
            title="Ship the receipt with the result"
            body="Every PASS can carry a self-contained certificate: the versioned spec, the witness, an SMT-LIB2 rendering and SHA-256 digests. Verification is offline, tamper-evident and re-evaluates the constraints from the embedded spec."
            metric="SHA-256 · SMT"
            href="/docs/proofs-rl-and-cli/proof-certificates"
          >
            <ProofVisual />
          </CardShell>

          <CardShell
            kicker="Preflight gate"
            title="Fail before the GPU spins"
            body="Contradictory specs are refuted in milliseconds with interval contraction and exact affine reasoning — and they come back with relaxation hints."
            metric="0 tokens"
            href="/docs/authoring-schemas/preflight-sat-gate"
          >
            <PreflightVisual />
          </CardShell>

          <CardShell
            className="lg:col-span-2"
            kicker="RL trajectories"
            title="Every backtrack is training data"
            body="Rejected branches and verified completions become step-level preference pairs you can export straight into a fine-tuning pipeline — free supervision from your own decode traces."
            metric="DPO · GRPO"
            href="/docs/proofs-rl-and-cli/rl-trajectory-collector"
          >
            <RlVisual />
          </CardShell>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px] text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" /> 5 engine layers
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GitBranch className="h-3.5 w-3.5" /> dependency-ordered keys
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> verified before return
          </span>
        </div>
      </div>
    </section>
  );
}
