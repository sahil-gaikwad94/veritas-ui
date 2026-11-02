import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, BookOpen, Play, SearchX, ShieldAlert } from 'lucide-react';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';

export const metadata: Metadata = {
  title: '404 — page not found',
  description: 'This page failed preflight. Try the docs, the playground, or a certificate verification.',
};

const links = [
  { href: '/docs', label: 'Documentation', icon: BookOpen },
  { href: '/playground', label: 'Playground', icon: Play },
  { href: '/verify', label: 'Verify a proof', icon: ShieldAlert },
];

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="main" className="flex flex-1 items-center pt-24">
        <div className="container-page py-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">
              <span className="h-1 w-1 rounded-full bg-verify-fail" /> 404 · unsatisfiable route
            </span>
            <h1 className="display-xl mt-3 text-ink-primary">
              This page failed <span className="text-gradient">preflight.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-[14.5px] leading-relaxed text-ink-secondary">
              The URL does not resolve to a page in the spec. No tokens were spent. Try one of the
              satisfiable routes below.
            </p>

            <div className="mx-auto mt-7 flex max-w-md items-center gap-2 rounded-xl border border-border-subtle bg-bg-elevated p-2">
              <SearchX className="ml-2 h-4 w-4 shrink-0 text-ink-muted" />
              <span className="min-w-0 flex-1 truncate text-left font-mono text-[11px] text-ink-muted">
                design/../..//missing
              </span>
              <span className="shrink-0 rounded-full bg-rose-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-verify-fail">
                unparsable
              </span>
            </div>

            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group inline-flex items-center justify-center gap-1.5 rounded-full border border-border-subtle bg-bg-elevated px-3 py-2.5 text-[12.5px] font-semibold text-ink-primary transition-colors hover:border-border-cobalt"
                >
                  <l.icon className="h-3.5 w-3.5 text-cobalt-500" />
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[11.5px]">
              <Link href="/" className="inline-flex items-center gap-1 text-cobalt-600 dark:text-cobalt-300">
                <ArrowLeft className="h-3 w-3" /> Back home
              </Link>
              <span className="text-ink-muted">or</span>
              <Link
                href="/docs/getting-started/quickstart"
                className="inline-flex items-center gap-1 font-medium text-ink-secondary hover:text-ink-primary"
              >
                start the quickstart <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
