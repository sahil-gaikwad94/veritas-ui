'use client';

import { useState } from 'react';
import { RefreshCw, Play, SkipBack, SkipForward } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TraceStep {
  step: number;
  field: string;
  token: string;
  kind: 'sample' | 'splice' | 'backtrack';
  notes: string;
  entropy: number; // 0 to 1
}

interface InteractiveTraceViewerProps {
  traceUrl?: string;
  steps?: TraceStep[];
  autoPlay?: boolean;
}

const KIND_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  sample: { color: 'text-cobalt-500', bg: 'bg-cobalt-500/10', label: 'Sample' },
  splice: { color: 'text-verify-pass', bg: 'bg-verify-pass-bg/20', label: 'Splice' },
  backtrack: { color: 'text-verify-warn', bg: 'bg-verify-warn-bg/20', label: 'Backtrack' },
};

export function InteractiveTraceViewer({
  traceUrl,
  steps: initialSteps = [],
  autoPlay = false,
}: InteractiveTraceViewerProps) {
  const [steps, setSteps] = useState<TraceStep[]>(initialSteps);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [loaded, setLoaded] = useState(false);

  if (traceUrl && !loaded) {
    // In production, fetch the trace JSON from the URL
    // For now, use demo steps
    setSteps([
      {
        step: 1,
        field: 'weights.AAPL',
        token: '0.',
        kind: 'sample',
        notes: 'PDA allows numeric prefix; HC4 interval [0.05, 0.50]',
        entropy: 0.15,
      },
      {
        step: 2,
        field: 'weights.AAPL',
        token: '4',
        kind: 'sample',
        notes: 'Digit 4 accepted; interval narrows to [0.40, 0.49]',
        entropy: 0.08,
      },
      {
        step: 3,
        field: 'weights.MSFT',
        token: '0.',
        kind: 'sample',
        notes: 'PDA stack: weights object open; key MSFT expected',
        entropy: 0.22,
      },
      {
        step: 4,
        field: 'expected_return',
        token: '0.1615',
        kind: 'splice',
        notes: 'Zero-DoF splice: derived deterministically, 0 LLM calls',
        entropy: 0.0,
      },
      {
        step: 5,
        field: 'sharpe_ratio',
        token: '0.6422',
        kind: 'splice',
        notes: 'Zero-DoF splice: conservation law satisfied',
        entropy: 0.0,
      },
      {
        step: 6,
        field: 'weights.NVDA',
        token: '0.25',
        kind: 'backtrack',
        notes: 'CDCL jumpback: NVDA exceeded simplex bound; culprit = weights.AAPL',
        entropy: 0.95,
      },
    ]);
    setLoaded(true);
  }

  const totalSteps = steps.length;
  const current = steps[currentStep];
  const kindConfig = KIND_CONFIG[current?.kind || 'sample'];

  const backtracks = steps.filter((s) => s.kind === 'backtrack').length;
  const splices = steps.filter((s) => s.kind === 'splice').length;
  const avgEntropy = steps.reduce((acc, s) => acc + s.entropy, 0) / totalSteps;

  return (
    <div className="rounded-xl border border-border-subtle bg-[#0A0D14] text-slate-100 shadow-xl overflow-hidden">
      {/* Header KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-white/10 bg-[#101626]">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider">Total Steps</span>
          <span className="text-xl font-mono font-semibold">{totalSteps}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider">Backtracks</span>
          <span className="text-xl font-mono font-semibold text-verify-warn">{backtracks}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider">Splices</span>
          <span className="text-xl font-mono font-semibold text-verify-pass">{splices}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider">Avg Entropy</span>
          <span className="text-xl font-mono font-semibold">{avgEntropy.toFixed(2)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 p-4 border-b border-white/10 bg-[#0A0D14]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Step {currentStep + 1} / {totalSteps}</span>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-cobalt-500 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="p-2 rounded-lg hover:bg-white/10 text-slate-400 disabled:opacity-30 transition-colors"
            aria-label="Previous step"
          >
            <SkipBack className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg hover:bg-white/10 text-slate-400 transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Play className="h-4 w-4" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(totalSteps - 1, currentStep + 1))}
            disabled={currentStep === totalSteps - 1}
            className="p-2 rounded-lg hover:bg-white/10 text-slate-400 disabled:opacity-30 transition-colors"
            aria-label="Next step"
          >
            <SkipForward className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Step Detail */}
      <Card className="p-6 m-6 border-white/10 bg-[#0A0D14]">
        <CardHeader className="pb-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-mono">{current?.field || '—'}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={current?.kind === 'splice' ? 'success' : current?.kind === 'backtrack' ? 'warning' : 'cobalt'} size="sm">
                  {kindConfig.label}
                </Badge>
                <span className="text-xs font-mono text-slate-500">Token: "{current?.token || '—'}"</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono text-slate-500">Entropy</div>
              <div className="text-2xl font-mono font-semibold text-ink-primary">
                {(current?.entropy || 0).toFixed(3)}
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full"
                  style={{
                    backgroundColor: kindConfig.color.replace('text-', 'bg-'),
                    width: `${(current?.entropy || 0) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-sm text-slate-300 font-mono leading-relaxed">
            {current?.notes || 'No trace data available.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
