import Link from 'next/link';
import { GlobalSeo } from '@/lib/types';

interface FooterProps { globalSeo?: GlobalSeo; variant?: 'full' | 'minimal'; }

export function Footer({ globalSeo, variant = 'full' }: FooterProps) {
    if (variant === 'minimal') {
        return (
            <footer className="bg-surface-900 text-surface-400 py-4">
                <div className="container-custom">
                    <p className="text-center text-body-sm">
                        {globalSeo?.site_name ?? 'Empresa'} &middot;{' '}
                        <Link href="/termos-de-uso" className="hover:text-surface-200 transition-colors">Termos de Uso</Link>
                        {' · '}
                        <Link href="/politica-de-privacidade" className="hover:text-surface-200 transition-colors">Política de Privacidade</Link>
                    </p>
                </div>
            </footer>
        );
    }

    return (
        <footer className="bg-surface-900 text-surface-300">
            <div className="container-custom py-12">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <p className="font-heading font-bold text-white text-lg mb-3">{globalSeo?.site_name ?? 'Ecossistema V3'}</p>
                        <p className="text-body-sm text-surface-400">{globalSeo?.site_description ?? 'Plataforma de vendas de alta conversão.'}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-white mb-4">Links</p>
                        <ul className="space-y-2 text-body-sm">
                            <li><Link href="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</Link></li>
                            <li><Link href="/politica-de-privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold text-white mb-4">Suporte</p>
                        <p className="text-body-sm text-surface-400">Dúvidas? Entre em contato pelo formulário de suporte.</p>
                    </div>
                </div>
                <div className="border-t border-surface-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-body-sm text-surface-500">
                    <p>© {new Date().getFullYear()} {globalSeo?.site_name ?? 'Ecossistema V3'}. Todos os direitos reservados.</p>
                    <p>
                        <Link href="/termos-de-uso" className="hover:text-surface-300 transition-colors">Termos</Link>
                        {' · '}
                        <Link href="/politica-de-privacidade" className="hover:text-surface-300 transition-colors">Privacidade</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
