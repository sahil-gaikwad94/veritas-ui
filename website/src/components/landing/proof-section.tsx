import Link from 'next/link';
import { ArrowRight, Check, Fingerprint, Lock, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/site/reveal';
import { VexxMark } from '@/components/site/logo';

// Values from a real certificate: vt.build_certificate(portfolio, weights) on 2.0.0.
const rows = [
  { k: 'spec_sha256', v: '2e8ccb53…7591', ok: true },
  { k: 'witness_sha256', v: 'd43bc7ff…f46b', ok: true },
  { k: 'constraints', v: '6 satisfied · 0 violated', ok: true },
  { k: 'smt2_coverage', v: '1 derive omitted · VIR wins', ok: true },
];

export function ProofSection() {
  return (
    <section id="proofs" className="section-y">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <span className="eyebrow">
            <Fingerprint className="h-3 w-3 text-cobalt-500" /> Proof certificates
          </span>
          <h2 className="display-lg mt-3 text-ink-primary">Every answer leaves a paper trail.</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-secondary sm:text-base">
            A verified value is only as good as your ability to check it later. Vexx certificates embed
            the versioned spec, the witness and an SMT-LIB2 rendering, then hash both. Verification is offline,
            tamper-evident and re-evaluates the constraints from the embedded spec.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              {
                icon: ShieldCheck,
                title: 'Self-contained',
                body: 'No server call, no database, no original schema required for portable specs.',
              },
              {
                icon: Lock,
                title: 'Integrity, stated honestly',
                body: 'SHA-256 is an unkeyed digest. Bind it to an expected spec, or sign it in your own app.',
              },
            ].map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-bg-elevated text-cobalt-600 dark:text-cobalt-300">
                  <item.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[13.5px] font-semibold text-ink-primary">{item.title}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-ink-secondary">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              href="/verify"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink-primary px-4 py-2.5 text-[13px] font-semibold text-bg-canvas transition-opacity hover:opacity-90"
            >
              Verify one in your browser <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/docs/proofs-rl-and-cli/proof-certificates"
              className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-elevated px-4 py-2.5 text-[13px] font-semibold text-ink-primary transition-colors hover:border-border-cobalt"
            >
              Read the spec
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-cobalt-500/15 via-transparent to-verify-pass/10 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[28px] border border-border-subtle bg-gradient-to-br from-bg-elevated via-bg-elevated to-cobalt-50/60 p-5 shadow-[var(--vt-shadow-lift)] dark:to-cobalt-900/20 sm:p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[conic-gradient(from_120deg,rgba(30,94,255,0.14),rgba(138,180,255,0.05),transparent)] blur-md"
              />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <VexxMark className="h-8 w-8" animated />
                  <div>
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-muted">
                      ProofCertificate
                    </p>
                    <p className="font-mono text-[11px] text-ink-secondary">schema v1 · vexx1.5</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-verify-pass/30 bg-verify-pass/10 px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-verify-pass">
                  <Check className="h-3 w-3" /> pass
                </span>
              </div>

              <div className="relative mt-5 divide-y divide-border-subtle rounded-xl border border-border-subtle bg-bg-canvas/70 px-3">
                {rows.map((r) => (
                  <div key={r.k} className="flex items-center justify-between gap-3 py-2.5">
                    <span className="font-mono text-[10px] text-ink-muted">{r.k}</span>
                    <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-ink-primary">
                      {r.v}
                      <Check className="h-3 w-3 text-verify-pass" />
                    </span>
                  </div>
                ))}
              </div>

              <div className="relative mt-3 overflow-hidden rounded-xl border border-white/10 bg-term-bg p-3 font-mono text-[9.5px] leading-relaxed text-slate-400">
                <p className="text-slate-400">; certificate.smt2 (excerpt)</p>
                <p>
                  <span className="text-sky-400">(assert</span> (= (+ w_AAPL w_MSFT w_NVDA){' '}
                  <span className="text-amber-300">1.0</span>
                  <span className="text-sky-400">))</span>
                </p>
                <p>
                  <span className="text-sky-400">(assert</span> (&gt;= sharpe <span className="text-amber-300">0.65</span>
                  <span className="text-sky-400">))</span>
                </p>
                <p>
                  <span className="text-sky-400">(check-sat)</span> <span className="text-slate-400">; sat</span>
                </p>
              </div>

              <div className="relative mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle pt-3">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-muted">
                  offline · no network
                </span>
                <span className="font-mono text-[9.5px] text-ink-muted">verify-proof → exit 0</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
