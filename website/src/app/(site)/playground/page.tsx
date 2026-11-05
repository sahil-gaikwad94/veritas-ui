import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Braces, Calculator, Cpu, Github, ShieldCheck, Terminal, Zap } from 'lucide-react';
import { DecodeLab } from '@/components/playground/decode-lab';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Playground — solver-guided decode lab',
  description:
    'Change the constraints, watch tokens get masked, derived fields get spliced and preflight refuse infeasible specs. A deterministic replay of the Vexx engine, entirely in your browser.',
  alternates: { canonical: '/playground' },
};

const explainers = [
  {
    icon: Braces,
    title: 'Tier 0 · grammar',
    body: 'The JSON pushdown automaton decides which tokens are grammatically legal at this exact prefix. Structural tokens stay high-entropy; EOS is only unlocked on a complete document.',
  },
  {
    icon: Calculator,
    title: 'Tier 1 · intervals',
    body: 'Every digit narrows the reachable numeric interval under the simplex and concentration bounds. Tokens that would leave the interval are masked before sampling.',
  },
  {
    icon: Zap,
    title: 'Zero-DoF · splice',
    body: 'Once the weights close, expected return, volatility and Sharpe are computed exactly and spliced in. Twenty-four tokens the model never had to guess.',
  },
];

export default function PlaygroundPage() {
  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b border-border-subtle pb-8 pt-4 sm:pb-10">
        <div aria-hidden className="aurora-soft" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_10%,transparent_75%)]"
        />
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow rounded-full border border-border-subtle bg-bg-elevated/70 px-3 py-1.5 shadow-[0_1px_0_rgba(21,19,15,0.04)] backdrop-blur">
                <Cpu className="h-3 w-3 text-cobalt-500" /> Interactive playground
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-cobalt-500/25 bg-cobalt-500/10 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wide text-cobalt-600 dark:text-cobalt-300 backdrop-blur">
                <span aria-hidden className="h-1 w-1 rounded-full bg-cobalt-500" />
                ₹0 client-side WASM
              </span>
              <h1 className="display-lg mt-2 max-w-2xl text-ink-primary">
                The theorem is inside the loop.
              </h1>
              <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-ink-secondary sm:text-[16.5px]">
                Move the knobs, run the decode, inspect every token. When the constraints stop being
                satisfiable, preflight catches it before a single GPU cycle is spent.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-bg-elevated px-2.5 py-1 font-mono text-[9.5px] text-ink-muted">
                <Zap className="h-2.5 w-2.5 text-verify-pass" /> deterministic
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-bg-elevated px-2.5 py-1 font-mono text-[9.5px] text-ink-muted">
                <ShieldCheck className="h-2.5 w-2.5 text-cobalt-500" /> zero backend
              </span>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-bg-elevated px-2.5 py-1 font-mono text-[9.5px] text-ink-muted transition-colors hover:text-ink-primary"
              >
                <Github className="h-2.5 w-2.5" /> source
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pt-6 sm:pt-8">
        <DecodeLab />
      </section>

      <section className="container-page mt-10">
        <div className="grid gap-3 sm:grid-cols-3">
          {explainers.map((e) => (
            <div key={e.title} className="rounded-3xl border border-border-subtle bg-bg-elevated p-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle bg-bg-subtle text-cobalt-600 dark:text-cobalt-300">
                <e.icon className="h-4 w-4" />
              </span>
              <h2 className="mt-3 text-[13px] font-semibold text-ink-primary">{e.title}</h2>
              <p className="mt-1 text-[11.5px] leading-relaxed text-ink-secondary">{e.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl border border-border-subtle bg-bg-inset p-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-2.5">
            <Terminal className="mt-0.5 h-4 w-4 shrink-0 text-cobalt-500" />
            <p className="max-w-2xl text-[11.5px] leading-relaxed text-ink-secondary">
              Want the real engine instead of the replay? Build the WebAssembly binding with{' '}
              <code className="rounded border border-border-subtle bg-bg-elevated px-1 py-0.5 font-mono text-[10.5px]">
                {siteConfig.npmWasm}
              </code>{' '}
              and call <code className="font-mono text-[10.5px]">prefix_status</code> directly.
            </p>
          </div>
          <Link
            href="/docs/api-reference/wasm-browser-api"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-subtle bg-bg-elevated px-3 py-1.5 text-[11.5px] font-semibold text-ink-primary transition-colors hover:border-border-cobalt"
          >
            WASM API <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </section>
    </div>
  );
}
