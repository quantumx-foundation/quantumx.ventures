import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { StudioComparison } from '@/components/sections/studio-intro';
import { Capabilities } from '@/components/sections/capabilities';
import { ProcessSection } from '@/components/sections/process';
import { ClosingCta } from '@/components/sections/closing-cta';
import { Section, SectionHeading } from '@/components/ui';
import { audiences, studioIntro } from '@/content/studio';
import { pageMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/json-ld';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/structured-data';

const seo = {
  title: 'How Our Venture Studio Works',
  socialTitle: 'A studio, not a fund.',
  description:
    'How QuantumX Ventures builds quantum companies from day zero: venture creation, founder collaboration, research commercialisation and product development.',
  path: '/studio/',
};

export const metadata: Metadata = pageMetadata({
  ...seo,
  image: { slug: 'studio', alt: 'A studio, not a fund. QuantumX Ventures.' },
});

const structuredData = graph(
  webPageSchema({ type: 'WebPage', path: seo.path, name: seo.title, description: seo.description, image: '/og/studio.jpg' }),
  breadcrumbSchema([{ name: 'Studio', path: seo.path }]),
);

export default function StudioPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PageIntro label="Studio" title="A studio, not a fund." lead={studioIntro.statement} />

      <Section labelledBy="difference-title">
        <SectionHeading index="01" label="The difference" title="We build companies from the inside." id="difference-title">
          {studioIntro.body.map((p) => (
            <p key={p} className="mt-5 first:mt-0">
              {p}
            </p>
          ))}
        </SectionHeading>
        <StudioComparison className="mt-16 lg:mt-24" />
      </Section>

      <Capabilities index="02" />

      <ProcessSection index="03" detailed showLink={false} />

      <Section labelledBy="audiences-title">
        <SectionHeading index="04" label="Who we work with" title="The people a quantum company needs." id="audiences-title" />
        <ul className="mt-16 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <li
              key={a.title}
              className="bg-paper py-8 sm:px-6 lg:py-10"
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
            >
              <p className="text-sm tabular-nums text-subtle">0{i + 1}</p>
              <h3 className="mt-8 text-title font-normal">{a.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{a.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <ClosingCta />
    </>
  );
}
