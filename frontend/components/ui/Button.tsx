// ============================================
// BUTTON.TSX - Componente Button Primitivo
// ============================================

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'urgency' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  pulse?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      pulse,
      fullWidth,
      loading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // Base
          'inline-flex items-center justify-center gap-2 font-semibold',
          'transition-all duration-200 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',

          // Variants
          {
            // Primary (marca principal)
            'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800':
              variant === 'primary',
            'focus-visible:ring-brand-500 shadow-cta hover:shadow-cta-hover':
              variant === 'primary',

            // Secondary (cinza)
            'bg-surface-200 text-surface-900 hover:bg-surface-300 active:bg-surface-400':
              variant === 'secondary',
            'focus-visible:ring-surface-400': variant === 'secondary',

            // Urgency (vermelho/perigo - para CTAs finais)
            'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800':
              variant === 'urgency',
            'focus-visible:ring-danger-500 shadow-cta hover:shadow-cta-hover':
              variant === 'urgency',

            // Outline (borda marca)
            'border-2 border-brand-600 text-brand-600 bg-transparent':
              variant === 'outline',
            'hover:bg-brand-50 active:bg-brand-100 focus-visible:ring-brand-500':
              variant === 'outline',

            // Ghost (transparente)
            'text-brand-600 bg-transparent hover:bg-brand-50 active:bg-brand-100':
              variant === 'ghost',
            'focus-visible:ring-brand-500': variant === 'ghost',
          },

          // Sizes
          {
            'px-4 py-2 text-body-sm rounded-button': size === 'sm',
            'px-6 py-3 text-body rounded-button': size === 'md',
            'px-8 py-4 text-body-lg rounded-button': size === 'lg',
            'px-10 py-5 text-h3 rounded-button': size === 'xl',
          },

          // Pulse animation
          pulse && 'animate-pulse-cta',

          // Full width
          fullWidth && 'w-full',

          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
