// ============================================
// SEO SUB-PAGE - Páginas de conteúdo do produto
// SSG + ISR
// ============================================

import { notFound } from 'next/navigation';
import { getSeoPageBySlug, getSeoPages } from '@/lib/strapi';
import { Container } from '@/components/ui/Container';
import { DataLayerInit } from '@/components/tracking/DataLayerInit';
import { Metadata } from 'next';

interface SeoSubPageProps {
  params: {
    'product-slug': string;
    'page-slug': string;
  };
}

// ISR: revalidar a cada 1 hora
export const revalidate = 3600;

// Generate static params
export async function generateStaticParams() {
  const seoPages = await getSeoPages();

  return seoPages
    .filter((page: any) => page.product?.slug)
    .map((page: any) => ({
      'product-slug': page.product!.slug,
      'page-slug': page.slug,
    }));
}

// Metadata
export async function generateMetadata({ params }: SeoSubPageProps): Promise<Metadata> {
  const seoPage = await getSeoPageBySlug(params['page-slug'], params['product-slug']);

  if (!seoPage) {
    return { title: 'Página não encontrada' };
  }

  return {
    title: seoPage.meta_title || seoPage.title,
    description: seoPage.meta_description || seoPage.excerpt || '',
    keywords: seoPage.keywords || undefined,
  };
}

export default async function SeoSubPage({ params }: SeoSubPageProps) {
  const seoPage = await getSeoPageBySlug(params['page-slug'], params['product-slug']);

  if (!seoPage) {
    notFound();
  }

  return (
    <>
      <DataLayerInit
        pageType="seo"
        productSlug={params['product-slug']}
        pageSlug={seoPage.slug}
      />

      <main>
        {/* Hero */}
        <section className="py-16 bg-brand-50">
          <Container size="narrow">
            <h1 className="text-h1 font-heading mb-4">
              {seoPage.h1 || seoPage.title}
            </h1>
            {seoPage.excerpt && (
              <p className="text-body-lg text-surface-600">{seoPage.excerpt}</p>
            )}
          </Container>
        </section>

        {/* Conteúdo */}
        <section className="py-16">
          <Container size="narrow">
            <article
              className="prose-strapi"
              dangerouslySetInnerHTML={{ __html: seoPage.content }}
            />
          </Container>
        </section>

        {/* Páginas relacionadas */}
        {seoPage.related_pages && seoPage.related_pages.length > 0 && (
          <section className="py-16 bg-surface-50">
            <Container>
              <h2 className="text-h2 font-heading mb-8">Leia também</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seoPage.related_pages.map((relatedPage: any) => (
                  <a
                    key={relatedPage.id}
                    href={`/${params['product-slug']}/${relatedPage.slug}`}
                    className="block bg-white p-6 rounded-card shadow-card hover:shadow-card-hover transition-shadow"
                  >
                    <h3 className="text-h3 font-heading mb-2">{relatedPage.title}</h3>
                    {relatedPage.excerpt && (
                      <p className="text-body text-surface-600 line-clamp-3">
                        {relatedPage.excerpt}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>
    </>
  );
}
