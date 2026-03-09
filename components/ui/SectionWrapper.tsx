import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  variant?: 'white' | 'gray' | 'brand' | 'dark';
  spacing?: 'default' | 'sm' | 'lg';
  as?: 'section' | 'div' | 'article';
}

export function SectionWrapper({
  children,
  className,
  variant = 'white',
  spacing = 'default',
  as: Component = 'section',
  ...props
}: SectionWrapperProps) {
  return (
    <Component
      className={cn(
        // Background variants
        {
          'bg-surface-0': variant === 'white',
          'bg-surface-50': variant === 'gray',
          'bg-brand-50': variant === 'brand',
          'bg-surface-900 text-white': variant === 'dark',
        },
        // Spacing
        {
          'py-section': spacing === 'default',
          'py-section-sm': spacing === 'sm',
          'py-20 md:py-32': spacing === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
