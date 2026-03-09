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
    <div className="py-16">
      <div className="container-custom">
        <h2 className="text-h2 font-heading text-center mb-8">{data.headline}</h2>
        <div className="max-w-narrow mx-auto space-y-4">
          {data.pain_points?.map((point: any, i: number) => (
            <div key={i} className="flex gap-3 p-4 bg-danger-500/5 border-l-4 border-danger-500 rounded">
              <span className="text-danger-500">❌</span>
              <p>{point.label}</p>
            </div>
          ))}
        </div>
        {data.transition_text && <p className="text-center mt-8 text-body-lg">{data.transition_text}</p>}
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
    <div className="py-16 bg-surface-50">
      <div className="container-custom">
        <h2 className="text-h2 font-heading text-center mb-12">{data.headline}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items?.map((item: any, i: number) => (
            <div key={i} className="bg-white p-6 rounded-card shadow-card">
              <div className="text-brand-500 text-2xl mb-3">✓</div>
              <h3 className="text-h3 font-heading mb-2">{item.label}</h3>
              <p className="text-body text-surface-600">{item.description}</p>
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
    <div className="py-16">
      <div className="container-custom">
        <h2 className="text-h2 font-heading text-center mb-12">{data.headline}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items?.map((item: any, i: number) => (
            <div key={i} className="bg-white p-6 rounded-card shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-brand-100 rounded-full" />
                <div>
                  <p className="font-semibold">{item.author_name}</p>
                  <div className="text-accent-500">{'⭐'.repeat(item.rating || 5)}</div>
                </div>
              </div>
              <p className="text-body italic">"{item.content}"</p>
              {item.badge_text && <span className="text-body-sm text-success-600 mt-2 block">✅ {item.badge_text}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LpOfferStack({ data, product, landingPage }: any) {
  return (
    <div className="py-16 bg-brand-950 text-white">
      <div className="container-narrow mx-auto">
        <h2 className="text-h2 font-heading text-center mb-12">{data.headline}</h2>
        <div className="space-y-3 mb-8">
          {data.items?.map((item: any, i: number) => (
            <div key={i} className="flex justify-between items-center p-4 bg-white/10 rounded">
              <span>✓ {item.label}</span>
              {item.description && <span className="text-accent-400">{item.description}</span>}
            </div>
          ))}
        </div>
        {data.total_value && <p className="text-center text-surface-400 line-through text-h3">Valor total: {data.total_value}</p>}
        <p className="text-center text-display text-brand-400 font-bold mt-2">{data.actual_price}</p>
        {data.installment_text && <p className="text-center text-body-lg mt-2">{data.installment_text}</p>}
        <div className="mt-8 text-center">
          <CtaButton product={product} landingPage={landingPage} text={data.cta_text} variant="urgency" size="xl" />
        </div>
      </div>
    </div>
  );
}

function LpGuarantee({ data }: any) {
  return (
    <div className="py-16">
      <div className="container-narrow mx-auto">
        <div className="border-2 border-success-500 bg-success-500/5 rounded-card p-8 text-center">
          <div className="text-success-500 text-6xl mb-4">🛡️</div>
          <h2 className="text-h2 font-heading mb-4">{data.headline}</h2>
          <p className="text-body-lg">{data.body}</p>
          <p className="text-h3 text-success-600 font-bold mt-4">{data.days} Dias de Garantia</p>
        </div>
      </div>
    </div>
  );
}

function LpFaq({ data }: any) {
  return (
    <div className="py-16 bg-surface-50">
      <div className="container-narrow mx-auto">
        <h2 className="text-h2 font-heading text-center mb-12">{data.headline}</h2>
        <div className="space-y-4">
          {data.items?.map((item: any, i: number) => (
            <details key={i} className="bg-white p-6 rounded-card shadow-card">
              <summary className="font-semibold cursor-pointer">{item.question}</summary>
              <p className="mt-4 text-surface-600">{item.answer}</p>
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
