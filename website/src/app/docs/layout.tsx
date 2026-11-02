import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import Link from 'next/link';
import { ArrowUpRight, Zap } from 'lucide-react';
import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { DocsA11y } from '@/components/docs/docs-a11y';

import type { ReactNode } from 'react';

export default function DocsLayoutRoute({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      sidebar={{
        defaultOpenLevel: 1,
        banner: (
          <Link
            href="/playground"
            className="group relative flex flex-col gap-1 overflow-hidden rounded-2xl border border-border-cobalt bg-gradient-to-br from-cobalt-500/[0.09] to-accent-violet/[0.05] p-3 transition-colors hover:bg-cobalt-500/[0.1]"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-cobalt-700 dark:text-cobalt-300">
              <Zap className="h-3 w-3" /> live playground
            </span>
            <span className="text-[12.5px] font-semibold leading-snug text-ink-primary">
              Watch a decode, break a spec
            </span>
            <span className="text-[11px] leading-relaxed text-ink-secondary">
              Token masks, interval cuts and splices — in your browser.
            </span>
            <ArrowUpRight className="absolute right-2.5 top-2.5 h-3 w-3 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        ),
      }}
    >
      <DocsA11y />
      {children}
    </DocsLayout>
  );
}
