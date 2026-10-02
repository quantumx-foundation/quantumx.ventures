import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { InsightsBrowser } from '@/components/insights-browser';
import { ClosingCta } from '@/components/sections/closing-cta';
import { insightKinds, sortedInsights } from '@/content/insights';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Insights',
  description:
    'Analysis, security perspectives and explainers on quantum technology and the quantum economy, published by QuantumX.',
  path: '/insights/',
});

export default function InsightsPage() {
  return (
    <>
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
