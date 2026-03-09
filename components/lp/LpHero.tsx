'use client';

import { motion } from 'framer-motion';
import { LpHeroSection, Product, LandingPage } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { CtaButton } from './CtaButton';
import { VideoEmbed } from '@/components/ui/VideoEmbed';
import { getStrapiImageUrl } from '@/lib/utils';
import Image from 'next/image';

interface LpHeroProps {
  data: LpHeroSection;
  product: Product;
  landingPage: LandingPage;
}

export function LpHero({ data, product, landingPage }: LpHeroProps) {
  return (
    <>
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background-dark text-slate-100 selection:bg-primary selection:text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent z-10"></div>
          {data.hero_image ? (
            <Image
              src={getStrapiImageUrl(data.hero_image.url)}
              alt={data.hero_image.alternativeText || 'Background'}
              fill
              className="w-full h-full object-cover object-right"
              priority
            />
          ) : (
            <img alt="Background" className="w-full h-full object-cover object-right" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXFaGMyVfizO3zM5UZcD0QU3zbJjClmExauZamCC_7XTlfavp_YuVMGKAEnUXaCICGXH2UsfHYbMo2Xqop4WhqMHw75DBI3yfPnExTh_yNwMVc9wp9A8XqrwtDXHwvcqsvVIdlihUns4yHNuh2b-aNdi0JwAgPefj8zdn1RjcFRUJr3miYY1OWOmrvfpLPBWXpLsJuZRINPrz6H8sTnbk2Y51VOo_exU1s_1FisZWMZyGnCPruo5Sc1ahvNlKZfot0fEDAg0-nbyY" />
          )}
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            {data.badge_text && (
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
              >
                {data.badge_text}
              </motion.span>
            )}

            <motion.h1
              className="text-5xl md:text-7xl font-black leading-tight mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              dangerouslySetInnerHTML={{ __html: data.headline.replace(/R\$[0-9]+/g, match => `<span class="text-primary" style="text-shadow: 0 0 10px rgba(232, 25, 44, 0.5);">${match}</span>`) }}
            />

            <motion.p
              className="text-xl text-slate-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {data.sub_headline}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <CtaButton
                product={product}
                landingPage={landingPage}
                text={data.cta_text || 'Ativar Agora'}
                size="xl"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-black text-lg transition-all shadow-xl shadow-primary/30"
              />
              {data.hero_video_url && (
                <a href={data.hero_video_url} target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/20 text-white px-8 py-4 rounded-lg font-black text-lg transition-all flex items-center justify-center">
                  Ver Vídeo
                </a>
              )}
            </motion.div>

            {data.trust_items && data.trust_items.length > 0 ? (
              <motion.div
                className="flex items-center gap-3 text-sm text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v12H4z" opacity=".3" /><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM8 12h8v2H8z" /></svg>
                {data.trust_items.map(i => i.label).join(' • ')}
              </motion.div>
            ) : (
              <motion.div
                className="flex items-center gap-3 text-sm text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v12H4z" opacity=".3" /><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM8 12h8v2H8z" /></svg>
                Funciona em Smart TV, TV Box, Celular e PC
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="py-12 border-y border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" /></svg>
              <div>
                <p className="font-bold text-white">Pré-pago</p>
                <p className="text-xs text-slate-400">Controle total</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4h-2V2h-4v2H8c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-1 9h-2.5v6L8 13h2.5V7L15 13z" /></svg>
              <div>
                <p className="font-bold text-white">Acesso em 5 min</p>
                <p className="text-xs text-slate-400">Ativação instantânea</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg>
              <div>
                <p className="font-bold text-white">Sem Fidelidade</p>
                <p className="text-xs text-slate-400">Cancele quando quiser</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" /></svg>
              <div>
                <p className="font-bold text-white">Suporte 24h</p>
                <p className="text-xs text-slate-400">Atendimento humanizado</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
