'use client';

import { useEffect, useMemo, useState } from 'react';
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TraceStep {
  step: number;
  field: string;
  token: string;
  kind: 'sample' | 'splice' | 'backtrack' | 'mask';
  notes: string;
  entropy: number;
}

const DEMO_STEPS: TraceStep[] = [
  {
    step: 1,
    field: 'weights.AAPL',
    token: '"0.',
    kind: 'sample',
    notes: 'PDA accepts the numeric prefix; HC4 interval is [0.05, 0.50].',
    entropy: 0.14,
  },
  {
    step: 2,
    field: 'weights.AAPL',
    token: '4"',
    kind: 'sample',
    notes: 'Digit 4 narrows the interval to [0.40, 0.49]. Alternatives masked.',
    entropy: 0.07,
  },
  {
    step: 3,
    field: 'weights.NVDA',
    token: '0.3',
    kind: 'mask',
    notes: 'Σ residual is 0.25, so a 0.3 prefix is outside the simplex — masked.',
    entropy: 0.0,
  },
  {
    step: 4,
    field: 'expected_return',
    token: '0.1615',
    kind: 'splice',
    notes: 'Zero-DoF: dot(weights, RETURNS) computed and spliced. 0 forward passes.',
    entropy: 0.0,
  },
  {
    step: 5,
    field: 'volatility',
    token: '0.2043',
    kind: 'splice',
    notes: 'Zero-DoF: sqrt(wᵀΣw) via the affine contractor.',
    entropy: 0.0,
  },
  {
    step: 6,
    field: 'sharpe',
    token: '0.5945',
    kind: 'splice',
    notes: 'Zero-DoF: (E[r] − 0.04) / σ, with BPE boundary healing.',
    entropy: 0.0,
  },
];

const kindStyles = {
  sample: { label: 'sample', dot: 'bg-cobalt-500', text: 'text-cobalt-600 dark:text-cobalt-300' },
  splice: { label: 'splice', dot: 'bg-verify-pass', text: 'text-verify-pass' },
  backtrack: { label: 'backtrack', dot: 'bg-verify-warn', text: 'text-verify-warn' },
  mask: { label: 'masked', dot: 'bg-rose-500', text: 'text-verify-fail' },
} as const;

export function InteractiveTraceViewer({
  steps: initialSteps,
  autoPlay = false,
  speed = 1200,
}: {
  steps?: TraceStep[];
  autoPlay?: boolean;
  speed?: number;
}) {
  const steps = useMemo(
    () => (initialSteps && initialSteps.length ? initialSteps : DEMO_STEPS),
    [initialSteps],
  );
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!playing) return;
    if (index >= steps.length - 1) {
      const stop = setTimeout(() => setPlaying(false), speed);
      return () => clearTimeout(stop);
    }
    const timer = setTimeout(() => setIndex((i) => Math.min(steps.length - 1, i + 1)), speed);
    return () => clearTimeout(timer);
  }, [playing, index, steps.length, speed]);

  const current = steps[index];
  const style = kindStyles[current.kind];
  const splices = steps.filter((s) => s.kind === 'splice').length;
  const masked = steps.filter((s) => s.kind === 'mask').length;
  const avgEntropy = steps.reduce((sum, s) => sum + s.entropy, 0) / steps.length;

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-white/10 bg-term-bg text-slate-100 shadow-xl">
      <div className="grid grid-cols-2 border-b border-white/10 bg-term-elevated sm:grid-cols-4">
        {[
          { k: 'steps', v: steps.length },
          { k: 'masked', v: masked },
          { k: 'spliced', v: splices },
          { k: 'avg entropy', v: avgEntropy.toFixed(2) },
        ].map((m) => (
          <div key={m.k} className="border-r border-white/5 px-4 py-3 last:border-0">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-slate-400">{m.k}</p>
            <p className="mt-0.5 font-mono text-base font-semibold">{m.v}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/15"
          aria-label={playing ? 'Pause trace' : 'Play trace'}
        >
          {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          aria-label="Previous step"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/10 disabled:opacity-30"
        >
          <SkipBack className="h-3 w-3" />
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(steps.length - 1, i + 1))}
          disabled={index === steps.length - 1}
          aria-label="Next step"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/10 disabled:opacity-30"
        >
          <SkipForward className="h-3 w-3" />
        </button>
        <button
          type="button"
          onClick={() => {
            setIndex(0);
            setPlaying(false);
          }}
          aria-label="Reset trace"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/10"
        >
          <RotateCcw className="h-3 w-3" />
        </button>

        <div className="ml-1 h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-cobalt-500 transition-all duration-300"
            style={{ width: `${((index + 1) / steps.length) * 100}%` }}
          />
        </div>
        <span className="font-mono text-[9.5px] tabular-nums text-slate-400">
          {index + 1}/{steps.length}
        </span>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-slate-400">
              step {String(current.step).padStart(2, '0')} · {style.label}
            </p>
            <p className="mt-1 font-mono text-[13px] text-slate-100">
              {current.field}
              <span className="ml-2 rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-400">
                {current.token || '—'}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-slate-400">entropy</p>
            <p className={cn('font-mono text-sm font-semibold', style.text)}>{current.entropy.toFixed(3)}</p>
          </div>
        </div>
        <p className="mt-2.5 text-[11.5px] leading-relaxed text-slate-400">{current.notes}</p>
      </div>

      <div className="max-h-[180px] overflow-y-auto border-t border-white/10">
        {steps.map((s, i) => {
          const st = kindStyles[s.kind];
          return (
            <button
              key={s.step}
              type="button"
              onClick={() => {
                setPlaying(false);
                setIndex(i);
              }}
              className={cn(
                'flex w-full items-center gap-2 border-b border-white/5 px-3 py-2 text-left transition-colors last:border-0',
                i === index ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]',
              )}
            >
              <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', st.dot)} />
              <span className="w-16 shrink-0 font-mono text-[9px] uppercase text-slate-400">{st.label}</span>
              <span className="min-w-0 flex-1 truncate font-mono text-[10px] text-slate-300">
                {s.field} · {s.token || '—'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
