/**
 * Google reCAPTCHA v2, checked by Netlify Forms.
 *
 * The site key comes from the SITE_RECAPTCHA_KEY environment variable at build
 * time (see next.config.mjs). Without it the forms render no widget and are
 * protected by the honeypot only. Netlify verifies the token with
 * SITE_RECAPTCHA_SECRET and drops submissions that fail.
 */
export const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY ?? '';
export const recaptchaEnabled = RECAPTCHA_SITE_KEY !== '';

type Grecaptcha = {
  render: (
    container: HTMLElement,
    params: {
      sitekey: string;
      theme?: 'dark' | 'light';
      size?: 'normal' | 'compact';
      callback?: () => void;
    },
  ) => number;
  getResponse: (widgetId: number) => string;
  reset: (widgetId: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

const ONLOAD = '__qxRecaptchaLoaded';
let loading: Promise<Grecaptcha> | null = null;

/** Loads the reCAPTCHA script once, on first use, so pages without a form never fetch it. */
export function loadRecaptcha(): Promise<Grecaptcha> {
  if (loading) return loading;
  loading = new Promise<Grecaptcha>((resolve, reject) => {
    (window as unknown as Record<string, () => void>)[ONLOAD] = () => resolve(window.grecaptcha!);
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?onload=${ONLOAD}&render=explicit`;
    script.async = true;
    script.onerror = () => {
      loading = null;
      script.remove();
      reject(new Error('reCAPTCHA failed to load'));
    };
    document.head.appendChild(script);
  });
  return loading;
}
