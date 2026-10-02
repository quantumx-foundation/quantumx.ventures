import { studioIntro, studioVsFund } from '@/content/studio';
import { ArrowLink } from '../ui';

export function StudioIntro({ showLink = true }: { showLink?: boolean }) {
  return (
    <section id="studio" aria-labelledby="studio-title" className="border-t border-line py-[clamp(5rem,11vw,10rem)]">
      <div className="container-site">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <p className="eyebrow col-span-12 flex gap-3 lg:col-span-3" data-reveal>
            <span className="text-subtle">01</span>
            <span>The studio</span>
          </p>
          <h2 id="studio-title" className="col-span-12 text-statement font-light lg:col-span-9" data-reveal>
            {studioIntro.statement}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-8 lg:mt-24">
          {studioIntro.body.map((p, i) => (
            <p
              key={i}
              className={`col-span-12 text-lead text-muted md:col-span-6 lg:col-span-4 ${i === 0 ? 'lg:col-start-4' : ''}`}
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
            >
              {p}
            </p>
          ))}
        </div>

        <StudioComparison className="mt-20 lg:mt-28" />

        {showLink ? (
          <div className="mt-14 lg:ml-[25%]" data-reveal>
            <ArrowLink href="/studio/">How the studio works</ArrowLink>
          </div>
        ) : null}
      </div>
    </section>
  );
}

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
