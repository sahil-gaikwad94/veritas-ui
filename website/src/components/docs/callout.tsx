'use client';

import { AlertTriangle, CheckCircle, Info, Lightbulb, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutVariant = 'default' | 'info' | 'warn' | 'danger' | 'tip' | 'check';

interface CalloutProps {
  title?: string;
  variant?: CalloutVariant;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<CalloutVariant, { icon: React.ElementType; label: string; bg: string; border: string; text: string }> = {
  default: { icon: Info, label: 'Note', bg: 'bg-bg-subtle', border: 'border-border-subtle', text: 'text-ink-secondary' },
  info: { icon: Zap, label: 'Info', bg: 'bg-cobalt-100/50', border: 'border-cobalt-200', text: 'text-cobalt-900' },
  warn: { icon: AlertTriangle, label: 'Warning', bg: 'bg-verify-warn-bg/50', border: 'border-verify-warn/30', text: 'text-verify-warn' },
  danger: { icon: AlertTriangle, label: 'Danger', bg: 'bg-verify-fail-bg/50', border: 'border-verify-fail/30', text: 'text-verify-fail' },
  tip: { icon: Lightbulb, label: 'Tip', bg: 'bg-cobalt-100/50', border: 'border-cobalt-200', text: 'text-cobalt-700' },
  check: { icon: CheckCircle, label: 'Verified', bg: 'bg-verify-pass-bg/50', border: 'border-verify-pass/30', text: 'text-verify-pass' },
};

export function Callout({
  title,
  variant = 'default',
  className,
  children,
}: CalloutProps) {
  const { icon: Icon, label, bg, border, text } = variants[variant];

  return (
    <div className={cn('flex gap-3 rounded-lg p-4 border', bg, border, className)}>
      <div className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full ${text}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex flex-col leading-tight">
        {title && (
          <h4 className="text-sm font-semibold">{title}</h4>
        )}
        <p className="text-sm">{children}</p>
      </div>
    </div>
  );
}

Callout.displayName = 'Callout';
