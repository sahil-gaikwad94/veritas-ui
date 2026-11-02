'use client';

import { useEffect } from 'react';

/**
 * Fumadocs renders a couple of icon-only controls (the sidebar ellipsis menu and
 * the theme switch) without accessible names. Label them once mounted so screen
 * readers announce something better than "button".
 */
export function DocsA11y() {
  useEffect(() => {
    const label = () => {
      document
        .querySelectorAll<HTMLButtonElement>('#nd-sidebar button[aria-haspopup]')
        .forEach((button) => {
          if (!button.getAttribute('aria-label') && !(button.textContent ?? '').trim()) {
            button.setAttribute('aria-label', 'More navigation options');
          }
        });

      document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
        if (!button.getAttribute('aria-label')) {
          button.setAttribute('aria-label', 'Toggle color theme');
        }
      });

      document
        .querySelectorAll<HTMLButtonElement>('#nd-tocnav button[aria-haspopup="dialog"]')
        .forEach((button) => {
          if (!button.getAttribute('aria-label') && !(button.textContent ?? '').trim()) {
            button.setAttribute('aria-label', 'Open table of contents');
          }
        });
    };

    label();
    const timer = window.setTimeout(label, 500);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
