'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { primaryCta, primaryNav, site } from '@/content/site';
import { Logo } from './logo';
import { ArrowRight } from './icons';

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname() ?? '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While the menu is open: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      ).concat(toggle ? [toggle] : []);

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ease-out ${
          scrolled || open ? 'border-b border-line bg-paper/90 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="relative z-10 -mx-2 flex min-h-11 items-center px-2" aria-label={`${site.name}, home`}>
            <Logo />
          </Link>
  
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                    className="link-underline py-1 text-[0.9375rem] font-light text-ink/80 transition-colors hover:text-ink aria-[current=page]:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
  
          <div className="flex items-center gap-2">
            <Link
              href={primaryCta.href}
              className="group hidden h-10 items-center gap-2.5 rounded-full border border-ink/40 px-5 text-[0.875rem] font-normal transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper sm:inline-flex"
            >
              {primaryCta.label}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
  
            <button
              ref={toggleRef}
              type="button"
              className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-6" aria-hidden="true">
                <span
                  className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-300 ease-out ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-300 ease-out ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Outside <header>: its backdrop-filter would otherwise contain this fixed panel. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-paper lg:hidden"
      >
        <nav aria-label="Mobile" className="container-site flex min-h-full flex-col pb-10 pt-6">
          <ul className="border-t border-line">
            {primaryNav.map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  className="flex items-baseline justify-between gap-4 py-5 text-[2rem] font-light leading-none tracking-[-0.03em] aria-[current=page]:text-ink"
                >
                  <span>{item.label}</span>
                  <span className="text-eyebrow tabular-nums text-subtle">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <Link
              href={primaryCta.href}
              className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-full bg-ink text-[0.9375rem] font-normal text-paper"
            >
              {primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-6 text-sm text-muted">
              <a href={`mailto:${site.email}`} className="group inline-flex min-h-11 items-center">
                <span className="link-underline">{site.email}</span>
              </a>
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
