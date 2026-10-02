import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { InsightsBrowser } from '@/components/insights-browser';
import { ClosingCta } from '@/components/sections/closing-cta';
import { insightKinds, sortedInsights } from '@/content/insights';
import { pageMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/json-ld';
import { breadcrumbSchema, graph, webPageSchema, insightsListSchema } from '@/lib/structured-data';

const seo = {
  title: 'Quantum Technology Insights',
  socialTitle: 'Notes on the quantum economy.',
  description:
    'Analysis, post-quantum security perspectives and plain-language explainers on quantum computing and the quantum economy from the QuantumX team.',
  path: '/insights/',
};

export const metadata: Metadata = pageMetadata({
  ...seo,
  image: { slug: 'insights', alt: 'Notes on the quantum economy. QuantumX Ventures insights.' },
});

const structuredData = graph(
  webPageSchema({ type: 'CollectionPage', path: seo.path, name: seo.title, description: seo.description, image: '/og/insights.jpg' }),
  breadcrumbSchema([{ name: 'Insights', path: seo.path }]),
  insightsListSchema(sortedInsights()),
);

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PageIntro
        label="Insights"
        title="Notes on the quantum economy."
        lead="Analysis, security perspectives and plain-language explainers from the QuantumX team. Articles open on the QuantumX Foundation site, where they are published."
      />
      <section aria-label="Articles" className="pb-[clamp(5rem,11vw,10rem)]">
        <div className="container-site">
          <InsightsBrowser items={sortedInsights()} kinds={insightKinds} />
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
