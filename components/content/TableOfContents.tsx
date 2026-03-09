'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  selector?: string;
  className?: string;
}

export function TableOfContents({ selector = 'h2, h3', className }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extrair headings do conteúdo
    const headings = document.querySelectorAll(selector);
    const tocItems: TocItem[] = [];

    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`;
      if (!heading.id) {
        heading.id = id;
      }

      tocItems.push({
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      });
    });

    setToc(tocItems);

    // Intersection Observer para highlight
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [selector]);

  if (toc.length === 0) return null;

  return (
    <nav className={cn('sticky top-8', className)} aria-label="Table of Contents">
      <p className="text-h3 font-heading mb-4">Neste artigo</p>

      <ul className="space-y-2 border-l-2 border-surface-200">
        {toc.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}>
            <a
              href={`#${item.id}`}
              className={cn(
                'block py-1 px-4 text-body-sm transition-colors border-l-2 -ml-0.5',
                activeId === item.id
                  ? 'border-brand-600 text-brand-600 font-semibold'
                  : 'border-transparent text-surface-600 hover:text-brand-600'
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
