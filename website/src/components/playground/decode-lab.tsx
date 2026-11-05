'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Copy,
  Download,
  Gauge,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import {
  ASSETS,
  allocate,
  buildInspectorTrace,
  buildTrace,
  decodedJson,
  preflightFor,
  statsFor,
  type Frame,
} from '@/lib/decode-sim';
import { cn } from '@/lib/utils';
import { copyText } from '@/components/site/copy-command';

const SPEC_LINES = [
  { code: '@verified_schema(solver="auto")', field: 'root' },
  { code: 'def portfolio(p: Portfolio):', field: 'root' },
  { code: '    require(keys_subset(p.weights, ASSETS))', field: 'weights' },
  { code: '    require(sum(p.weights.values()) == 1.0, tol=1e-6)', field: 'weights' },
  { code: '    require(forall(p.weights.values(), lambda w: 0.05 <= w <= 0.50))', field: 'weights' },
  { code: '    derive(p.expected_return == dot(p.weights, RETURNS))', field: 'expected_return' },
  { code: '    derive(p.volatility == sqrt(quad_form(p.weights, COV)))', field: 'volatility' },
  { code: '    derive(p.sharpe == (p.expected_return - 0.04) / p.volatility)', field: 'sharpe' },
  { code: '    require(p.sharpe >= 0.55)', field: 'sharpe' },
];

const presets = [
  { id: 'conservative', label: 'Conservative', cap: 0.15, ceiling: 0.22, hint: 'σ 0.198 · SAT' },
  { id: 'balanced', label: 'Balanced', cap: 0.25, ceiling: 0.22, hint: 'σ 0.204 · SAT' },
  { id: 'infeasible', label: 'Break it', cap: 0.5, ceiling: 0.22, hint: 'σ 0.230 · UNSAT' },
];

function Card({
  title,
  right,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated shadow-[var(--vt-shadow-card)]',
        className,
      )}
    >
      {title && (
        <div className="flex items-center justify-between gap-3 border-b border-border-subtle px-4 py-2.5">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">{title}</h2>
          {right}
        </div>
      )}
      <div className={cn('p-4', bodyClassName)}>{children}</div>
    </div>
  );
}

function StatusChip({ ok, label }: { ok: boolean; label?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.08em]',
        ok ? 'bg-verify-pass/10 text-verify-pass' : 'bg-rose-500/10 text-verify-fail',
      )}
    >
      {ok ? <Check className="h-2.5 w-2.5" /> : <X className="h-2.5 w-2.5" />}
      {label ?? (ok ? 'pass' : 'fail')}
    </span>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-3">
        <span className="text-[11.5px] font-medium text-ink-secondary">{label}</span>
        <span className="rounded border border-border-subtle bg-bg-subtle px-1.5 py-0.5 font-mono text-[10.5px] tabular-nums text-ink-primary">
          {display}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-bg-subtle accent-cobalt-600 outline-offset-4"
        style={{
          background: `linear-gradient(to right, #1e5eff ${((value - min) / (max - min)) * 100}%, var(--vt-subtle) ${((value - min) / (max - min)) * 100}%)`,
        }}
      />
    </label>
  );
}

