import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { site } from '@/content/site';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { RevealProvider } from '@/components/reveal';
import { JsonLd } from '@/components/json-ld';
import { Analytics } from '@/components/analytics';
import { homeOgImage } from '@/lib/metadata';
import { graph, organizationSchema, websiteSchema } from '@/lib/structured-data';
import './globals.css';

// Poppins is the existing QuantumX Ventures brand typeface.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-poppins',
});

/** Search title for the homepage: brand, tagline and what it is. */
const defaultTitle = `${site.name}: ${site.tagline.replace(/\.$/, '')} | Venture Studio`;
/** Link-preview title: the brand line, matching the share image. */
const socialTitle = `${site.name}: ${site.tagline.replace(/\.$/, '')}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'technology',
  formatDetection: { telephone: false, address: false, email: false },
  // Pages set their own canonical. None here, so error pages do not claim the homepage.
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_US',
    title: socialTitle,
    description: site.description,
    images: [homeOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    site: site.twitterHandle,
    title: socialTitle,
    description: site.description,
    images: [homeOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A09',
  colorScheme: 'dark',
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
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <Analytics />
      </body>
    </html>
  );
}
