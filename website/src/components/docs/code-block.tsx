'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { copyText } from '@/components/site/copy-command';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  language?: string;
  code: string;
  title?: string;
  filename?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
  className?: string;
}

const languageLabel: Record<string, string> = {
  python: 'Python',
  py: 'Python',
  bash: 'Shell',
  sh: 'Shell',
  shell: 'Shell',
  json: 'JSON',
  rust: 'Rust',
  ts: 'TypeScript',
  tsx: 'TSX',
  js: 'JavaScript',
  smt2: 'SMT-LIB2',
  text: 'Text',
};

export function CodeBlock({
  language = 'text',
  code,
  title,
  filename,
  showLineNumbers = false,
  copyable = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.split('\n');
  const label = title ?? filename ?? languageLabel[language] ?? language;

  const onCopy = async () => {
    if (await copyText(code)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div
      className={cn(
        'my-5 overflow-hidden rounded-xl border border-white/10 bg-term-bg shadow-[0_20px_40px_-28px_rgba(6,27,82,0.6)]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-term-elevated px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex shrink-0 gap-1">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
          </span>
          <span className="truncate font-mono text-[10px] text-slate-400">{label}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400 sm:inline">
            {languageLabel[language] ?? language}
          </span>
          {copyable && (
            <button
              type="button"
              onClick={onCopy}
              aria-label="Copy code"
              className="inline-flex h-6 items-center gap-1 rounded-full border border-white/10 px-2 font-mono text-[9px] text-slate-400 transition-colors hover:border-white/25 hover:text-white"
            >
              {copied ? <Check className="h-2.5 w-2.5 text-emerald-400" /> : <Copy className="h-2.5 w-2.5" />}
              {copied ? 'copied' : 'copy'}
            </button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto p-3.5 sm:p-4">
        <pre className="font-mono text-[11.5px] leading-[1.8] text-slate-300 sm:text-[12.5px]">
          {showLineNumbers ? (
            lines.map((line, i) => (
              <div key={i} className="flex gap-3">
                <span className="w-5 shrink-0 select-none text-right text-slate-400">{i + 1}</span>
                <span className="text-slate-300">{line || ' '}</span>
              </div>
            ))
          ) : (
            <span>{code}</span>
          )}
        </pre>
      </div>
    </div>
  );
}
