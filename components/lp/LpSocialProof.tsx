'use client';

import { motion } from 'framer-motion';
import { LpSocialProofNumbers } from '@/lib/types';

interface LpSocialProofProps { data: LpSocialProofNumbers; }

export function LpSocialProof({ data }: LpSocialProofProps) {
    const isDark = data.bg_style === 'dark' || data.bg_style === 'brand';
    const bgClass = data.bg_style === 'brand' ? 'bg-brand-950 text-white' : data.bg_style === 'dark' ? 'bg-surface-900 text-white' : 'bg-surface-50 text-surface-900';
    return (
        <section className={`py-16 ${bgClass}`}>
            <div className="container-custom">
                {data.headline && <h2 className="text-h2 font-heading text-center mb-12">{data.headline}</h2>}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {data.metrics?.map((metric, i) => (
                        <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                            {metric.icon && <div className={`text-4xl mb-3 ${isDark ? 'text-brand-300' : 'text-brand-500'}`}>{metric.icon}</div>}
                            <p className={`text-display font-bold font-heading ${isDark ? 'text-brand-400' : 'text-brand-500'}`}>{metric.value}</p>
                            <p className={`text-body-sm mt-1 ${isDark ? 'text-surface-300' : 'text-surface-600'}`}>{metric.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
