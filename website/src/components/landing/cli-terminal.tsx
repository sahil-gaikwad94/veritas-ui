'use client';

import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { copyText } from '@/components/site/copy-command';
import { cn } from '@/lib/utils';

// Every transcript below was captured from `python -m vexx` on vexx1.5
// reference engine (CPython 3.11, no native wheel installed). Keep them verbatim.
const commands = [
  {
    id: 'doctor',
    cmd: 'vexx doctor',
    label: 'doctor',
    output: `vexx1.5 on CPython 3.11.2
  engine    reference python
  reason    ModuleNotFoundError: No module named 'vexx_py'
  wire      n/a
  platform  Linux-6.1.158+-x86_64-with-glibc2.36
  note      the pure-Python engine is complete; the extension would only be faster.`,
  },
  {
    id: 'check-spec',
    cmd: 'vexx check-spec ticket_spec.py',
    label: 'check-spec',
    output: `schema: ticket  (SAT)
  fields:   priority, sla_hours
  derived:  -
  requires: 1  derives: 0
  digest:   fa7eb9478ab886630f7ae37c0c946c4e1f072481a55f670d69a1167251b5f66b`,
  },
  {
    id: 'verify',
    cmd: 'vexx verify ticket_spec.py ticket.json',
    label: 'verify',
    output: `ticket: PASS
  [ok] require: sla_hours <= (24 - (4 * (priority - 1)))
  digest: fa7eb9478ab886630f7ae37c0c946c4e1f072481a55f670d69a1167251b5f66b`,
  },
  {
    id: 'verify-proof',
    cmd: 'vexx verify-proof ticket_proof.json',
    label: 'verify-proof',
    output: `certificate: VALID
  [ok] version: found 'vexx1.5', expected 'vexx1.5'
  [ok] sha256: content digest matches
  [ok] witness_sha256: witness digest matches
  [ok] smt2: SMT-LIB2 script present
  [ok] spec_sha256: embedded spec matches its digest
  [ok] constraints: PASS: 1 satisfied, 0 violated, 0 unevaluated
  [ok] smt2_coverage: complete SMT export
  [ok] smt2_binding: SMT script is bound to the embedded spec and witness
  [ok] portable_model: structural schema is portable`,
  },
  {
    id: 'synth',
    cmd: 'vexx synth --from-json examples.json --out generated_schema.py',
    label: 'synth',
    output: `wrote generated_schema.py

$ vexx check-spec generated_schema.py
schema: synthesized  (SAT)
  fields:   sku, quantity, unit_price
  derived:  -
  requires: 2  derives: 0`,
  },
];

export function CliTerminal() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const command = commands[active];

  const onCopy = async () => {
    if (await copyText(command.cmd)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <section className="section-y border-y border-border-subtle bg-bg-inset/50">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <Terminal className="h-3 w-3 text-cobalt-500" /> Command line
          </span>
          <h2 className="display-lg mt-3 text-ink-primary">Six commands. Zero model calls.</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-secondary">
            Compile and refute specs, verify instances, re-check certificates offline, render trace reports and
            infer a schema from examples — all without booting a model.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-border-subtle bg-term-bg shadow-[var(--vt-shadow-lift)]">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-term-elevated px-2.5 py-2">
              <div className="flex min-w-0 items-center gap-1 overflow-x-auto no-scrollbar">
                {commands.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      'shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] transition-colors sm:text-[10.5px]',
                      i === active
                        ? 'bg-white/10 text-white'
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-300',
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={onCopy}
                aria-label="Copy command"
                className="inline-flex h-6 shrink-0 items-center gap-1 rounded-full border border-white/10 px-2 font-mono text-[9.5px] text-slate-400 transition-colors hover:text-white"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                {copied ? 'copied' : 'copy'}
              </button>
            </div>

            <div className="overflow-x-auto p-4 font-mono text-[10.5px] leading-[1.9] sm:p-5 sm:text-[12px]">
              <div className="flex gap-2 whitespace-pre">
                <span className="select-none text-emerald-400">$</span>
                <span className="text-slate-100">{command.cmd}</span>
                <span className="inline-block h-3.5 w-1.5 animate-blink bg-slate-500" />
              </div>
              <div className="mt-2 whitespace-pre text-slate-400">{command.output}</div>
            </div>
          </div>

          <p className="mt-3 text-center font-mono text-[10px] text-ink-muted">
            exit code 0 only when everything passes · <span className="text-ink-secondary">--json</span> on every
            command for CI
          </p>
        </div>
      </div>
    </section>
  );
}
