import { SeoPage } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { getStrapiImageUrl } from '@/lib/utils';
import Image from 'next/image';

interface RelatedPagesProps {
  headline?: string;
  pages: SeoPage[];
  basePath?: string;
}

export function RelatedPages({
  headline = 'Leia também',
  pages,
  basePath = '',
}: RelatedPagesProps) {
  if (!pages || pages.length === 0) return null;

  return (
    <section className="py-16 bg-surface-50">
      <Container>
        <h2 className="text-h2 font-heading mb-8">{headline}</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => {
            const url = basePath
              ? `${basePath}/${page.slug}`
              : page.product
                ? `/${page.product.slug}/${page.slug}`
                : `/blog/${page.slug}`;

            return (
              <Link
                key={page.id}
                href={url}
                className="block bg-white rounded-card shadow-card hover:shadow-card-hover transition-shadow overflow-hidden group"
              >
                {/* Imagem */}
                {page.featured_image && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={getStrapiImageUrl(page.featured_image.url)}
                      alt={page.featured_image.alternativeText || page.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* Conteúdo */}
                <div className="p-6">
                  <h3 className="text-h3 font-heading mb-2 group-hover:text-brand-600 transition-colors">
                    {page.title}
                  </h3>

                  {page.excerpt && (
                    <p className="text-body text-surface-600 line-clamp-3">
                      {page.excerpt}
                    </p>
                  )}

                  <p className="text-brand-600 font-semibold mt-4 flex items-center gap-1">
                    Ler mais
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
