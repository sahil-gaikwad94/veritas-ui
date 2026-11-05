'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Github, Menu, X } from 'lucide-react';
import { navLinks, siteConfig } from '@/lib/site';
import { ThemeToggle } from './theme-toggle';
import { CopyCommand } from './copy-command';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white md:hidden"
        >
          <Menu className="h-[18px] w-[18px]" />
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[70] bg-[#04060c]/60 backdrop-blur-sm md:hidden"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                initial={{ y: '-6%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-4%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                className="fixed inset-x-0 top-0 z-[80] max-h-dvh overflow-y-auto border-b border-border-subtle bg-bg-canvas px-5 pb-8 pt-4 shadow-2xl md:hidden"
                style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                    Menu
                  </Dialog.Title>
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label="Close menu"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated text-ink-primary"
                      >
                        <X className="h-[18px] w-[18px]" />
                      </button>
                    </Dialog.Close>
                  </div>
                </div>

                <nav className="mt-6 flex flex-col">
                  {navLinks.map((link, i) => {
                    const active = pathname === link.href || pathname.startsWith(link.href + '/');
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 + i * 0.05 }}
                      >
                        <Dialog.Close asChild>
                          <Link
                            href={link.href}
                            className="flex items-center justify-between border-b border-border-subtle py-4 text-[1.35rem] font-semibold tracking-tight text-ink-primary active:opacity-60"
                          >
                            <span className={active ? 'text-cobalt-600 dark:text-cobalt-300' : undefined}>
                              {link.label}
                            </span>
                            <ArrowRight className="h-4 w-4 text-ink-muted" />
                          </Link>
                        </Dialog.Close>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-border-subtle bg-bg-subtle p-3">
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Install</p>
                      <p className="mt-1 truncate font-mono text-[11px] text-ink-secondary">
                        {siteConfig.installCommand}
                      </p>
                    </div>
                    <CopyCommand
                      command={siteConfig.installCommand}
                      showPrompt={false}
                      className="shrink-0 border-0 bg-transparent px-2 py-1 shadow-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <Dialog.Close asChild>
                      <Link
                        href="/playground"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-cobalt-500 to-cobalt-600 px-4 py-3 text-sm font-semibold text-white shadow-[var(--vt-shadow-cobalt)]"
                      >
                        Playground
                      </Link>
                    </Dialog.Close>
                    <a
                      href={siteConfig.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-border-subtle bg-bg-elevated px-4 py-3 text-sm font-semibold text-ink-primary"
                    >
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  </div>

                  <p className="pt-1 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                    {siteConfig.version} · {siteConfig.license}
                  </p>
                  <p className="text-center text-[11.5px] text-ink-muted">
                    Open to ideas &amp; PRs —{' '}
                    <a
                      href={siteConfig.author.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-cobalt-600 underline decoration-cobalt-500/30 underline-offset-2 dark:text-cobalt-300"
                    >
                      say hi
                    </a>
                  </p>
                </div>
              </motion.div>
            </Dialog.Content>
            </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
