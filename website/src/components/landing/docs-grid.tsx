import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, Boxes, Braces, Cpu } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';

const guides = [
  {
    icon: Braces,
    kicker: '10 min',
    title: 'Quickstart',
    body: 'Install, write a verified schema, run preflight, and decode a portfolio with derived fields.',
    href: '/docs/getting-started/quickstart',
  },
  {
    icon: Boxes,
    kicker: 'Authoring',
    title: 'Schemas & constraints',
    body: 'require, derive, prefer and forall — plus dot, quad_form, sqrt and dynamic containers.',
    href: '/docs/authoring-schemas/verified-schema-decorator',
  },
  {
    icon: Cpu,
    kicker: 'Internals',
    title: 'How the engine works',
    body: 'VIR, the JSON PDA, HC4/Affine contractors, CDCL jumpback and zero-DoF splicing.',
    href: '/docs/engine-internals/vir-compiler-and-dag',
  },
  {
    icon: BookOpen,
    kicker: 'Reference',
    title: 'API & CLI',
    body: 'Every public symbol, the PyO3 surface, WASM bindings, diagnostics and six CLI commands.',
    href: '/docs/api-reference/python-public-api',
  },
];

export function DocsGrid() {
  return (
    <section className="section-y border-y border-border-subtle bg-bg-inset/50">
      <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Reveal>
          <span className="eyebrow">
            <BookOpen className="h-3 w-3 text-cobalt-500" /> Documentation
          </span>
          <h2 className="display-lg mt-3 text-ink-primary">Written for whoever has to ship it. (Probably you.)</h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-secondary">
            Beginner-friendly explanations up front, exact mathematics in the internals. Every page is
            copy-pasteable, and every claim links back to a module you can read.
          </p>
          <Link
            href="/docs"
            className="group mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-cobalt-600 transition-colors hover:text-cobalt-700 dark:text-cobalt-300"
          >
            Browse all 40+ pages
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <div className="mt-7 hidden grid-cols-2 gap-2.5 lg:grid">
            {[
              { v: '40+', k: 'pages' },
              { v: '128', k: 'public symbols' },
              { v: '9', k: 'domain modules' },
              { v: '6', k: 'CLI commands' },
            ].map((s) => (
              <div key={s.k} className="rounded-xl border border-border-subtle bg-bg-elevated px-3 py-2.5">
                <p className="font-display text-lg font-extrabold tracking-tight text-ink-primary">{s.v}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">{s.k}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2">
          {guides.map((g, i) => (
            <Reveal key={g.href} delay={i * 0.06}>
              <Link
                href={g.href}
                className="lift group flex h-full flex-col rounded-[24px] border border-border-subtle bg-bg-elevated p-5 shadow-[var(--vt-shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:border-border-cobalt hover:shadow-[var(--vt-shadow-lift)]"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border-subtle bg-bg-subtle text-cobalt-600 dark:text-cobalt-300">
                    <g.icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">
                    {g.kicker}
                  </span>
                </div>
                <h3 className="mt-4 flex items-center gap-1 text-[14.5px] font-semibold text-ink-primary">
                  {g.title}
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-secondary">{g.body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
