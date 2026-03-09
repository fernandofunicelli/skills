// ============================================
// MAIN LAYOUT - Layout para páginas SEO
// Header completo + Footer completo
// ============================================

import { ReactNode } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      {/* Header completo */}
      <header className="border-b border-surface-200 py-4">
        <Container>
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-h3 font-heading text-brand-600">
              Logo
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="text-body hover:text-brand-600">
                Home
              </Link>
              <Link href="/produtos" className="text-body hover:text-brand-600">
                Produtos
              </Link>
              <Link href="/blog" className="text-body hover:text-brand-600">
                Blog
              </Link>
            </div>
          </nav>
        </Container>
      </header>

      {/* Conteúdo */}
      {children}

      {/* Footer completo */}
      <footer className="bg-surface-900 text-surface-400 py-12">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Sobre</h3>
              <p className="text-body-sm">
                Sistema de vendas de alta conversão
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Links</h3>
              <ul className="space-y-2 text-body-sm">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/produtos" className="hover:text-white">
                    Produtos
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-body-sm">
                <li>
                  <Link href="/termos" className="hover:text-white">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="/privacidade" className="hover:text-white">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-surface-800 mt-8 pt-8 text-center text-body-sm">
            © 2026 Ecossistema de Vendas. Todos os direitos reservados.
          </div>
        </Container>
      </footer>
    </>
  );
}
