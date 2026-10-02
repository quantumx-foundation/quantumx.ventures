import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { VentureList } from '@/components/sections/ventures';
import { ClosingCta } from '@/components/sections/closing-cta';
import { ArrowLink, Section, SectionHeading } from '@/components/ui';
import { ventureCriteria } from '@/content/thesis';
import { ventures } from '@/content/ventures';
import { pageMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/json-ld';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/structured-data';

const seo = {
  title: 'Quantum Ventures and Portfolio',
  socialTitle: 'Companies built in the studio.',
  description:
    'Quantum technology companies built in the QuantumX Ventures studio. The first ventures are in formation. See what we look for and how to bring us yours.',
  path: '/ventures/',
};

export const metadata: Metadata = pageMetadata({
  ...seo,
  image: { slug: 'ventures', alt: 'Companies built in the studio. QuantumX Ventures.' },
});

const structuredData = graph(
  webPageSchema({ type: 'CollectionPage', path: seo.path, name: seo.title, description: seo.description, image: '/og/ventures.jpg' }),
  breadcrumbSchema([{ name: 'Ventures', path: seo.path }]),
);

export default function VenturesPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PageIntro
        label="Ventures"
        title="Companies built in the studio."
        lead="Every venture starts with a team and a technology, then grows into an independent company. This is where they will be listed."
      />

      <section aria-label={ventures.length ? 'Venture portfolio' : 'Ventures in formation'} className="pb-[clamp(5rem,11vw,10rem)]">
        <div className="container-site">
          <VentureList />
        </div>
      </section>

      <Section labelledBy="criteria-title">
        <SectionHeading index="01" label="What we look for" title="Four things every venture needs." id="criteria-title">
          <p>Whatever the area of the quantum stack, these are the questions we ask before committing studio time.</p>
        </SectionHeading>
        <ol className="mt-16 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {ventureCriteria.map((c, i) => (
            <li
              key={c.title}
              className="bg-paper py-8 sm:px-6 lg:py-10"
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
            >
              <p className="text-sm tabular-nums text-subtle">0{i + 1}</p>
              <h3 className="mt-8 text-title font-normal">{c.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{c.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14" data-reveal>
          <ArrowLink href="/thesis/">Areas of interest</ArrowLink>
        </div>
      </Section>

      <ClosingCta title="Could your work be one of the first?" />
    </>
  );
}
