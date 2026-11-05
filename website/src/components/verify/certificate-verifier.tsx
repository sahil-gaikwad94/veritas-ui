'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Check,
  ChevronDown,
  ClipboardCheck,
  Download,
  FileJson,
  FlaskConical,
  Link2,
  Loader2,
  ShieldCheck,
  ShieldX,
  Sparkles,
  Upload,
  X,
} from 'lucide-react';
import {
  buildSampleCertificate,
  decodeCertificate,
  encodeCertificate,
  isRealCertificate,
  parseJsonLenient,
  RawNumber,
  verifyCertificate,
  type ProofCertificate,
  type VerificationOutcome,
} from '@/lib/certificate';
import { copyText } from '@/components/site/copy-command';
import { cn } from '@/lib/utils';

function Seal({ ok }: { ok: boolean }) {
  return (
    <div
      className={cn(
        'relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl',
        ok
          ? 'bg-gradient-to-br from-verify-pass/25 to-verify-pass/5 text-verify-pass ring-1 ring-verify-pass/30'
          : 'bg-gradient-to-br from-rose-500/20 to-rose-500/5 text-verify-fail ring-1 ring-rose-500/30',
      )}
    >
      {ok ? <ShieldCheck className="h-7 w-7" /> : <ShieldX className="h-7 w-7" />}
      <span
        aria-hidden
        className={cn(
          'absolute -inset-1 rounded-[20px] border opacity-40',
          ok ? 'border-verify-pass/30' : 'border-rose-500/30',
        )}
      />
    </div>
  );
}

const STAGES = [
  { id: 'shape', label: 'Parse certificate', log: 'parse proof.json · schema_version = 1' },
  { id: 'witness', label: 'Hash the witness', log: 'sha256(witness) == witness_sha256' },
  { id: 'spec', label: 'Hash the spec', log: 'sha256(spec) == spec_digest' },
  { id: 'constraints', label: 'Replay constraints', log: 'replay recorded constraint outcomes' },
  { id: 'smt', label: 'Read the proof script', log: 'SMT-LIB2 balanced · (check-sat) present' },
  { id: 'arithmetic', label: 'Re-check the arithmetic', log: 're-evaluate Σw · E[r] · σ · Sharpe' },
] as const;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const statusStyles = {
  pass: { icon: Check, cls: 'bg-verify-pass/10 text-verify-pass', label: 'pass' },
  fail: { icon: X, cls: 'bg-rose-500/10 text-verify-fail', label: 'fail' },
  warn: { icon: AlertTriangle, cls: 'bg-amber-500/10 text-verify-warn', label: 'skipped' },
} as const;

