import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { site } from '@/content/site';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { RevealProvider } from '@/components/reveal';
import './globals.css';

// Poppins is the existing QuantumX Ventures brand typeface.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-poppins',
});

const title = `${site.name}: ${site.tagline.replace(/\.$/, '')}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_US',
    url: '/',
    title,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0A0A09',
  colorScheme: 'dark',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.png`,
  description: site.description,
  email: site.email,
  parentOrganization: {
    '@type': 'Organization',
    name: site.parent.name,
    url: site.parent.url,
  },
  sameAs: site.social.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body>
        {/* Enables scroll-reveal before first paint; see components/reveal.tsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-reveal')",
          }}
        />
        <a
          href="#main"
          className="sr-only z-[60] rounded-sm bg-ink px-4 py-3 text-sm font-normal text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <RevealProvider />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
