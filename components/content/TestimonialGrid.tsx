import { Testimonial } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { RatingStars } from '@/components/ui/RatingStars';
import { Badge } from '@/components/ui/Badge';
import { getStrapiImageUrl } from '@/lib/utils';
import Image from 'next/image';

interface TestimonialGridProps {
  headline?: string;
  testimonials: Testimonial[];
  columns?: 2 | 3;
}

export function TestimonialGrid({
  headline = 'O que nossos clientes dizem',
  testimonials,
  columns = 3,
}: TestimonialGridProps) {
  return (
    <section className="py-16 bg-surface-50">
      <Container>
        <h2 className="text-h2 font-heading text-center mb-12">{headline}</h2>

        <div
          className={`grid gap-6 ${columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
            }`}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-card shadow-card hover:shadow-card-hover transition-shadow"
            >
              {/* Header com foto e nome */}
              <div className="flex items-center gap-3 mb-4">
                {testimonial.author_photo ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={getStrapiImageUrl(testimonial.author_photo.url)}
                      alt={testimonial.author_name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-600 font-semibold text-lg">
                      {testimonial.author_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-surface-900 truncate">
                    {testimonial.author_name}
                  </p>
                  {testimonial.author_role && (
                    <p className="text-body-sm text-surface-600 truncate">
                      {testimonial.author_role}
                    </p>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-3">
                <RatingStars rating={testimonial.rating} />
              </div>

              {/* Conteúdo */}
              <blockquote className="text-body text-surface-700 italic mb-3">
                "{testimonial.content}"
              </blockquote>

              {/* Badge verificado */}
              {testimonial.verified && testimonial.badge_text && (
                <Badge variant="success" className="text-xs">
                  ✓ {testimonial.badge_text}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
