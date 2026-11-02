'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Atom, CalendarClock, Code2, Database, FlaskConical, LineChart, ShieldCheck, Sigma } from 'lucide-react';
import Link from 'next/link';
import { cartridges } from '@/lib/site';
import { cn } from '@/lib/utils';

const ICONS: Record<string, typeof LineChart> = {
  quant: LineChart,
  sql: Database,
  sec: ShieldCheck,
  or_sched: CalendarClock,
  stat: Sigma,
  phys: Atom,
  chem: FlaskConical,
  code: Code2,
};

const POSITIONS = [
  { x: -14, y: -34, rot: -8, scale: 0.9 },
  { x: 30, y: -48, rot: 6, scale: 1.05 },
  { x: 64, y: -22, rot: -12, scale: 0.85 },
  { x: 88, y: 12, rot: 10, scale: 1.1 },
  { x: 72, y: 58, rot: -5, scale: 0.9 },
  { x: 32, y: 72, rot: 8, scale: 1.0 },
  { x: -18, y: 52, rot: -10, scale: 0.95 },
  { x: -58, y: 28, rot: 12, scale: 0.9 },
  { x: -68, y: -12, rot: -15, scale: 0.8 },
];

export function CartridgeBadges() {
  const reduce = useReducedMotion();

  return (
    <section id="cartridge-badges" className="relative overflow-hidden py-6 sm:py-10 border-y border-border-subtle bg-bg-inset/50">
      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <span className="eyebrow">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cobalt-600" />
            Domain cartridges
          </span>
          <h2 className="display-lg mt-3 text-ink-primary">Nine cartridges, floating in cobalt.</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-secondary">
            Composable constraint modules for the fields where “roughly right” is wrong. Hover a badge
            to lift it — tap to read the full guide.
          </p>
        </div>

        <div className="relative mx-auto max-w-[720px] aspect-square hidden lg:block lg:max-w-none lg:aspect-[1]">
          {cartridges.map((cartridge, i) => {
            const Icon = ICONS[cartridge.id] ?? LineChart;
            const pos = POSITIONS[i] ?? { x: 0, y: 0, rot: 0, scale: 1 };
            return (
              <motion.div
                key={cartridge.id}
                className="absolute flex h-14 w-14 items-center justify-center rounded-[20px] cursor-pointer group transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-20"
                style={{
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                  transform: `translate(-50%, -50%) rotate(${pos.rot}deg) scale(${pos.scale})`,
                }}
                whileHover={{ rotate: 0, scale: 1.15, zIndex: 10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className="flex h-full w-full items-center justify-center rounded-[18px] transition-all duration-300 group-hover:scale-110 shadow-lg border border-white/40" style={{ backgroundColor: cartridge.accent }}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border-subtle bg-bg-elevated/90 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-ink-secondary backdrop-blur shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                  {cartridge.label}
                </div>
                <Link href={`/docs/cartridges/${cartridge.slug}`} className="absolute inset-0 z-20 opacity-0" aria-label={cartridge.label} />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cartridges.map((cartridge) => {
            const isCobalt = cartridge.accent === '#1e5eff';
            const accentClass = isCobalt ? 'cobalt-500' : 'accent-coral';
            const Icon = ICONS[cartridge.id] ?? LineChart;
            return (
              <Link key={cartridge.id} href={`/docs/cartridges/${cartridge.slug}`} className="group relative overflow-hidden rounded-[20px] border border-border-subtle bg-bg-elevated p-4 sm:p-5 shadow-[var(--vt-shadow-card)] transition-all hover:-translate-y-0.5 hover:border-border-cobalt">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className={cn('flex shrink-0 items-center justify-center rounded-[12px] p-1.5', `bg-${accentClass}/10 text-${accentClass}`)}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">cartridges/{cartridge.id}.py</span>
                  </div>
                  <span className={cn('inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide', `border-${accentClass}/30 bg-${accentClass}/10 text-${accentClass}`)}>{cartridge.blurb.split(' ')[0]}</span>
                </div>
                <h3 className="mt-3 text-[1.05rem] font-semibold tracking-tight text-ink-primary group-hover:text-cobalt-600 dark:group-hover:text-cobalt-300 transition-colors">{cartridge.label}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-secondary">{cartridge.description}</p>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                  <span>what gets checked</span>
                  {cartridge.checks.slice(0, 2).map((check) => (
                    <span key={check} className="h-1 w-1 rounded-full bg-ink-primary/20" />
                  ))}
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[11.5px] text-ink-muted">
          Cartridges compose: run portfolio math, SQL safety and IAM policy checks on the same verified object —
          no extra dependencies, no second source of truth.
        </p>
      </div>
    </section>
  );
}
