// ============================================
// PRODUCT PAGE - Página principal do produto
// SSG + ISR
// ============================================

import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/payload';
import { Container } from '@/components/ui/Container';
import { DataLayerInit } from '@/components/tracking/DataLayerInit';
import { Metadata } from 'next';

interface ProductPageProps {
  params: {
    'product-slug': string;
  };
}

// ISR: revalidar a cada 1 hora
export const revalidate = 3600;

// Generate static params
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    'product-slug': product.slug,
  }));
}

// Metadata
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params['product-slug']);

  if (!product) {
    return { title: 'Produto não encontrado' };
  }

  return {
    title: product.name,
    description: product.short_description || product.description || '',
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params['product-slug']);

  if (!product) {
    notFound();
  }

  return (
    <>
      <DataLayerInit
        pageType="seo"
        productSlug={product.slug}
        productName={product.name}
      />

      <main>
        {/* Hero */}
        <section className="py-20 bg-brand-50">
          <Container>
            <h1 className="text-display font-heading text-center mb-6">
              {product.name}
            </h1>
            {product.short_description && (
              <p className="text-h3 text-center text-surface-600 max-w-narrow mx-auto">
                {product.short_description}
              </p>
            )}
            <div className="mt-8 text-center">
              <a
                href={product.checkout_base_url}
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 text-white font-semibold text-body-lg rounded-button hover:bg-brand-700 transition-colors"
              >
                Ver Detalhes
              </a>
            </div>
          </Container>
        </section>

        {/* Descrição */}
        {product.description && (
          <section className="py-16">
            <Container size="narrow">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </Container>
          </section>
        )}

        {/* Depoimentos */}
        {product.testimonials && product.testimonials.length > 0 && (
          <section className="py-16 bg-surface-50">
            <Container>
              <h2 className="text-h2 font-heading text-center mb-12">
                O que nossos clientes dizem
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-white p-6 rounded-card shadow-card"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-brand-100 rounded-full" />
                      <div>
                        <p className="font-semibold">{testimonial.author_name}</p>
                        <div className="text-accent-500">
                          {'⭐'.repeat(testimonial.rating || 5)}
                        </div>
                      </div>
                    </div>
                    <p className="text-body italic">"{testimonial.content}"</p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>
    </>
  );
}
