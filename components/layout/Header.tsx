import Link from 'next/link';
import Image from 'next/image';
import { GlobalSeo } from '@/lib/types';
import { getStrapiImageUrl } from '@/lib/utils';

interface HeaderProps { globalSeo?: GlobalSeo; variant?: 'full' | 'minimal'; }

export function Header({ globalSeo, variant = 'full' }: HeaderProps) {
    if (variant === 'minimal') {
        return (
            <header className="bg-surface-0 border-b border-surface-200 py-3">
                <div className="container-custom flex justify-center">
                    <span className="font-heading font-bold text-brand-600 text-lg">{globalSeo?.site_name ?? 'Ecossistema V3'}</span>
                </div>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-50 bg-surface-0/95 backdrop-blur border-b border-surface-200">
            <div className="container-custom">
                <nav className="flex items-center justify-between h-16" aria-label="Navegação principal">
                    <Link href="/" className="flex items-center gap-2 font-heading font-bold text-brand-600 text-xl">
                        {globalSeo?.favicon && (
                            <Image src={getStrapiImageUrl(globalSeo.favicon.url)} alt={globalSeo.site_name} width={32} height={32} className="rounded" />
                        )}
                        <span>{globalSeo?.site_name ?? 'Ecossistema V3'}</span>
                    </Link>
                    <Link href="#cta" className="hidden md:inline-flex items-center px-5 py-2 bg-brand-500 text-white text-body-sm font-semibold rounded-button hover:bg-brand-600 transition-colors">
                        Começar agora
                    </Link>
                </nav>
            </div>
        </header>
    );
}
