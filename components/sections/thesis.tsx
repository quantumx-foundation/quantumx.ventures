import Image from 'next/image';
import { thesisAreas, thesisIntro } from '@/content/thesis';
import { ArrowLink, Section } from '../ui';

export function ThesisSection({ index = '03' }: { index?: string }) {
  return (
    <Section labelledBy="thesis-title">
      <div className="grid grid-cols-12 gap-x-6 gap-y-14">
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <p className="eyebrow flex gap-3" data-reveal>
              <span className="text-subtle">{index}</span>
              <span>Thesis</span>
            </p>
            <h2 id="thesis-title" className="mt-8 max-w-[12ch] text-headline font-light" data-reveal>
              Where we are looking.
            </h2>
            <p className="mt-8 max-w-md text-lead text-muted" data-reveal>
              {thesisIntro.statement}
            </p>
            <figure className="relative mt-12 hidden aspect-[4/3] max-w-md overflow-hidden bg-raised lg:block" data-reveal>
              <Image
                src="/images/qubit-chip.webp"
                alt="Close-up of a superconducting quantum processor package in a dark metal enclosure"
                fill
                sizes="(min-width: 1024px) 28rem, 0px"
                className="object-cover"
              />
            </figure>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <ul className="border-b border-line">
            {thesisAreas.map((area) => (
              <li key={area.slug} className="border-t border-line py-8 lg:py-10" data-reveal>
                <div className="flex items-start justify-between gap-6">
                  <div className="flex gap-6">
                    <span className="w-6 shrink-0 pt-1.5 text-sm tabular-nums text-subtle" aria-hidden="true">
                      {area.number}
                    </span>
                    <div>
                      <h3 className="text-title font-normal">{area.title}</h3>
                      <p className="mt-3 max-w-lg text-[1.0625rem] leading-relaxed text-muted">{area.summary}</p>
                    </div>
                  </div>
                  <span className="hidden shrink-0 rounded-full border border-line px-3 py-1 text-[0.75rem] uppercase tracking-[0.12em] text-muted sm:inline-block">
                    {area.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-subtle" data-reveal>
            {thesisIntro.note}
          </p>
          <div className="mt-10" data-reveal>
            <ArrowLink href="/thesis/">Read the full thesis</ArrowLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
