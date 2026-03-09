// ============================================
// DYNAMIC ZONE RENDERER - Renderiza componentes LP dinamicamente
// ============================================

import { LandingPage, Product, LpDynamicZone } from '@/lib/types';
import { CtaButton } from './CtaButton';
import { LpHero } from './LpHero';
import { LpVideo } from './LpVideo';
import { LpVturb } from './LpVturb';
import { LpSocialProof } from './LpSocialProof';
import { LpMediaLogos } from './LpMediaLogos';
import { LpContent } from './LpContent';
import { LpComparison } from './LpComparison';

// ── COMPONENTES INLINE (simples, sem arquivo separado) ──

function LpProblem({ data, product, landingPage }: any) {
  return (
    <div className="py-16 bg-surface-900 text-white">
      <div className="container-custom">
        <h2 className="text-h2 font-heading text-center mb-8">{data.headline}</h2>
        <div className="max-w-narrow mx-auto space-y-4">
          {data.pain_points?.map((point: any, i: number) => (
            <div key={i} className="flex gap-3 p-4 bg-surface-800 border-l-4 border-danger-500 rounded">
              <span className="text-danger-500">❌</span>
              <p className="text-surface-100">{point.label}</p>
            </div>
          ))}
        </div>
        {data.transition_text && <p className="text-center mt-8 text-body-lg text-surface-200">{data.transition_text}</p>}
        {data.cta_text && (
          <div className="mt-8 text-center">
            <CtaButton product={product} landingPage={landingPage} text={data.cta_text} />
          </div>
        )}
      </div>
    </div>
  );
}

function LpBenefits({ data, product, landingPage }: any) {
  return (
    <div className="py-16 bg-surface-800 text-white">
      <div className="container-custom">
        <h2 className="text-h2 font-heading text-center mb-12">{data.headline}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items?.map((item: any, i: number) => (
            <div key={i} className="bg-surface-900 p-6 rounded-card shadow-card border border-surface-200/10">
              <div className="text-brand-500 text-2xl mb-3">✓</div>
              <h3 className="text-h3 font-heading mb-2">{item.label}</h3>
              <p className="text-body text-surface-200">{item.description}</p>
            </div>
          ))}
        </div>
        {data.cta_text && (
          <div className="mt-12 text-center">
            <CtaButton product={product} landingPage={landingPage} text={data.cta_text} />
          </div>
        )}
      </div>
    </div>
  );
}

