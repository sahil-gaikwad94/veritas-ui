'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Github } from 'lucide-react';
import { navLinks, siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';
import { VeritasLogo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { MobileNav } from './mobile-nav';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <div className="pointer-events-auto mx-auto w-full max-w-[1200px] px-3 sm:px-6">
        <div
          className={cn(
            'flex h-14 items-center justify-between gap-2 rounded-full border px-2.5 transition-all duration-300 sm:px-3',
            scrolled
              ? 'border-border-subtle bg-[var(--vt-nav-bg)] shadow-[0_10px_30px_-18px_rgba(6,27,82,0.4)] backdrop-blur-xl'
              : 'border-transparent bg-transparent',
          )}
        >
          <div className="flex min-w-0 items-center gap-2">
            <Link
              href="/"
              aria-label="Veritas home"
              className="rounded-full px-1 py-1 transition-opacity hover:opacity-80"
            >
              <VeritasLogo compact />
            </Link>
            <span className="hidden rounded-full border border-border-subtle bg-bg-elevated/70 px-2 py-0.5 font-mono text-[10px] tracking-wide text-ink-muted sm:inline-block">
              v{siteConfig.version}
            </span>
          </div>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative rounded-full px-3.5 py-1.5 text-[13.5px] font-medium transition-colors',
                    active
                      ? 'bg-bg-subtle text-ink-primary'
                      : 'text-ink-secondary hover:bg-bg-subtle/70 hover:text-ink-primary',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Veritas on GitHub"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated/60 text-ink-secondary transition-colors hover:border-border-cobalt hover:text-ink-primary sm:inline-flex"
            >
              <Github className="h-[17px] w-[17px]" />
            </a>
            <ThemeToggle className="hidden sm:inline-flex" />
            <Link
              href="/docs/getting-started/installation"
              className="hidden items-center gap-1.5 rounded-full bg-gradient-to-b from-cobalt-500 to-cobalt-700 px-4 py-2 text-[13px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(30,94,255,0.8)] transition-transform hover:-translate-y-0.5 md:inline-flex"
            >
              Get started
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <span className="sm:hidden">
              <ThemeToggle />
            </span>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
