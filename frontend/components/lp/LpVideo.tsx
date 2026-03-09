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
        <section className="py-16 bg-surface-50">
            <div className="container-custom">
                {data.headline && (
                    <h2 className="text-h2 font-heading text-center mb-8">{data.headline}</h2>
                )}
                <div className="max-w-content mx-auto">
                    <div className="relative aspect-video rounded-card overflow-hidden shadow-floating bg-surface-900">
                        {!isPlaying ? (
                            <>
                                {thumbnailUrl ? (
                                    <Image src={thumbnailUrl} alt={data.headline || 'Vídeo'} fill className="object-cover" sizes="(max-width: 768px) 100vw, 1152px" />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-900 to-brand-950" />
                                )}
                                <div className="absolute inset-0 bg-black/30" />
                                <button onClick={() => setIsPlaying(true)} className="absolute inset-0 flex items-center justify-center group" aria-label="Reproduzir vídeo">
                                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-floating transition-transform group-hover:scale-110 group-hover:bg-white">
                                        <Play className="w-8 h-8 text-brand-600 ml-1" fill="currentColor" />
                                    </div>
                                </button>
                            </>
                        ) : (
                            <iframe src={buildEmbedUrl(data.video_url)} title={data.headline || 'Vídeo'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full border-0" />
                        )}
                    </div>
                </div>
                {data.description && <p className="text-body-lg text-center mt-6 max-w-narrow mx-auto text-surface-600">{data.description}</p>}
            </div>
        </section>
    );
}
