// ============================================
// ACCORDION - Componente de FAQ/Accordion
// Usando Headless UI Disclosure
// ============================================

'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItem {
  id: number;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item) => (
        <Disclosure key={item.id}>
          {({ open }) => (
            <div className="bg-white rounded-card shadow-card overflow-hidden">
              <Disclosure.Button className="flex w-full items-center justify-between p-6 text-left hover:bg-surface-50 transition-colors">
                <span className="font-semibold text-body-lg pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-brand-600 transition-transform flex-shrink-0',
                    open && 'rotate-180'
                  )}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-200 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-150 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="px-6 pb-6 text-surface-600">
                  {item.answer}
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
