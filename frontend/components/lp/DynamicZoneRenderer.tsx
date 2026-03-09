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
    <div className="py-20 bg-background-dark text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-black text-center mb-6" dangerouslySetInnerHTML={{ __html: data.headline.replace(/O conteúdo não\./g, '<span class="text-primary">O conteúdo não.</span>') }} />
        {data.transition_text && <p className="text-slate-300 text-center max-w-3xl mx-auto mb-12 text-lg">{data.transition_text}</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.pain_points?.map((point: any, i: number) => (
            <div key={i} className="p-6 bg-white/5 border-l-4 border-primary rounded-r-xl">
              <svg className="w-8 h-8 text-primary mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
              <h3 className="font-bold text-lg mb-2 text-white">{point.label}</h3>
            </div>
          ))}
        </div>

        {data.cta_text && (
          <div className="mt-12 text-center">
            <CtaButton product={product} landingPage={landingPage} text={data.cta_text} className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-black text-lg transition-all" />
          </div>
        )}
      </div>
    </div>
  );
}

function LpBenefits({ data, product, landingPage }: any) {
  return (
    <section className="py-20 bg-background-dark" id="canais">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-black mb-16 text-center text-white">{data.headline}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items?.map((item: any, i: number) => (
            <div key={i} className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all group">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
                  <h3 className="text-2xl font-bold text-white">{item.label}</h3>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {data.cta_text && (
          <div className="mt-16 text-center">
            <CtaButton product={product} landingPage={landingPage} text={data.cta_text} className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-black text-lg transition-all" />
          </div>
        )}
      </div>
    </section>
  );
}

function LpTestimonials({ data }: any) {
  return (
    <section className="py-20 bg-background-dark">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-black text-center mb-16 italic text-white">{data.headline}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {data.items?.map((item: any, i: number) => (
            <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 relative">
              <div className="absolute -top-4 -left-4 text-6xl text-primary opacity-50">"</div>
              <div className="flex text-primary mb-6">
                {'⭐'.repeat(item.rating || 5)}
              </div>
              <p className="text-lg text-slate-300 italic mb-8 relative z-10">"{item.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl uppercase">
                  {item.author_name?.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white">{item.author_name}</h4>
                  {item.badge_text && <p className="text-xs text-primary uppercase tracking-wider">{item.badge_text}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LpOfferStack({ data, product, landingPage }: any) {
  return (
    <section className="py-20 bg-background-dark">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-6 text-white" dangerouslySetInnerHTML={{ __html: data.headline.replace(/Como deveria ser\./g, '<span class="text-primary italic">Como deveria ser.</span>') }}></h2>
        </div>

        <div className="max-w-md mx-auto bg-gradient-to-b from-primary/50 to-primary/10 p-1 rounded-3xl">
          <div className="bg-background-dark rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">
              Recomendado
            </div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">{data.items?.[0]?.label || 'Premium'}</h3>
              <div className="flex justify-center items-end gap-1 mb-2">
                <span className="text-5xl font-black text-white">{data.actual_price}</span>
              </div>
              {data.installment_text && <p className="text-sm text-slate-400">{data.installment_text}</p>}
            </div>

            <div className="space-y-4 mb-8">
              {data.items?.slice(1).map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span className="text-slate-300">{item.label} {item.description && <span className="font-bold text-primary ml-1">{item.description}</span>}</span>
                </div>
              ))}
            </div>

            <CtaButton product={product} landingPage={landingPage} text={data.cta_text || "Assinar Agora"} className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-black text-lg transition-all shadow-lg shadow-primary/30" />
            <p className="text-center text-xs text-slate-500 mt-4">Transação 100% segura e criptografada</p>
          </div>
        </div>
      </div>
    </section>
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
    <section className="py-20 bg-primary/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXFaGMyVfizO3zM5UZcD0QU3zbJjClmExauZamCC_7XTlfavp_YuVMGKAEnUXaCICGXH2UsfHYbMo2Xqop4WhqMHw75DBI3yfPnExTh_yNwMVc9wp9A8XqrwtDXHwvcqsvVIdlihUns4yHNuh2b-aNdi0JwAgPefj8zdn1RjcFRUJr3miYY1OWOmrvfpLPBWXpLsJuZRINPrz6H8sTnbk2Y51VOo_exU1s_1FisZWMZyGnCPruo5Sc1ahvNlKZfot0fEDAg0-nbyY')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-5xl font-black mb-6 text-white">{data.headline}</h2>
        <p className="text-xl text-slate-300 mb-10">
          {data.sub_headline || "Junte-se a milhares de brasileiros que já estão economizando."}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <CtaButton product={product} landingPage={landingPage} text={data.cta_text || "Ativar Acesso Imediato"} className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-xl font-black text-xl transition-all shadow-2xl shadow-primary/40" />
        </div>
        {data.show_guarantee && (
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <svg className="w-6 h-6 text-success-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg>
            <span>{data.guarantee_text || "7 dias de garantia ou seu dinheiro de volta."}</span>
          </div>
        )}
      </div>
    </section>
  );
}

function LpCustomHtml({ data }: any) {
  return <div dangerouslySetInnerHTML={{ __html: data.html_content }} />;
}

// ── MAPEAMENTO PAYLOAD CMS ──
const componentMap: Record<string, any> = {
  'hero': LpHero,
  'problemAgitation': LpProblem,
  'benefitsGrid': LpBenefits,
  'videoSection': LpVideo,
  'vturbSection': LpVturb,
  'testimonials': LpTestimonials,
  'socialProof': LpSocialProof,
  'offerStack': LpOfferStack,
  'guarantee': LpGuarantee,
  'urgencyCta': LpUrgencyCta,
  'faqAccordion': LpFaq,
  'mediaLogos': LpMediaLogos,
  'contentBlock': LpContent,
  'comparisonTable': LpComparison,
  'customHtml': LpCustomHtml,
};

// ── RENDERER ──
interface DynamicZoneRendererProps {
  sections: any[];
  product: any;
  landingPage: any;
}

export function DynamicZoneRenderer({ sections, product, landingPage }: DynamicZoneRendererProps) {
  if (!sections || sections.length === 0) {
    return <div className="py-20 text-center text-surface-600">Nenhum conteúdo disponível</div>;
  }

  return (
    <>
      {sections.map((section, index) => {
        // No Strapi era __component, no Payload CMS é blockType
        const blockName = section.blockType || section.__component;
        const Component = componentMap[blockName];

        if (!Component) {
          console.warn(`Component not found: ${blockName}`);
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
