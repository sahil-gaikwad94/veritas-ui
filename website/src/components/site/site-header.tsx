'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Github } from 'lucide-react';
import { navLinks, siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';
import { MobileNav } from './mobile-nav';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[max(0.7rem,env(safe-area-inset-top))]">
      <div className="pointer-events-auto mx-auto w-full max-w-[1280px] px-2 sm:px-3.5 lg:px-6">
        <div
          className={cn(
            'vx-nav flex h-[52px] items-center justify-between gap-2 rounded-full pl-3 pr-2',
            scrolled ? 'vx-nav--solid' : 'vx-nav--top',
          )}
        >
          {/* brand */}
          <div className="flex min-w-0 items-center gap-2">
            <Link
              href="/"
              aria-label="Vexx home"
              className="flex items-center gap-2 rounded-full py-1 transition-opacity hover:opacity-85"
            >
              <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] bg-white shadow-[0_6px_16px_-8px_rgba(0,0,0,0.7)]">
                <span className="font-display text-[15px] font-extrabold leading-none text-cobalt-700">
                  V
                </span>
              </span>
              <span className="font-display text-[15px] font-extrabold leading-none tracking-[-0.03em] text-white">
                vexx
              </span>
            </Link>
            <span className="hidden rounded-full border border-white/20 bg-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-white/75 lg:inline-block">
              {siteConfig.version}
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
                    'rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors',
                    active ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* actions */}
          <div className="flex items-center gap-1.5">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Vexx on GitHub"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-white/35 hover:text-white"
            >
              <Github className="h-[16px] w-[16px]" />
            </a>
            <span className="hidden sm:inline-flex">
              <ThemeToggle tone="inverse" />
            </span>
            <Link
              href="/docs/getting-started/installation"
              className="hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12.5px] font-semibold text-[#101117] transition-transform hover:-translate-y-0.5 md:inline-flex"
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
    </header>
  );
}
