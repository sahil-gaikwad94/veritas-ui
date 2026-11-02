'use client';

import { CopyButton } from '@/components/ui/copy-button';

interface CodeBlockProps {
  language?: string;
  code: string;
  title?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
}

export function CodeBlock({
  language,
  code,
  title,
  showLineNumbers = false,
  copyable = true,
}: CodeBlockProps) {
  const lines = code.split('\n');

  return (
    <div className="rounded-lg border border-border-subtle bg-[#0A0D14] overflow-hidden shadow-lg">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#101626]">
          <span className="text-xs font-mono text-slate-400">{title}</span>
          {copyable && <CopyButton value={code} size="sm" />}
        </div>
      )}
      <pre className="p-4 overflow-x-auto font-mono text-sm text-slate-300 leading-relaxed">
        {showLineNumbers ? (
          lines.map((line, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-slate-600 select-none w-4 text-right">{i + 1}</span>
              <span className="text-slate-300">{line}</span>
            </div>
          ))
        ) : (
          <span>{code}</span>
        )}
      </pre>
    </div>
  );
}
