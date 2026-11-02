'use client';

import { useCallback, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      return true;
    } catch {
      return false;
    }
  }
}

export function CopyCommand({
  command,
  className,
  multiline = false,
  showPrompt = true,
}: {
  command: string;
  className?: string;
  multiline?: boolean;
  showPrompt?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    const ok = await copyText(command);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [command]);

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label="Copy install command"
      className={cn(
        'group inline-flex max-w-full items-center gap-2.5 rounded-full border border-border-subtle bg-bg-elevated/80 px-3.5 py-2 text-left font-mono text-[12.5px] text-ink-secondary shadow-sm transition-all hover:border-border-cobalt hover:text-ink-primary sm:px-4 sm:text-[13px]',
        className,
      )}
    >
      {showPrompt && <span className="select-none text-cobalt-500">$</span>}
      <span
        className={cn(
          'min-w-0 flex-1',
          multiline ? 'whitespace-pre-line break-all leading-relaxed' : 'truncate',
        )}
      >
        {command}
      </span>
      <span className="relative ml-1 inline-flex h-4 w-4 shrink-0 items-center justify-center">
        <Copy
          className={cn(
            'h-4 w-4 text-ink-muted transition-all duration-300 group-hover:text-cobalt-500',
            copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
          )}
        />
        <Check
          className={cn(
            'absolute h-4 w-4 text-verify-pass transition-all duration-300',
            copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
          )}
        />
      </span>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </button>
  );
}
