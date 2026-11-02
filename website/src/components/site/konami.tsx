'use client';

import { useEffect, useState } from 'react';

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const PROOFS = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  left: (i * 37) % 100,
  delay: (i % 13) * 0.11,
  duration: 3.4 + ((i * 7) % 9) * 0.25,
  size: i % 5 === 0 ? 'text-[13px]' : 'text-[10px]',
  label: i % 4 === 0 ? 'PASS' : i % 3 === 0 ? 'proof.json' : 'SHA-256',
}));

/**
 * A small cult offering: the Konami code prints verified proof tokens.
 * Purely decorative — no navigation, no storage, no analytics.
 */
export function Konami() {
  const [found, setFound] = useState(false);
  const [buffer, setBuffer] = useState<string[]>([]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      setBuffer((previous) => {
        const next = [...previous, key].slice(-SEQUENCE.length);
        if (next.join(',') === SEQUENCE.join(',')) {
          setFound(true);
          window.setTimeout(() => setFound(false), 5200);
          return [];
        }
        return next;
      });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!found) return null;

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-verify-pass/30 bg-bg-elevated/95 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-verify-pass shadow-[var(--vt-shadow-lift)]">
          ✳ Konami accepted · status PASS
        </p>
        <p className="mx-auto mt-3 max-w-xs text-[12px] leading-relaxed text-ink-secondary">
          You found the receipt. Nothing to install, nothing to verify — this one is just for you.
        </p>
      </div>
      {PROOFS.map((proof) => (
        <span
          key={proof.id}
          style={{
            left: `${proof.left}%`,
            animationDelay: `${proof.delay}s`,
            animationDuration: `${proof.duration}s`,
          }}
          className={`absolute top-0 motion-safe:animate-[vt-fall_linear_infinite] motion-reduce:hidden font-mono ${proof.size} text-verify-pass/70`}
        >
          {proof.label}
        </span>
      ))}
    </div>
  );
}
