import Image from 'next/image';
import { LpMediaLogos as LpMediaLogosType } from '@/lib/types';
import { getStrapiImageUrl } from '@/lib/utils';

interface LpMediaLogosProps { data: LpMediaLogosType; }

export function LpMediaLogos({ data }: LpMediaLogosProps) {
    return (
        <section className="py-12 bg-surface-50">
            <div className="container-custom">
                {data.headline && <p className="text-body-sm text-surface-400 text-center uppercase tracking-widest mb-8">{data.headline}</p>}
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                    {data.logos?.map((logo, i) => (
                        <div key={i} className="relative h-8 w-24 md:h-10 md:w-32 opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300">
                            <Image src={getStrapiImageUrl(logo.url)} alt={logo.alternativeText || `Logo ${i + 1}`} fill className="object-contain" sizes="128px" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
