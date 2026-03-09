// ============================================
// DATA LAYER INIT - Inicialização do DataLayer
// ============================================

'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface DataLayerInitProps {
  pageType: 'seo' | 'lp' | 'home' | 'blog';
  productSlug?: string;
  productName?: string;
  pageSlug?: string;
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function DataLayerInit({
  pageType,
  productSlug,
  productName,
  pageSlug,
}: DataLayerInitProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Inicializar dataLayer se não existir
    window.dataLayer = window.dataLayer || [];

    // Extrair UTMs e traffic source
    const utmSource = searchParams.get('utm_source') || '';
    const utmMedium = searchParams.get('utm_medium') || '';
    const utmCampaign = searchParams.get('utm_campaign') || '';
    const utmContent = searchParams.get('utm_content') || '';
    const utmTerm = searchParams.get('utm_term') || '';

    // Detectar traffic source
    let trafficSource = 'direct';
    if (utmSource) {
      trafficSource = utmSource.toLowerCase();
    } else if (document.referrer) {
      const referrer = document.referrer.toLowerCase();
      if (referrer.includes('google')) trafficSource = 'google_organic';
      else if (referrer.includes('facebook')) trafficSource = 'facebook_organic';
      else if (referrer.includes('instagram')) trafficSource = 'instagram_organic';
      else trafficSource = 'referral';
    }

    // Push evento page_view
    window.dataLayer.push({
      event: 'page_view',
      page_type: pageType,
      page_path: pathname,
      page_slug: pageSlug || '',
      product_slug: productSlug || '',
      product_name: productName || '',
      traffic_source: trafficSource,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      timestamp: new Date().toISOString(),
    });
  }, [pathname, searchParams, pageType, productSlug, productName, pageSlug]);

  return null;
}
