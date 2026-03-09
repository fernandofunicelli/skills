import { LpContentBlock } from '@/lib/types';
import { cn } from '@/lib/utils';

interface LpContentProps { data: LpContentBlock; }

export function LpContent({ data }: LpContentProps) {
    return (
        <section className="py-16">
            <div className={cn('container-custom max-w-narrow mx-auto prose prose-lg', data.alignment === 'center' && 'text-center')}>
                {data.headline && <h2 className="text-h2 font-heading not-prose mb-6">{data.headline}</h2>}
                {data.body && <div className="prose-strapi" dangerouslySetInnerHTML={{ __html: data.body }} />}
            </div>
        </section>
    );
}
