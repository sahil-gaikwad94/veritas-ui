import Link from 'next/link';
import { ArrowUpRight, Github, MessageSquare, Sparkles } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { VexxLogo } from './logo';
import { CopyCommand } from './copy-command';

const columns = [
  {
    title: 'Documentation',
    links: [
      { label: 'Installation', href: '/docs/getting-started/installation' },
      { label: 'Quickstart', href: '/docs/getting-started/quickstart' },
      { label: 'How Vexx works', href: '/docs/getting-started/how-vexx-works' },
      { label: 'What changed in 1.5', href: '/docs/release-notes' },
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
    <footer className="vx-footer px-2 pb-2 pt-12 sm:px-3.5 sm:pt-16 lg:px-6">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid gap-10 md:grid-cols-[1.3fr_repeat(3,1fr)] md:gap-8">
          <div className="max-w-sm">
            <VexxLogo tone="inverse" />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              A verification layer for people who are tired of reading plausible nonsense. Pydantic on
              the surface, dependency-free solvers underneath, receipts at the end.
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/75">
              <Sparkles className="h-3 w-3 text-[#d8ff3e]" />
              built in public · arguments welcome
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <CopyCommand
                command={siteConfig.installCommand}
                className="w-full justify-between border-white/20 bg-white/10 text-white/80 hover:border-white/40 hover:text-white"
              />
              <div className="flex items-center gap-2">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-white/15"
                >
                  <Github className="h-4 w-4" /> Star on GitHub
                </a>
                <Link
                  href="/docs"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#101117] transition-transform hover:-translate-y-0.5"
                >
                  Read docs <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-3 md:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                  {col.title}
                </h3>
                <ul className="mt-3.5 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[13.5px] text-white/70 transition-colors hover:text-white"
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

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-[12px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vexx contributors. Released under Apache-2.0.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <a
              href={siteConfig.author.url}
              target="_blank"
              rel="noreferrer"
              className="link-draw hover:text-white"
            >
              Built by {siteConfig.author.name}
            </a>
            <a
              href={siteConfig.newIssue}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-white"
            >
              <MessageSquare className="h-3 w-3" /> Ideas &amp; issues
            </a>
            <a href={siteConfig.discussions} target="_blank" rel="noreferrer" className="hover:text-white">
              Discussions
            </a>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4ade80]" />
              {siteConfig.version} · Python + Rust
            </span>
            <a
              href={`${siteConfig.github}/blob/main/LICENSE`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              License
            </a>
            <a href={siteConfig.github} target="_blank" rel="noreferrer" className="hover:text-white">
              Source
            </a>
          </div>
        </div>

        <div aria-hidden className="relative mt-8 overflow-hidden">
          <p className="vx-footer-word -mb-2 translate-y-2 text-center sm:-mb-4">vexx</p>
        </div>

        <p className="mt-2 select-none text-center font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
          ↑ ↑ ↓ ↓ ← → ← → B A <span className="mx-2">·</span> there is a proof hidden in here
        </p>
      </div>
    </footer>
  );
}
