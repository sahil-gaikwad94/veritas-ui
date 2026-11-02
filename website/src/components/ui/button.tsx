import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { twMerge } from 'tailwind-merge';

import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'cobalt';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    const variants = {
      default: 'bg-ink-primary text-white shadow-sm hover:bg-cobalt-700 transition-colors',
      destructive: 'bg-red-500 text-white hover:bg-red-600 transition-colors',
      outline: 'border border-border-subtle bg-transparent hover:bg-bg-subtle transition-colors',
      secondary: 'bg-bg-subtle text-ink-primary hover:bg-cobalt-100 transition-colors',
      ghost: 'hover:bg-bg-subtle hover:text-ink-primary transition-colors',
      link: 'text-cobalt-500 underline-offset-4 hover:underline transition-colors',
      cobalt:
        'bg-gradient-to-b from-[#2B68FF] to-[#0043F0] text-white shadow-[0_14px_28px_-6px_rgba(20,78,255,0.45)] hover:shadow-[0_20px_40px_-10px_rgba(20,78,255,0.55)] transition-all',
    };

    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 px-3',
      lg: 'h-11 px-8',
      icon: 'h-10 w-10',
    };

    return (
      <Comp
        className={cn(
          twMerge(
            'inline-flex items-center justify-center rounded-full font-medium text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            variants[variant],
            sizes[size],
          ),
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
