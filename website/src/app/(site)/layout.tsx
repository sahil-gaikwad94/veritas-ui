import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteAura } from '@/components/site/site-aura';
import { Konami } from '@/components/site/konami';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="vx-shell grain relative isolate flex min-h-dvh flex-col">
      <SiteAura />
      <Konami />
      <SiteHeader />
      <main
        id="main"
        className="relative z-10 flex-1 px-2 pt-[calc(3.4rem+0.55rem)] sm:px-3.5 sm:pt-[calc(3.4rem+0.85rem)] lg:px-6"
      >
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="vx-sheet">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
