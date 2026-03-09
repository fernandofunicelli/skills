// ============================================
// PIXEL SCRIPTS - Google Ads, Meta Pixel, Taboola
// Renderizado APENAS em LPs
// ============================================

'use client';

import Script from 'next/script';
import { LandingPage, Product } from '@/lib/types';

interface PixelScriptsProps {
  landingPage: LandingPage;
  product?: Product;
}

export function PixelScripts({ landingPage, product }: PixelScriptsProps) {
  return (
    <>
      {/* ── GOOGLE ADS CONVERSION TRACKING ── */}
      {landingPage.tracking_google_ads_conversion_id && (
        <>
          <Script
            id="google-ads-script"
            src={`https://www.googletagmanager.com/gtag/js?id=${landingPage.tracking_google_ads_conversion_id.split('/')[0]}`}
            strategy="lazyOnload"
          />
          <Script
            id="google-ads-init"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${landingPage.tracking_google_ads_conversion_id.split('/')[0]}');
              `,
            }}
          />
        </>
      )}

      {/* ── META PIXEL (FACEBOOK) ── */}
      {landingPage.tracking_meta_pixel_id && (
        <Script
          id="meta-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${landingPage.tracking_meta_pixel_id}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      {/* ── TABOOLA PIXEL ── */}
      {landingPage.tracking_taboola_pixel_id && (
        <Script
          id="taboola-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window._tfa = window._tfa || [];
              window._tfa.push({notify: 'event', name: 'page_view', id: ${landingPage.tracking_taboola_pixel_id}});
              !function (t, f, a, x) {
                if (!document.getElementById(x)) {
                  t.async = 1;t.src = a;t.id=x;f.parentNode.insertBefore(t, f);
                }
              }(document.createElement('script'),
              document.getElementsByTagName('script')[0],
              '//cdn.taboola.com/libtrc/unip/${landingPage.tracking_taboola_pixel_id}/tfa.js',
              'tb_tfa_script');
            `,
          }}
        />
      )}

      {/* ── SCRIPTS CUSTOMIZADOS ── */}
      {landingPage.tracking_custom_scripts && (
        <Script
          id="custom-tracking-scripts"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: landingPage.tracking_custom_scripts,
          }}
        />
      )}
    </>
  );
}
