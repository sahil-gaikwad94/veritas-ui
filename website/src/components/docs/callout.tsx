'use client';

import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle, Info, Lightbulb, Rocket, ShieldAlert, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutVariant = 'default' | 'info' | 'warn' | 'danger' | 'tip' | 'check' | 'launch';

interface CalloutProps {
  title?: string;
  variant?: CalloutVariant;
  className?: string;
  children: ReactNode;
}

const variants: Record<
  CalloutVariant,
  { icon: React.ElementType; label: string; wrap: string; iconWrap: string; title: string }
> = {
  default: {
    icon: Info,
    label: 'Note',
    wrap: 'border-border-subtle bg-bg-subtle/60',
    iconWrap: 'bg-bg-elevated text-ink-secondary',
    title: 'text-ink-primary',
  },
  info: {
    icon: Zap,
    label: 'How it works',
    wrap: 'border-cobalt-500/25 bg-cobalt-500/[0.06]',
    iconWrap: 'bg-cobalt-500/12 text-cobalt-600 dark:text-cobalt-300',
    title: 'text-ink-primary',
  },
  warn: {
    icon: AlertTriangle,
    label: 'Watch out',
    wrap: 'border-verify-warn/30 bg-verify-warn/[0.07]',
    iconWrap: 'bg-verify-warn/12 text-verify-warn',
    title: 'text-ink-primary',
  },
  danger: {
    icon: ShieldAlert,
    label: 'Failure mode',
    wrap: 'border-rose-500/25 bg-rose-500/[0.06]',
    iconWrap: 'bg-rose-500/12 text-verify-fail',
    title: 'text-ink-primary',
  },
  tip: {
    icon: Lightbulb,
    label: 'Tip',
    wrap: 'border-amber-500/25 bg-amber-500/[0.06]',
    iconWrap: 'bg-amber-500/12 text-verify-warn',
    title: 'text-ink-primary',
  },
  check: {
    icon: CheckCircle,
    label: 'Verified',
    wrap: 'border-verify-pass/25 bg-verify-pass/[0.06]',
    iconWrap: 'bg-verify-pass/12 text-verify-pass',
    title: 'text-ink-primary',
  },
  launch: {
    icon: Rocket,
    label: 'Next step',
    wrap: 'border-border-cobalt bg-cobalt-500/[0.05]',
    iconWrap: 'bg-cobalt-500/12 text-cobalt-600 dark:text-cobalt-300',
    title: 'text-ink-primary',
  },
};

export function Callout({ title, variant = 'default', className, children }: CalloutProps) {
  const { icon: Icon, label, wrap, iconWrap, title: titleCls } = variants[variant] ?? variants.default;

  return (
    <div role="note" className={cn('my-5 flex gap-3 rounded-2xl border p-3.5 sm:p-4', wrap, className)}>
      <span
        className={cn(
          'mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
          iconWrap,
        )}
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1 prose-sm prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5">
        <p className={cn('!my-0 text-[13px] font-semibold leading-snug', titleCls)}>{title ?? label}</p>
        <div className="mt-1 text-[13px] leading-relaxed text-ink-secondary [&_a]:font-medium [&_a]:text-cobalt-600 [&_a]:underline dark:[&_a]:text-cobalt-300 [&_code]:text-[12px]">
          {children}
        </div>
      </div>
    </div>
  );
}

Callout.displayName = 'Callout';
