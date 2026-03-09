// ============================================
// CTA BUTTON - Botão de conversão com tracking
// ============================================

'use client';

import { useState } from 'react';
import Button, { ButtonProps } from '@/components/ui/Button';
import { buildCheckoutUrl, getCurrentUtms } from '@/lib/checkout';
import { Product, LandingPage } from '@/lib/types';

interface CtaButtonProps extends Omit<ButtonProps, 'onClick'> {
  product: Product;
  landingPage: LandingPage;
  text?: string;
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    _tfa?: any[];
  }
}

export function CtaButton({
  product,
  landingPage,
  text = 'QUERO COMEÇAR AGORA',
  variant = 'primary',
  size = 'lg',
  pulse = true,
  ...props
}: CtaButtonProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleClick = async () => {
    setIsRedirecting(true);

    try {
      // ── STEP 1: Construir URL de checkout ──
      const utms = getCurrentUtms();
      const checkoutUrl = buildCheckoutUrl({
        checkoutBaseUrl: product.checkout_base_url,
        lpSlug: landingPage.slug,
        productSlug: product.slug,
        ...utms,
      });

      // ── STEP 2: DataLayer push ──
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'click_checkout',
          product_name: product.name,
          product_slug: product.slug,
          price: product.price,
          currency: product.currency,
          source_page: landingPage.slug,
          page_type: 'lp',
          checkout_url: checkoutUrl,
          traffic_source: utms.utmSource || 'direct',
          timestamp: new Date().toISOString(),
        });
      }

      // ── STEP 3: Google Ads Conversion ──
      if (
        landingPage.tracking_google_ads_conversion_id &&
        landingPage.tracking_google_ads_conversion_label &&
        window.gtag
      ) {
        window.gtag('event', 'conversion', {
          send_to: `${landingPage.tracking_google_ads_conversion_id}/${landingPage.tracking_google_ads_conversion_label}`,
          value: landingPage.tracking_google_ads_conversion_value || product.price,
          currency: product.currency,
          transaction_id: `${Date.now()}-${landingPage.slug}`,
        });
      }

      // ── STEP 4: Meta Pixel ──
      if (landingPage.tracking_meta_pixel_id && window.fbq) {
        window.fbq('track', 'InitiateCheckout', {
          content_name: product.name,
          content_ids: [product.slug],
          value: product.price,
          currency: product.currency,
        });

        // Custom event se configurado
        if (landingPage.tracking_meta_custom_event) {
          window.fbq('trackCustom', landingPage.tracking_meta_custom_event, {
            product_name: product.name,
            product_slug: product.slug,
            lp_slug: landingPage.slug,
          });
        }
      }

      // ── STEP 5: Taboola Pixel ──
      if (landingPage.tracking_taboola_pixel_id && window._tfa) {
        const eventName = landingPage.tracking_taboola_event_name || 'make_purchase';
        window._tfa.push({
          notify: 'event',
          name: eventName,
          id: landingPage.tracking_taboola_pixel_id,
          revenue: product.price,
          currency: product.currency,
        });
      }

      // ── STEP 6: Aguardar 300ms (garantir processamento) ──
      await new Promise((resolve) => setTimeout(resolve, 300));

      // ── STEP 7: Redirect ──
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error in CTA click:', error);
      setIsRedirecting(false);
      // Fallback: tentar redirect direto
      window.location.href = product.checkout_base_url;
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      pulse={pulse && !isRedirecting}
      loading={isRedirecting}
      onClick={handleClick}
      disabled={isRedirecting}
      {...props}
    >
      {isRedirecting ? 'Redirecionando...' : text}
    </Button>
  );
}
