import Link from 'next/link';
import { primaryCta, primaryNav, site } from '@/content/site';
import { LogoMark } from './logo';
import { ArrowUpRight } from './icons';
import { UpdatesForm } from './updates-form';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line pt-[clamp(4rem,8vw,7rem)]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <div className="container-site">
        <div className="grid grid-cols-12 gap-x-6 gap-y-14">
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <p className="eyebrow">Studio updates</p>
            <p className="mt-6 max-w-sm text-title font-light">
              Occasional notes on the studio, new ventures and the quantum economy.
            </p>
            <div className="mt-8 max-w-md">
              <UpdatesForm />
            </div>
          </div>

          <nav aria-label="Footer" className="col-span-5 md:col-span-3 lg:col-span-2 lg:col-start-8">
            <p className="eyebrow">Studio</p>
            <ul className="mt-4 md:mt-6 md:space-y-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group inline-flex min-h-11 items-center text-[0.9375rem] text-ink/85 hover:text-ink md:min-h-8">
                    <span className="link-underline">{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href={primaryCta.href} className="group inline-flex min-h-11 items-center text-[0.9375rem] text-ink/85 hover:text-ink md:min-h-8">
                  <span className="link-underline">Contact</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="col-span-7 md:col-span-3 lg:col-span-3">
            <p className="eyebrow">Contact</p>
            <ul className="mt-4 text-[0.9375rem] md:mt-6 md:space-y-1">
              <li>
                <a href={`mailto:${site.email}`} className="group inline-flex min-h-11 items-center text-ink/85 hover:text-ink md:min-h-8">
                  {/* Allow a line break only after the @ on narrow screens. */}
                  <span className="link-underline">
                    {site.email.split('@')[0]}@<wbr />
                    {site.email.split('@')[1]}
                  </span>
                </a>
              </li>
              <li className="py-2.5 text-muted md:py-1">{site.location}</li>
              {site.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-1.5 text-ink/85 hover:text-ink md:min-h-8"
                  >
                    <span className="link-underline">{s.label}</span>
                    <ArrowUpRight className="h-3 w-3 text-subtle group-hover:text-ink" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.foundation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center gap-1.5 text-ink/85 hover:text-ink md:min-h-8"
                >
                  <span className="link-underline">{site.foundation.name}</span>
                  <ArrowUpRight className="h-3 w-3 text-subtle group-hover:text-ink" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark, sized to the container width. */}
        <div className="mt-[clamp(4rem,9vw,8rem)] flex items-end gap-[2.2vw] text-ink" aria-hidden="true">
          <LogoMark className="h-[clamp(2.4rem,10.4vw,11rem)] w-auto shrink-0" />
          <p className="whitespace-nowrap text-[clamp(2.6rem,11.2vw,12rem)] font-normal leading-[0.78] tracking-[-0.055em]">
            QuantumX
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md">
            {site.name}. A venture studio building the next generation of quantum companies.
          </p>
          <div className="flex items-center gap-6">
            <p>
              &copy; {year} {site.name}
            </p>
            <a href={site.privacyUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-11 items-center hover:text-ink">
              <span className="link-underline">Privacy</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
