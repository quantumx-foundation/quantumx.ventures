import Image from 'next/image';
import { ventures, type Venture } from '@/content/ventures';
import { ArrowUpRight } from '../icons';
import { ButtonLink } from '../ui';

/** Renders the venture grid, or an honest "in formation" state while the list is empty. */
export function VentureList({ items = ventures }: { items?: readonly Venture[] }) {
  if (items.length === 0) return <VenturesForming />;

  return (
    <ul className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
      {items.map((venture) => (
        <li key={venture.slug} className="bg-paper">
          <VentureCard venture={venture} />
        </li>
      ))}
    </ul>
  );
}

export function VentureCard({ venture }: { venture: Venture }) {
  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-raised">
        {venture.image ? (
          <Image
            src={venture.image.src}
            alt={venture.image.alt}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="img-mono object-cover"
          />
        ) : null}
        {venture.logo ? (
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <Image
              src={venture.logo.src}
              alt={venture.logo.alt}
              width={240}
              height={80}
              className="h-auto max-h-16 w-auto max-w-[60%] object-contain"
            />
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <div className="flex items-center justify-between gap-4 text-eyebrow uppercase text-muted">
          <span>{venture.category}</span>
          <span>{[venture.stage, venture.year].filter(Boolean).join(' · ')}</span>
        </div>
        <h3 className="mt-6 flex items-center gap-2 text-title font-normal">
          {venture.name}
          {venture.href ? <ArrowUpRight className="h-4 w-4 text-muted transition-colors group-hover:text-ink" /> : null}
        </h3>
        <p className="mt-3 text-[1rem] leading-relaxed text-muted">{venture.description}</p>
      </div>
    </>
  );

  const className = 'group flex h-full flex-col transition-colors duration-500 hover:bg-raised';

  return venture.href ? (
    <a href={venture.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}

function VenturesForming() {
  return (
    <div className="grid grid-cols-12 gap-x-6 border-y border-line py-12 lg:py-16" data-reveal>
      <div className="col-span-12 lg:col-span-3">
        <p className="eyebrow flex items-center gap-3 text-ink">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper opacity-50 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-copper" />
          </span>
          In formation
        </p>
      </div>
      <div className="col-span-12 mt-8 lg:col-span-9 lg:mt-0">
        <p className="max-w-3xl text-statement font-light">
          The first QuantumX ventures are being formed now. Each one will be listed here when its founders are ready to
          announce it.
        </p>
        <p className="mt-8 max-w-xl text-lead text-muted">
          If you are working on a quantum technology that could become one of them, this is the right time to talk.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact/" variant="solid">
            Bring us a venture
          </ButtonLink>
          <ButtonLink href="/thesis/">What we look for</ButtonLink>
        </div>
      </div>
    </div>
  );
}
