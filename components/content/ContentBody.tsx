import { cn } from '@/lib/utils';

interface ContentBodyProps {
  content: string;
  className?: string;
}

export function ContentBody({ content, className }: ContentBodyProps) {
  return (
    <div
      className={cn('prose-strapi', className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
