import Link from 'next/link';
import { ArrowDownRight, ArrowRight, Play, Sparkles } from 'lucide-react';
import { heroStats, siteConfig } from '@/lib/site';
import { CopyCommand } from '@/components/site/copy-command';
import { HeroDemo } from './hero-demo';

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-12 pt-4 sm:pb-20 sm:pt-8">
      {/* light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-soft" />
        <div className="absolute inset-0 dot-bg opacity-40 [mask-image:radial-gradient(ellipse_62%_46%_at_50%_0%,#000_6%,transparent_72%)]" />
      </div>

      {/* fluted glass edge — Crunchy wink */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-32 hidden h-[360px] w-24 rotate-2 overflow-hidden rounded-l-[38px] bg-gradient-to-br from-cobalt-400 via-cobalt-600 to-cobalt-900 opacity-80 shadow-[var(--vt-shadow-lift)] ring-1 ring-white/20 lg:block"
      >
        <div className="hero-glass-edge absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_80%_10%,rgba(255,255,255,0.5),transparent_58%)]" />
      </div>

      <div className="container-page">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Link
            href="/docs/getting-started/how-veritas-works"
            className="group inline-flex max-w-full items-center gap-2 rounded-full border border-border-subtle bg-bg-elevated/70 py-1 pl-1 pr-3 text-[11.5px] shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-border-cobalt sm:text-xs"
          >
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-cobalt-600 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-white">
              <Sparkles className="h-2.5 w-2.5" /> v2.0
            </span>
            <span className="truncate text-ink-secondary">
              <span className="sm:hidden">The anti-hallucination layer</span>
              <span className="hidden sm:inline">The anti-hallucination layer for structured output</span>
            </span>
            <ArrowRight className="h-3 w-3 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5" />
          </Link>

          <h1 className="display-xl mt-6 text-balance text-ink-primary">
            Make the model
            <br className="hidden sm:block" />{' '}
            <span className="relative inline-block sm:whitespace-nowrap">
              <span className="text-gradient">prove it.</span>
              <svg
                aria-hidden
                viewBox="0 0 320 14"
                className="absolute -bottom-1.5 left-0 hidden h-2.5 w-full text-cobalt-500/50 sm:-bottom-2 sm:block"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M2 10C60 3 132 2 190 5c44 2 84 5 128 4"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-secondary sm:text-[18px]">
            Pydantic in, verified JSON out. Veritas sits inside decoding — masking illegal tokens,
            doing the arithmetic itself, and handing you a proof you can check offline. No vibes. No
            retry roulette.
          </p>

          <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/docs/getting-started/quickstart"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-cobalt-500 to-cobalt-700 px-6 text-sm font-semibold text-white shadow-[0_16px_32px_-14px_rgba(30,94,255,0.85)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-14px_rgba(30,94,255,0.9)] sm:w-auto"
            >
              Ship verified JSON
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/playground"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border-strong bg-bg-elevated/70 px-5 text-sm font-semibold text-ink-primary backdrop-blur transition-all hover:-translate-y-0.5 hover:border-border-cobalt sm:w-auto"
            >
              <Play className="h-3.5 w-3.5 fill-current text-cobalt-500" />
              Poke the decoder
            </Link>
          </div>

          <div className="mt-4 flex w-full items-center justify-center sm:w-auto">
            <CopyCommand command={siteConfig.installCommand} className="max-w-full" multiline />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
            <span>{siteConfig.license}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-border-strong" />
            <span>419 tests with native</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-border-strong" />
            <span>zero mandatory deps in Rust core</span>
          </div>
        </div>

        {/* live demo on a glass island */}
        <div className="relative mx-auto mt-12 max-w-5xl sm:mt-16">
          <div
            aria-hidden
            className="absolute -inset-x-6 -bottom-10 -top-8 -z-10 rounded-[48px] bg-gradient-to-b from-cobalt-500/12 via-accent-violet/8 to-transparent blur-2xl"
          />
          <HeroDemo />
          <div className="pointer-events-none absolute -bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted sm:flex">
            <ArrowDownRight className="h-3 w-3" />
            scroll for the receipts
          </div>
        </div>

        {/* stats */}
        <div className="mx-auto mt-16 max-w-4xl sm:mt-20">
          <div className="card-luxe grid grid-cols-2 overflow-hidden sm:grid-cols-4">
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-4 py-4 sm:px-5 sm:py-5 ${
                  i % 2 === 1 ? 'border-l border-border-subtle' : ''
                } ${i > 1 ? 'border-t border-border-subtle sm:border-t-0' : ''} ${
                  i > 0 ? 'sm:border-l sm:border-border-subtle' : ''
                }`}
              >
                <p className="font-display text-2xl font-extrabold tracking-tight text-ink-primary sm:text-[1.75rem]">
                  {stat.value}
                  <span className="ml-0.5 text-sm font-semibold text-cobalt-600 dark:text-cobalt-300">
                    {stat.unit}
                  </span>
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-[0.1em] text-ink-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-2.5 text-center font-mono text-[10px] text-ink-muted">
            Measured by the repository benchmark suite · GitHub Actions runner · 605-token vocabulary
          </p>
        </div>
      </div>
    </section>
  );
}
