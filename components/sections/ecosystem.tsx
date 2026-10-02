import Image from 'next/image';
import { ecosystemIntro, pillars, shippedTechnology } from '@/content/ecosystem';
import { ArrowUpRight } from '../icons';
import { Section, SectionHeading, SmartLink } from '../ui';

export function EcosystemSection({ index = '06', showShipped = true }: { index?: string; showShipped?: boolean }) {
  return (
    <Section labelledBy="ecosystem-title">
      <SectionHeading index={index} label="Why QuantumX" title={ecosystemIntro.heading} id="ecosystem-title">
        <p>{ecosystemIntro.body}</p>
      </SectionHeading>

      <figure className="relative mt-16 aspect-[16/9] overflow-hidden bg-black lg:mt-24 lg:aspect-[21/9]" data-reveal>
        <Image
          src="/images/qc-lab.webp"
          alt="A quantum computing system: a dilution refrigerator mounted in an aluminium frame beside control racks and a monitoring terminal"
          fill
          sizes="(min-width: 1680px) 1520px, 100vw"
          className="object-contain"
        />
      </figure>

      <ul className="mt-px grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => (
          <li key={pillar.title} className="bg-paper" data-reveal style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}>
            <SmartLink
              href={pillar.href}
              className="group flex h-full flex-col px-0 py-8 transition-colors duration-500 sm:px-6 lg:py-10 sm:hover:bg-raised"
              ariaLabel={pillar.current ? `${pillar.title} (this site)` : undefined}
            >
              <div className="flex items-center justify-between text-sm text-subtle">
                <span className="tabular-nums">{pillar.number}</span>
                {pillar.current ? (
                  <span className="text-eyebrow uppercase text-copper">You are here</span>
                ) : (
                  <ArrowUpRight className="h-3.5 w-3.5 transition-colors group-hover:text-ink" />
                )}
              </div>
              <h3 className="mt-8 text-title font-normal">{pillar.title}</h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{pillar.description}</p>
              <p className="mt-6 border-t border-line pt-5 text-[0.875rem] leading-relaxed text-ink/80">
                <span className="sr-only">For ventures: </span>
                {pillar.forVentures}
              </p>
            </SmartLink>
          </li>
        ))}
      </ul>

      {showShipped ? (
        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-8 lg:mt-28">
          <div className="col-span-12 lg:col-span-3" data-reveal>
            <h3 className="eyebrow">Already built at QuantumX</h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-subtle">
              Technology built across the QuantumX ecosystem. Evidence of how the team builds, not studio ventures.
            </p>
          </div>
          <ul className="col-span-12 border-b border-line lg:col-span-9">
            {shippedTechnology.map((item) => (
              <li key={item.name} className="border-t border-line" data-reveal>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-2 py-6"
                >
                  <span className="col-span-10 text-title font-normal sm:col-span-4">{item.name}</span>
                  <span className="col-span-2 flex justify-end text-muted transition-colors group-hover:text-ink sm:order-last sm:col-span-1">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                  <span className="col-span-12 text-[0.9375rem] leading-relaxed text-muted sm:col-span-7">
                    {item.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
