import Link from 'next/link';
import {
  ArrowUpRight,
  BookOpen,
  Boxes,
  Braces,
  ChevronRight,
  Clock3,
  Code2,
  Cpu,
  Plug,
  Rocket,
  Terminal,
  type LucideIcon,
} from 'lucide-react';
import { CopyLink } from './copy-link';

const SECTIONS: Record<string, { label: string; icon: LucideIcon }> = {
  'getting-started': { label: 'Getting started', icon: Rocket },
  'authoring-schemas': { label: 'Authoring schemas', icon: Braces },
  'engine-internals': { label: 'Engine internals', icon: Cpu },
  cartridges: { label: 'Domain cartridges', icon: Boxes },
  'proofs-rl-and-cli': { label: 'Proofs, RL & CLI', icon: Terminal },
  'bridges-and-integrations': { label: 'Bridges & integrations', icon: Plug },
  'api-reference': { label: 'API reference', icon: Code2 },
};

export function DocHero({
  title,
  description,
  slug,
  minutes,
  editUrl,
}: {
  title: string;
  description?: string;
  slug?: string[];
  minutes: number | null;
  editUrl: string;
}) {
  const section = slug?.[0] ? SECTIONS[slug[0]] : undefined;
  const label = section?.label ?? 'Manual';
  const Icon = section?.icon ?? BookOpen;

  return (
    <header className="doc-hero relative isolate overflow-hidden rounded-[30px] border border-white/50 px-5 py-6 shadow-[0_30px_70px_-42px_rgba(120,45,10,0.55)] sm:px-8 sm:py-9">
      <div aria-hidden className="doc-hero-grid" />
      <div aria-hidden className="doc-hero-flutes" />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-3 top-3 font-display text-5xl leading-none text-white/45"
      >
        ✳
      </span>

      <div className="relative z-10">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#3a1608]/70"
        >
          <Link href="/docs" className="transition-colors hover:text-[#2a1006]">
            Docs
          </Link>
          <ChevronRight className="h-3 w-3 opacity-60" />
          <span className="inline-flex items-center gap-1">
            <Icon className="h-3 w-3" />
            {label}
          </span>
        </nav>

        <h1 className="mt-4 max-w-[19ch] font-display text-[clamp(2.1rem,4.9vw,3.3rem)] font-extrabold leading-[0.97] tracking-[-0.042em] text-[#241007]">
          {title}
        </h1>

        {description && (
          <p className="mt-3.5 max-w-[54ch] text-[15px] leading-relaxed text-[#48220f]/90 sm:text-[16px]">
            {description}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-1.5">
          {minutes && (
            <span className="doc-meta-chip">
              <Clock3 className="h-3 w-3" /> {minutes} min read
            </span>
          )}
          <span className="doc-meta-chip">veritas1.1</span>
          <span className="doc-meta-chip">Apache-2.0</span>
          <CopyLink />
          <a href={editUrl} target="_blank" rel="noreferrer" className="doc-meta-chip">
            Edit this page <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>

    </header>
  );
}
