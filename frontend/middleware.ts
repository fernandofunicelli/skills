import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    if (!request.nextUrl.pathname.startsWith('/lp/')) {
        return NextResponse.next();
    }

    const slug = request.nextUrl.pathname.replace('/lp/', '').replace(/\/$/, '');
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://127.0.0.1:3000';

    try {
        // Busca a config do Payload localmente via REST API
        const res = await fetch(`${apiUrl}/api/landing-pages?where[slug][equals]=${slug}&depth=0`, {
            next: { revalidate: 60 } // Cache por 60 segundos na Edge
        });

        const data = await res.json();
        const lp = data.docs?.[0];

        if (!lp || !lp.filter_enabled) {
            return addSecurityHeaders(NextResponse.next());
        }

        const ua = request.headers.get('user-agent') || '';
        const params = request.nextUrl.searchParams;
        const country = request.headers.get('cf-ipcountry') || request.headers.get('x-vercel-ip-country') || (request as any).geo?.country || '';

        // ── CHECK 1: BOTS ──
        if (lp.filter_block_bots) {
            const botPatterns = [
                /bot/i, /crawler/i, /spider/i, /scraper/i, /semrush/i,
                /ahrefs/i, /moz\.com/i, /headless/i, /phantom/i,
                /selenium/i, /puppeteer/i, /playwright/i, /wget/i, /curl/i,
                /python-requests/i, /axios/i, /node-fetch/i, /go-http/i,
            ];
            if (botPatterns.some(p => p.test(ua))) {
                return redirect(lp, request);
            }
        }

        // ── CHECK 2: USER-AGENT VAZIO ──
        if (lp.filter_block_empty_ua && (!ua || ua.length < 20)) {
            return redirect(lp, request);
        }

        // ── CHECK 3: CÓDIGO DE ACESSO ──
        if (lp.filter_access_code) {
            const paramName = lp.filter_access_param || 'xyz';
            const code = params.get(paramName);
            if (code !== lp.filter_access_code) {
                return redirect(lp, request);
            }
        }

        // ── CHECK 4: ORIGEM OBRIGATÓRIA (utm_source) ──
        if (lp.filter_required_sources && lp.filter_required_sources.length > 0) {
            const utmSource = params.get('utm_source') || '';
            if (!lp.filter_required_sources.includes(utmSource.toLowerCase())) {
                return redirect(lp, request);
            }
        }

        // ── CHECK 5: PARÂMETROS OBRIGATÓRIOS ──
        if (lp.filter_required_params && lp.filter_required_params.length > 0) {
            const missing = lp.filter_required_params.some(
                (p: string) => !params.has(p)
            );
            if (missing) return redirect(lp, request);
        }

        // ── CHECK 6: PAÍS ──
        if (country) {
            const upper = country.toUpperCase();
            if (lp.filter_allowed_countries && lp.filter_allowed_countries.length > 0
                && !lp.filter_allowed_countries.includes(upper)) {
                return redirect(lp, request);
            }
            if (lp.filter_blocked_countries?.includes(upper)) {
                return redirect(lp, request);
            }
        }

        // ── CHECK 7: ACESSO DIRETO ──
        if (lp.filter_block_direct) {
            const ref = request.headers.get('referer') || '';
            const hasParams = params.toString().length > 0;
            if (!ref && !hasParams) {
                return redirect(lp, request);
            }
        }

        return addSecurityHeaders(NextResponse.next());
    } catch (error) {
        // Se o Payload falhar ou a API estiver offline, passa direto ou bloqueia
        // O ideal é passar direto para não derrubar a LP de bobeira.
        console.warn("Filtro Edge via API não pôde ser instanciado", error);
        return addSecurityHeaders(NextResponse.next());
    }
}

function redirect(config: any, request: NextRequest) {
    const url = config.filter_redirect_url
        || (config.filter_safe_page_slug
            ? `/${config.filter_safe_page_slug}`
            : '/blocked');

    // Evitar infinite loop se safe page for a própria LP
    if (url === request.nextUrl.pathname) {
        return NextResponse.redirect(new URL('/blocked', request.url));
    }
    return NextResponse.redirect(new URL(url, request.url));
}

function addSecurityHeaders(res: NextResponse) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    res.headers.set('X-Frame-Options', 'DENY');
    res.headers.set('Cache-Control', 'no-store');
    return res;
}

export const config = { matcher: '/lp/:path*' };
