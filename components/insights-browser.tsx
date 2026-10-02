'use client';

import { useState } from 'react';
import type { Insight, InsightKind } from '@/content/insights';
import { InsightList } from './sections/insights';

/** Insight list with a kind filter. Renders all items when JavaScript is unavailable. */
export function InsightsBrowser({ items, kinds }: { items: readonly Insight[]; kinds: readonly InsightKind[] }) {
  const [active, setActive] = useState<InsightKind | 'All'>('All');
  const visible = active === 'All' ? items : items.filter((i) => i.kind === active);
  const options: (InsightKind | 'All')[] = ['All', ...kinds];

  return (
    <>
      <div role="group" aria-label="Filter articles by type" className="flex flex-wrap gap-2">
        {options.map((kind) => {
          const count = kind === 'All' ? items.length : items.filter((i) => i.kind === kind).length;
          const selected = active === kind;
          return (
            <button
              key={kind}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(kind)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                selected ? 'border-ink bg-ink text-paper' : 'border-line text-ink/85 hover:border-ink hover:text-ink'
              }`}
            >
              {kind}
              <span className={`tabular-nums ${selected ? 'text-paper/60' : 'text-subtle'}`}>{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? 'article' : 'articles'}
      </p>
      <div className="mt-12">
        <InsightList items={visible} reveal={false} />
      </div>
    </>
  );
}