function LpTestimonials({ data }: any) {
  return (
    <div className="py-16 bg-surface-900 text-white">
      <div className="container-custom">
        <h2 className="text-h2 font-heading text-center mb-12">{data.headline}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items?.map((item: any, i: number) => (
            <div key={i} className="bg-surface-800 p-6 rounded-card shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-surface-200 rounded-full" />
                <div>
                  <p className="font-semibold">{item.author_name}</p>
                  <div className="text-accent-500">{'⭐'.repeat(item.rating || 5)}</div>
                </div>
              </div>
              <p className="text-body italic text-surface-100">"{item.content}"</p>
              {item.badge_text && <span className="text-body-sm text-success-500 mt-2 block">✅ {item.badge_text}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LpOfferStack({ data, product, landingPage }: any) {
  return (
    <div className="py-16 bg-surface-800 text-white">
      <div className="container-narrow mx-auto border-2 border-brand-500 rounded-2xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(230,10,21,0.2)]">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-brand-500/20 blur-[50px] pointer-events-none" />

        <h2 className="text-h2 font-heading text-center mb-12 relative z-10">{data.headline}</h2>
        <div className="space-y-3 mb-8 relative z-10">
          {data.items?.map((item: any, i: number) => (
            <div key={i} className="flex justify-between items-center p-4 bg-surface-900 rounded border border-surface-200/20">
              <span className="font-semibold text-surface-50">✓ {item.label}</span>
              {item.description && <span className="text-accent-400 font-bold">{item.description}</span>}
            </div>
          ))}
        </div>
        <div className="relative z-10">
          {data.total_value && <p className="text-center text-surface-400 line-through text-h3">Valor total: {data.total_value}</p>}
          <p className="text-center text-display text-white font-bold mt-2">{data.actual_price}</p>
          {data.installment_text && <p className="text-center text-body-lg text-success-400 font-bold mt-2">{data.installment_text}</p>}
        </div>
        <div className="mt-8 text-center relative z-10">
          <CtaButton product={product} landingPage={landingPage} text={data.cta_text} variant="urgency" size="xl" />
        </div>
      </div>
    </div>
  );
}

function LpGuarantee({ data }: any) {
  return (
    <div className="py-16 bg-surface-900 text-white">
      <div className="container-narrow mx-auto">
        <div className="border-2 border-success-500 bg-success-500/10 rounded-card p-8 text-center">
          <div className="text-success-500 text-6xl mb-4">🛡️</div>
          <h2 className="text-h2 font-heading mb-4 text-white">{data.headline}</h2>
          <p className="text-body-lg text-surface-200">{data.body}</p>
          <p className="text-h3 text-success-500 font-bold mt-4">{data.days} Dias de Garantia</p>
        </div>
      </div>
    </div>
  );
}

function LpFaq({ data }: any) {
  return (
    <div className="py-16 bg-surface-800 text-white">
      <div className="container-narrow mx-auto">
        <h2 className="text-h2 font-heading text-center mb-12">{data.headline}</h2>
        <div className="space-y-4">
          {data.items?.map((item: any, i: number) => (
            <details key={i} className="bg-surface-900 p-6 rounded-card shadow-card border border-surface-200/10 group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                {item.question}
                <span className="text-brand-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-surface-200 leading-relaxed border-t border-surface-800 pt-4">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

function LpUrgencyCta({ data, product, landingPage }: any) {
  return (
    <div className="py-16 bg-brand-950 text-white">
      <div className="container-narrow mx-auto text-center">
        <h2 className="text-display font-heading mb-8">{data.headline}</h2>
        {data.scarcity_text && (
          <div className="mb-8">
            <p className="text-body-lg mb-4">{data.scarcity_text}</p>
            <div className="bg-white/20 rounded-full h-4 overflow-hidden">
              <div className="bg-accent-500 h-full" style={{ width: `${data.scarcity_pct || 87}%` }} />
            </div>
          </div>
        )}
        <CtaButton product={product} landingPage={landingPage} text={data.cta_text} variant={data.cta_variant === 'urgency' ? 'urgency' : 'primary'} size="xl" fullWidth />
      </div>
    </div>
  );
}

function LpCustomHtml({ data }: any) {
  return <div dangerouslySetInnerHTML={{ __html: data.html_content }} />;
}

// ── MAPEAMENTO ──
const componentMap: Record<string, any> = {
  'lp.hero-section': LpHero,
  'lp.problem-agitation': LpProblem,
  'lp.benefits-grid': LpBenefits,
  'lp.video-section': LpVideo,
  'lp.vturb-section': LpVturb,
  'lp.testimonials': LpTestimonials,
  'lp.social-proof-numbers': LpSocialProof,
  'lp.offer-stack': LpOfferStack,
  'lp.guarantee': LpGuarantee,
  'lp.urgency-cta': LpUrgencyCta,
  'lp.faq-accordion': LpFaq,
  'lp.media-logos': LpMediaLogos,
  'lp.content-block': LpContent,
  'lp.comparison-table': LpComparison,
  'lp.custom-html': LpCustomHtml,
};

// ── RENDERER ──
interface DynamicZoneRendererProps {
  sections: LpDynamicZone[];
  product: Product;
  landingPage: LandingPage;
}

export function DynamicZoneRenderer({ sections, product, landingPage }: DynamicZoneRendererProps) {
  if (!sections || sections.length === 0) {
    return <div className="py-20 text-center text-surface-600">Nenhum conteúdo disponível</div>;
  }

  return (
    <>
      {sections.map((section, index) => {
        const Component = componentMap[section.__component];

        if (!Component) {
          console.warn(`Component not found: ${section.__component}`);
          return null;
        }

        return (
          <section key={section.id || index}>
            <Component data={section} product={product} landingPage={landingPage} />
          </section>
        );
      })}
    </>
  );
}
