// ============================================
// SCHEMA.TS - Geração de JSON-LD (Schema.org)
// ============================================

import { Product, SeoPage, FaqItem, Testimonial } from './types';
import { getStrapiImageUrl } from './strapi';

/**
 * Gera schema Product
 * Ver briefing seção 8.4
 */
export function generateProductSchema(product: Product, siteUrl: string) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description || product.description || product.name,
    image: product.featured_image
      ? getStrapiImageUrl(product.featured_image.url)
      : undefined,
    url: `${siteUrl}/${product.slug}`,
    offers: {
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: product.currency,
      availability: product.is_active
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${siteUrl}/${product.slug}`,
    },
  };

  // Adicionar rating agregado se houver testimonials com rating
  if (product.testimonials && product.testimonials.length > 0) {
    const ratings = product.testimonials
      .filter((t) => t.rating > 0)
      .map((t) => t.rating);

    if (ratings.length > 0) {
      const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      schema['aggregateRating'] = {
        '@type': 'AggregateRating',
        ratingValue: averageRating.toFixed(1),
        reviewCount: ratings.length,
        bestRating: 5,
        worstRating: 1,
      };
    }
  }

  return schema;
}

/**
 * Gera schema Article para SEO pages e blog posts
 */
export function generateArticleSchema(
  seoPage: SeoPage,
  productSlug: string | undefined,
  siteUrl: string
) {
  const url = productSlug
    ? `${siteUrl}/${productSlug}/${seoPage.slug}`
    : `${siteUrl}/blog/${seoPage.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: seoPage.h1 || seoPage.title,
    description: seoPage.excerpt || seoPage.meta_description || '',
    image: seoPage.featured_image
      ? getStrapiImageUrl(seoPage.featured_image.url)
      : undefined,
    datePublished: seoPage.publishedAt,
    dateModified: seoPage.updatedAt || seoPage.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Ecossistema de Vendas',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ecossistema de Vendas',
    },
    url,
  };
}

/**
 * Gera schema FAQPage
 */
export function generateFAQSchema(faqItems: FaqItem[]) {
  if (!faqItems || faqItems.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Gera schema BreadcrumbList
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Gera schema HowTo (para páginas de tutorial/passo a passo)
 */
export function generateHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string; image?: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };
}

/**
 * Gera schema Organization (para site global)
 */
export function generateOrganizationSchema(
  siteName: string,
  siteUrl: string,
  logoUrl?: string,
  socialLinks?: string[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: logoUrl,
    ...(socialLinks && socialLinks.length > 0 && { sameAs: socialLinks }),
  };
}

/**
 * Gera schema WebSite (para home)
 */
export function generateWebSiteSchema(siteName: string, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Gera schema Review (para testimonials)
 */
export function generateReviewSchema(testimonial: Testimonial, productName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: productName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: testimonial.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Person',
      name: testimonial.author_name,
    },
    reviewBody: testimonial.content,
  };
}

/**
 * Helper para serializar schema como string JSON
 */
export function serializeSchema(schema: any): string {
  return JSON.stringify(schema, null, 0);
}

/**
 * Helper para múltiplos schemas (retorna array)
 */
export function combineSchemas(...schemas: any[]): any[] {
  return schemas.filter(Boolean);
}
