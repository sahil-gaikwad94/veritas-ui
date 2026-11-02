import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BarChart3, Check, Cpu, FlaskConical, Gauge, Info, TestTube2, Zap } from 'lucide-react';
import { benchmarks, testMatrix } from '@/lib/benchmarks';
import { SectionHeading } from '@/components/site/section';
import { Reveal } from '@/components/site/reveal';
import { CopyCommand } from '@/components/site/copy-command';

export const metadata: Metadata = {
  title: 'Benchmarks — native vs reference engine',
  description:
    'TokenMasker.valid_mask at 0.23 ms per step (17.9× faster than Python) and interval contraction at 3.9 µs. Methodology, caveats and reproduction commands for the Veritas engine.',
  alternates: { canonical: '/benchmarks' },
};

const methodology = [
  {
    icon: Cpu,
    title: 'Environment',
    body: 'Numbers come from the repository benchmark script on a GitHub Actions runner, not a tuned workstation. Your CPU, Python build and vocabulary will produce different absolutes.',
  },
  {
    icon: Gauge,
    title: 'Workload',
    body: 'The mask benchmark calls TokenMasker.valid_mask against a 605-token vocabulary — the per-step cost inside a decode loop. The interval benchmark measures a prefix contraction.',
  },
  {
    icon: FlaskConical,
    title: 'What it does not prove',
    body: 'These are microbenchmarks, not tokens/second on a live model. GPU bridges are adapter-tested with fakes, and the second measurement is dominated by the Python/native call boundary.',
  },
];

const budget = [
  { label: 'JSON mask', value: '0.23 ms', note: 'per decode step', tone: 'cobalt' },
  { label: 'Interval contraction', value: '3.9 µs', note: 'per numeric prefix', tone: 'cobalt' },
  { label: 'Preflight', value: '0 tokens', note: 'before the model runs', tone: 'pass' },
  { label: 'Derived fields', value: '0 calls', note: 'spliced, not sampled', tone: 'pass' },
];

