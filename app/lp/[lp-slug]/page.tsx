// ============================================
// LP PAGE - Landing Page Individual
// SSR (Server-Side Rendering) - force-dynamic
// ============================================

import { notFound } from 'next/navigation';
import { getLandingPageBySlug, getProductBySlug } from '@/lib/payload';
import { DynamicZoneRenderer } from '@/components/lp/DynamicZoneRenderer';
import { DataLayerInit } from '@/components/tracking/DataLayerInit';
import { PixelScripts } from '@/components/tracking/PixelScripts';
import { FloatingCta } from '@/components/layout/FloatingCta';
import { ExitIntentPopup } from '@/components/layout/ExitIntentPopup';
import { Metadata } from 'next';
import { formatPrice } from '@/lib/utils';

interface LpPageProps {
  params: {
    'lp-slug': string;
  };
}

// Force dynamic (SSR, sem cache)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Metadata
export async function generateMetadata({ params }: LpPageProps): Promise<Metadata> {
  const lpSlug = params['lp-slug'];
  const landingPage = await getLandingPageBySlug(lpSlug);

  if (!landingPage) {
    return {
      title: 'Página não encontrada',
    };
  }

  return {
    title: landingPage.meta_title || landingPage.title,
    description: landingPage.meta_description || undefined,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function LpPage({ params }: LpPageProps) {
  const lpSlug = params['lp-slug'];

  // Buscar Landing Page
  const landingPage = await getLandingPageBySlug(lpSlug);

  if (!landingPage) {
    notFound();
  }

  // Buscar produto relacionado
  const product = landingPage.product
    ? await getProductBySlug(landingPage.product.slug)
    : null;

  if (!product) {
    notFound();
  }

  return (
    <>
      {/* Pixel Scripts (Google Ads, Meta, Taboola) */}
      <PixelScripts landingPage={landingPage} product={product} />

      {/* DataLayer init para tracking */}
      <DataLayerInit
        pageType="lp"
        productSlug={product.slug}
        productName={product.name}
        pageSlug={landingPage.slug}
      />

      {/* Renderizar seções dinamicamente */}
      <main>
        <DynamicZoneRenderer
          sections={landingPage.body_sections}
          product={product}
          landingPage={landingPage}
        />
      </main>

      {/* Floating CTA (mobile) */}
      <FloatingCta
        product={product}
        landingPage={landingPage}
        price={formatPrice(product.price, product.currency)}
      />

      {/* Exit Intent Popup */}
      <ExitIntentPopup
        product={product}
        landingPage={landingPage}
        enabled={landingPage.exit_popup_enabled}
        headline={landingPage.exit_popup_headline}
        offer={landingPage.exit_popup_offer}
      />
    </>
  );
}
