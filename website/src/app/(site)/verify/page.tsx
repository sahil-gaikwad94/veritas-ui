import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileKey2, Fingerprint, Lock, ShieldCheck, Terminal } from 'lucide-react';
import { CertificateVerifier } from '@/components/verify/certificate-verifier';
import { CopyCommand } from '@/components/site/copy-command';

export const metadata: Metadata = {
  title: 'Verify — proof certificate inspector',
  description:
    'Inspect a Veritas proof certificate in your browser: canonical SHA-256 digests, constraint outcomes, SMT-LIB2 structure and the derived arithmetic. No server, no storage.',
  alternates: { canonical: '/verify' },
};

const info = [
  {
    icon: FileKey2,
    title: 'What it contains',
    body: 'The versioned specification, the witness instance, per-constraint outcomes, an SMT-LIB2 rendering, and SHA-256 digests of both the spec and the witness.',
  },
  {
    icon: Terminal,
    title: 'Verify from the CLI',
    body: 'The authoritative check is `veritas verify-proof proof.json`. It re-evaluates the constraints from the embedded VIR and exits non-zero on any failure.',
  },
  {
    icon: Lock,
    title: 'Integrity vs authentication',
    body: 'An unkeyed digest proves nothing changed — not who produced it. Bind to a trusted spec with expected_spec, or sign the artifact in your application.',
  },
];

export default function VerifyPage() {
  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b border-border-subtle pb-8 pt-4 sm:pb-10">
        <div aria-hidden className="aurora-soft" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 dot-bg opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_10%,transparent_75%)]"
        />
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow rounded-full border border-border-subtle bg-bg-elevated/70 px-3 py-1.5 shadow-[0_1px_0_rgba(21,19,15,0.04)] backdrop-blur">
                <Fingerprint className="h-3 w-3 text-cobalt-500" /> Certificate inspector
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-cobalt-500/25 bg-cobalt-500/10 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wide text-cobalt-600 dark:text-cobalt-300 backdrop-blur">
                <span aria-hidden className="h-1 w-1 rounded-full bg-cobalt-500" />
                ₹0 offline verification
              </span>
              <h1 className="display-lg mt-2 max-w-2xl text-ink-primary">
                Verify without trusting the server.
              </h1>
              <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-ink-secondary sm:text-[16.5px]">
                Drop in a real <code className="font-mono text-[12.5px]">proof.json</code> from
                <code className="font-mono text-[12.5px]"> certificate.save(...)</code> and this page reproduces the
                sealed content digest, the witness digest and the SMT-LIB2 digest locally. Constraint replay stays
                with the engine — nothing leaves your browser.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-bg-elevated px-2.5 py-1 font-mono text-[9.5px] text-ink-muted">
                <ShieldCheck className="h-2.5 w-2.5 text-verify-pass" /> WebCrypto SHA-256
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-bg-elevated px-2.5 py-1 font-mono text-[9.5px] text-ink-muted">
                <Lock className="h-2.5 w-2.5 text-cobalt-500" /> zero storage
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pt-6 sm:pt-8">
        <CertificateVerifier />
      </section>

      <section className="container-page mt-8 grid gap-3 sm:grid-cols-3">
        {info.map((item) => (
          <div key={item.title} className="rounded-3xl border border-border-subtle bg-bg-elevated p-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle bg-bg-subtle text-cobalt-600 dark:text-cobalt-300">
              <item.icon className="h-4 w-4" />
            </span>
            <h2 className="mt-3 text-[13px] font-semibold text-ink-primary">{item.title}</h2>
            <p className="mt-1 text-[11.5px] leading-relaxed text-ink-secondary">{item.body}</p>
          </div>
        ))}
      </section>

      <section className="container-page mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl border border-border-subtle bg-bg-inset p-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">Re-check offline</p>
          <p className="mt-1 text-[11.5px] text-ink-secondary">
            The Python verifier is authoritative and re-evaluates the embedded spec.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <CopyCommand command="veritas verify-proof proof.json" className="w-full justify-between sm:w-auto" />
          <Link
            href="/docs/proofs-rl-and-cli/proof-certificates"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-border-subtle bg-bg-elevated px-3 py-2 text-[11.5px] font-semibold text-ink-primary transition-colors hover:border-border-cobalt"
          >
            Certificate format <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </section>

      <p className="container-page mt-4 text-center text-[10.5px] leading-relaxed text-ink-muted">
        The sample is a synthetic certificate in the engine's <code className="font-mono text-[11px]">veritas1.1</code> format,
        sealed in your browser the way <code className="font-mono text-[11px]">ProofCertificate.seal()</code> seals a real
        one. Uploads of genuine certificates work too: the page verifies every digest it can recompute and says
        plainly that replaying the embedded VIR needs the CLI.
      </p>
    </div>
  );
}
