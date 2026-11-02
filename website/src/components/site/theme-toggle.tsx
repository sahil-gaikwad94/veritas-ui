'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle({
  className,
  tone = 'auto',
}: {
  className?: string;
  tone?: 'auto' | 'inverse';
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
        tone === 'inverse'
          ? 'border-white/12 bg-white/5 text-white/70 hover:border-white/30 hover:text-white'
          : 'border-border-subtle bg-bg-elevated/60 text-ink-secondary hover:border-border-cobalt hover:text-ink-primary',
        className,
      )}
    >
      <Sun
        className={cn(
          'absolute h-[17px] w-[17px] transition-all duration-300',
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100',
        )}
      />
      <Moon
        className={cn(
          'absolute h-[17px] w-[17px] transition-all duration-300',
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0',
        )}
      />
    </button>
  );
}
