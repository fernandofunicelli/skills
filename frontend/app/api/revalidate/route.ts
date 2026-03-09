// ============================================
// REVALIDATE API - Webhook do Strapi para ISR
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json() as { model?: string; entry?: Record<string, unknown> };
    const { model, entry } = body;

    if (model === 'product') {
      // @ts-expect-error - Next.js 16.1 strict types expects profile argument
      revalidateTag('products');
      if (entry?.slug) revalidatePath(`/${entry.slug as string}`);
    } else if (model === 'seo-page') {
      // @ts-expect-error
      revalidateTag('seo-pages');
      if (entry?.slug && entry?.product && typeof entry.product === 'object' && 'slug' in entry.product) {
        revalidatePath(`/${(entry.product as Record<string, unknown>).slug as string}/${entry.slug as string}`);
      }
    } else if (model === 'landing-page') {
      // @ts-expect-error
      revalidateTag('landing-pages');
      if (entry?.slug) revalidatePath(`/lp/${entry.slug as string}`);
    } else if (model === 'global-seo') {
      // @ts-expect-error
      revalidateTag('global-seo');
      revalidatePath('/');
    }

    return NextResponse.json({ revalidated: true, now: Date.now(), model });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}
