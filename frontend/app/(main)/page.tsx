// ============================================
// HOME PAGE
// ============================================

import { Container } from '@/components/ui/Container';
import { getProducts } from '@/lib/strapi';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const revalidate = 3600;

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-brand-50 to-white">
        <Container>
          <div className="text-center max-w-narrow mx-auto">
            <h1 className="text-display font-heading mb-6">
              Ecossistema de Vendas de Alta Conversão
            </h1>
            <p className="text-h3 text-surface-600 mb-8">
              Sistema completo com Landing Pages otimizadas, tracking e filtros
              avançados
            </p>
            <Button size="lg">Começar Agora</Button>
          </div>
        </Container>
      </section>

      {/* Produtos */}
      {products.length > 0 && (
        <section className="py-16">
          <Container>
            <h2 className="text-h2 font-heading text-center mb-12">
              Nossos Produtos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/${product.slug}`}
                  className="block bg-white rounded-card shadow-card hover:shadow-card-hover transition-shadow p-6"
                >
                  <h3 className="text-h3 font-heading mb-2">{product.name}</h3>
                  <p className="text-body text-surface-600 mb-4">
                    {product.short_description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-h3 text-brand-600 font-bold">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: product.currency,
                      }).format(product.price)}
                    </span>
                    <span className="text-brand-600 font-semibold">
                      Ver mais →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}
