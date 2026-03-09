// ============================================
// MIDDLEWARE.TS - Filtro de Tráfego para LPs
// Next.js 15 — Edge Runtime
// ============================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  getFilterConfig,
  isBot,
  isValidUserAgent,
  validateAccessCode,
  validateSource,
  validateRequiredParams,
  validateCountry,
  isDirectAccess,
  type FilterConfig,
} from './lib/filter';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Apenas rotas /lp/*
  if (!pathname.startsWith('/lp/')) {
    return NextResponse.next();
  }

  const slug = pathname.replace('/lp/', '').replace(/\/$/, '');
  if (!slug) return NextResponse.next();

  // Buscar configuração de filtro da LP no Strapi
  const filterConfig = await getFilterConfig(slug);

  // Filtro desabilitado ou inexistente → passa (apenas adiciona headers)
  if (!filterConfig || !filterConfig.filter_enabled) {
    return addSecurityHeaders(NextResponse.next());
  }

  const ua = request.headers.get('user-agent') ?? '';
  const params = request.nextUrl.searchParams;
  const referer = request.headers.get('referer') ?? '';

  // País: Cloudflare (cf-ipcountry) ou header customizado do EasyPanel/nginx
  const country =
    request.headers.get('cf-ipcountry') ??
    request.headers.get('x-country-code') ??
    '';

  // ── CHECK 1: BOTS ──
  if (filterConfig.filter_block_bots && isBot(ua)) {
    return redirectToBlocked(filterConfig, request);
  }

  // ── CHECK 2: USER-AGENT VAZIO ──
  if (filterConfig.filter_block_empty_ua && !isValidUserAgent(ua)) {
    return redirectToBlocked(filterConfig, request);
  }

  // ── CHECK 3: CÓDIGO DE ACESSO ──
  if (filterConfig.filter_access_code) {
    const paramName = filterConfig.filter_access_param ?? 'xyz';
    if (!validateAccessCode(params, filterConfig.filter_access_code, paramName)) {
      return redirectToBlocked(filterConfig, request);
    }
  }

  // ── CHECK 4: ORIGEM OBRIGATÓRIA (utm_source) ──
  if (filterConfig.filter_required_sources?.length) {
    if (!validateSource(params, filterConfig.filter_required_sources)) {
      return redirectToBlocked(filterConfig, request);
    }
  }

  // ── CHECK 5: PARÂMETROS OBRIGATÓRIOS ──
  if (filterConfig.filter_required_params?.length) {
    if (!validateRequiredParams(params, filterConfig.filter_required_params)) {
      return redirectToBlocked(filterConfig, request);
    }
  }

  // ── CHECK 6: PAÍS ──
  if (country) {
    const allowedCountries = filterConfig.filter_allowed_countries ?? [];
    const blockedCountries = filterConfig.filter_blocked_countries ?? [];
    if (!validateCountry(country, allowedCountries, blockedCountries)) {
      return redirectToBlocked(filterConfig, request);
    }
  }

  // ── CHECK 7: ACESSO DIRETO ──
  if (filterConfig.filter_block_direct) {
    const hasParams = params.toString().length > 0;
    if (isDirectAccess(referer, hasParams)) {
      return redirectToBlocked(filterConfig, request);
    }
  }

  // ✅ Passou em todos os checks
  return addSecurityHeaders(NextResponse.next());
}

function redirectToBlocked(config: FilterConfig, request: NextRequest): NextResponse {
  const redirectUrl = config.filter_redirect_url
    ? config.filter_redirect_url
    : config.filter_safe_page_slug
      ? `/${config.filter_safe_page_slug}`
      : '/blocked';

  const url = redirectUrl.startsWith('http')
    ? redirectUrl
    : new URL(redirectUrl, request.url).toString();

  return NextResponse.redirect(url, { status: 302 });
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Cache-Control', 'no-store, must-revalidate');
  return response;
}

// ── MATCHER — Next.js 15 (formato de array) ──
export const config = {
  matcher: [
    {
      source: '/lp/:path*',
      // Exclui arquivos estáticos e _next
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
