import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Container size="narrow">
        <div className="text-center">
          <h1 className="text-display font-heading mb-4">404</h1>
          <p className="text-h3 text-surface-600 mb-8">
            Página não encontrada
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 text-white font-semibold rounded-button hover:bg-brand-700"
          >
            Voltar para Home
          </a>
        </div>
      </Container>
    </main>
  );
}
