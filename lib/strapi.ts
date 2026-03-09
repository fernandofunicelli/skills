// ============================================
// DATA FETCHING - Payload CMS Local API
// (Substitui o antigo strapi.ts mantendo os exports)
// ============================================

import { getPayload } from 'payload'
import configPromise from '@payload-config'

let cachedPayload: any = null;

async function getPayloadClient() {
  if (!cachedPayload) {
    cachedPayload = await getPayload({ config: configPromise });
  }
  return cachedPayload;
}

// ── GLOBAL SEO ──
export async function getGlobalSeo() {
  try {
    const payload = await getPayloadClient();
    const result = await payload.findGlobal({
      slug: 'global-seo',
      depth: 1,
    });
    return result || null;
  } catch (error) {
    console.error('Error fetching GlobalSeo:', error);
    return null;
  }
}

// ── PRODUCTS ──
export async function getProducts() {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'products',
      where: {
        is_active: { equals: true },
      },
      depth: 1,
    });
    return result.docs;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'products',
      where: {
        slug: { equals: slug },
        is_active: { equals: true },
      },
      depth: 1,
    });
    return result.docs[0] || null;
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    return null;
  }
}

// ── SEO PAGES ──
export async function getSeoPages() {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'seo-pages',
      depth: 1,
    });
    return result.docs;
  } catch (error) {
    console.error('Error fetching SEO pages:', error);
    return [];
  }
}

export async function getSeoPageBySlug(slug: string, productSlug?: string) {
  try {
    const payload = await getPayloadClient();
    const whereClause: any = {
      slug: { equals: slug }
    };

    // Adicionando cláusula condicional como era no Strapi
    if (productSlug) {
      whereClause['product.slug'] = { equals: productSlug };
    }

    const result = await payload.find({
      collection: 'seo-pages',
      where: whereClause,
      depth: 2,
    });
    return result.docs[0] || null;
  } catch (error) {
    console.error(`Error fetching SEO page ${slug}:`, error);
    return null;
  }
}

export async function getSeoPagesByProduct(productSlug: string) {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'seo-pages',
      where: {
        'product.slug': { equals: productSlug }
      },
      depth: 1,
    });
    return result.docs;
  } catch (error) {
    console.error(`Error fetching SEO pages for ${productSlug}:`, error);
    return [];
  }
}

// ── LANDING PAGES ──
export async function getLandingPages() {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'landing-pages',
      depth: 1,
    });
    return result.docs;
  } catch (error) {
    console.error('Error fetching landing pages:', error);
    return [];
  }
}

export async function getLandingPageBySlug(slug: string) {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'landing-pages',
      where: {
        slug: { equals: slug }
      },
      depth: 2, // Precisamos de depth>1 para trazer os relacionamentos da Dynamic Zone e o Product
    });
    return result.docs[0] || null;
  } catch (error) {
    console.error(`Error fetching landing page ${slug}:`, error);
    return null;
  }
}

// ── HELPERS ──
