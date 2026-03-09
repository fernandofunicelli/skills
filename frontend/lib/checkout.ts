// ============================================
// CHECKOUT.TS - Construção de URL de checkout
// ============================================

/**
 * Parâmetros de click ID que devem ser preservados
 * Ver briefing seção 5.6
 */
const PASSTHROUGH_PARAMS = [
  'gclid', // Google Ads
  'fbclid', // Meta/Facebook
  'tblci', // Taboola
  'msclkid', // Microsoft Ads
  'ttclid', // TikTok Ads
  'wbraid', // Google (iOS)
  'gbraid', // Google (iOS)
  'dclid', // Google Display
  'li_fat_id', // LinkedIn
];

export interface CheckoutUrlParams {
  checkoutBaseUrl: string;
  lpSlug: string;
  productSlug: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

/**
 * Constrói URL de checkout com UTMs e click IDs preservados
 *
 * Fluxo:
 * 1. Começar com checkout_base_url do produto
 * 2. Adicionar UTMs (source, medium, campaign, content, term)
 * 3. Adicionar click IDs da URL atual (PASSTHROUGH_PARAMS)
 * 4. Adicionar src=lp_{lpSlug}
 * 5. Adicionar ref={productSlug}
 *
 * @param params - Parâmetros para construir a URL
 * @returns URL completa de checkout
 */
export function buildCheckoutUrl(params: CheckoutUrlParams): string {
  const {
    checkoutBaseUrl,
    lpSlug,
    productSlug,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
  } = params;

  // Criar URL base
  const url = new URL(checkoutBaseUrl);

  // ── UTMs ──
  if (utmSource) url.searchParams.set('utm_source', utmSource);
  if (utmMedium) url.searchParams.set('utm_medium', utmMedium);
  if (utmCampaign) url.searchParams.set('utm_campaign', utmCampaign);
  if (utmContent) url.searchParams.set('utm_content', utmContent);
  if (utmTerm) url.searchParams.set('utm_term', utmTerm);

  // ── Click IDs (preservar da URL atual) ──
  if (typeof window !== 'undefined') {
    const currentParams = new URLSearchParams(window.location.search);

    PASSTHROUGH_PARAMS.forEach((param) => {
      const value = currentParams.get(param);
      if (value) {
        url.searchParams.set(param, value);
      }
    });
  }

  // ── Tracking adicional ──
  url.searchParams.set('src', `lp_${lpSlug}`); // Source: LP slug
  url.searchParams.set('ref', productSlug); // Reference: Product slug

  return url.toString();
}

/**
 * Extrai UTMs da URL atual
 * @returns Object com UTMs
 */
export function getCurrentUtms(): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
} {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);

  return {
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
    utmContent: params.get('utm_content') || undefined,
    utmTerm: params.get('utm_term') || undefined,
  };
}

/**
 * Extrai todos os click IDs da URL atual
 * @returns Object com click IDs
 */
export function getCurrentClickIds(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const clickIds: Record<string, string> = {};

  PASSTHROUGH_PARAMS.forEach((param) => {
    const value = params.get(param);
    if (value) {
      clickIds[param] = value;
    }
  });

  return clickIds;
}

/**
 * Valida se URL de checkout é válida
 * @param url - URL a ser validada
 * @returns true se válida
 */
export function isValidCheckoutUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Adiciona parâmetros adicionais a uma URL de checkout já construída
 * @param checkoutUrl - URL de checkout
 * @param additionalParams - Parâmetros adicionais
 * @returns URL com parâmetros adicionais
 */
export function addParamsToCheckoutUrl(
  checkoutUrl: string,
  additionalParams: Record<string, string>
): string {
  try {
    const url = new URL(checkoutUrl);
    Object.entries(additionalParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}
