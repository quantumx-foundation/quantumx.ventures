import Image from 'next/image';
import { ButtonLink } from '../ui';
import { ArrowDown } from '../icons';

const heroImage = {
  src: '/images/dilution-refrigerator.webp',
  alt: 'Dilution refrigerator of a quantum computer: gold and copper stages, coaxial lines and a shielded core suspended against black.',
  width: 1100,
  height: 1100,
};

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Desktop: the instrument hangs from the top edge, as it would in a lab. */}
      <div
        className="pointer-events-none absolute bottom-0 right-[-4vw] top-[var(--header-h)] hidden w-[min(48vw,58rem)] lg:block xl:right-0">
        <div className="animate-fade relative h-full w-full" style={{ ['--delay' as string]: '150ms' }}>
          <div className="animate-suspend relative h-[92%] w-full">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 0px"
              className="object-contain object-top"
            />
          </div>
        </div>
        {/* Fade the instrument into the page at the bottom. */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-paper to-transparent" aria-hidden="true" />
      </div>

      <div className="container-site relative flex min-h-[100svh] flex-col pb-10 pt-[calc(var(--header-h)+clamp(2.5rem,9vh,7rem))] lg:min-h-[max(100svh,680px)]">
        <h1
          id="hero-title"
          className="animate-rise max-w-[11ch] text-mega font-light max-lg:text-[clamp(2.75rem,12.8vw,5.5rem)] lg:max-w-none lg:text-[min(7.2vw,12vh)]"
          style={{ ['--delay' as string]: '140ms' }}
        >
          {/* Three set lines on desktop; natural wrapping on smaller screens. */}
          <span className="lg:block">Some science</span> <span className="lg:block">deserves</span>{' '}
          <span className="lg:block">a company.</span>
        </h1>

        {/* Mobile and tablet: the image sits in the flow below the headline. */}
        <div className="relative mx-auto mt-10 aspect-square w-full max-w-[30rem] lg:hidden">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="(max-width: 1023px) 90vw, 0px"
            className="object-contain"
          />
        </div>

        <div className="mt-auto grid grid-cols-12 gap-x-6 gap-y-8 pt-14 lg:pt-10">
          <div className="col-span-12 md:col-span-8 lg:col-span-5">
            <p className="animate-rise text-lead text-ink/80" style={{ ['--delay' as string]: '240ms' }}>
              We work with researchers, founders and engineers to turn scientific breakthroughs into companies, bringing
              the technology, the team and the commercial path together from day zero.
            </p>
            <div
              className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ ['--delay' as string]: '320ms' }}
            >
              <ButtonLink href="/ventures/" variant="solid">
                Explore our ventures
              </ButtonLink>
              <ButtonLink href="/contact/">Build with us</ButtonLink>
            </div>
          </div>

          <div className="col-span-12 hidden items-end justify-between lg:col-span-7 lg:flex">
            <a
              href="#studio"
              className="animate-rise ml-[18%] flex min-h-11 items-center gap-3 text-sm text-muted transition-colors hover:text-ink"
              style={{ ['--delay' as string]: '420ms' }}
            >
              <ArrowDown className="h-5 w-5" />
              <span>The studio</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
