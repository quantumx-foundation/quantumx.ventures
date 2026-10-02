'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Fades [data-reveal] elements in as they enter the viewport.
 *
 * The hidden start state is scoped to `html.js-reveal`, which an inline script
 * sets before first paint. Without JavaScript nothing is ever hidden, and the
 * CSS disables the effect entirely for reduced-motion users.
 */
export function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'));

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    root.classList.add('js-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
