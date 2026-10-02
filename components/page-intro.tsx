import type { ReactNode } from 'react';

/** Opening block for interior pages: label, oversized title and a lead paragraph. */
export function PageIntro({
  label,
  title,
  lead,
  children,
}: {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="pb-[clamp(4rem,9vw,8rem)] pt-[calc(var(--header-h)+clamp(3.5rem,11vw,9rem))]">
      <div className="container-site">
        <p className="eyebrow animate-rise flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-copper" aria-hidden="true" />
          {label}
        </p>
        <h1 className="animate-rise mt-8 max-w-[14ch] text-mega font-light" style={{ ['--delay' as string]: '80ms' }}>
          {title}
        </h1>
        {lead || children ? (
          <div className="mt-14 grid grid-cols-12 gap-x-6 lg:mt-20">
            <div
              className="animate-rise col-span-12 md:col-span-9 lg:col-span-6 lg:col-start-7"
              style={{ ['--delay' as string]: '180ms' }}
            >
              {lead ? <p className="text-lead text-ink/80">{lead}</p> : null}
              {children}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
