import Script from 'next/script';
import { site } from '@/content/site';

/**
 * Google Analytics 4 (gtag.js).
 *
 * Loads after the page is interactive so it never blocks rendering, and only
 * in production builds so local development does not send traffic. Page views
 * for client-side navigation are recorded by GA4's enhanced measurement
 * ("Page changes based on browser history events", on by default).
 *
 * Consent Mode: there is no cookie banner, so visitors in the EEA, the UK and
 * Switzerland get cookieless analytics (analytics_storage denied), and ad
 * signals are off for everyone because the site runs no ads.
 */
const consentRegions = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT',
  'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH',
];

export function Analytics() {
  const id = site.analytics.gaMeasurementId;
  if (!id || process.env.NODE_ENV !== 'production') return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted'});
gtag('consent', 'default', {analytics_storage: 'denied', region: ${JSON.stringify(consentRegions)}});
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
