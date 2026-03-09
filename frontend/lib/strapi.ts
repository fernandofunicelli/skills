// ============================================
// STRAPI.TS - Fetch de dados do Strapi
// ============================================

import {
  Product,
  SeoPage,
  LandingPage,
  GlobalSeo,
  StrapiCollectionResponse,
  StrapiSingleResponse,
} from './types';

const STRAPI_URL = process.env.STRAPI_API_URL || 'http://localhost:1337/api';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Fetch genérico do Strapi com cache tags
 */
async function fetchStrapi(endpoint: string, options: RequestInit = {}) {
  const url = `${STRAPI_URL}${endpoint}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      ...options.headers,
    },
    next: {
      tags: options.next?.tags || [endpoint],
      revalidate: options.next?.revalidate ?? 3600, // 1 hora default
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// ── GLOBAL SEO ──

export async function getGlobalSeo(): Promise<GlobalSeo | null> {
  try {
    const response: StrapiSingleResponse<GlobalSeo> = await fetchStrapi(
      '/global-seo?populate=deep'
    );
    if (!response.data) return null;
    return { id: response.data.id, ...response.data.attributes };
  } catch (error) {
    console.error('Error fetching GlobalSeo:', error);
    return null;
  }
}

// ── PRODUCTS ──

export async function getProducts(): Promise<Product[]> {
  try {
    const response: StrapiCollectionResponse<Product> = await fetchStrapi(
      '/products?populate=deep&filters[is_active][$eq]=true&sort=createdAt:desc'
    );
    return response.data.map((item) => ({ id: item.id, ...item.attributes }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response: StrapiCollectionResponse<Product> = await fetchStrapi(
      `/products?populate=deep&filters[slug][$eq]=${slug}&filters[is_active][$eq]=true`
    );
    if (response.data.length === 0) return null;
    return { id: response.data[0].id, ...response.data[0].attributes };
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    return null;
  }
}

// ── SEO PAGES ──

export async function getSeoPages(): Promise<SeoPage[]> {
  try {
    const response: StrapiCollectionResponse<SeoPage> = await fetchStrapi(
      '/seo-pages?populate=deep&filters[noindex][$eq]=false&sort=createdAt:desc'
    );
    return response.data.map((item) => ({ id: item.id, ...item.attributes }));
  } catch (error) {
    console.error('Error fetching SEO pages:', error);
    return [];
  }
}

export async function getSeoPageBySlug(
  slug: string,
  productSlug?: string
): Promise<SeoPage | null> {
  try {
    let query = `/seo-pages?populate=deep&filters[slug][$eq]=${slug}`;
    if (productSlug) {
      query += `&filters[product][slug][$eq]=${productSlug}`;
    }
    const response: StrapiCollectionResponse<SeoPage> = await fetchStrapi(query);
    if (response.data.length === 0) return null;
    return { id: response.data[0].id, ...response.data[0].attributes };
  } catch (error) {
    console.error(`Error fetching SEO page ${slug}:`, error);
    return null;
  }
}

export async function getSeoPagesByProduct(productSlug: string): Promise<SeoPage[]> {
  try {
    const response: StrapiCollectionResponse<SeoPage> = await fetchStrapi(
      `/seo-pages?populate=deep&filters[product][slug][$eq]=${productSlug}&filters[noindex][$eq]=false&sort=createdAt:desc`
    );
    return response.data.map((item) => ({ id: item.id, ...item.attributes }));
  } catch (error) {
    console.error(`Error fetching SEO pages for ${productSlug}:`, error);
    return [];
  }
}

// ── LANDING PAGES ──

export async function getLandingPages(): Promise<LandingPage[]> {
  try {
    const response: StrapiCollectionResponse<LandingPage> = await fetchStrapi(
      '/landing-pages?populate=deep&sort=createdAt:desc'
    );
    return response.data.map((item) => ({ id: item.id, ...item.attributes }));
  } catch (error) {
    console.error('Error fetching landing pages:', error);
    return [];
  }
}

export async function getLandingPageBySlug(slug: string): Promise<LandingPage | null> {
  try {
    const response: StrapiCollectionResponse<LandingPage> = await fetchStrapi(
      `/landing-pages?populate=deep&filters[slug][$eq]=${slug}`,
      {
        next: { revalidate: 0 }, // NO CACHE para LPs (cada visita é única)
      }
    );
    if (response.data.length === 0) return null;
    return { id: response.data[0].id, ...response.data[0].attributes };
  } catch (error) {
    console.error(`Error fetching landing page ${slug}:`, error);
    return null;
  }
}

// ── HELPERS ──

/**
 * Revalida cache de um path específico
 * Chamado pelo webhook do Strapi
 */
export async function revalidatePath(path: string): Promise<void> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': process.env.REVALIDATE_SECRET || '',
      },
      body: JSON.stringify({ path }),
    });
  } catch (error) {
    console.error(`Error revalidating path ${path}:`, error);
  }
}

/**
 * Obtém URL completa da imagem do Strapi
 */
export function getStrapiImageUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const baseUrl = STRAPI_URL.replace('/api', '');
  return `${baseUrl}${url}`;
}
