import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <span className="eyebrow rounded-full border border-border-subtle bg-bg-elevated/70 px-3 py-1.5 shadow-[0_1px_0_rgba(21,19,15,0.04)] backdrop-blur">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-cobalt-500 to-accent-violet"
          />
          {eyebrow}
        </span>
      )}
      <h2 className="display-lg max-w-3xl text-ink-primary">{title}</h2>
      {description && (
        <p
          className={cn(
            'max-w-xl text-[15px] leading-relaxed text-ink-secondary sm:text-[16.5px]',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

export function Pill({
  children,
  className,
  tone = 'cobalt',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'cobalt' | 'pass' | 'warn' | 'fail' | 'neutral';
}) {
  const tones = {
    cobalt: 'border-cobalt-500/25 bg-cobalt-500/10 text-cobalt-700 dark:text-cobalt-300',
    pass: 'border-verify-pass/25 bg-verify-pass-bg/60 text-verify-pass dark:bg-verify-pass/10',
    warn: 'border-verify-warn/25 bg-verify-warn-bg/60 text-verify-warn dark:bg-verify-warn/10',
    fail: 'border-verify-fail/25 bg-verify-fail-bg/60 text-verify-fail dark:bg-verify-fail/10',
    neutral: 'border-border-subtle bg-bg-subtle text-ink-secondary',
  } as const;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function DashedConnector({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('hidden items-center justify-center text-border-strong lg:flex', className)}
    >
      <svg width="100%" height="12" viewBox="0 0 100 12" preserveAspectRatio="none" fill="none">
        <line x1="0" y1="6" x2="100" y2="6" stroke="currentColor" strokeDasharray="3 4" />
        <path d="M96 2.5 100 6l-4 3.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
    </div>
  );
}
