import Link from 'next/link';
import { ArrowUpRight, Quote } from 'lucide-react';

export function LabNotes() {
  return (
    <section className="section-y relative overflow-hidden">
      <div className="container-page">
        <div className="grid gap-4 md:grid-cols-12">
          {/* Dijkstra receipt */}
          <article className="card-luxe group relative overflow-hidden p-6 sm:p-8 md:col-span-5">
            <Quote className="h-6 w-6 text-cobalt-600/40" aria-hidden />
            <blockquote className="mt-5 font-display text-[1.35rem] font-bold leading-snug tracking-tight text-ink-primary sm:text-[1.55rem]">
              “Program testing can be used to show the presence of bugs, never their absence.”
            </blockquote>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Edsger W. Dijkstra, 1969 — we took it personally
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-secondary">
              Tests tell you what broke. A compiled spec tells you what <em>cannot</em> be emitted.
              Different verb, different universe.
            </p>
            <Link
              href="/docs/getting-started/how-vexx-works"
              className="link-draw mt-6 inline-flex text-[13px] font-semibold text-cobalt-700 dark:text-cobalt-300"
            >
              How the constraint reaches the token <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </article>

          {/* Dark island: the honest machine */}
          <article className="glass-island relative flex flex-col justify-between overflow-hidden rounded-[28px] p-6 text-white sm:p-8 md:col-span-4">
            <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cobalt-500/30 blur-3xl" />
            <div className="relative">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                Field note 002
              </p>
              <p className="mt-5 font-display text-[1.3rem] font-bold leading-snug tracking-tight sm:text-[1.45rem]">
                The Halting Problem is undefeated. So the solver says
                <span className="text-accent-acid"> UNKNOWN</span> out loud.
              </p>
              <p className="mt-4 text-[13.5px] leading-relaxed text-white/60">
                A bounded search that lies is worse than a bounded search that shrugs. Tier 2 only
                returns UNSAT when it can prove it.
              </p>
            </div>
            <Link
              href="/docs/engine-internals/tier2-nano-solver-and-z3"
              className="link-draw relative mt-7 inline-flex w-fit text-[12.5px] font-semibold text-white/85 hover:text-white"
            >
              Read the solver contract <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </article>

          {/* Loud pixel card */}
          <article className="pixel-field relative flex flex-col justify-between overflow-hidden rounded-[28px] p-6 text-white sm:p-8 md:col-span-3">
            <div className="relative">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                Aesthetic footnote
              </p>
              <p className="mt-5 font-display text-[1.7rem] font-extrabold leading-[1.05] tracking-tight">
                JSON has no taste.
                <br />
                Your output can.
              </p>
            </div>
            <p className="relative mt-6 text-[12.5px] leading-relaxed text-white/80">
              Verified does not have to mean beige. Bring your own schema; we brought the math and a
              decent gradient.
            </p>
          </article>
        </div>
    </div>
    </section>
  );
}
