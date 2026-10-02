import { process } from '@/content/studio';
import { ArrowLink, Section, SectionHeading } from '../ui';

export function ProcessSection({
  index = '05',
  detailed = false,
  showLink = true,
}: {
  index?: string;
  detailed?: boolean;
  showLink?: boolean;
}) {
  return (
    <Section id="process" labelledBy="process-title">
      <SectionHeading index={index} label="How we build" title="Five stages, from opportunity to growth." id="process-title">
        <p>This is the model the studio is designed around. Not every idea goes through every stage, and most stop early.</p>
      </SectionHeading>

      <ol className="relative mt-16 grid grid-cols-1 gap-y-0 lg:mt-24 lg:grid-cols-5 lg:gap-x-6">
        {/* Timeline rule: vertical on small screens, horizontal on desktop. */}
        <span className="absolute bottom-2 left-[5px] top-2 w-px bg-line lg:hidden" aria-hidden="true" />
        <span className="absolute left-0 right-0 top-[5px] hidden h-px bg-line lg:block" aria-hidden="true" />

        {process.map((step, i) => (
          <li
            key={step.number}
            className="relative pb-12 pl-10 last:pb-0 lg:pb-0 lg:pl-0 lg:pt-12"
            data-reveal
            style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
          >
            <span
              className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border lg:top-0 ${
                i === 0 ? 'border-copper bg-copper' : 'border-ink/50 bg-paper'
              }`}
              aria-hidden="true"
            />
            <p className="text-sm tabular-nums text-subtle">{step.number}</p>
            <h3 className="mt-3 text-title font-normal">{step.title}</h3>
            <p className="mt-2 text-[1rem] text-ink/85">{step.summary}</p>
            {detailed ? <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{step.detail}</p> : null}
          </li>
        ))}
      </ol>

      {showLink ? (
        <div className="mt-16" data-reveal>
          <ArrowLink href="/studio/#process">Each stage in detail</ArrowLink>
        </div>
      ) : null}
    </Section>
  );
}
