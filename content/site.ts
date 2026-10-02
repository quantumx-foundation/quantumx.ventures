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
  /** Default meta description. Keep under 160 characters. */
  description:
    'QuantumX Ventures is the venture studio of QuantumX Foundation, building and scaling quantum technology companies with researchers, founders and engineers.',
  /**
   * Contact inbox. There is no Ventures-specific address yet, so this uses the
   * QuantumX Foundation team inbox. Replace it when a Ventures inbox exists.
   */
  email: 'hi@quantumx.foundation',
  location: 'Startup Park, Bengaluru, India',
  /** Postal address, from the QuantumX Foundation website. Used in structured data. */
  address: {
    streetAddress: '3rd Floor, Startup Park, Opposite Police Station, Singasandra',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560068',
    addressCountry: 'IN',
  },
  /** Google Analytics 4 property. Set to an empty string to disable analytics. */
  analytics: {
    gaMeasurementId: 'G-C5EEQKDYGR',
  },
  /** X handle for Twitter card attribution (the QuantumX account). */
  twitterHandle: '@_Quantum_X_',
  /** Search terms the site is written around. Used for the keywords meta tag. */
  keywords: [
    'QuantumX Ventures',
    'quantum venture studio',
    'quantum technology startups',
    'quantum computing startups',
    'deep tech venture studio',
    'post-quantum security',
    'quantum sensing',
    'quantum software',
    'research commercialisation',
    'QuantumX Foundation',
    'Bengaluru',
    'India',
  ],
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
