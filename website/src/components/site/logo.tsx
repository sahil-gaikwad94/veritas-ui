import { cn } from '@/lib/utils';

export function VeritasMark({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 40"
      role="img"
      aria-label="Veritas"
      className={cn('h-8 w-8', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="vt-mark" x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4B83FF" />
          <stop offset="0.55" stopColor="#1450F5" />
          <stop offset="1" stopColor="#062A99" />
        </linearGradient>
        <linearGradient id="vt-mark-gloss" x1="20" y1="1" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#vt-mark)" />
      <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="10.25" stroke="#fff" strokeOpacity="0.28" strokeWidth="1.5" />
      <path d="M4 14C4 8.477 8.477 4 14 4h12c5.523 0 10 4.477 10 10v2c0 2.5-2 4-5 4H9c-3 0-5-1.5-5-4v-2Z" fill="url(#vt-mark-gloss)" />
      <path
        d="M10.5 11.5 20 29l9.5-17.5"
        stroke="white"
        strokeWidth="3.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.5 11.5 20 21.6l5.5-10.1" stroke="white" strokeOpacity="0.34" strokeWidth="1.6" strokeLinecap="round" />
      {animated && (
        <circle cx="20" cy="6.4" r="1.7" fill="white" fillOpacity="0.9">
          <animate attributeName="opacity" values="0.35;1;0.35" dur="2.4s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

export function VeritasLogo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <VeritasMark className={compact ? 'h-7 w-7' : 'h-8 w-8'} animated />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.0625rem] font-extrabold tracking-[-0.03em] text-ink-primary">
          veritas
        </span>
        {!compact && (
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
            solver-guided decoding
          </span>
        )}
      </span>
    </span>
  );
}
