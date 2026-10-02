'use client';

import { useId, useState, type FormEvent } from 'react';
import { EMAIL_PATTERN, submitNetlifyForm } from '@/lib/netlify-form';
import { ArrowRight } from './icons';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'invalid';

/**
 * Email sign-up for studio updates. Posts to the "waitlist" Netlify form used
 * by the original QuantumX Ventures page, so the existing list keeps growing.
 */
export function UpdatesForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get('email') ?? '').trim();
    if (!EMAIL_PATTERN.test(email)) {
      setStatus('invalid');
      form.querySelector<HTMLInputElement>('input[name="email"]')?.focus();
      return;
    }
    setStatus('sending');
    try {
      await submitNetlifyForm(form);
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const messages: Partial<Record<Status, string>> = {
    sent: 'You are on the list. We will write when there is something worth sharing.',
    error: 'That did not go through. Please try again in a moment.',
    invalid: 'Please enter a valid email address.',
  };

  return (
    <form name="waitlist" method="POST" data-netlify="true" netlify-honeypot="bot-field" noValidate onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value="waitlist" />
      <p className="hidden">
        <label>
          Leave this field empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div className="flex items-center border-b border-ink/30 transition-colors focus-within:border-ink hover:border-ink/60">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Your email"
          required
          aria-invalid={status === 'invalid'}
          aria-describedby={`${id}-status`}
          className="min-w-0 flex-1 border-0 bg-transparent px-0 py-3 text-[1.0625rem] font-light text-ink placeholder:text-subtle focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          aria-label="Subscribe to studio updates"
          className="group -mr-2 flex h-11 w-11 items-center justify-center disabled:opacity-50"
        >
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
      <p id={`${id}-status`} role="status" aria-live="polite" className="mt-3 min-h-[1.25rem] text-sm text-muted">
        {messages[status] ?? ''}
      </p>
    </form>
  );
}
