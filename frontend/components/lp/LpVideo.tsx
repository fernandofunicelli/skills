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
        <section className="py-16 bg-surface-900 text-white">
            <div className="container-custom">
                {data.headline && (
                    <h2 className="text-h2 font-heading text-center mb-8">{data.headline}</h2>
                )}
                <div className="max-w-content mx-auto">
                    <div className="relative aspect-video rounded-card overflow-hidden shadow-floating bg-surface-800 p-1 border border-surface-200/10">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                            {!isPlaying ? (
                                <>
                                    {thumbnailUrl ? (
                                        <Image src={thumbnailUrl} alt={data.headline || 'Vídeo'} fill className="object-cover" sizes="(max-width: 768px) 100vw, 1152px" />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 to-brand-950" />
                                    )}
                                    <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                                    <button onClick={() => setIsPlaying(true)} className="absolute inset-0 flex flex-col items-center justify-center group" aria-label="Reproduzir vídeo">
                                        <div className="w-20 h-20 bg-brand-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(230,10,21,0.5)] transition-transform group-hover:scale-110 mb-4 items-center pl-2">
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
                {data.description && <p className="text-body-lg text-center mt-6 max-w-narrow mx-auto text-surface-200">{data.description}</p>}
            </div>
        </section>
    );
}
