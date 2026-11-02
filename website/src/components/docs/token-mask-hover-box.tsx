'use client';

import * as React from 'react';
import { ShieldCheck, Terminal, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TokenMaskHoverBoxProps {
  token: string;
  kind: 'sample' | 'splice' | 'backtrack';
  interval?: { lo: number; hi: number };
  maskedCount?: number;
  totalCount?: number;
}

export function TokenMaskHoverBox({
  token,
  kind,
  interval,
  maskedCount = 0,
  totalCount = 0,
}: TokenMaskHoverBoxProps) {
  const kindStyles: Record<string, { color: string; bg: string; label: string; icon: React.ElementType }> = {
    sample: { color: 'text-cobalt-500', bg: 'bg-cobalt-100/20', label: 'Sampled', icon: Zap },
    splice: { color: 'text-verify-pass', bg: 'bg-verify-pass-bg/20', label: '0-DoF Splice', icon: ShieldCheck },
    backtrack: { color: 'text-verify-warn', bg: 'bg-verify-warn-bg/20', label: 'CDCL Backtrack', icon: Terminal },
  };

  const style = kindStyles[kind];

  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg border border-border-subtle bg-bg-elevated shadow-sm">
      <div className="flex items-center gap-2">
        <style.icon className={`h-4 w-4 ${style.color}`} />
        <span className={`text-xs font-semibold uppercase tracking-wider ${style.color}`}>{style.label}</span>
        <Badge variant="cobalt" size="sm">
          {token}
        </Badge>
      </div>
      {interval && (
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-ink-muted">Interval:</span>
          <span className={`font-semibold ${style.color}`}>[{interval.lo}, {interval.hi}]</span>
        </div>
      )}
      {totalCount > 0 && (
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-ink-muted">Masked:</span>
          <span className="text-verify-fail font-semibold">{maskedCount}</span>
          <span className="text-ink-muted">of {totalCount} tokens</span>
        </div>
      )}
    </div>
  );
}
