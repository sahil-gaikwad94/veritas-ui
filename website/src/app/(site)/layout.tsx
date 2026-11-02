import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteAura } from '@/components/site/site-aura';
import { Konami } from '@/components/site/konami';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grain relative isolate flex min-h-dvh flex-col">
      <SiteAura />
      <Konami />
      <SiteHeader />
      <main id="main" className="relative z-10 flex-1 pt-[calc(3.5rem+1rem)] sm:pt-[calc(3.5rem+1.25rem)]">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
