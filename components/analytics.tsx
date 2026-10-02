import Script from 'next/script';
import { site } from '@/content/site';

/**
 * Google Analytics 4 (gtag.js).
 *
 * Loads after the page is interactive so it never blocks rendering, and only
 * in production builds so local development does not send traffic. Page views
 * for client-side navigation are recorded by GA4's enhanced measurement
 * ("Page changes based on browser history events", on by default).
 */
export function Analytics() {
  const id = site.analytics.gaMeasurementId;
  if (!id || process.env.NODE_ENV !== 'production') return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