export default function BenchmarksPage() {
  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b border-border-subtle pb-10 pt-5">
        <div aria-hidden className="aurora-soft" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_10%,transparent_75%)]"
        />
        <div className="container-page">
          <span className="eyebrow rounded-full border border-border-subtle bg-bg-elevated/70 px-3 py-1.5 shadow-[0_1px_0_rgba(21,19,15,0.04)] backdrop-blur">
            <BarChart3 className="h-3 w-3 text-cobalt-500" /> Benchmarks
          </span>
          <h1 className="display-lg mt-2 max-w-2xl text-ink-primary">Numbers with their caveats attached.</h1>
          <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-ink-secondary sm:text-[16.5px]">
            Veritas sits inside a decode loop, so overhead has to be measured per step, not per request. These
            are the two numbers that matter — and the reasons not to over-read them.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <CopyCommand command="python benchmarks/native_speedup.py" />
            <span className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-bg-elevated px-2.5 py-1 font-mono text-[9.5px] text-ink-muted">
              <Zap className="h-2.5 w-2.5 text-verify-pass" /> native accelerator
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-bg-elevated px-2.5 py-1 font-mono text-[9.5px] text-ink-muted">
              <Info className="h-2.5 w-2.5 text-cobalt-500" /> GitHub Actions runner
            </span>
          </div>
        </div>
      </section>

      <section className="container-page pt-8">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="h-full rounded-3xl border border-border-subtle bg-bg-elevated p-5 shadow-[var(--vt-shadow-card)] sm:p-6">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <h2 className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-secondary">
                  native vs reference
                </h2>
                <span className="font-mono text-[9px] text-ink-muted">lower is better</span>
              </div>

              <div className="mt-5 space-y-7">
                {benchmarks.map((b) => {
                  const pythonPct = 100;
                  const nativePct = (b.native / b.python) * 100;
                  return (
                    <div key={b.name}>
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="font-mono text-[11.5px] font-medium text-ink-primary">{b.name}</p>
                          <p className="mt-0.5 text-[11px] text-ink-muted">{b.detail}</p>
                        </div>
                        <span className="rounded-full border border-verify-pass/25 bg-verify-pass/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-verify-pass">
                          {b.speedup}
                        </span>
                      </div>
                      <div className="mt-3 space-y-2.5">
                        <div>
                          <div className="mb-1 flex justify-between font-mono text-[9.5px]">
                            <span className="text-ink-muted">Python</span>
                            <span className="text-ink-secondary">
                              {b.python} {b.unit}
                            </span>
                          </div>
                          <div className="h-2.5 rounded-full bg-bg-subtle">
                            <div className="h-full rounded-full bg-ink-muted/40" style={{ width: `${pythonPct}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 flex justify-between font-mono text-[9.5px]">
                            <span className="text-cobalt-600 dark:text-cobalt-300">Rust native</span>
                            <span className="font-semibold text-ink-primary">
                              {b.native} {b.unit}
                            </span>
                          </div>
                          <div className="h-2.5 rounded-full bg-bg-subtle">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cobalt-600 to-cobalt-400"
                              style={{ width: `${nativePct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-6 border-t border-border-subtle pt-3 text-[10.5px] leading-relaxed text-ink-muted">
                Reproduce with <code className="font-mono">benchmarks/native_speedup.py</code>. The script
                prints the comparison and its own caveats; absolute numbers depend on the host.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                {budget.map((b) => (
                  <div key={b.label} className="rounded-3xl border border-border-subtle bg-bg-elevated p-3.5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-muted">{b.label}</p>
                    <p
                      className={`mt-1.5 font-display text-lg font-extrabold tracking-tight ${
                        b.tone === 'pass' ? 'text-verify-pass' : 'text-ink-primary'
                      }`}
                    >
                      {b.value}
                    </p>
                    <p className="mt-0.5 font-mono text-[9px] text-ink-muted">{b.note}</p>
                  </div>
                ))}
              </div>

              <div className="flex-1 rounded-3xl border border-border-cobalt bg-cobalt-500/[0.05] p-4">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-cobalt-700 dark:text-cobalt-300">
                  why it fits in the loop
                </p>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-secondary">
                  A forward pass costs orders of magnitude more than a mask. At 0.23 ms per step, the mask is a
                  rounding error against a GPU step — and every spliced derived field removes an entire pass.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page mt-12">
        <SectionHeading
          align="left"
          eyebrow="Methodology"
          title="How to read these numbers."
          description="A benchmark without its environment is a slogan. Here is what was measured, how, and where the measurement stops being useful."
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {methodology.map((m) => (
            <Reveal key={m.title}>
              <div className="h-full rounded-3xl border border-border-subtle bg-bg-elevated p-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle bg-bg-subtle text-cobalt-600 dark:text-cobalt-300">
                  <m.icon className="h-4 w-4" />
                </span>
                <h3 className="mt-3 text-[13px] font-semibold text-ink-primary">{m.title}</h3>
                <p className="mt-1 text-[11.5px] leading-relaxed text-ink-secondary">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page mt-12">
        <SectionHeading
          align="left"
          eyebrow="Test coverage"
          title="The claims are backed by suites you can run."
          description="Python is the complete product surface. The native engine is an accelerator with parity pinned by its own tests — a native regression costs speed, not soundness."
        />
        <div className="mt-6 overflow-hidden rounded-3xl border border-border-subtle bg-bg-elevated">
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-b border-border-subtle bg-bg-subtle/60">
                <th className="px-4 py-2.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-muted">
                  suite
                </th>
                <th className="px-4 py-2.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-muted">
                  result
                </th>
                <th className="hidden px-4 py-2.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-muted sm:table-cell">
                  notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {testMatrix.map((row) => (
                <tr key={row.suite}>
                  <td className="px-4 py-3 align-top">
                    <span className="flex items-center gap-1.5 font-medium text-ink-primary">
                      <TestTube2 className="h-3 w-3 shrink-0 text-ink-muted" />
                      {row.suite}
                    </span>
                    <span className="mt-1 block text-[10.5px] leading-relaxed text-ink-muted sm:hidden">
                      {row.detail}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 align-top">
                    <span className="inline-flex items-center gap-1 rounded-full bg-verify-pass/10 px-2 py-0.5 font-mono text-[10px] text-verify-pass">
                      <Check className="h-2.5 w-2.5" /> {row.result}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 align-top text-[11.5px] leading-relaxed text-ink-secondary sm:table-cell">
                    {row.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[10.5px] text-ink-muted">
          Counts reflect the repository README for version 2.0.0. Run the suites to confirm on your checkout.
        </p>
      </section>

      <section className="container-page mt-12">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Reproduce"
              title="Do not trust a headline. Run it."
              description="The accelerator is optional. Force the reference path, compare wire versions and inspect what is actually loaded before drawing conclusions."
            />
            <div className="mt-4 space-y-2">
              <CopyCommand command="cargo test -p veritas-core --all-targets" className="w-full justify-between" />
              <CopyCommand command="VERITAS_NO_NATIVE=1 python benchmarks/native_speedup.py" className="w-full justify-between" />
            </div>
          </div>
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-term-bg shadow-[var(--vt-shadow-lift)]">
              <div className="flex items-center justify-between border-b border-white/10 bg-term-elevated px-3 py-2">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-slate-400">
                  ci run 41395204893 · ubuntu-latest
                </span>
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                </span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[10.5px] leading-[1.9] text-slate-300 sm:text-[11.5px]">
{`$ python benchmarks/native_speedup.py
python 3.12.15, vocabulary 605 tokens
workload            pure µs/call  native µs/call   speedup
mask                    4067.000         227.000    17.92x
numeric_prefix             5.690           3.880     1.47x

p50 over repeated blocks; VERITAS_NO_NATIVE pins the pure path.`}
              </pre>
              <p className="border-t border-white/10 px-4 py-2.5 font-mono text-[9.5px] leading-relaxed text-slate-400">
                without the wheel it prints the import error and exits 0 — no invented comparison
              </p>
            </div>
          </Reveal>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">
          Each side runs in its own subprocess: the accelerated wheel in one, <code className="font-mono">VERITAS_NO_NATIVE=1</code>
          in the other. The script prints p50 per call and refuses to compare against an engine it could not import,
          because a benchmark that cannot measure must not pretend to.
        </p>
      </section>

      <div className="container-page mt-10 flex flex-col items-start justify-between gap-3 rounded-2xl border border-border-subtle bg-bg-inset p-4 sm:flex-row sm:items-center">
        <p className="text-[11.5px] text-ink-secondary">
          Want to see the masking decisions instead of the milliseconds?
        </p>
        <Link
          href="/playground"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink-primary px-3.5 py-2 text-[11.5px] font-semibold text-bg-canvas transition-opacity hover:opacity-90"
        >
          Open the decode lab <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
