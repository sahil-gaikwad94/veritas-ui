'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Github } from 'lucide-react';
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
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[max(0.9rem,env(safe-area-inset-top))]">
      <div className="pointer-events-auto mx-auto w-full max-w-[1240px] px-3 sm:px-5">
        <div
          className={cn(
            'transition-all duration-500 ease-[var(--ease-spring)]',
            scrolled ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-100',
          )}
        >
          <div
            className={cn(
              'mx-auto flex h-[58px] items-center justify-between gap-2 rounded-[22px] transition-[color,background-color,box-shadow,border-color] duration-300 md:rounded-full',
              scrolled
                ? 'nav-pill-dark px-2.5 md:rounded-full'
                : 'nav-pill-dark px-2.5',
            )}
          >
            {/* brand */}
            <div className="flex min-w-0 items-center gap-2 pl-1">
              <Link
                href="/"
                aria-label="Veritas home"
                className="flex items-center gap-2 rounded-full px-1 py-1 transition-opacity hover:opacity-85"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[11px] bg-gradient-to-br from-[#3b76ff] via-[#1146e8] to-[#0a34b8] shadow-[0_8px_18px_-6px_rgba(20,78,255,0.8),inset_0_1px_2px_rgba(255,255,255,0.55)]">
                  <span className="font-display text-[15px] font-extrabold leading-none text-white">V</span>
                </span>
                <span className="font-display text-[15.5px] font-extrabold tracking-tight text-white">
                  veritas
                </span>
              </Link>
              <span className="hidden rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] tracking-wide text-white/60 lg:inline-block">
                v{siteConfig.version}
              </span>
            </div>

            {/* links */}
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
                        ? 'bg-white/10 text-white'
                        : 'text-white/60 hover:bg-white/5 hover:text-white',
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* actions */}
            <div className="flex items-center gap-1.5 pr-0.5">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                aria-label="Veritas on GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/25 hover:text-white"
              >
                <Github className="h-[17px] w-[17px]" />
              </a>
              <span className="hidden sm:inline-flex">
                <ThemeToggle tone="inverse" />
              </span>
              <Link
                href="/docs/getting-started/installation"
                className="hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#0d0f14] shadow-[0_10px_24px_-10px_rgba(255,255,255,0.35)] transition-transform hover:-translate-y-0.5 md:inline-flex"
              >
                Get started
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <span className="sm:hidden">
                <ThemeToggle tone="inverse" />
              </span>
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
