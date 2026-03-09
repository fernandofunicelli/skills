// ============================================
// EXIT INTENT POPUP - Popup de retenção
// Mouse leave (desktop) ou 30s sem CTA click (mobile)
// ============================================

'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CtaButton } from '@/components/lp/CtaButton';
import { Product, LandingPage } from '@/lib/types';

interface ExitIntentPopupProps {
  product: Product;
  landingPage: LandingPage;
  enabled?: boolean;
  headline?: string;
  offer?: string;
}

export function ExitIntentPopup({
  product,
  landingPage,
  enabled = false,
  headline,
  offer,
}: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (!enabled || hasShown) return;

    const STORAGE_KEY = `exit_popup_shown_${landingPage.slug}`;

    // Verificar se já mostrou nesta sessão
    if (sessionStorage.getItem(STORAGE_KEY)) {
      setHasShown(true);
      return;
    }

    // Desktop: exit intent (mouse leave)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem(STORAGE_KEY, 'true');

        // DataLayer event
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'exit_intent',
            trigger: 'mouse_leave',
            page_slug: landingPage.slug,
            timestamp: new Date().toISOString(),
          });
        }
      }
    };

    // Mobile: 30s sem interação com CTA
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem(STORAGE_KEY, 'true');

        // DataLayer event
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'exit_intent',
            trigger: '30s_timer',
            page_slug: landingPage.slug,
            timestamp: new Date().toISOString(),
          });
        }
      }
    }, 30000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [enabled, hasShown, landingPage.slug]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-card shadow-floating max-w-lg w-full p-8 relative animate-slide-up">
        {/* Botão fechar */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 hover:bg-surface-100 rounded-full transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Conteúdo */}
        <div className="text-center">
          <div className="text-6xl mb-4">🎁</div>
          <h3 className="text-h2 font-heading mb-4">
            {headline || 'Espere! Não Vá Embora'}
          </h3>
          <p className="text-body-lg text-surface-600 mb-6">
            {offer || 'Temos uma oferta especial para você'}
          </p>

          <div className="space-y-3">
            <CtaButton
              product={product}
              landingPage={landingPage}
              text="APROVEITAR OFERTA"
              size="lg"
              fullWidth
            />
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-body text-surface-600 hover:text-surface-900 transition-colors"
            >
              Não, obrigado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
