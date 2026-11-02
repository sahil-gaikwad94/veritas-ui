import Link from 'next/link';
import { ArrowRight, Github, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { CopyCommand } from '@/components/site/copy-command';

export function FinalCta() {
  return (
    <section className="container-page py-14 sm:py-20">
      <div className="relative overflow-hidden rounded-[28px] border border-cobalt-700/40 bg-[linear-gradient(135deg,#062a99_0%,#0b3fd6_38%,#1e5eff_72%,#4b83ff_100%)] px-5 py-10 text-white shadow-[0_40px_80px_-32px_rgba(6,42,153,0.65)] sm:px-10 sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_70%_20%,#000,transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full border border-white/20 bg-white/10 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.35),transparent_65%)] blur-2xl"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/90">
              <Sparkles className="h-3 w-3" /> Apache-2.0 · v{siteConfig.version}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/90">
              <span aria-hidden className="h-1 w-1 rounded-full bg-white/40" />
              ₹0 client-side WASM
            </span>
            <h2 className="display-lg mt-4 max-w-xl text-white">
              Ship output you’d actually sign your name to.
            </h2>
            <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-white/80 sm:text-base">
              One schema is enough to start. Keep the layers you need — masks, contractors, spliced fields,
              CDCL, certificates. They were designed to stand alone, unlike your last retry loop.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <Link
                href="/docs/getting-started/quickstart"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-cobalt-800 shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Read the quickstart
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
              >
                <Github className="h-4 w-4" /> Star the repo
              </a>
            </div>

            <div className="mt-4 max-w-sm">
              <CopyCommand
                command={siteConfig.installCommand}
                className="border-white/20 bg-white/10 text-white/85 hover:border-white/40 hover:text-white"
              />
            </div>

            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-white/60">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                Built in public
              </span>
              <a href={siteConfig.author.url} target="_blank" rel="noreferrer" className="link-draw hover:text-white">
                {siteConfig.author.name}
              </a>
              <a href={siteConfig.newIssue} target="_blank" rel="noreferrer" className="link-draw hover:text-white">
                request a feature
              </a>
              <a href={siteConfig.discussions} target="_blank" rel="noreferrer" className="link-draw hover:text-white">
                argue with the design
              </a>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
            {[
              { icon: Zap, k: '0.23 ms', v: 'native mask' },
              { icon: ShieldCheck, k: '0 calls', v: 'derived fields' },
              { icon: Sparkles, k: 'offline', v: 'proof checks' },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-xl border border-white/15 bg-white/[0.07] px-3 py-3 backdrop-blur-sm lg:flex lg:items-center lg:gap-3"
              >
                <s.icon className="h-4 w-4 text-white/70" />
                <div className="mt-1.5 lg:mt-0">
                  <p className="font-display text-base font-extrabold tracking-tight text-white sm:text-lg">
                    {s.k}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/60">{s.v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