function VerificationProgress({ stage }: { stage: number }) {
  const pct = Math.round((Math.min(stage, STAGES.length) / STAGES.length) * 100);
  const active = STAGES[Math.min(stage, STAGES.length - 1)];

  return (
    <div aria-busy="true" className="flex min-h-[420px] flex-col p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cobalt-500/20 to-accent-violet/10 text-cobalt-600 ring-1 ring-border-cobalt dark:text-cobalt-300">
          <ShieldCheck className="h-6 w-6" />
          <span className="absolute -inset-1 animate-ping rounded-[18px] border border-cobalt-500/25" />
        </div>
        <div className="min-w-0">
          <p className="font-display text-base font-extrabold tracking-tight text-ink-primary">
            Verifying in this tab
          </p>
          <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-muted">
            {STAGES.length} checks · no network requests
          </p>
        </div>
        <span className="ml-auto font-display text-xl font-extrabold tabular-nums text-cobalt-600 dark:text-cobalt-300">
          {pct}%
        </span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-bg-subtle">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cobalt-500 via-accent-violet to-verify-pass transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ol className="mt-4 space-y-1">
        {STAGES.map((item, index) => {
          const done = index < stage;
          const current = index === stage;
          return (
            <li
              key={item.id}
              className={cn(
                'flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors',
                current && 'bg-cobalt-500/[0.06]',
              )}
            >
              <span
                className={cn(
                  'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                  done
                    ? 'border-verify-pass/30 bg-verify-pass/10 text-verify-pass'
                    : current
                      ? 'border-cobalt-500/30 bg-cobalt-500/10 text-cobalt-600 dark:text-cobalt-300'
                      : 'border-border-subtle bg-bg-subtle text-ink-muted',
                )}
              >
                {done ? (
                  <Check className="h-3 w-3" />
                ) : current ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <span className="h-1 w-1 rounded-full bg-current" />
                )}
              </span>
              <span
                className={cn(
                  'text-[11.5px] font-medium',
                  done || current ? 'text-ink-primary' : 'text-ink-muted',
                )}
              >
                {item.label}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-auto overflow-hidden rounded-xl border border-white/10 bg-term-bg p-3 font-mono text-[9.5px] leading-relaxed">
        <p className="text-slate-400">$ vexx verify-proof proof.json</p>
        {STAGES.slice(0, stage).map((item) => (
          <p key={item.id} className="text-emerald-300">
            ✓ {item.log}
          </p>
        ))}
        {stage < STAGES.length && <p className="text-slate-300">… {active.log}</p>}
      </div>
    </div>
  );
}

export function CertificateVerifier() {
  const [input, setInput] = useState('');
  const [outcome, setOutcome] = useState<VerificationOutcome | null>(null);
  const [busy, setBusy] = useState(false);
  const [running, setRunning] = useState(false);
  const [stage, setStage] = useState(0);
  const [parseError, setParseError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [showRaw, setShowRaw] = useState(false);
  const [cert, setCert] = useState<ProofCertificate | null>(null);
  const [engineFormat, setEngineFormat] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const runVerify = useCallback(async (text: string, { scroll = false, animate = false } = {}) => {
    setBusy(true);
    setRunning(animate);
    setStage(0);
    setOutcome(null);
    setParseError(null);
    setShareUrl(null);
    setCopied(false);
    setShowRaw(false);
    try {
      const parsed = parseJsonLenient(text) as ProofCertificate;
      setEngineFormat(isRealCertificate(parsed));
      const pending = verifyCertificate(parsed);
      if (animate) {
        const reduced =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) {
          setStage(STAGES.length);
        } else {
          const started = Date.now();
          for (let i = 1; i <= STAGES.length; i += 1) {
            await wait(185 + i * 22);
            setStage(i);
          }
          const elapsed = Date.now() - started;
          if (elapsed < 1450) await wait(1450 - elapsed);
        }
      }
      const result = await pending;
      setStage(STAGES.length);
      setOutcome(result);
      setCert(parsed);
      if (scroll && typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches) {
        requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      }
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not parse JSON.';
      setOutcome(null);
      setParseError(message);
      return null;
    } finally {
      setBusy(false);
      setRunning(false);
    }
  }, []);

  const loadSample = useCallback(
    async (autoScroll = false, animate = false) => {
      const sample = await buildSampleCertificate();
      const text = JSON.stringify(sample, null, 2);
      setInput(text);
      await runVerify(text, { scroll: autoScroll, animate });
    },
    [runVerify],
  );

  // first load: hash certificate, otherwise the sample
  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      const hash = window.location.hash;
      const match = hash.match(/cert=([^&]+)/);
      if (match) {
        try {
          const decoded = decodeCertificate(decodeURIComponent(match[1]));
          const text = JSON.stringify(decoded, null, 2);
          if (!cancelled) {
            setInput(text);
            await runVerify(text);
          }
          return;
        } catch {
          /* fall through to sample */
        }
      }
      if (!cancelled) await loadSample();
    };
    void init();
    return () => {
      cancelled = true;
    };
  }, [runVerify, loadSample]);

  const tamper = () => {
    if (!input) return;
    try {
      const parsed = parseJsonLenient(input) as ProofCertificate;
      const rawWitness = (parsed.witness ?? {}) as Record<string, unknown>;
      const witness: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(rawWitness)) {
        witness[key] = value instanceof RawNumber ? Number(value.text) : value;
      }
      if (typeof witness.sharpe === 'number') {
        witness.sharpe = Number((witness.sharpe + 0.25).toFixed(4));
      } else if (typeof witness.expected_return === 'number') {
        witness.expected_return = Number((witness.expected_return + 0.01).toFixed(4));
      } else if (typeof witness.sla_hours === 'number') {
        witness.sla_hours = 1;
      }
      const tampered = { ...parsed, witness };
      const text = JSON.stringify(tampered, null, 2);
      setInput(text);
      void runVerify(text, { scroll: true, animate: true });
    } catch {
      setParseError('The current text is not valid JSON, so it cannot be tampered with.');
    }
  };

  const onFile = async (file: File) => {
    const text = await file.text();
    setInput(text);
    await runVerify(text, { scroll: true });
    setDragging(false);
  };

  const share = async () => {
    if (!cert || !outcome?.ok) return;
    const token = encodeCertificate(cert);
    const url = `${window.location.origin}${window.location.pathname}#cert=${token}`;
    window.history.replaceState(null, '', `#cert=${token}`);
    setShareUrl(url);
    if (await copyText(url)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const download = () => {
    if (!cert) return;
    const blob = new Blob([JSON.stringify(cert, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vexx-proof.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* input */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated shadow-[var(--vt-shadow-card)]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle px-4 py-2.5">
          <h2 className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
            <FileJson className="h-3.5 w-3.5" /> proof.json
          </h2>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => void loadSample(false, true)}
              className="inline-flex items-center gap-1 rounded-full border border-border-subtle px-2 py-1 font-mono text-[9px] text-ink-muted transition-colors hover:text-ink-primary"
            >
              <Sparkles className="h-2.5 w-2.5" /> sample
            </button>
            <button
              type="button"
              onClick={tamper}
              className="inline-flex items-center gap-1 rounded-full border border-rose-500/25 px-2 py-1 font-mono text-[9px] text-verify-fail transition-colors hover:bg-rose-500/5"
            >
              <FlaskConical className="h-2.5 w-2.5" /> tamper
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1 rounded-full border border-border-subtle px-2 py-1 font-mono text-[9px] text-ink-muted transition-colors hover:text-ink-primary"
            >
              <Upload className="h-2.5 w-2.5" /> file
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void onFile(file);
                e.target.value = '';
              }}
            />
          </div>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) void onFile(file);
          }}
          className={cn('relative flex flex-1 flex-col', dragging && 'bg-cobalt-500/[0.06]')}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            placeholder='{ "schema_version": 1, "generator": "vexx", ... }'
            className="h-full min-h-[300px] w-full flex-1 resize-y bg-term-bg p-4 font-mono text-[10.5px] leading-relaxed text-slate-300 outline-none placeholder:text-slate-600 focus:ring-0 sm:min-h-[360px] sm:text-[11.5px]"
            aria-label="Proof certificate JSON"
          />
          {running && (
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-transparent via-cobalt-400/25 to-transparent animate-[vt-scan_1.8s_ease-in-out_infinite]" />
              <div className="absolute inset-0 bg-cobalt-500/[0.03]" />
            </div>
          )}
          {dragging && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center border-2 border-dashed border-cobalt-500/50 bg-bg-canvas/80 font-mono text-[11px] text-cobalt-600 dark:text-cobalt-300">
              drop proof.json to verify
            </div>
          )}
        </div>

        {parseError && (
          <div className="flex items-start gap-2 border-t border-rose-500/20 bg-rose-500/[0.06] px-4 py-2.5 text-[11px] text-verify-fail">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span className="font-mono">{parseError}</span>
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-border-subtle p-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => void runVerify(input, { scroll: true, animate: true })}
            disabled={busy || !input.trim()}
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-cobalt-500 to-cobalt-700 px-5 text-[13px] font-semibold text-white shadow-[var(--vt-shadow-cobalt)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ClipboardCheck className="h-4 w-4" />}
            {busy ? 'Verifying…' : 'Verify certificate'}
          </button>
          <span className="text-center font-mono text-[9px] text-ink-muted sm:text-left">
            runs locally · SHA-256 via WebCrypto
          </span>
        </div>
      </div>

      {/* result */}
      <div
        ref={resultRef}
        className="scroll-mt-24 overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated shadow-[var(--vt-shadow-card)]"
        aria-live="polite"
      >
        <div className="flex items-center justify-between gap-2 border-b border-border-subtle px-4 py-2.5">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
            verification result
          </h2>
          {outcome && (
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.08em]',
                outcome.ok
                  ? 'bg-verify-pass/10 text-verify-pass'
                  : 'bg-rose-500/10 text-verify-fail',
              )}
            >
              {outcome.ok ? <Check className="h-2.5 w-2.5" /> : <X className="h-2.5 w-2.5" />}
              {outcome.ok ? 'verified' : 'rejected'}
            </span>
          )}
        </div>

        {running ? (
          <VerificationProgress stage={stage} />
        ) : !outcome ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-2 p-6 text-center">
            <ShieldCheck className="h-8 w-8 text-ink-muted" />
            <p className="text-[13px] font-medium text-ink-secondary">
              {busy ? 'Verifying certificate…' : 'Paste a certificate to verify it'}
            </p>
            <p className="max-w-xs text-[11px] leading-relaxed text-ink-muted">
              Integrity digests, constraint outcomes, SMT-LIB2 structure and the portfolio arithmetic are
              re-checked in this tab.
            </p>
          </div>
        ) : (
          <div key={outcome.certificate?.witness_sha256 ?? 'result'} className="animate-[vt-rise_520ms_var(--ease-out-expo)_both] p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <Seal ok={outcome.ok} />
              <div className="min-w-0">
                <p className="font-display text-lg font-extrabold tracking-tight text-ink-primary">
                  {outcome.ok ? 'Certificate verified' : 'Certificate rejected'}
                </p>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-secondary">
                  {outcome.ok
                    ? engineFormat
                      ? 'Every digest reproduces from the bytes in front of you. Constraint replay is the engine’s job — run vexx verify-proof for the authoritative check.'
                      : 'Digests match, every recorded constraint passed, and the derived arithmetic is consistent.'
                    : (outcome.error ??
                      'At least one check failed. The witness or the specification changed after signing.')}
                </p>
              </div>
            </div>

            {outcome.certificate && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-md border border-border-subtle bg-bg-subtle px-2 py-1 font-mono text-[9.5px] text-ink-secondary">
                  <ShieldCheck className="h-2.5 w-2.5 text-verify-pass" />
                  {engineFormat
                    ? `certificate v${String(outcome.certificate.version)}`
                    : `sample v${String(outcome.certificate.schema_version)}`}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-border-subtle bg-bg-subtle px-2 py-1 font-mono text-[9.5px] text-ink-secondary">
                  sha {String(outcome.certificate.witness_sha256).slice(0, 12)}…
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-border-subtle bg-bg-subtle px-2 py-1 font-mono text-[9.5px] text-ink-secondary">
                  {engineFormat
                    ? outcome.certificate.smt2_complete
                      ? 'full SMT export'
                      : 'SMT export partial'
                    : `${outcome.certificate.results?.length ?? 0} constraints`}
                </span>
              </div>
            )}

            <ul className="mt-4 divide-y divide-border-subtle rounded-xl border border-border-subtle">
              {outcome.checks.map((check) => {
                const { icon: Icon, cls, label } = statusStyles[check.status];
                return (
                  <li
                    key={check.id}
                    className="flex items-start gap-2.5 px-3 py-2.5 animate-[vt-rise_420ms_var(--ease-out-expo)_both]"
                    style={{ animationDelay: `${80 + outcome.checks.indexOf(check) * 55}ms` }}
                  >
                    <span className={cn('mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full', cls)}>
                      <Icon className="h-3 w-3" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <span className="text-[11.5px] font-semibold text-ink-primary">{check.label}</span>
                        <span className={cn('font-mono text-[8.5px] uppercase tracking-wide', cls.split(' ')[1])}>
                          {label}
                        </span>
                      </div>
                      <p className="mt-0.5 break-words font-mono text-[9.5px] leading-relaxed text-ink-muted">
                        {check.detail}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            {outcome.ok && (
              <div className="mt-4 space-y-2">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => void share()}
                    className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full border border-border-subtle bg-bg-elevated px-3 text-[11.5px] font-semibold text-ink-primary transition-colors hover:border-border-cobalt"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-verify-pass" /> : <Link2 className="h-3.5 w-3.5" />}
                    {copied ? 'Link copied' : 'Copy shareable link'}
                  </button>
                  <button
                    type="button"
                    onClick={download}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-border-subtle bg-bg-elevated px-3 text-[11.5px] font-semibold text-ink-primary transition-colors hover:border-border-cobalt"
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </button>
                </div>
                {shareUrl && (
                  <p className="truncate rounded-lg border border-border-subtle bg-bg-subtle px-2 py-1.5 font-mono text-[9px] text-ink-muted">
                    {shareUrl}
                  </p>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowRaw((s) => !s)}
              aria-expanded={showRaw}
              className="mt-3 flex w-full items-center justify-between border-t border-border-subtle pt-2.5 font-mono text-[9.5px] text-ink-muted transition-colors hover:text-ink-secondary"
            >
              what this verifier checks
              <ChevronDown className={cn('h-3 w-3 transition-transform', showRaw && 'rotate-180')} />
            </button>
            {showRaw && (
              <div className="mt-2 space-y-1.5 rounded-lg border border-border-subtle bg-bg-subtle/60 p-2.5 text-[10px] leading-relaxed text-ink-secondary">
                <p>
                  <strong className="text-ink-primary">Checked:</strong> JSON shape, canonical SHA-256 of the
                  witness and spec, recorded constraint outcomes, SMT-LIB2 balance, and the portfolio
                  arithmetic (Σw, E[r], σ, Sharpe).
                </p>
                <p>
                  <strong className="text-ink-primary">Not checked:</strong> Python validators that are not
                  portable, and the truth of a spec you have not chosen to trust. Digests are unkeyed
                  integrity checks — bind them with{' '}
                  <code className="font-mono text-[9.5px]">verify_proof(cert, expected_spec=...)</code>.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
