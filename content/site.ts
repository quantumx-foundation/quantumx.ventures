/**
 * Global brand, contact and navigation settings.
 *
 * Everything here is sourced from existing QuantumX material: the original
 * QuantumX Ventures waitlist page and the QuantumX Foundation website.
 */

export const site = {
  name: 'QuantumX Ventures',
  shortName: 'QX Ventures',
  /** Canonical production URL. The Foundation site links to this domain. */
  url: 'https://quantumx.ventures',
  tagline: 'Building the next generation of quantum companies.',
  description:
    'QuantumX Ventures is the venture studio of QuantumX Foundation. We build, back and scale quantum technology companies alongside the researchers, founders and engineers behind them.',
  /**
   * Contact inbox. There is no Ventures-specific address yet, so this uses the
   * QuantumX Foundation team inbox. Replace it when a Ventures inbox exists.
   */
  email: 'hi@quantumx.foundation',
  location: 'Startup Park, Bengaluru, India',
  parent: {
    name: 'QuantumX Foundation',
    url: 'https://quantumx.foundation/',
  },
  /** The parent organisation's privacy policy, which covers this site's forms. */
  privacyUrl: 'https://quantumx.foundation/privacy/',
  social: [
    { label: 'X', handle: '@_Quantum_X_', href: 'https://x.com/_Quantum_X_' },
    {
      label: 'LinkedIn',
      handle: 'QuantumX Foundation',
      href: 'https://www.linkedin.com/company/quantumx-foundation/',
    },
  ],
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: readonly NavItem[] = [
  { label: 'Studio', href: '/studio/' },
  { label: 'Ventures', href: '/ventures/' },
  { label: 'Thesis', href: '/thesis/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'About', href: '/about/' },
];

export const primaryCta: NavItem = { label: 'Build with us', href: '/contact/' };
