import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide';
}

export function Container({ className, size = 'default', children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        {
          'max-w-content': size === 'default',
          'max-w-narrow': size === 'narrow',
          'max-w-wide': size === 'wide',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