export function DecodeLab() {
  const [cap, setCap] = useState(0.25);
  const [ceiling, setCeiling] = useState(0.22);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [copied, setCopied] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  const weights = useMemo(() => allocate(cap), [cap]);
  const stats = useMemo(() => statsFor(weights), [weights]);
  const preflight = useMemo(() => preflightFor(weights, stats, ceiling), [weights, stats, ceiling]);
  const feasible = preflight.status === 'SAT';
  const frames = useMemo(
    () => (feasible ? buildTrace(weights, stats, cap) : []),
    [feasible, weights, stats, cap],
  );

  const total = frames.length;
  const current = step > 0 && step <= total ? frames[step - 1] : null;
  const done = total > 0 && step >= total;

  // reset when the knobs move
  useEffect(() => {
    setStep(0);
    setPlaying(false);
  }, [cap, ceiling]);

  // gentle autoplay on first load
  const started = useRef(false);
  useEffect(() => {
    if (started.current || !feasible || total === 0) return;
    started.current = true;
    const t = setTimeout(() => setPlaying(true), 700);
    return () => clearTimeout(t);
  }, [feasible, total]);

  useEffect(() => {
    if (!playing) return;
    if (step >= total) {
      setPlaying(false);
      return;
    }
    const frame = frames[step];
    const base = frame?.kind === 'mask' ? 420 : frame?.kind === 'splice' ? 520 : 150;
    const timer = setTimeout(() => setStep((s) => Math.min(total, s + 1)), base / speed);
    return () => clearTimeout(timer);
  }, [playing, step, total, frames, speed]);

  useEffect(() => {
    const el = logRef.current?.querySelector('[data-active="true"]');
    if (el && logRef.current) {
      const parent = logRef.current;
      const top = (el as HTMLElement).offsetTop;
      if (top < parent.scrollTop || top > parent.scrollTop + parent.clientHeight - 48) {
        parent.scrollTo({ top: top - 48, behavior: 'smooth' });
      }
    }
  }, [step]);

  const sampled = frames.slice(0, step).filter((f) => f.kind === 'sample' && f.token.trim()).length;
  const spliced = frames
    .slice(0, step)
    .filter((f) => f.kind === 'splice')
    .reduce((sum, f) => sum + f.tokenCount, 0);
  const maskedCandidates = frames
    .slice(0, step)
    .reduce((sum, f) => sum + (f.kind === 'sample' ? f.masked : 0), 0);
  const lastInterval = [...frames.slice(0, step)].reverse().find((f) => f.interval)?.interval;

  const reset = useCallback(() => {
    setStep(0);
    setPlaying(false);
  }, []);

  const copyJson = async () => {
    if (await copyText(decodedJson(weights, stats))) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  const downloadTrace = () => {
    const payload = buildInspectorTrace(frames, weights, stats, ceiling);
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vexx-trace.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* presets + knobs summary */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {presets.map((p) => {
            const active = cap === p.cap && ceiling === p.ceiling;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setCap(p.cap);
                  setCeiling(p.ceiling);
                }}
                className={cn(
                  'group rounded-full border px-3 py-1.5 text-left transition-all',
                  active
                    ? 'border-border-cobalt bg-bg-elevated shadow-sm'
                    : 'border-border-subtle bg-bg-elevated/60 hover:border-border-cobalt',
                  p.id === 'infeasible' && 'border-rose-500/25',
                )}
              >
                <span
                  className={cn(
                    'block text-[11.5px] font-semibold',
                    p.id === 'infeasible'
                      ? 'text-verify-fail'
                      : active
                        ? 'text-ink-primary'
                        : 'text-ink-secondary',
                  )}
                >
                  {p.id === 'infeasible' && <AlertTriangle className="mr-1 inline h-3 w-3" />}
                  {p.label}
                </span>
                <span className="block font-mono text-[9px] text-ink-muted">{p.hint}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-ink-muted">
          <span className={cn('h-1.5 w-1.5 rounded-full', feasible ? 'bg-verify-pass' : 'bg-rose-500')} />
          {feasible ? 'preflight SAT · ready to decode' : 'preflight UNSAT · decode refused'}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* ---------------- main column ---------------- */}
        <div className="min-w-0 space-y-4">
          {/* decode stream */}
          <Card
            title="decoded stream"
            right={
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={copyJson}
                  className="inline-flex h-6 items-center gap-1 rounded-full border border-border-subtle px-2 font-mono text-[9px] text-ink-muted transition-colors hover:text-ink-primary"
                >
                  {copied ? <Check className="h-2.5 w-2.5 text-verify-pass" /> : <Copy className="h-2.5 w-2.5" />}
                  {copied ? 'copied' : 'json'}
                </button>
                <button
                  type="button"
                  onClick={downloadTrace}
                  disabled={!feasible}
                  className="inline-flex h-6 items-center gap-1 rounded-full border border-border-subtle px-2 font-mono text-[9px] text-ink-muted transition-colors hover:text-ink-primary disabled:opacity-40"
                >
                  <Download className="h-2.5 w-2.5" /> trace
                </button>
              </div>
            }
            bodyClassName="p-0"
          >
            {feasible ? (
              <>
                <div className="relative min-h-[260px] overflow-x-auto bg-term-bg p-4 font-mono text-[11px] leading-[1.85] sm:p-5 sm:text-[12.5px]">
                  <pre className="whitespace-pre-wrap break-words text-slate-400">
                    {frames.map((f, i) => {
                      if (f.kind === 'mask' || f.kind === 'verify') return null;
                      const visible = i < step;
                      if (!visible) return null;
                      const isCurrent = i === step - 1;
                      return (
                        <span
                          key={f.id}
                          className={cn(
                            'rounded-[2px] transition-colors',
                            f.kind === 'splice'
                              ? 'bg-emerald-500/10 text-emerald-300'
                              : 'text-sky-100',
                            isCurrent && 'bg-cobalt-500/40 text-white ring-1 ring-cobalt-400/60',
                          )}
                        >
                          {f.token}
                        </span>
                      );
                    })}
                    {!done && (
                      <span className="inline-block h-3.5 w-1.5 translate-y-0.5 animate-blink bg-cobalt-400" />
                    )}
                  </pre>

                  {step === 0 && (
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-term-bg/40">
                      <button
                        type="button"
                        onClick={() => setPlaying(true)}
                        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-sans text-[12px] font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" /> Start decode
                      </button>
                      <span className="font-sans text-[10px] text-slate-400">
                        or drag the timeline below
                      </span>
                    </div>
                  )}

                  {done && (
                    <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-white/10 pt-3">
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9.5px] text-emerald-300">
                        <ShieldCheck className="h-2.5 w-2.5" /> verification PASS
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-sky-500/10 px-1.5 py-0.5 text-[9.5px] text-sky-300">
                        <Zap className="h-2.5 w-2.5" /> {spliced} tokens spliced
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-white/5 px-1.5 py-0.5 text-[9.5px] text-slate-400">
                        witness sha-256 ready
                      </span>
                    </div>
                  )}
                </div>

                {/* controls */}
                <div className="border-t border-border-subtle px-3 py-3 sm:px-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPlaying((p) => !p)}
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-cobalt-500 to-cobalt-700 text-white shadow-[var(--vt-shadow-cobalt)] transition-transform hover:scale-105"
                      aria-label={playing ? 'Pause decode' : 'Play decode'}
                    >
                      {playing ? (
                        <Pause className="h-3.5 w-3.5 fill-current" />
                      ) : (
                        <Play className="h-3.5 w-3.5 translate-x-[1px] fill-current" />
                      )}
                    </button>
                    <div className="flex shrink-0 items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => setStep((s) => Math.max(0, s - 1))}
                        disabled={step === 0}
                        aria-label="Previous step"
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-bg-subtle hover:text-ink-primary disabled:opacity-30"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep((s) => Math.min(total, s + 1))}
                        disabled={step === total}
                        aria-label="Next step"
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-bg-subtle hover:text-ink-primary disabled:opacity-30"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={reset}
                        aria-label="Reset decode"
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-bg-subtle hover:text-ink-primary"
                      >
                        <RotateCcw className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="relative min-w-0 flex-1">
                      <input
                        type="range"
                        min={0}
                        max={total}
                        step={1}
                        value={step}
                        onChange={(e) => {
                          setPlaying(false);
                          setStep(Number(e.target.value));
                        }}
                        aria-label="Decode timeline"
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-bg-subtle accent-cobalt-600"
                        style={{
                          background: `linear-gradient(to right, #1e5eff ${(step / Math.max(total, 1)) * 100}%, var(--vt-subtle) ${(step / Math.max(total, 1)) * 100}%)`,
                        }}
                      />
                    </div>

                    <span className="shrink-0 font-mono text-[9.5px] tabular-nums text-ink-muted">
                      {step}/{total}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSpeed((s) => (s === 1 ? 2 : s === 2 ? 0.5 : 1))}
                      className="shrink-0 rounded border border-border-subtle px-1.5 py-0.5 font-mono text-[9.5px] text-ink-muted transition-colors hover:text-ink-primary"
                      aria-label="Playback speed"
                    >
                      {speed}×
                    </button>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[
                      { k: 'sampled', v: `${sampled}`, tone: 'text-ink-primary' },
                      { k: 'spliced', v: `${spliced}`, tone: 'text-verify-pass' },
                      { k: 'masked', v: `${maskedCandidates}`, tone: 'text-verify-warn' },
                    ].map((m) => (
                      <div key={m.k} className="rounded-lg border border-border-subtle bg-bg-subtle/50 px-2 py-1.5">
                        <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-ink-muted">{m.k}</p>
                        <p className={cn('font-mono text-[12px] font-semibold tabular-nums', m.tone)}>{m.v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-term-bg p-5 sm:p-7">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400">
                    <AlertTriangle className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-rose-400">
                      InfeasibleSpecError · preflight UNSAT
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-300">
                      The spec is contradictory before generation starts. Vexx spends{' '}
                      <span className="font-semibold text-white">zero LLM tokens</span> to tell you the risk
                      ceiling and the concentration cap cannot both hold.
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {preflight.conflicts.map((c) => (
                    <div key={c.constraint} className="rounded-xl border border-rose-500/25 bg-rose-500/[0.06] p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-[10.5px] text-rose-300">{c.constraint}</span>
                        <span className="font-mono text-[10px] text-rose-400">{c.detail}</span>
                      </div>
                      <p className="mt-1.5 flex items-start gap-1.5 text-[11.5px] leading-relaxed text-slate-400">
                        <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-amber-400" />
                        {c.relaxation}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCap(0.25);
                    setCeiling(0.22);
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-2 font-sans text-[11.5px] font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <RotateCcw className="h-3 w-3" /> Restore a feasible spec
                </button>
              </div>
            )}
          </Card>

          {/* spec + trace */}
          <div className="grid gap-4 xl:grid-cols-2">
            <Card title="compiled spec" bodyClassName="p-0">
              <div
                tabIndex={0}
                role="region"
                aria-label="Decoded token stream"
                className="overflow-x-auto bg-term-bg p-3.5 font-mono text-[10.5px] leading-[1.95] sm:text-[11.5px]"
              >
                {SPEC_LINES.map((line, i) => {
                  const fieldMatch =
                    current &&
                    (current.field === line.field ||
                      (line.field === 'sharpe' && current.field === 'sharpe') ||
                      (line.field === 'weights' && current.field.startsWith('weights')));
                  const active =
                    current?.field === line.field ||
                    (line.field === 'weights' && current?.field.startsWith('weights')) ||
                    (line.field === 'root' && current?.field === 'root') ||
                    (line.field === 'verify' && current?.field === 'verify');
                  const isMatch = active || (current?.field === 'verify' && i === SPEC_LINES.length - 1);
                  return (
                    <div
                      key={i}
                      className={cn(
                        'flex gap-2 whitespace-pre rounded px-1 transition-colors',
                        isMatch && current?.field !== 'verify' && 'bg-sky-500/10',
                      )}
                    >
                      <span className="select-none text-slate-400/80">{String(i + 1).padStart(2, '0')}</span>
                      <span
                        className={cn(
                          line.code.includes('require')
                            ? 'text-sky-300'
                            : line.code.includes('derive')
                              ? 'text-emerald-300'
                              : 'text-slate-300',
                        )}
                      >
                        {line.code}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card
              title="step inspector"
              right={
                current ? (
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide',
                      current.kind === 'splice'
                        ? 'bg-verify-pass/10 text-verify-pass'
                        : current.kind === 'mask'
                          ? 'bg-amber-500/10 text-verify-warn'
                          : current.kind === 'verify'
                            ? 'bg-cobalt-500/10 text-cobalt-600 dark:text-cobalt-300'
                            : 'bg-bg-subtle text-ink-muted',
                    )}
                  >
                    {current.kind}
                  </span>
                ) : null
              }
            >
              {current ? (
                <div className="space-y-3">
                  <p className="min-h-[52px] text-[12px] leading-relaxed text-ink-secondary">{current.note}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-border-subtle bg-bg-subtle/50 px-2 py-1.5">
                      <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-ink-muted">field</p>
                      <p className="truncate font-mono text-[10.5px] text-ink-primary">{current.field}</p>
                    </div>
                    <div className="rounded-lg border border-border-subtle bg-bg-subtle/50 px-2 py-1.5">
                      <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-ink-muted">token</p>
                      <p className="truncate font-mono text-[10.5px] text-ink-primary">
                        {current.token.trim() ? JSON.stringify(current.token) : '—'}
                      </p>
                    </div>
                    <div className="rounded-lg border border-border-subtle bg-bg-subtle/50 px-2 py-1.5">
                      <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-ink-muted">
                        interval
                      </p>
                      <p className="font-mono text-[10.5px] text-ink-primary">
                        {current.interval
                          ? `[${current.interval[0].toFixed(3)}, ${current.interval[1].toFixed(3)}]`
                          : (lastInterval
                            ? `[${lastInterval[0].toFixed(3)}, ${lastInterval[1].toFixed(3)}]`
                            : '—')}
                      </p>
                    </div>
                    <div className="rounded-lg border border-border-subtle bg-bg-subtle/50 px-2 py-1.5">
                      <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-ink-muted">
                        entropy
                      </p>
                      <p className="flex items-center gap-1.5 font-mono text-[10.5px] text-ink-primary">
                        {current.entropy.toFixed(2)}
                        <span className="h-1 flex-1 overflow-hidden rounded-full bg-bg-inset">
                          <span
                            className="block h-full rounded-full bg-cobalt-500"
                            style={{ width: `${Math.max(current.entropy * 100, 2)}%` }}
                          />
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-border-subtle pt-2 font-mono text-[9.5px] text-ink-muted">
                    <span>allowed {current.allowed}</span>
                    <span>masked {current.masked}</span>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[112px] flex-col items-center justify-center text-center">
                  <CircleHelp className="h-5 w-5 text-ink-muted" />
                  <p className="mt-2 text-[12px] text-ink-secondary">No step selected</p>
                  <p className="mt-0.5 font-mono text-[10px] text-ink-muted">press play to inspect tokens</p>
                </div>
              )}
            </Card>
          </div>

          {/* trace log */}
          <Card
            title="trace log"
            right={<span className="font-mono text-[9px] text-ink-muted">{total} steps</span>}
            bodyClassName="p-0"
          >
            <div ref={logRef} className="max-h-[248px] overflow-y-auto">
              {feasible ? (
                frames.map((f, i) => (
                  <button
                    key={f.id}
                    type="button"
                    data-active={i === step - 1}
                    onClick={() => {
                      setPlaying(false);
                      setStep(i + 1);
                    }}
                    className={cn(
                      'flex w-full items-center gap-2 border-b border-border-subtle px-3 py-2 text-left transition-colors last:border-0',
                      i === step - 1 ? 'bg-cobalt-500/[0.07]' : 'hover:bg-bg-subtle/60',
                    )}
                  >
                    <span className="w-6 shrink-0 font-mono text-[9px] text-ink-muted">
                      {String(f.id).padStart(2, '0')}
                    </span>
                    <span
                      className={cn(
                        'w-1.5 shrink-0 self-stretch rounded-full',
                        f.kind === 'splice'
                          ? 'bg-verify-pass/70'
                          : f.kind === 'mask'
                            ? 'bg-amber-500/70'
                            : f.kind === 'verify'
                              ? 'bg-cobalt-500/70'
                              : 'bg-border-strong',
                      )}
                    />
                    <span className="w-14 shrink-0 font-mono text-[9px] uppercase text-ink-muted">
                      {f.kind}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-mono text-[10px] text-ink-secondary">
                      {f.token.trim() ? f.token.replace(/\n/g, '⏎') : f.note}
                    </span>
                    <span className="hidden shrink-0 font-mono text-[9px] text-ink-muted sm:block">
                      {f.field}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-6 text-center font-mono text-[10.5px] text-ink-muted">
                  no trace — preflight refused this spec
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* ---------------- sidebar ---------------- */}
        <aside className="min-w-0 space-y-4">
          <Card title="knobs · live spec">
            <div className="space-y-4">
              <RangeField
                label="NVDA concentration cap"
                value={cap}
                min={0.05}
                max={0.5}
                step={0.01}
                display={cap.toFixed(2)}
                onChange={setCap}
              />
              <RangeField
                label="Risk ceiling σ"
                value={ceiling}
                min={0.15}
                max={0.32}
                step={0.005}
                display={ceiling.toFixed(3)}
                onChange={setCeiling}
              />
              <div className="grid grid-cols-3 gap-2 border-t border-border-subtle pt-3">
                {[
                  { k: 'E[r]', v: stats.expectedReturn.toFixed(4) },
                  { k: 'σ', v: stats.volatility.toFixed(4) },
                  { k: 'sharpe', v: stats.sharpe.toFixed(4) },
                ].map((m) => (
                  <div key={m.k}>
                    <p className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-ink-muted">{m.k}</p>
                    <p className="font-mono text-[10.5px] tabular-nums text-ink-primary">{m.v}</p>
                  </div>
                ))}
              </div>
              <p className="flex items-start gap-1.5 text-[10.5px] leading-relaxed text-ink-muted">
                <Gauge className="mt-0.5 h-3 w-3 shrink-0" />
                Arithmetic is real: wᵀΣw over the covariance matrix, not a canned animation. The decode
                replay is deterministic.
              </p>
            </div>
          </Card>

          <Card
            title="preflight"
            right={<StatusChip ok={feasible} label={preflight.status} />}
          >
            <ul className="space-y-2">
              {preflight.checks.map((c) => (
                <li key={c.label} className="flex items-start gap-2">
                  <span
                    className={cn(
                      'mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full',
                      c.ok ? 'bg-verify-pass/10 text-verify-pass' : 'bg-rose-500/10 text-verify-fail',
                    )}
                  >
                    {c.ok ? <Check className="h-2.5 w-2.5" /> : <X className="h-2.5 w-2.5" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-medium text-ink-secondary">{c.label}</span>
                    <span className="block font-mono text-[9.5px] leading-snug text-ink-muted">{c.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
            {!feasible && preflight.relaxation && (
              <p className="mt-3 rounded-lg border border-rose-500/20 bg-rose-500/[0.06] p-2 font-mono text-[9.5px] leading-relaxed text-verify-fail">
                relaxation: {preflight.relaxation}
              </p>
            )}
            <p className="mt-3 border-t border-border-subtle pt-2 font-mono text-[9px] text-ink-muted">
              {feasible ? '0 LLM tokens spent · 4.1 ms' : 'spec rejected before any GPU work'}
            </p>
          </Card>

          <Card title="constraints">
            <ul className="space-y-2.5">
              {[
                {
                  label: 'keys_subset(weights, ASSETS)',
                  value: '3 / 3',
                  ok: true,
                },
                {
                  label: 'sum(weights) == 1.0',
                  value: ASSETS.reduce((s, a) => s + weights[a], 0).toFixed(6),
                  ok: Math.abs(ASSETS.reduce((s, a) => s + weights[a], 0) - 1) < 1e-9,
                },
                {
                  label: '0.05 ≤ w ≤ 0.50',
                  value: `max ${Math.max(...ASSETS.map((a) => weights[a])).toFixed(2)}`,
                  ok: ASSETS.every((a) => weights[a] >= 0.05 && weights[a] <= 0.5),
                },
                {
                  label: 'expected_return == dot(...)',
                  value: stepsSpliced(frames, step, 'expected_return')
                    ? stats.expectedReturn.toFixed(4)
                    : 'derived',
                  ok: true,
                  derived: true,
                },
                {
                  label: 'volatility == sqrt(quad_form)',
                  value: stepsSpliced(frames, step, 'volatility')
                    ? stats.volatility.toFixed(4)
                    : 'derived',
                  ok: true,
                  derived: true,
                },
                {
                  label: 'sharpe ≥ 0.55',
                  value: stats.sharpe.toFixed(4),
                  ok: stats.sharpe >= 0.55,
                },
              ].map((c) => (
                <li key={c.label} className="flex items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-1.5">
                    {c.derived ? (
                      <Zap className="h-3 w-3 shrink-0 text-verify-pass" />
                    ) : (
                      <span
                        className={cn(
                          'h-1.5 w-1.5 shrink-0 rounded-full',
                          c.ok ? 'bg-verify-pass' : 'bg-rose-500',
                        )}
                      />
                    )}
                    <span className="truncate font-mono text-[9.5px] text-ink-secondary">{c.label}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[9.5px] tabular-nums text-ink-muted">{c.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-center gap-1.5 border-t border-border-subtle pt-2 font-mono text-[9px] text-ink-muted">
              <Zap className="h-2.5 w-2.5 text-verify-pass" /> derived fields are spliced, never sampled
            </p>
          </Card>

          <div className="rounded-2xl border border-border-cobalt bg-cobalt-500/[0.05] p-3.5">
            <p className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-cobalt-700 dark:text-cobalt-300">
              <Sparkles className="h-3 w-3" /> how this page runs
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-ink-secondary">
              This is a deterministic replay of the engine&apos;s decision sequence. The real{' '}
              <code className="font-mono text-[10px]">vexx-wasm</code> core can be compiled from the
              repository and dropped into this page.
            </p>
            <Link
              href="/docs/api-reference/wasm-browser-api"
              className="mt-2 inline-flex items-center gap-1 font-mono text-[9.5px] font-medium text-cobalt-600 hover:underline dark:text-cobalt-300"
            >
              WASM browser API <ArrowRight className="h-2.5 w-2.5" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function stepsSpliced(frames: Frame[], step: number, field: string) {
  return frames.slice(0, step).some((f) => f.kind === 'splice' && f.field === field);
}
