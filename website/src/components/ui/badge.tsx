'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badge = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-border-subtle bg-transparent text-ink-secondary',
        secondary:
          'border-border-subtle bg-bg-subtle text-ink-secondary',
        destructive:
          'border-border-subtle bg-verify-fail-bg text-verify-fail',
        outline: 'text-ink-primary',
        success:
          'border-transparent bg-verify-pass-bg text-verify-pass',
        warning:
          'border-transparent bg-verify-warn-bg text-verify-warn',
        cobalt:
          'border-transparent bg-cobalt-100 text-cobalt-700',
      },
      size: {
        default: 'h-8 px-3',
        sm: 'h-7 px-2',
        lg: 'h-9 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badge({ variant, size, className }))} {...props} />
  );
}

export { Badge, badge };
