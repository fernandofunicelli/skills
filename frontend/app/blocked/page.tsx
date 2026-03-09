// ============================================
// BLOCKED PAGE - Página de bloqueio genérica
// ============================================

import { Container } from '@/components/ui/Container';

export const metadata = {
  title: 'Conteúdo não disponível',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BlockedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-surface-50">
      <Container size="narrow">
        <div className="text-center">
          <div className="text-6xl mb-6">🚫</div>
          <h1 className="text-h1 font-heading mb-4">
            Conteúdo não disponível
          </h1>
          <p className="text-body-lg text-surface-600 mb-8">
            Este conteúdo não está acessível no momento.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 text-white font-semibold rounded-button hover:bg-brand-700 transition-colors"
          >
            Voltar para Home
          </a>
        </div>
      </Container>
    </main>
  );
}
