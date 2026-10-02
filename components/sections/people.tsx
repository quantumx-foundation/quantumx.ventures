import Image from 'next/image';
import { people, peopleIntro, type Person } from '@/content/people';
import { ArrowUpRight } from '../icons';
import { Section } from '../ui';

export function PeopleSection({ index = '07' }: { index?: string }) {
  if (people.length === 0) return null;

  return (
    <Section labelledBy="people-title">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 lg:col-span-3">
          <p className="eyebrow flex gap-3" data-reveal>
            <span className="text-subtle">{index}</span>
            <span>People</span>
          </p>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <h2 id="people-title" className="text-headline font-light" data-reveal>
            {peopleIntro.heading}
          </h2>
          <p className="mt-8 max-w-2xl text-lead text-muted" data-reveal>
            {peopleIntro.body}
          </p>
        </div>
      </div>

      <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-12">
        {people.map((person, i) => (
          <li
            key={person.name}
            className={`lg:col-span-3 ${i === 0 ? 'lg:col-start-4' : ''}`}
            data-reveal
            style={{ ['--reveal-delay' as string]: `${i * 100}ms` }}
          >
            <PersonCard person={person} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function PersonCard({ person }: { person: Person }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-raised">
        <Image
          src={person.photo.src}
          alt={person.photo.alt}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
          className="img-mono object-cover object-top"
        />
      </div>
      <h3 className="mt-5 text-[1.125rem] font-normal tracking-[-0.01em]">{person.name}</h3>
      <p className="mt-1 text-[0.9375rem] text-muted">{person.role}</p>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink/75">{person.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {[
          { label: 'Profile', href: person.profileUrl },
          { label: 'LinkedIn', href: person.linkedin },
          { label: 'X', href: person.x },
        ]
          .filter((l): l is { label: string; href: string } => Boolean(l.href))
          .map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted transition-colors hover:text-ink"
                aria-label={`${person.name} on ${link.label === 'Profile' ? 'QuantumX Foundation' : link.label}`}
              >
                <span className="link-underline">{link.label}</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </li>
          ))}
      </ul>
    </article>
  );
}
