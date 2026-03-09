'use client';

import { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { LpVideoSection, Product, LandingPage } from '@/lib/types';
import { getStrapiImageUrl } from '@/lib/strapi';

interface LpVideoProps {
    data: LpVideoSection;
    product: Product;
    landingPage: LandingPage;
}

function buildEmbedUrl(url: string): string {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const id = url.match(/(?:v=|youtu\.be\/)([\w-]+)/)?.[1] ?? '';
        return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    if (url.includes('vimeo.com')) {
        const id = url.match(/vimeo\.com\/(\d+)/)?.[1] ?? '';
        return `https://player.vimeo.com/video/${id}?autoplay=1`;
    }
    return url;
}

export function LpVideo({ data, product, landingPage }: LpVideoProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const thumbnailUrl = data.thumbnail ? getStrapiImageUrl(data.thumbnail.url) : null;

    return (
        <section className="py-20 bg-background-dark text-white">
            <div className="max-w-7xl mx-auto px-4">
                {data.headline && (
                    <h2 className="text-4xl font-black text-center mb-16">{data.headline}</h2>
                )}
                <div className="max-w-4xl mx-auto">
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(232,25,44,0.15)] bg-white/5 p-1 border border-white/10">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                            {!isPlaying ? (
                                <>
                                    {thumbnailUrl ? (
                                        <Image src={thumbnailUrl} alt={data.headline || 'Vídeo'} fill className="object-cover" sizes="(max-width: 768px) 100vw, 1152px" />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-background-dark to-primary/20" />
                                    )}
                                    <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                                    <button onClick={() => setIsPlaying(true)} className="absolute inset-0 flex flex-col items-center justify-center group" aria-label="Reproduzir vídeo">
                                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(232,25,44,0.5)] transition-transform group-hover:scale-110 mb-4 items-center pl-2">
                                            <Play className="w-8 h-8 text-white" fill="currentColor" />
                                        </div>
                                        <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">Assistir agora</span>
                                    </button>
                                </>
                            ) : (
                                <iframe src={buildEmbedUrl(data.video_url)} title={data.headline || 'Vídeo'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full border-0" />
                            )}
                        </div>
                    </div>
                </div>
                {data.description && <p className="text-lg text-slate-300 text-center mt-8 max-w-3xl mx-auto">{data.description}</p>}
            </div>
        </section>
    );
}
