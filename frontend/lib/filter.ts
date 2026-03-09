// ============================================
// FILTER.TS - Configuração de filtro para middleware
// ============================================

import { LandingPage } from './types';

export interface FilterConfig {
  filter_enabled: boolean;
  filter_access_code?: string;
  filter_access_param?: string;
  filter_required_sources?: string[];
  filter_required_params?: string[];
  filter_allowed_countries?: string[];
  filter_blocked_countries?: string[];
  filter_block_bots: boolean;
  filter_block_empty_ua: boolean;
  filter_block_direct: boolean;
  filter_redirect_url?: string;
  filter_safe_page_slug?: string;
}

/**
 * Busca configuração de filtro de uma LP específica
 * Usado pelo middleware
 *
 * @param lpSlug - Slug da Landing Page
 * @returns Configuração de filtro ou null
 */
export async function getFilterConfig(lpSlug: string): Promise<FilterConfig | null> {
  try {
    const STRAPI_URL = process.env.STRAPI_API_URL || 'http://localhost:1337/api';
    const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

    const url = `${STRAPI_URL}/landing-pages?filters[slug][$eq]=${lpSlug}&fields[0]=filter_enabled&fields[1]=filter_access_code&fields[2]=filter_access_param&fields[3]=filter_required_sources&fields[4]=filter_required_params&fields[5]=filter_allowed_countries&fields[6]=filter_blocked_countries&fields[7]=filter_block_bots&fields[8]=filter_block_empty_ua&fields[9]=filter_block_direct&fields[10]=filter_redirect_url&fields[11]=filter_safe_page_slug`;

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
      next: {
        revalidate: 60, // Cache de 1 minuto
      },
    });

    if (!res.ok) return null;

    const data = await res.json();

    if (!data.data || data.data.length === 0) return null;

    const lp = data.data[0].attributes;

    return {
      filter_enabled: lp.filter_enabled || false,
      filter_access_code: lp.filter_access_code,
      filter_access_param: lp.filter_access_param || 'xyz',
      filter_required_sources: lp.filter_required_sources || [],
      filter_required_params: lp.filter_required_params || [],
      filter_allowed_countries: lp.filter_allowed_countries || [],
      filter_blocked_countries: lp.filter_blocked_countries || [],
      filter_block_bots: lp.filter_block_bots !== false,
      filter_block_empty_ua: lp.filter_block_empty_ua !== false,
      filter_block_direct: lp.filter_block_direct || false,
      filter_redirect_url: lp.filter_redirect_url,
      filter_safe_page_slug: lp.filter_safe_page_slug,
    };
  } catch (error) {
    console.error(`Error fetching filter config for ${lpSlug}:`, error);
    return null;
  }
}

/**
 * Padrões de bots conhecidos
 * Ver briefing seção 4.2
 */
export const BOT_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /semrush/i,
  /ahrefs/i,
  /moz\.com/i,
  /headless/i,
  /phantom/i,
  /selenium/i,
  /puppeteer/i,
  /playwright/i,
  /wget/i,
  /curl/i,
  /python-requests/i,
  /axios/i,
  /node-fetch/i,
  /go-http/i,
  /java/i,
  /okhttp/i,
];

/**
 * Verifica se user-agent é de um bot
 */
export function isBot(userAgent: string): boolean {
  return BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

/**
 * Valida se user-agent é válido (não vazio, tamanho mínimo)
 */
export function isValidUserAgent(userAgent: string): boolean {
  return userAgent.length >= 20;
}

/**
 * Extrai código de acesso da URL
 */
export function getAccessCode(
  searchParams: URLSearchParams,
  paramName: string = 'xyz'
): string | null {
  return searchParams.get(paramName);
}

/**
 * Valida código de acesso
 */
export function validateAccessCode(
  searchParams: URLSearchParams,
  expectedCode: string,
  paramName: string = 'xyz'
): boolean {
  const code = getAccessCode(searchParams, paramName);
  return code === expectedCode;
}

/**
 * Valida origem (utm_source)
 */
export function validateSource(
  searchParams: URLSearchParams,
  requiredSources: string[]
): boolean {
  if (requiredSources.length === 0) return true;
  const utmSource = searchParams.get('utm_source')?.toLowerCase() || '';
  return requiredSources.map((s) => s.toLowerCase()).includes(utmSource);
}

/**
 * Valida parâmetros obrigatórios
 */
export function validateRequiredParams(
  searchParams: URLSearchParams,
  requiredParams: string[]
): boolean {
  if (requiredParams.length === 0) return true;
  return requiredParams.every((param) => searchParams.has(param));
}

/**
 * Valida país
 */
export function validateCountry(
  country: string | null,
  allowedCountries: string[],
  blockedCountries: string[]
): boolean {
  if (!country) return true; // Se não conseguir detectar país, permite

  const upper = country.toUpperCase();

  // Se tem lista de países bloqueados, verificar
  if (blockedCountries.length > 0 && blockedCountries.includes(upper)) {
    return false;
  }

  // Se tem lista de países permitidos, verificar
  if (allowedCountries.length > 0 && !allowedCountries.includes(upper)) {
    return false;
  }

  return true;
}

/**
 * Valida acesso direto (sem referer e sem params)
 */
export function isDirectAccess(referer: string | null, hasParams: boolean): boolean {
  return !referer && !hasParams;
}
