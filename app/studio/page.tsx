import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { StudioComparison } from '@/components/sections/studio-intro';
import { Capabilities } from '@/components/sections/capabilities';
import { ProcessSection } from '@/components/sections/process';
import { ClosingCta } from '@/components/sections/closing-cta';
import { Section, SectionHeading } from '@/components/ui';
import { audiences, studioIntro } from '@/content/studio';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Studio',
  description:
    'How the QuantumX Ventures studio works: venture creation, founder collaboration, research commercialisation, technical product development and strategic support.',
  path: '/studio/',
});

export default function StudioPage() {
  return (
    <>
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
