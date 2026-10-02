import { capabilities } from '@/content/studio';
import { Section, SectionHeading } from '../ui';

export function Capabilities({ index = '02' }: { index?: string }) {
  return (
    <Section labelledBy="capabilities-title">
      <SectionHeading index={index} label="What we do" title="Hands-on work, from first result to first customer." id="capabilities-title" />

      <ol className="mt-16 border-b border-line lg:mt-24">
        {capabilities.map((item, i) => (
          <li
            key={item.number}
            className="grid grid-cols-12 gap-x-6 gap-y-3 border-t border-line py-8 lg:py-10"
            data-reveal
            style={{ ['--reveal-delay' as string]: `${i * 60}ms` }}
          >
            <span className="col-span-2 pt-1 text-sm tabular-nums text-subtle lg:col-span-3" aria-hidden="true">
              {item.number}
            </span>
            <h3 className="col-span-10 text-title font-normal lg:col-span-4">{item.title}</h3>
            <p className="col-span-10 col-start-3 text-[1.0625rem] leading-relaxed text-muted lg:col-span-5 lg:col-start-auto">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
