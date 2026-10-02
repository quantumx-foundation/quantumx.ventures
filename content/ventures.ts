/**
 * QuantumX Ventures portfolio.
 *
 * Only add a venture here once its relationship to QuantumX Ventures is
 * confirmed and its founders are ready for it to be public. While the list is
 * empty, the site shows an "in formation" state instead of a grid.
 *
 * Example entry (copy into the array and edit):
 *
 *   {
 *     slug: 'example-venture',
 *     name: 'Example Venture',
 *     description: 'One or two sentences on what the company builds and for whom.',
 *     category: 'Quantum software',
 *     stage: 'In studio',
 *     year: '2026',
 *     image: { src: '/images/ventures/example.webp', alt: 'Describe the image' },
 *     logo: { src: '/images/ventures/example-logo.svg', alt: 'Example Venture logo' },
 *     href: 'https://example.com/',
 *   },
 *
 * Place images in public/images/ventures/. Use a 4:3 image; logos should be a
 * light-on-transparent SVG or PNG so they sit on the dark background.
 */

export type VentureStage = 'In studio' | 'Launched' | 'Spun out';

export type Venture = {
  slug: string;
  name: string;
  description: string;
  /** Use one of the thesis area titles where it fits. */
  category: string;
  stage: VentureStage;
  year?: string;
  image?: { src: string; alt: string };
  logo?: { src: string; alt: string };
  href?: string;
};

export const ventures: readonly Venture[] = [];
