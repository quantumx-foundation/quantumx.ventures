/**
 * Homepage sections. Each section carries one idea and links to the page
 * with the detail, leaving generous space around it. The detailed versions
 * live in components/sections/ and are used by the interior pages.
 */
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { home } from '@/content/home';
import { capabilities, process } from '@/content/studio';
import { thesisAreas } from '@/content/thesis';
import { ventures } from '@/content/ventures';
import { pillars } from '@/content/ecosystem';
import { people } from '@/content/people';
import { formatInsightDate, insights, sortedInsights } from '@/content/insights';
import { site } from '@/content/site';
import { ArrowRight, ArrowUpRight } from '../icons';
import { ArrowLink, ButtonLink, SmartLink } from '../ui';
import { VentureList } from '../sections/ventures';

/** Shared frame: a small numbered label on the left, one idea on the right. */
function HomeSection({
  index,
  label,
  id,
  children,
  labelIsHeading = false,
}: {
  index: string;
  label: string;
  id: string;
  children: ReactNode;
  /** When the section has no large heading, the label is its h2. */
  labelIsHeading?: boolean;
}) {
  const Label = labelIsHeading ? 'h2' : 'p';
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-[clamp(6rem,14vw,13rem)]">
      <div className="container-site grid grid-cols-12 gap-x-6 gap-y-12">
        <Label
          id={labelIsHeading ? `${id}-title` : undefined}
          className="eyebrow col-span-12 flex gap-3 lg:col-span-3"
          data-reveal
        >
          <span className="tabular-nums text-subtle">{index}</span>
          <span>{label}</span>
        </Label>
        <div className="col-span-12 lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

export function HomeStudio() {
  return (
    <HomeSection index="01" label="The studio" id="studio">
      <h2 id="studio-title" className="max-w-[24ch] text-statement font-light" data-reveal>
        {home.studio.statement}
      </h2>
      <div className="mt-12" data-reveal>
        <ArrowLink href="/studio/">How the studio works</ArrowLink>
      </div>
    </HomeSection>
  );
}

export function HomeCapabilities() {
  return (
    <HomeSection index="02" label="What we do" id="capabilities" labelIsHeading>
      <ol className="border-b border-line">
        {capabilities.map((item, i) => (
          <li
            key={item.number}
            className="flex items-baseline gap-6 border-t border-line py-6 lg:py-8"
            data-reveal
            style={{ ['--reveal-delay' as string]: `${i * 60}ms` }}
          >
            <span className="w-8 shrink-0 text-sm tabular-nums text-subtle" aria-hidden="true">
              {item.number}
            </span>
            <h3 className="text-statement font-light">{item.title}</h3>
          </li>
        ))}
      </ol>
    </HomeSection>
  );
}

export function HomeThesis() {
  return (
    <HomeSection index="03" label="Thesis" id="thesis" labelIsHeading>
      {/* The areas flow as one line of type, each linking to its section of the thesis. */}
      <ul className="text-headline font-light" data-reveal>
        {thesisAreas.map((area, i) => (
          <li key={area.slug} className="inline">
            <Link href={`/thesis/#${area.slug}`} className="link-underline transition-colors hover:text-white">
              {area.title}
            </Link>
            {i < thesisAreas.length - 1 ? (
              <span className="px-[0.3em] text-subtle" aria-hidden="true">
                /
              </span>
            ) : null}
          </li>
        ))}
      </ul>
      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" data-reveal>
        <p className="text-sm text-subtle">{home.thesis.note}</p>
        <ArrowLink href="/thesis/">Read the thesis</ArrowLink>
      </div>
    </HomeSection>
  );
}

export function HomeVentures() {
  if (ventures.length > 0) {
    return (
      <HomeSection index="04" label="Ventures" id="ventures" labelIsHeading>
        <VentureList />
        <div className="mt-12" data-reveal>
          <ArrowLink href="/ventures/">All ventures</ArrowLink>
        </div>
      </HomeSection>
    );
  }

  return (
    <HomeSection index="04" label="Ventures" id="ventures">
      <h2 id="ventures-title" className="flex max-w-[20ch] items-start gap-5 text-display font-light" data-reveal>
        <span className="relative mt-[0.45em] flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper opacity-50 motion-reduce:hidden" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-copper" />
        </span>
        <span>{home.ventures.statement}</span>
      </h2>
      <div className="mt-12" data-reveal>
        <ButtonLink href="/contact/" variant="solid">
          {home.ventures.cta}
        </ButtonLink>
      </div>
    </HomeSection>
  );
}

export function HomeProcess() {
  return (
    <HomeSection index="05" label="How we build" id="process" labelIsHeading>
      <ol className="relative grid grid-cols-1 lg:grid-cols-5 lg:gap-x-6">
        <span className="absolute bottom-3 left-[5px] top-3 w-px bg-line lg:hidden" aria-hidden="true" />
        <span className="absolute left-0 right-0 top-[5px] hidden h-px bg-line lg:block" aria-hidden="true" />
        {process.map((step, i) => (
          <li
            key={step.number}
            className="relative pb-10 pl-10 last:pb-0 lg:pb-0 lg:pl-0 lg:pt-10"
            data-reveal
            style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
          >
            <span
              className={`absolute left-0 top-2 h-[11px] w-[11px] rounded-full border lg:top-0 ${
                i === 0 ? 'border-copper bg-copper' : 'border-ink/50 bg-paper'
              }`}
              aria-hidden="true"
            />
            <h3 className="text-title font-normal">{step.title}</h3>
          </li>
        ))}
      </ol>
      <div className="mt-14" data-reveal>
        <ArrowLink href="/studio/#process">Each stage in detail</ArrowLink>
      </div>
    </HomeSection>
  );
}

export function HomeEcosystem() {
  return (
    <HomeSection index="06" label="Why QuantumX" id="ecosystem">
      <h2 id="ecosystem-title" className="max-w-[16ch] text-headline font-light" data-reveal>
        {home.ecosystem.heading}
      </h2>
      <figure className="relative mt-14 aspect-[16/9] overflow-hidden bg-black" data-reveal>
        <Image
          src="/images/qc-lab.webp"
          alt="A quantum computing system: a dilution refrigerator mounted in an aluminium frame beside control racks and a monitoring terminal"
          fill
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="object-contain"
        />
      </figure>
      <ul className="grid grid-cols-1 border-b border-line sm:grid-cols-2 lg:grid-cols-4" data-reveal>
        {pillars.map((pillar) => (
          <li key={pillar.title} className="border-t border-line">
            <SmartLink
              href={pillar.href}
              className="group flex min-h-16 items-center gap-2 py-5 pr-4 text-[1rem] text-ink/85 transition-colors hover:text-ink"
              ariaLabel={pillar.current ? `${pillar.title} (this site)` : undefined}
            >
              <span className="link-underline">{pillar.title}</span>
              {pillar.current ? (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-copper" aria-hidden="true" />
              ) : (
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-subtle transition-colors group-hover:text-ink" />
              )}
            </SmartLink>
          </li>
        ))}
      </ul>
      <div className="mt-12" data-reveal>
        <ArrowLink href="/about/">About QuantumX Ventures</ArrowLink>
      </div>
    </HomeSection>
  );
}

export function HomePeople() {
  if (people.length === 0) return null;
  return (
    <HomeSection index="07" label="People" id="people">
      <h2 id="people-title" className="text-headline font-light" data-reveal>
        {home.people.heading}
      </h2>
      {/* Phones: a compact list with small portraits. Tablet and up: three portraits. */}
      <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-3 sm:gap-y-12">
        {people.map((person, i) => (
          <li
            key={person.name}
            className="group flex items-center gap-5 sm:block"
            data-reveal
            style={{ ['--reveal-delay' as string]: `${i * 100}ms` }}
          >
            <div className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-raised sm:w-auto">
              <Image
                src={person.photo.src}
                alt={person.photo.alt}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 80px"
                className="img-mono object-cover object-top"
              />
            </div>
            <div>
              <h3 className="text-[1.0625rem] font-normal tracking-[-0.01em] sm:mt-5">{person.name}</h3>
              <p className="mt-1 text-[0.9375rem] text-muted">{person.role}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-12" data-reveal>
        <ArrowLink href="/about/">Meet the team</ArrowLink>
      </div>
    </HomeSection>
  );
}

export function HomeInsights() {
  const latest = sortedInsights(insights.filter((i) => i.featured)).slice(0, 3);
  return (
    <HomeSection index="08" label="Insights" id="insights">
      <h2 id="insights-title" className="text-headline font-light" data-reveal>
        {home.insights.heading}
      </h2>
      <ul className="mt-14 border-b border-line">
        {latest.map((item) => (
          <li key={item.href} className="border-t border-line" data-reveal>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-10 lg:py-7"
            >
              <time dateTime={item.date} className="shrink-0 text-eyebrow uppercase tabular-nums text-subtle sm:w-28">
                {formatInsightDate(item.date)}
              </time>
              <span className="flex flex-1 items-baseline justify-between gap-6">
                <span className="text-title font-light transition-colors group-hover:text-white">{item.title}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-subtle transition-colors group-hover:text-ink" />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-12" data-reveal>
        <ArrowLink href="/insights/">All insights</ArrowLink>
      </div>
    </HomeSection>
  );
}

export function HomeCta() {
  return (
    <section aria-labelledby="cta-title" className="border-t border-line py-[clamp(7rem,16vw,15rem)]">
      <div className="container-site">
        <h2 id="cta-title" className="max-w-[14ch] text-mega font-light" data-reveal>
          {home.cta.title}
        </h2>
        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8" data-reveal>
          <ButtonLink href="/contact/" variant="solid">
            Start a conversation
          </ButtonLink>
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-muted hover:text-ink"
          >
            <span className="link-underline">{site.email}</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
