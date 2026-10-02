import type { Metadata } from 'next';
import Image from 'next/image';
import { PageIntro } from '@/components/page-intro';
import { EcosystemSection } from '@/components/sections/ecosystem';
import { PeopleSection } from '@/components/sections/people';
import { ClosingCta } from '@/components/sections/closing-cta';
import { Section } from '@/components/ui';
import { launchMilestone } from '@/content/ecosystem';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/json-ld';
import { breadcrumbSchema, graph, webPageSchema, peopleSchema } from '@/lib/structured-data';

const seo = {
  title: 'About the Venture Studio of QuantumX',
  socialTitle: 'The venture studio of QuantumX.',
  description:
    'QuantumX Ventures is the venture studio of QuantumX Foundation, a Bengaluru deep-tech company building quantum technology, quantum education and community.',
  path: '/about/',
};

export const metadata: Metadata = pageMetadata({
  ...seo,
  image: { slug: 'about', alt: 'The venture studio of QuantumX. About QuantumX Ventures.' },
});

const structuredData = graph(
  webPageSchema({ type: 'AboutPage', path: seo.path, name: seo.title, description: seo.description, image: '/og/about.jpg' }),
  breadcrumbSchema([{ name: 'About', path: seo.path }]),
  peopleSchema(),
);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PageIntro
        label="About"
        title="The venture studio of QuantumX."
        lead={`${site.name} is where ${site.parent.name} turns quantum research, technology and talent into companies. It sits alongside QuantumX Technology, QuantumX School and QuantumX Community, and draws on all three.`}
      />

      <EcosystemSection index="01" />

      <Section labelledBy="milestone-title">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <p className="eyebrow flex gap-3" data-reveal>
              <span className="text-subtle">02</span>
              <span>Milestone</span>
            </p>
            <h2 id="milestone-title" className="mt-8 text-headline font-light" data-reveal>
              {launchMilestone.heading}.
            </h2>
            <p className="mt-8 max-w-md text-lead text-muted" data-reveal>
              {launchMilestone.body}
            </p>
          </div>
          <figure className="col-span-12 lg:col-span-7" data-reveal>
            <div className="group relative aspect-[3/2] overflow-hidden bg-raised">
              <Image
                src="/images/foundation-launch.webp"
                alt="The QuantumX team on stage holding the QuantumX banner at the official launch of QuantumX Foundation"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="img-mono object-cover"
              />
            </div>
            <figcaption className="mt-4 text-sm text-subtle">Official launch of QuantumX Foundation, Bengaluru.</figcaption>
          </figure>
        </div>
      </Section>

      <Section labelledBy="community-title">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <figure className="order-2 col-span-12 lg:order-1 lg:col-span-7" data-reveal>
            <div className="group relative aspect-[16/9] overflow-hidden bg-raised">
              <Image
                src="/images/hackathon-demo.webp"
                alt="A student team presenting their post-quantum authentication project at a QuantumX hackathon"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="img-mono object-cover"
              />
            </div>
            <figcaption className="mt-4 text-sm text-subtle">A team presenting at a QuantumX hackathon.</figcaption>
          </figure>
          <div className="order-1 col-span-12 lg:order-2 lg:col-span-4 lg:col-start-9">
            <p className="eyebrow flex gap-3" data-reveal>
              <span className="text-subtle">03</span>
              <span>Where founders come from</span>
            </p>
            <h2 id="community-title" className="mt-8 text-headline font-light" data-reveal>
              From the community, into the studio.
            </h2>
            <p className="mt-8 text-lead text-muted" data-reveal>
              QuantumX runs courses, workshops, meetups and hackathons where people build real quantum projects. Some of
              those builders will become founders. The studio gives them somewhere to take the next step.
            </p>
          </div>
        </div>
      </Section>

      <PeopleSection index="04" />

      <ClosingCta />
    </>
  );
}
