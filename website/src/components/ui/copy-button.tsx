'use client';

import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState, useCallback } from 'react';

interface CopyButtonProps {
  value: string;
  size?: 'sm' | 'default';
  className?: string;
}

export function CopyButton({
  value,
  size = 'default',
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [value]);

  return (
    <Button
      variant="outline"
      size={size}
      onClick={handleCopy}
      className={cn(
        'border-border-subtle text-ink-muted hover:border-cobalt-500 hover:text-cobalt-500',
        className,
      )}
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <span className="flex items-center gap-1.5 text-emerald-600">
          <Copy className="w-4 h-4" /> Copied
        </span>
      ) : (
        <span className="flex items-center gap-1.5">
          <Copy className="w-4 h-4" />
        </span>
      )}
    </Button>
  );
}
