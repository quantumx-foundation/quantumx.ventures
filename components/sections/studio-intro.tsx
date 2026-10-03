import { studioVsFund } from '@/content/studio';

export function StudioComparison({ className = '' }: { className?: string }) {
  const columns = [studioVsFund.fund, studioVsFund.studio];
  return (
    <div className={`grid grid-cols-12 gap-x-6 ${className}`}>
      <div className="col-span-12 grid grid-cols-1 border-t border-line md:grid-cols-2 lg:col-span-9 lg:col-start-4">
        {columns.map((col, i) => (
          <div
            key={col.label}
            className={`pt-8 md:pt-10 ${i === 0 ? 'pb-10 md:pb-0 md:pr-10' : 'border-t border-line md:border-l md:border-t-0 md:pl-10'}`}
            data-reveal
            style={{ ['--reveal-delay' as string]: `${i * 120}ms` }}
          >
            <h3 className={`eyebrow ${i === 1 ? 'text-ink' : ''}`}>{col.label}</h3>
            <ul className="mt-6 space-y-4">
              {col.points.map((point) => (
                <li
                  key={point}
                  className={`flex gap-4 text-[1.0625rem] leading-relaxed ${i === 1 ? 'text-ink' : 'text-muted'}`}
                >
                  <span
                    className={`mt-[0.7em] h-px w-4 shrink-0 ${i === 1 ? 'bg-copper' : 'bg-subtle'}`}
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
