import { cn } from '@/lib/utils';

export function VexxMark({
  className,
  animated = false,
  tone = 'cobalt',
}: {
  className?: string;
  animated?: boolean;
  tone?: 'cobalt' | 'paper';
}) {
  const paper = tone === 'paper';
  return (
    <svg
      viewBox="0 0 40 40"
      role="img"
      aria-label="Vexx"
      className={cn('h-8 w-8', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="vx-mark" x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5A83FF" />
          <stop offset="0.55" stopColor="#2447DD" />
          <stop offset="1" stopColor="#0C1C7A" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill={paper ? '#FFFFFF' : 'url(#vx-mark)'} />
      <rect
        x="0.75"
        y="0.75"
        width="38.5"
        height="38.5"
        rx="10.25"
        stroke={paper ? 'rgba(16,17,23,0.1)' : '#fff'}
        strokeOpacity={paper ? 1 : 0.3}
        strokeWidth="1.5"
      />
      {/* the V: two blades that meet exactly */}
      <path
        d="M10.5 11.5 20 29l9.5-17.5"
        stroke={paper ? '#2447DD' : 'white'}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6 11.5 20 21.7l5.4-10.2"
        stroke={paper ? '#2447DD' : 'white'}
        strokeOpacity="0.32"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {animated && !paper && (
        <circle cx="20" cy="6.3" r="1.7" fill="white" fillOpacity="0.9">
          <animate attributeName="opacity" values="0.35;1;0.35" dur="2.6s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

export function VexxLogo({
  className,
  compact = false,
  tone = 'ink',
}: {
  className?: string;
  compact?: boolean;
  tone?: 'ink' | 'inverse';
}) {
  const inverse = tone === 'inverse';
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <VexxMark
        className={cn('shrink-0', compact ? 'h-6 w-6' : 'h-8 w-8')}
        animated
        tone={inverse ? 'paper' : 'cobalt'}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[1.0625rem] font-extrabold tracking-[-0.035em]',
            inverse ? 'text-white' : 'text-ink-primary',
          )}
        >
          vexx
          <span className={inverse ? 'text-white/60' : 'text-cobalt-600'}>.</span>
        </span>
        {!compact && (
          <span
            className={cn(
              'mt-1 font-mono text-[9px] uppercase tracking-[0.18em]',
              inverse ? 'text-white/60' : 'text-ink-muted',
            )}
          >
            solver-guided decoding
          </span>
        )}
      </span>
    </span>
  );
}
