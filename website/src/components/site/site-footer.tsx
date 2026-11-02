import Link from 'next/link';
import { ArrowUpRight, Github, MessageSquare, Sparkles } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { VeritasLogo } from './logo';
import { CopyCommand } from './copy-command';

const columns = [
  {
    title: 'Documentation',
    links: [
      { label: 'Installation', href: '/docs/getting-started/installation' },
      { label: 'Quickstart', href: '/docs/getting-started/quickstart' },
      { label: 'How Veritas works', href: '/docs/getting-started/how-veritas-works' },
      { label: 'Compared to alternatives', href: '/docs/getting-started/comparisons' },
      { label: 'CLI reference', href: '/docs/proofs-rl-and-cli/cli-reference' },
    ],
  },
  {
    title: 'Engine',
    links: [
      { label: 'VIR compiler & DAG', href: '/docs/engine-internals/vir-compiler-and-dag' },
      { label: 'JSON PDA & healing', href: '/docs/engine-internals/tier0-json-pda-and-healing' },
      { label: 'HC4 / Affine contractors', href: '/docs/engine-internals/tier1-hc4-and-affine-contractors' },
      { label: 'Zero-DoF jump-forward', href: '/docs/engine-internals/zero-dof-jump-forward' },
      { label: 'CDCL jumpback', href: '/docs/engine-internals/cdcl-jumpback-and-domain-cuts' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Playground', href: '/playground' },
      { label: 'Examples', href: '/examples' },
      { label: 'Verify a certificate', href: '/verify' },
      { label: 'Benchmarks', href: '/benchmarks' },
      { label: 'Domain cartridges', href: '/docs/cartridges/overview' },
      { label: 'Runtime bridges', href: '/docs/bridges-and-integrations/vllm' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-border-subtle bg-bg-inset">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[720px] -translate-x-1/2 rounded-full bg-cobalt-600/10 blur-3xl"
      />
      <div className="container-page relative py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-8">
          <div className="max-w-sm">
            <VeritasLogo />
            <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
              A verification layer for people who are tired of reading plausible nonsense. Pydantic on
              the surface, dependency-free solvers underneath.
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-elevated px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
              <Sparkles className="h-3 w-3 text-accent-coral" />
              Open to recommendations &amp; contributions
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <CopyCommand command={siteConfig.installCommand} className="w-full justify-between" />
              <div className="flex items-center gap-2">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border-subtle bg-bg-elevated px-4 py-2 text-[13px] font-semibold text-ink-primary transition-colors hover:border-border-cobalt"
                >
                  <Github className="h-4 w-4" /> Star on GitHub
                </a>
                <Link
                  href="/docs"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink-primary px-4 py-2 text-[13px] font-semibold text-bg-canvas transition-opacity hover:opacity-90"
                >
                  Read docs <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-3 md:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-secondary">{col.title}</h3>
                <ul className="mt-3.5 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[13.5px] text-ink-secondary transition-colors hover:text-cobalt-600 dark:hover:text-cobalt-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border-subtle pt-6 text-[12px] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Veritas contributors. Released under Apache-2.0.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <a href={siteConfig.author.url} target="_blank" rel="noreferrer" className="link-draw hover:text-ink-secondary">
              Built by {siteConfig.author.name}
            </a>
            <a href={siteConfig.newIssue} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-ink-secondary">
              <MessageSquare className="h-3 w-3" /> Ideas &amp; issues
            </a>
            <a href={siteConfig.discussions} target="_blank" rel="noreferrer" className="hover:text-ink-secondary">
              Discussions
            </a>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-verify-pass" />
              v{siteConfig.version} · Python + Rust
            </span>
            <a href={`${siteConfig.github}/blob/main/LICENSE`} target="_blank" rel="noreferrer" className="hover:text-ink-secondary">
              License
            </a>
            <a href={siteConfig.github} target="_blank" rel="noreferrer" className="hover:text-ink-secondary">
              Source
            </a>
            <span className="font-mono">Built with Next.js · Fumadocs · WASM</span>
          </div>
        </div>

        <p className="mt-5 select-none text-center font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-muted">
          ↑ ↑ ↓ ↓ ← → ← → B A <span className="mx-2 text-ink-muted">·</span> there is a proof hidden in here
        </p>
      </div>
    </footer>
  );
}
