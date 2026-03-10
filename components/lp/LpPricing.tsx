import React from 'react';
import { Container } from '@/components/ui/Container';

export interface PricingPlan {
    name: string;
    price: number;
    currency?: string;
    period: string;
    highlight?: string;
    savings?: string;
    features: string[];
    buttonText: string;
    buttonLink: string;
    isPopular?: boolean;
}

export interface LpPricingSection {
    id?: string;
    blockType?: 'pricing_section';
    title?: string;
    subtitle?: string;
    plans: PricingPlan[];
    trial_title?: string;
    trial_subtitle?: string;
    trial_button_text?: string;
    trial_button_link?: string;
}

interface LpPricingProps {
    data: LpPricingSection;
}

export function LpPricing({ data }: LpPricingProps) {
    const {
        title = 'Pré-pago. Como deveria ser.',
        subtitle = 'Assine, use e renove se quiser. Simples assim.',
        plans = [],
        trial_title = 'Ainda em dúvida? Faça um teste real.',
        trial_subtitle = 'Liberação completa por 3 horas por apenas R$ 4,90.',
        trial_button_text = 'Liberar Teste Agora',
        trial_button_link = '#',
    } = data;

    return (
        <section className="py-20 bg-background-dark" id="planos">
            <Container size="wide">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-4 italic text-white">{title}</h2>
                    <p className="text-slate-400">{subtitle}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-3xl bg-white/5 relative transition-all ${plan.isPopular
                                ? 'border-2 border-primary transform md:scale-105 shadow-2xl shadow-primary/10'
                                : 'border border-white/10 hover:border-white/20'
                                }`}
                        >
                            {plan.isPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-black uppercase">
                                    Mais Popular
                                </div>
                            )}

                            <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>

                            <div className="flex items-baseline gap-1 mb-6 text-white">
                                <span className="text-2xl font-bold">{plan.currency || 'R$'}</span>
                                <span className="text-5xl font-black">{plan.price.toFixed(2).replace('.', ',')}</span>
                                <span className="text-slate-400">/{plan.period}</span>
                            </div>

                            {plan.savings && (
                                <p className={`${plan.isPopular ? 'text-primary' : 'text-green-500'} text-sm font-bold mb-6`}>
                                    {plan.savings}
                                </p>
                            )}

                            <ul className="space-y-4 mb-8 text-sm text-slate-300">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm">check</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={plan.buttonLink}
                                className={`block text-center w-full py-4 rounded-xl font-bold transition-all ${plan.isPopular
                                    ? 'bg-primary text-white shadow-xl shadow-primary/20 hover:bg-primary/90 text-lg font-black'
                                    : 'border border-white/20 text-white hover:bg-white/5'
                                    }`}
                            >
                                {plan.buttonText}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Trial Section */}
                {(trial_title || trial_subtitle) && (
                    <div className="mt-16 bg-white/5 border border-dashed border-white/20 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="text-2xl font-black italic text-white">{trial_title}</h4>
                            <p className="text-slate-400">{trial_subtitle}</p>
                        </div>
                        {trial_button_link && (
                            <a
                                href={trial_button_link}
                                className="bg-white text-black px-10 py-4 rounded-xl font-black hover:bg-slate-200 transition-all text-center"
                            >
                                {trial_button_text}
                            </a>
                        )}
                    </div>
                )}
            </Container>
        </section>
    );
}
