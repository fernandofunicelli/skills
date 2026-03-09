'use client';

import { motion } from 'framer-motion';
import { LpHeroSection, Product, LandingPage } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { CtaButton } from './CtaButton';
import { VideoEmbed } from '@/components/ui/VideoEmbed';
import { getStrapiImageUrl } from '@/lib/strapi';
import Image from 'next/image';

interface LpHeroProps {
  data: LpHeroSection;
  product: Product;
  landingPage: LandingPage;
}

export function LpHero({ data, product, landingPage }: LpHeroProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-surface-900 to-surface-800 text-white overflow-hidden">
      <Container>
        <div className="max-w-narrow mx-auto text-center">
          {/* Badge de urgência */}
          {data.badge_text && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="accent" className="mb-6 text-base text-surface-900 font-bold bg-accent-500">
                {data.badge_text}
              </Badge>
            </motion.div>
          )}

          {/* Headline */}
          <motion.h1
            className="text-display font-heading mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {data.headline}
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            className="text-h3 text-surface-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {data.sub_headline}
          </motion.p>

          {/* Imagem ou Vídeo */}
          {(data.hero_image || data.hero_video_url) && (
            <motion.div
              className="mb-8 p-1 bg-surface-800 rounded-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {data.hero_video_url ? (
                <VideoEmbed videoUrl={data.hero_video_url} />
              ) : data.hero_image ? (
                <div className="relative aspect-video rounded-card overflow-hidden shadow-floating">
                  <Image
                    src={getStrapiImageUrl(data.hero_image.url)}
                    alt={data.hero_image.alternativeText || data.headline}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                </div>
              ) : null}
            </motion.div>
          )}

          {/* CTA Principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CtaButton
              product={product}
              landingPage={landingPage}
              text={data.cta_text}
              size="xl"
              pulse
            />
          </motion.div>

          {/* Trust items */}
          {data.trust_items && data.trust_items.length > 0 && (
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {data.trust_items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-body-sm text-surface-600"
                >
                  <span className="text-success-500 text-lg">✓</span>
                  {item.label}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
