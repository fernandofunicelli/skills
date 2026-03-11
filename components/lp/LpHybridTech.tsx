import React from 'react';
import { Container } from '@/components/ui/Container';

export interface LpHybridTechSection {
    id?: string;
    blockType?: 'hybrid_tech';
    headline?: string;
    sub_headline?: string;
}

interface LpHybridTechProps {
    data: LpHybridTechSection;
}

export function LpHybridTech({ data }: LpHybridTechProps) {
    return (
        <section className="py-20 bg-background-dark">
            <Container size="wide">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="inline-block px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                            POR QUE O BRAZ NÃO TRAVA
                        </span>
                        <h2 className="text-4xl font-black mb-6 text-white" dangerouslySetInnerHTML={{ __html: data.headline || 'Enquanto outros dependem de um servidor, o <span class="text-primary italic">Braz usa dez.</span>' }} />
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            {data.sub_headline || 'O Braz App opera com Hybrid Stream 3.0 — tecnologia desenvolvida originalmente para comunicações militares em Israel e adaptada para streaming civil. O sinal é distribuído entre múltiplas rotas simultâneas. Se uma cai, as outras assumem em milissegundos. Você não percebe nada — porque não acontece nada.'}
                        </p>

                        <div className="flex gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-lg shadow-primary/5">
                                    <span className="text-2xl">🛡️</span>
                                </div>
                                <span className="text-[10px] font-bold text-center uppercase tracking-wider text-slate-300">Uptime<br />99.97%</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-lg shadow-primary/5">
                                    <span className="text-2xl">🇮🇱</span>
                                </div>
                                <span className="text-[10px] font-bold text-center uppercase tracking-wider text-slate-300">Hybrid<br />Stream 3.0</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-lg shadow-primary/5">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <span className="text-[10px] font-bold text-center uppercase tracking-wider text-slate-300">Failover em<br />menos de 200ms</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative bg-white/5 p-8 rounded-3xl border border-white/10">
                        <div className="space-y-12">
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-slate-500"></span> Concorrente (IPTV Comum)
                                </p>
                                <div className="relative h-12 flex items-center">
                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="w-1/2 h-full bg-primary"></div>
                                    </div>
                                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                                        <span className="material-symbols-outlined text-primary bg-black rounded-full text-3xl">cancel</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-primary font-bold mt-2 uppercase">Única rota: Caiu, parou.</p>
                            </div>

                            <div>
                                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span> Braz App (Hybrid Stream)
                                </p>
                                <div className="space-y-3">
                                    <div className="h-1 bg-primary/20 rounded-full relative">
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2"><span className="material-symbols-outlined text-green-500 text-sm">check_circle</span></div>
                                    </div>
                                    <div className="h-1 bg-primary/40 rounded-full relative">
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2"><span className="material-symbols-outlined text-green-500 text-sm">check_circle</span></div>
                                    </div>
                                    <div className="h-1 bg-primary rounded-full relative overflow-hidden">
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2"><span className="material-symbols-outlined text-green-500 text-sm">check_circle</span></div>
                                    </div>
                                    <div className="h-1 bg-primary/40 rounded-full relative">
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2"><span className="material-symbols-outlined text-green-500 text-sm">check_circle</span></div>
                                    </div>
                                </div>
                                <p className="text-[10px] text-primary font-bold mt-4 uppercase">10 Rotas simultâneas: Caiu uma? Segue o jogo.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
