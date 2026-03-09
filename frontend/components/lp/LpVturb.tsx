'use client';

import { useEffect, useRef } from 'react';
import { LpVturbSection, Product, LandingPage } from '@/lib/types';
import { buildCheckoutUrl } from '@/lib/checkout';

interface LpVturbProps {
    data: LpVturbSection;
    product: Product;
    landingPage: LandingPage;
}

export function LpVturb({ data, product, landingPage }: LpVturbProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);
    const checkoutUrl = buildCheckoutUrl({
        checkoutBaseUrl: product.checkout_base_url || '',
        lpSlug: landingPage.slug,
        productSlug: product.slug,
    });

    useEffect(() => {
        if (!data.video_id || !data.publisher_id || initialized.current) return;
        initialized.current = true;

        // ── 1. Inserir placeholder do player (padrão Vturb/React) ──
        if (containerRef.current) {
            containerRef.current.innerHTML = `<div id="vid_${data.video_id}" style="position:relative;width:100%;padding:56.25% 0 0"><img id="thumb_${data.video_id}" src="https://images.converteai.net/${data.publisher_id}/players/${data.video_id}/thumbnail.jpg" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block"></img><div id="backdrop_${data.video_id}" style="position:absolute;top:0;width:100%;height:100%;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)"></div></div>`;
        }

        // ── 2. Carregar script do player ──
        const scriptId = `vturb-script-${data.video_id}`;
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = `https://scripts.converteai.net/${data.publisher_id}/players/${data.video_id}/player.js`;
            script.async = true;
            document.head.appendChild(script);
        }

        // ── 3. Aguardar player:ready e aplicar configurações ──
        function setupPlayer() {
            const player = document.querySelector(`#vid_${data.video_id}`)?.closest('vturb-smartplayer')
                ?? document.querySelector('vturb-smartplayer');

            if (!player) {
                // Tenta novamente após 500ms enquanto o script carrega
                setTimeout(setupPlayer, 500);
                return;
            }

            player.addEventListener('player:ready', () => {
                // ── Delay Code: exibir elementos .vturb-delayed após N segundos ──
                if (data.delay_seconds && data.delay_seconds > 0) {
                    (player as any).displayHiddenElements(
                        data.delay_seconds,
                        ['.vturb-delayed'],
                        { persist: true }  // Caching: se já assistiu, exibe imediatamente
                    );
                }

                // ── Injetar UTMs nos CTAs internos do player ──
                if (checkoutUrl && typeof (player as any).injectUrlUpdater === 'function') {
                    (player as any).injectUrlUpdater((url: string) => {
                        try {
                            const target = new URL(url);
                            const checkoutDomains = ['hotmart', 'kiwify', 'monetizze', 'checkout', 'stripe', 'payt', 'app.ticto'];
                            if (checkoutDomains.some(d => url.includes(d))) {
                                new URL(checkoutUrl).searchParams.forEach((val, key) => {
                                    target.searchParams.set(key, val);
                                });
                            }
                            return target.toString();
                        } catch {
                            return url;
                        }
                    });
                }

                // ── DataLayer: eventos de tracking ──
                player.addEventListener('video:play', () => {
                    window.dataLayer?.push({ event: 'vturb_play', video_id: data.video_id, lp_slug: landingPage.slug });
                }, { once: true });

                player.addEventListener('video:ended', () => {
                    window.dataLayer?.push({ event: 'vturb_ended', video_id: data.video_id, lp_slug: landingPage.slug });
                }, { once: true });

                // ── Milestone: DataLayer quando atinge % configurada ──
                if (data.tracking_milestone_pct && typeof (player as any).onTime === 'function') {
                    (player as any).onTime(data.tracking_milestone_pct / 100, () => {
                        window.dataLayer?.push({
                            event: 'vturb_milestone',
                            video_id: data.video_id,
                            milestone_pct: data.tracking_milestone_pct,
                            lp_slug: landingPage.slug,
                        });
                    });
                }
            }, { once: true });
        }

        // Aguarda o DOM estar pronto antes de tentar selecionar o player
        const timeout = setTimeout(setupPlayer, 100);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.video_id, data.publisher_id]);

    if (!data.video_id || !data.publisher_id) return null;

    return (
        <section className={`py-16 ${data.bg_dark ? 'bg-surface-900' : 'bg-surface-50'}`}>
            <div className="container-custom">
                {data.headline && (
                    <h2 className={`text-h2 font-heading text-center mb-8 ${data.bg_dark ? 'text-white' : ''}`}>
                        {data.headline}
                    </h2>
                )}

                {/* Container do player — o innerHTML é populado via useEffect */}
                <div
                    ref={containerRef}
                    className="mx-auto"
                    style={{ maxWidth: data.max_width ?? 800 }}
                />

                {data.sub_headline && (
                    <p className={`text-body-lg text-center mt-6 max-w-narrow mx-auto ${data.bg_dark ? 'text-surface-300' : 'text-surface-600'}`}>
                        {data.sub_headline}
                    </p>
                )}
            </div>
        </section>
    );
}
