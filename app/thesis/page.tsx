import type { Metadata } from 'next';
import { PageIntro } from '@/components/page-intro';
import { ClosingCta } from '@/components/sections/closing-cta';
import { Section, SectionHeading } from '@/components/ui';
import { thesisAreas, thesisIntro, ventureCriteria } from '@/content/thesis';
import { pageMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/json-ld';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/structured-data';

const seo = {
  title: 'Quantum Technology Venture Thesis',
  socialTitle: 'Where we are looking.',
  description:
    'Where QuantumX Ventures is looking: quantum computing, quantum software, post-quantum security, quantum sensing, and enabling infrastructure such as photonics.',
  path: '/thesis/',
};

export const metadata: Metadata = pageMetadata({
  ...seo,
  image: { slug: 'thesis', alt: 'Where we are looking. The QuantumX Ventures thesis.' },
});

const structuredData = graph(
  webPageSchema({ type: 'WebPage', path: seo.path, name: seo.title, description: seo.description, image: '/og/thesis.jpg' }),
  breadcrumbSchema([{ name: 'Thesis', path: seo.path }]),
);

export default function ThesisPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PageIntro label="Thesis" title="Where we are looking." lead={thesisIntro.statement}>
        <p className="mt-6 text-sm text-subtle">{thesisIntro.note}</p>
      </PageIntro>

      <section aria-label="Areas index" className="pb-[clamp(4rem,8vw,7rem)]">
        <div className="container-site">
          <nav aria-label="Areas of interest">
            <ul className="flex flex-wrap gap-2">
              {thesisAreas.map((area) => (
                <li key={area.slug}>
                  <a
                    href={`#${area.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink/85 transition-colors hover:border-ink hover:text-ink"
                  >
                    <span className="tabular-nums text-subtle">{area.number}</span>
                    {area.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>


      <div>
        {thesisAreas.map((area) => (
          <section
            key={area.slug}
            id={area.slug}
            aria-labelledby={`${area.slug}-title`}
            className="border-t border-line py-[clamp(4rem,8vw,7rem)]"
          >
            <div className="container-site grid grid-cols-12 gap-x-6 gap-y-8">
              <div className="col-span-12 flex items-center justify-between gap-6 lg:col-span-3 lg:flex-col lg:items-start lg:justify-start lg:gap-5">
                <p className="text-sm tabular-nums text-subtle" data-reveal>
                  {area.number}
                </p>
                <span
                  className="rounded-full border border-line px-3 py-1 text-[0.6875rem] uppercase tracking-[0.12em] text-muted"
                  data-reveal
                >
                  {area.status}
                </span>
              </div>
              <div className="col-span-12 lg:col-span-5">
                <h2 id={`${area.slug}-title`} className="text-headline font-light" data-reveal>
                  {area.title}
                </h2>
                <p className="mt-6 text-lead text-ink/80" data-reveal>
                  {area.summary}
                </p>
                <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted" data-reveal>
                  {area.detail}
                </p>
              </div>
              <div className="col-span-12 lg:col-span-3 lg:col-start-10" data-reveal>
                <h3 className="eyebrow">Questions we ask</h3>
                <ul className="mt-5 space-y-4">
                  {area.questions.map((q) => (
                    <li key={q} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink/80">
                      <span className="mt-[0.7em] h-px w-3 shrink-0 bg-copper" aria-hidden="true" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      <Section labelledBy="criteria-title">
        <SectionHeading index="" label="Across every area" title="What every venture needs." id="criteria-title" />
        <ol className="mt-16 border-b border-line lg:mt-24">
          {ventureCriteria.map((c, i) => (
            <li key={c.title} className="grid grid-cols-12 gap-x-6 gap-y-3 border-t border-line py-8" data-reveal>
              <span className="col-span-2 pt-1 text-sm tabular-nums text-subtle lg:col-span-3" aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="col-span-10 text-title font-normal lg:col-span-4">{c.title}</h3>
              <p className="col-span-10 col-start-3 text-[1.0625rem] leading-relaxed text-muted lg:col-span-5 lg:col-start-auto">
                {c.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <ClosingCta title="Building in one of these areas?" />
    </>
  );
}
