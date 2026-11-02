import type { ReactNode } from 'react';
import {
  Boxes,
  CheckCircle2,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Lock,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = {
  zap: Zap,
  shield: ShieldCheck,
  layers: Layers,
  cpu: Cpu,
  database: Database,
  check: CheckCircle2,
  sparkles: Sparkles,
  git: GitBranch,
  lock: Lock,
  terminal: Terminal,
  boxes: Boxes,
} as const;

export function FeatureGrid({
  children,
  cols = 2,
}: {
  children: ReactNode;
  cols?: 2 | 3;
}) {
  return (
    <div className={cn('my-5 grid gap-2.5', cols === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
      {children}
    </div>
  );
}

export function Feature({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: keyof typeof icons;
  children: ReactNode;
}) {
  const Icon = icon ? icons[icon] : Sparkles;
  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-elevated p-4">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border-subtle bg-bg-subtle text-cobalt-600 dark:text-cobalt-300">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <p className="mt-2.5 text-[13px] font-semibold text-ink-primary">{title}</p>
      <div className="mt-1 text-[12px] leading-relaxed text-ink-secondary [&_code]:text-[11px]">{children}</div>
    </div>
  );
}

export function StatGrid({ children }: { children: ReactNode }) {
  return <div className="my-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">{children}</div>;
}

export function Stat({ value, label, tone }: { value: string; label: string; tone?: 'pass' | 'cobalt' }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-elevated px-3.5 py-3">
      <p
        className={cn(
          'font-display text-lg font-extrabold tracking-tight',
          tone === 'pass' ? 'text-verify-pass' : tone === 'cobalt' ? 'text-cobalt-600 dark:text-cobalt-300' : 'text-ink-primary',
        )}
      >
        {value}
      </p>
      <p className="mt-0.5 font-mono text-[9px] uppercase leading-tight tracking-[0.1em] text-ink-muted">
        {label}
      </p>
    </div>
  );
}

export function KeyValueTable({
  rows,
}: {
  rows: { key: string; value: string; note?: string }[];
}) {
  return (
    <div className="my-5 overflow-hidden rounded-2xl border border-border-subtle">
      {rows.map((row) => (
        <div
          key={row.key}
          className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border-subtle bg-bg-elevated px-3 py-2.5 last:border-0"
        >
          <span className="font-mono text-[11px] text-ink-secondary">{row.key}</span>
          <span className="text-right">
            <span className="block font-mono text-[11px] font-medium text-ink-primary">{row.value}</span>
            {row.note && <span className="block text-[10.5px] text-ink-muted">{row.note}</span>}
          </span>
        </div>
      ))}
    </div>
  );
}
