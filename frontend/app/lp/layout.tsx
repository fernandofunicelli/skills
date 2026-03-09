// ============================================
// LP LAYOUT - Layout para Landing Pages
// Header minimal + Footer minimal
// ============================================

import { ReactNode } from 'react';

interface LpLayoutProps {
  children: ReactNode;
}

export default function LpLayout({ children }: LpLayoutProps) {
  return (
    <>
      {/* Header minimal (sem navegação) */}
      <header className="py-4 border-b border-surface-200">
        <div className="container-custom">
          {/* Logo sem link */}
          <div className="text-h3 font-heading text-brand-600">Logo</div>
        </div>
      </header>

      {/* Conteúdo da LP */}
      {children}

      {/* Footer minimal */}
      <footer className="bg-surface-900 text-surface-400 py-8">
        <div className="container-custom text-center text-body-sm">
          <p>© 2026 Ecossistema de Vendas | CNPJ: 00.000.000/0000-00</p>
          <div className="mt-2 space-x-4">
            <a href="/termos" className="hover:text-white">
              Termos de Uso
            </a>
            <a href="/privacidade" className="hover:text-white">
              Política de Privacidade
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
