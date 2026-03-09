import { cn } from '@/lib/utils';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  label?: string;
}

export function Divider({ orientation = 'horizontal', className, label }: DividerProps) {
  if (label) {
    return (
      <div className={cn('relative flex items-center', className)}>
        <div className="flex-grow border-t border-surface-300" />
        <span className="flex-shrink mx-4 text-body-sm text-surface-600">{label}</span>
        <div className="flex-grow border-t border-surface-300" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-surface-300',
        {
          'h-px w-full': orientation === 'horizontal',
          'w-px h-full': orientation === 'vertical',
        },
        className
      )}
      role="separator"
      aria-orientation={orientation}
    />
  );
}
