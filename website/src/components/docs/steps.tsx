'use client';

import * as React from 'react';
import { ArrowRight, Check, Clock, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepProps {
  title: string;
  description?: string;
  icon?: 'check' | 'clock' | 'zap' | 'arrow';
  status?: 'pending' | 'active' | 'done';
}

const icons: Record<string, React.ElementType> = {
  check: Check,
  clock: Clock,
  zap: Zap,
  arrow: ArrowRight,
};

const statusColors: Record<string, string> = {
  pending: 'text-ink-muted',
  active: 'text-cobalt-500',
  done: 'text-verify-pass',
};

export function Steps({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}

export function Step({
  title,
  description,
  icon = 'arrow',
  status = 'pending',
}: StepProps) {
  const Icon = icons[icon];
  const color = statusColors[status];

  return (
    <div className={cn('flex gap-3 items-start', status === 'done' ? 'opacity-60' : '')}>
      <div className={`flex shrink-0 items-center justify-center w-8 h-8 rounded-full ${color}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex flex-col">
        <h4 className={cn('text-sm font-semibold', status === 'done' ? 'text-ink-primary' : 'text-ink-secondary')}>
          {title}
        </h4>
        {description && (
          <p className="text-sm text-ink-muted">{description}</p>
        )}
      </div>
    </div>
  );
}
