'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { copyText } from '@/components/site/copy-command';
import { cn } from '@/lib/utils';

type LineTone = 'command' | 'label' | 'pass' | 'fail' | 'warn' | 'muted' | 'muted-strong';

function toneFor(line: string): LineTone {
  const trimmed = line.trimStart();
  if (!trimmed) return 'muted';
  if (/^(FAIL|DENIED)\b/.test(trimmed)) return 'fail';
  if (/^(rejected:|ok=False\b)/.test(trimmed)) return 'fail';
  if (/^(PASS|OK)\b/.test(trimmed)) return 'pass';
  if (/^ok=True\b/.test(trimmed)) return 'pass';
  if (/^(hint|CAPACITY|PRECEDENCE)\b/.test(trimmed)) return 'warn';
  if (/^(preflight:|remaining spend:|can_call|trace:| SELECT|SELECT|DROP)\b/.test(trimmed)) return 'muted-strong';
  // Section headings inside the transcript are unindented prose.
  if (!/^\s/.test(line) && !trimmed.startsWith('{')) return 'label';
  return 'muted';
}

const tones: Record<LineTone, string> = {
  command: 'text-slate-100',
  label: 'text-slate-200',
  pass: 'text-emerald-400',
  fail: 'text-rose-400',
  warn: 'text-amber-300',
  muted: 'text-slate-400',
  'muted-strong': 'text-slate-300',
};

export function ExampleTerminal({
  command,
  output,
  className,
}: {
  command: string;
  output: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (await copyText(`${command}\n\n${output}`)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-white/10 bg-term-bg shadow-[0_24px_50px_-32px_rgba(6,27,82,0.8)]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-term-elevated px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span aria-hidden className="flex shrink-0 gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </span>
          <span className="truncate font-mono text-[9.5px] uppercase tracking-[0.14em] text-slate-400">
            stdout · captured
          </span>
        </div>
        <button
          type="button"
          onClick={onCopy}
          aria-label="Copy command and captured output"
          className="inline-flex h-6 shrink-0 items-center gap-1 rounded-full border border-white/10 px-2 font-mono text-[9px] text-slate-400 transition-colors hover:border-white/25 hover:text-white"
        >
          {copied ? <Check className="h-2.5 w-2.5 text-emerald-400" /> : <Copy className="h-2.5 w-2.5" />}
          {copied ? 'copied' : 'copy'}
        </button>
      </div>

      <div className="p-3.5 font-mono text-[10.5px] leading-[1.85] sm:p-4 sm:text-[11.5px]">
        <div className="flex gap-2">
          <span aria-hidden className="select-none text-emerald-400">
            $
          </span>
          <span className="break-all text-slate-100">{command}</span>
        </div>
        <div className="mt-2.5 space-y-0">
          {output.replace(/^\n+/, '').split('\n').map((line, i) => {
            const tone = toneFor(line);
            return (
              <p
                key={i}
                className={cn('whitespace-pre-wrap break-words', tones[tone], tone === 'label' && 'mt-1.5 font-semibold')}
              >
                {line || '\u00a0'}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
