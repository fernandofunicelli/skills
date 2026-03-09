import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'danger' | 'accent' | 'brand';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1 text-body-sm font-semibold rounded-badge',
        {
          'bg-surface-200 text-surface-900': variant === 'default',
          'bg-success-500 text-white': variant === 'success',
          'bg-danger-500 text-white': variant === 'danger',
          'bg-accent-500 text-surface-900': variant === 'accent',
          'bg-brand-500 text-white': variant === 'brand',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
