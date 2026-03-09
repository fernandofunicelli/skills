import { Product } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getStrapiImageUrl } from '@/lib/strapi';
import Image from 'next/image';

interface ProductHeroProps {
  product: Product;
  showCta?: boolean;
}

export function ProductHero({ product, showCta = true }: ProductHeroProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-brand-50 to-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo */}
          <div>
            {product.is_active && (
              <Badge variant="brand" className="mb-4">
                Disponível Agora
              </Badge>
            )}

            <h1 className="text-display font-heading mb-6">{product.name}</h1>

            {product.short_description && (
              <p className="text-h3 text-surface-600 mb-8">
                {product.short_description}
              </p>
            )}

            {/* Preço */}
            <div className="mb-8">
              {product.price_original && (
                <p className="text-body-lg text-surface-500 line-through mb-1">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: product.currency,
                  }).format(product.price_original)}
                </p>
              )}
              <p className="text-display text-brand-600 font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: product.currency,
                }).format(product.price)}
              </p>
            </div>

            {/* Trust badges */}
            {product.trust_badges && product.trust_badges.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-8">
                {product.trust_badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-2 text-body-sm text-surface-600"
                  >
                    <span className="text-success-500">✓</span>
                    {badge.label}
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            {showCta && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => (window.location.href = product.checkout_base_url)}
                >
                  Comprar Agora
                </Button>
                <Button variant="outline" size="lg">
                  Saiba Mais
                </Button>
              </div>
            )}
          </div>

          {/* Imagem */}
          {product.featured_image && (
            <div className="relative aspect-square rounded-card overflow-hidden shadow-floating">
              <Image
                src={getStrapiImageUrl(product.featured_image.url)}
                alt={product.featured_image.alternativeText || product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
