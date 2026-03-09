// ============================================
// FLOATING CTA - Botão fixo no bottom mobile
// Aparece após scroll de 30vh
// ============================================

'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { CtaButton } from '@/components/lp/CtaButton';
import { Product, LandingPage } from '@/lib/types';

interface FloatingCtaProps {
  product: Product;
  landingPage: LandingPage;
  text?: string;
  price?: string;
}

export function FloatingCta({ product, landingPage, text, price }: FloatingCtaProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Aparece após 30vh de scroll
      const scrolled = window.scrollY;
      const trigger = window.innerHeight * 0.3;
      setIsVisible(scrolled > trigger);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 lg:hidden',
        'transform transition-transform duration-300',
        'safe-area-inset-bottom',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="bg-surface-0/95 backdrop-blur shadow-floating p-4 border-t border-surface-200">
        <div className="flex items-center justify-between gap-4">
          {price && (
            <div className="flex flex-col">
              <span className="text-body-sm text-surface-600">Apenas</span>
              <span className="text-h3 font-bold text-brand-600">{price}</span>
            </div>
          )}
          <CtaButton
            product={product}
            landingPage={landingPage}
            text={text || 'COMPRAR AGORA'}
            size="md"
            fullWidth={!price}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}
