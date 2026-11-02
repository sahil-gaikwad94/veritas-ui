import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CircleCheck, CircleX, FlaskConical, Layers, Play, Terminal, TriangleAlert } from 'lucide-react';
import { examples } from '@/lib/examples';
import { SectionHeading, Pill } from '@/components/site/section';
import { Reveal } from '@/components/site/reveal';
import { CopyCommand } from '@/components/site/copy-command';
import { CodeBlock } from '@/components/docs/code-block';
import { ExampleTerminal } from '@/components/examples/example-terminal';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Examples — five schemas that say no',
  description:
    'Five runnable Veritas examples, beginner to expert: invoice arithmetic, GPU scheduling, portfolio risk, text-to-SQL tenant isolation and an agent refund policy. Every transcript captured from veritas 2.0.0.',
  alternates: { canonical: '/examples' },
};

// Renders `inline code` spans inside otherwise plain copy.
function withCode(text: string) {
  return text.split('`').map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="rounded bg-bg-subtle px-1 py-0.5 font-mono text-[0.92em] text-ink-primary">
        {part}
      </code>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

const ladder: Record<string, { label: string; note: string }> = {
  invoice: { label: 'Arithmetic', note: 'one decorator' },
  schedule: { label: 'Feasibility', note: 'one validator' },
  portfolio: { label: 'Non-linear', note: 'solver territory' },
  sql: { label: 'Untrusted text', note: 'AST + policy' },
  agent: { label: 'State machine', note: 'temporal rules' },
};

const facts = [
  { value: '5', label: 'domains', note: 'money, plans, risk, SQL, tools' },
  { value: '0', label: 'model calls', note: 'the engine decides, not the LLM' },
  { value: '3', label: 'refusals', note: 'in the SQL example alone' },
  { value: '0.004', label: 'residual', note: 'enough to fail the invoice' },
];

export default function ExamplesPage() {
  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b border-border-subtle pb-9 pt-5">
        <div aria-hidden className="aurora-soft" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_10%,transparent_75%)]"
        />
        <div className="container-page">
          <span className="eyebrow rounded-full border border-border-subtle bg-bg-elevated/70 px-3 py-1.5 shadow-[0_1px_0_rgba(21,19,15,0.04)] backdrop-blur">
            <FlaskConical className="h-3 w-3 text-cobalt-500" /> Examples
          </span>
          <h1 className="display-lg mt-2 max-w-2xl text-ink-primary">Five schemas that say no.</h1>
          <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-ink-secondary sm:text-[16.5px]">
            A model is happy to hand you an invoice whose tax does not multiply, a schedule that books one GPU
            twice, a Sharpe ratio that fails its own formula and a SQL query missing the tenant filter. Each of
            those is one refusal away from being a bug report. Here are five, from beginner to expert — with the
            exact stdout, not a screenshot of an imagination.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <CopyCommand command={siteConfig.installCommand} />
            <span className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-bg-elevated px-2.5 py-1 font-mono text-[9.5px] text-ink-muted">
              <CircleCheck className="h-2.5 w-2.5 text-verify-pass" /> engine 2.0.0 · CPython 3.11.2
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-bg-elevated px-2.5 py-1 font-mono text-[9.5px] text-ink-muted">
              <Terminal className="h-2.5 w-2.5 text-cobalt-500" /> captured, not composed
            </span>
          </div>
        </div>
      </section>

      <section className="container-page pt-6">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="rounded-2xl border border-border-subtle bg-bg-elevated px-3.5 py-3">
              <p className="flex items-baseline gap-2">
                <span className="font-display text-lg font-extrabold leading-none tracking-tight text-ink-primary">
                  {f.value}
                </span>
                <span className="font-mono text-[9.5px] font-medium uppercase tracking-[0.12em] text-ink-muted">
                  {f.label}
                </span>
              </p>
              <p className="mt-0.5 font-mono text-[9.5px] text-ink-muted">{f.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-6">
        <div className="overflow-hidden rounded-3xl border border-border-subtle bg-bg-inset/60">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle px-4 py-2.5">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-muted">the difficulty ladder</p>
            <p className="font-mono text-[9.5px] text-ink-muted">read top to bottom, or jump to a floor</p>
          </div>
          <ol className="grid divide-y divide-border-subtle sm:grid-cols-5 sm:divide-x sm:divide-y-0">
            {examples.map((ex) => (
              <li key={ex.id}>
                <a
                  href={`#${ex.id}`}
                  className="flex h-full flex-col gap-1 px-4 py-3 transition-colors hover:bg-bg-elevated"
                >
                  <span className="font-mono text-[9.5px] text-ink-muted">{ex.number}</span>
                  <span className="text-[12.5px] font-semibold leading-snug text-ink-primary">{ex.level}</span>
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-cobalt-700 dark:text-cobalt-300">
                    {ladder[ex.id]?.label}
                  </span>
                  <span className="text-[10.5px] text-ink-muted">{ladder[ex.id]?.note}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="container-page mt-10 space-y-6">
        {examples.map((ex) => (
          <section key={ex.id} id={ex.id} className="scroll-mt-24">
            <Reveal>
              <article className="overflow-hidden rounded-3xl border border-border-subtle bg-bg-elevated shadow-[var(--vt-shadow-card)]">
                <div className="grid lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
                  <div className="flex flex-col border-b border-border-subtle p-5 sm:p-6 lg:border-b-0 lg:border-r">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] text-ink-muted">Fig. {ex.number}</span>
                      <Pill tone="neutral">{ex.level}</Pill>
                      <Pill tone={ex.verdict.tone}>{ex.verdict.label}</Pill>
                    </div>

                    <h2 className="mt-3 text-balance font-display text-[19px] font-extrabold leading-tight tracking-tight text-ink-primary sm:text-[22px]">
                      {ex.title}
                    </h2>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-ink-secondary">{ex.hook}</p>

                    <dl className="mt-4 space-y-1.5 rounded-2xl border border-border-subtle bg-bg-inset/60 p-3">
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:gap-3">
                        <dt className="flex shrink-0 items-center gap-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted sm:w-[92px]">
                          <CircleX className="h-2.5 w-2.5 text-verify-fail" /> model
                        </dt>
                        <dd className="break-words font-mono text-[11px] text-verify-fail">{ex.modelSays}</dd>
                      </div>
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:gap-3">
                        <dt className="flex shrink-0 items-center gap-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted sm:w-[92px]">
                          <CircleCheck className="h-2.5 w-2.5 text-verify-pass" /> veritas
                        </dt>
                        <dd className="break-words font-mono text-[11px] text-ink-primary">{ex.veritasSays}</dd>
                      </div>
                    </dl>

                    <ul className="mt-4 space-y-2">
                      {ex.bullets.map((b) => (
                        <li key={b} className="flex gap-2 text-[12.5px] leading-relaxed text-ink-secondary">
                          <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cobalt-500" />
                          <span>{withCode(b)}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-1.5 lg:mt-auto lg:pt-4">
                      {ex.surface.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border-subtle bg-bg-subtle px-2 py-0.5 font-mono text-[9.5px] text-ink-secondary"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <p className="mt-3 border-l-2 border-accent-coral/60 pl-3 font-display text-[13px] font-semibold italic leading-snug text-ink-primary">
                      “{ex.lesson}”
                    </p>
                  </div>

                  <div className="bg-bg-inset/70 p-4 sm:p-5">
                    <p className="mb-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-muted">
                      the verdict, verbatim
                    </p>
                    <ExampleTerminal command={`python ${ex.file}`} output={ex.output} />

                    <p className="mt-2 flex items-start gap-1.5 text-[10.5px] leading-relaxed text-ink-muted">
                      {ex.verdict.tone === 'pass' ? (
                        <CircleCheck className="mt-0.5 h-3 w-3 shrink-0 text-verify-pass" />
                      ) : ex.verdict.tone === 'fail' ? (
                        <CircleX className="mt-0.5 h-3 w-3 shrink-0 text-verify-fail" />
                      ) : (
                        <TriangleAlert className="mt-0.5 h-3 w-3 shrink-0 text-verify-warn" />
                      )}
                      {ex.verdict.detail}
                    </p>

                    <details className="group mt-3 rounded-2xl border border-border-subtle bg-bg-elevated/70">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-secondary transition-colors hover:text-ink-primary">
                        <span className="flex items-center gap-1.5">
                          <Layers className="h-3 w-3 text-cobalt-500" /> the script that produced it
                        </span>
                        <span className="text-[9px] text-ink-muted group-open:hidden">
                          {ex.script.split('\n').length} lines
                        </span>
                        <span className="hidden text-[9px] text-ink-muted group-open:inline">hide</span>
                      </summary>
                      <div className="border-t border-border-subtle px-3 pb-1 pt-1">
                        <CodeBlock
                          language="python"
                          code={ex.script}
                          filename={ex.file}
                          className="my-2 shadow-none"
                        />
                        <p className="mb-2 font-mono text-[9.5px] leading-relaxed text-ink-muted">
                          Save as {ex.file}, then run <span className="text-ink-secondary">python {ex.file}</span>.
                        </p>
                      </div>
                    </details>
                  </div>
                </div>
              </article>
            </Reveal>
          </section>
        ))}
      </div>

      <section className="container-page mt-12">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Steal these"
              title="Write your own in about nine lines."
              description="Each script above is self-contained: a Pydantic model, a decorated function, a dict. No API key, no GPU, no prompt engineering — the refusals come from the engine."
            />
            <div className="mt-4 space-y-2">
              <CopyCommand command={siteConfig.installCommand} className="w-full justify-between" />
              <CopyCommand command="python 01_invoice_math.py" className="w-full justify-between" />
              <CopyCommand command="veritas doctor" className="w-full justify-between" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/docs/getting-started/quickstart"
                className="inline-flex items-center gap-1.5 rounded-full bg-ink-primary px-4 py-2 text-[12.5px] font-semibold text-bg-canvas transition-opacity hover:opacity-90"
              >
                Quickstart <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/playground"
                className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-elevated px-4 py-2 text-[12.5px] font-semibold text-ink-primary transition-colors hover:border-border-cobalt"
              >
                <Play className="h-3.5 w-3.5" /> Open the playground
              </Link>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-elevated px-4 py-2 text-[12.5px] font-semibold text-ink-primary transition-colors hover:border-border-cobalt"
              >
                Source <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-border-subtle bg-bg-elevated p-4 sm:p-5">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-muted">
                two honest footnotes
              </p>
              <div className="mt-3 space-y-3 text-[12px] leading-relaxed text-ink-secondary">
                <p>
                  <span className="font-semibold text-ink-primary">The &ldquo;model output&rdquo; is a dict.</span>{' '}
                  There is no LLM in these five scripts — the completions are hardcoded so the verdicts are
                  reproducible on a laptop. Swap in your own model and the refusals do not change.
                </p>
                <p>
                  <span className="font-semibold text-ink-primary">These are not benchmarks.</span> They run on the
                  pure-Python reference engine with no native extension loaded, so the timings are omitted rather
                  than guessed. The{' '}
                  <Link href="/benchmarks" className="text-cobalt-700 underline decoration-cobalt-500/40 underline-offset-2 hover:decoration-cobalt-500 dark:text-cobalt-300">
                    benchmarks page
                  </Link>{' '}
                  keeps the numbers that were actually measured.
                </p>
              </div>
              <p className="mt-4 border-t border-border-subtle pt-3 font-mono text-[9.5px] leading-relaxed text-ink-muted">
                scripts and stdout captured 2026 · veritas 2.0.0 · Linux x86_64 · CPython 3.11.2
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
