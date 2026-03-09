import { FaqItem } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { Accordion } from '@/components/ui/Accordion';

interface FaqSectionProps {
  headline?: string;
  items: FaqItem[];
  showSchema?: boolean;
}

export function FaqSection({ headline = 'Perguntas Frequentes', items, showSchema = true }: FaqSectionProps) {
  return (
    <section className="py-16 bg-surface-50">
      <Container size="narrow">
        <h2 className="text-h2 font-heading text-center mb-12">{headline}</h2>
        <Accordion items={items} />

        {/* JSON-LD Schema */}
        {showSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: items.map((item) => ({
                  '@type': 'Question',
                  name: item.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer,
                  },
                })),
              }),
            }}
          />
        )}
      </Container>
    </section>
  );
}
