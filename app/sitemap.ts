// ============================================
// SITEMAP - Geração automática
// APENAS páginas SEO (main), NUNCA LPs
// ============================================

import { MetadataRoute } from 'next';
import { getProducts, getSeoPages } from '@/lib/payload';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Buscar produtos
  const products = await getProducts();

  // Buscar SEO pages
  const seoPages = await getSeoPages();

  const sitemap: MetadataRoute.Sitemap = [
    // Home
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // Adicionar produtos
  products.forEach((product) => {
    sitemap.push({
      url: `${baseUrl}/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Adicionar SEO pages
  seoPages.forEach((page) => {
    const url = page.product
      ? `${baseUrl}/${page.product.slug}/${page.slug}`
      : `${baseUrl}/blog/${page.slug}`;

    sitemap.push({
      url,
      lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  });

  return sitemap;
}
