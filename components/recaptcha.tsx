'use client';

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react';
import { site } from '@/content/site';
import { loadRecaptcha, RECAPTCHA_SITE_KEY } from '@/lib/recaptcha';

export type RecaptchaHandle = {
  /** The current token, or an empty string if the box is unticked or the token expired. */
  getToken: () => string;
  reset: () => void;
};

/**
 * The reCAPTCHA checkbox. Render it inside the form: the widget adds the
 * `g-recaptcha-response` field that Netlify checks.
 */
export function Recaptcha({ ref, onVerify }: { ref?: Ref<RecaptchaHandle>; onVerify?: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<number | null>(null);
  const onVerifyRef = useRef(onVerify);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    onVerifyRef.current = onVerify;
  }, [onVerify]);

  useImperativeHandle(
    ref,
    () => ({
      getToken: () => (widget.current === null ? '' : (window.grecaptcha?.getResponse(widget.current) ?? '')),
      reset: () => {
        if (widget.current !== null) window.grecaptcha?.reset(widget.current);
      },
    }),
    [],
  );

  useEffect(() => {
    let cancelled = false;
    loadRecaptcha()
      .then((grecaptcha) => {
        const el = container.current;
        if (cancelled || !el || widget.current !== null) return;
        widget.current = grecaptcha.render(el, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: 'dark',
          // The full widget is 304px wide; narrow phones get the compact one.
          size: el.offsetWidth < 304 ? 'compact' : 'normal',
          callback: () => onVerifyRef.current?.(),
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return (
      <p className="text-sm text-[#e0806b]">
        The spam check could not load. Please check your connection, or email us at{' '}
        <a href={`mailto:${site.email}`} className="underline underline-offset-4">
          {site.email}
        </a>
        .
      </p>
    );
  }

  return <div ref={container} className="min-h-[78px]" />;
}
