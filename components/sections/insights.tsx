import { formatInsightDate, type Insight } from '@/content/insights';
import { ArrowUpRight } from '../icons';

export function InsightList({
  items,
  headingLevel: Heading = 'h2',
  reveal = true,
}: {
  items: readonly Insight[];
  headingLevel?: 'h2' | 'h3';
  /** Disable for lists that re-render on the client, which the reveal observer would not see. */
  reveal?: boolean;
}) {
  if (items.length === 0) {
    return (
      <p className="border-y border-line py-12 text-lead text-muted">
        New writing is on its way. In the meantime, find QuantumX on LinkedIn and X.
      </p>
    );
  }

  return (
    <ul className="border-b border-line">
      {items.map((item) => (
        <li key={item.href} className="border-t border-line" data-reveal={reveal || undefined}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-12 gap-x-6 gap-y-4 py-9 lg:py-11"
          >
            <div className="col-span-12 flex items-center gap-4 sm:col-span-3 sm:flex-col sm:items-start sm:gap-3">
              <time dateTime={item.date} className="text-eyebrow uppercase tabular-nums text-muted">
                {formatInsightDate(item.date)}
              </time>
              <span className="rounded-full border border-ink/30 px-2.5 py-0.5 text-[0.75rem] uppercase tracking-[0.12em] text-ink/80">
                {item.kind}
              </span>
            </div>
            <div className="col-span-12 sm:col-span-9">
              <Heading className="text-title font-normal transition-colors group-hover:text-white">{item.title}</Heading>
              <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-muted">{item.description}</p>
              <p className="mt-5 inline-flex items-center gap-2 text-sm font-normal text-ink">
                <span className="link-underline group-hover:[background-size:100%_1px]">Read on {item.publisher}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
