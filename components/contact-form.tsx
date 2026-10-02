'use client';

import { useRef, useState, type FormEvent } from 'react';
import { site } from '@/content/site';
import { EMAIL_PATTERN, submitNetlifyForm } from '@/lib/netlify-form';
import { ArrowRight } from './icons';

const roles = ['Founder', 'Researcher', 'Technical team', 'Partner or investor', 'Other'] as const;

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const fieldClass =
  'block w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-[1.0625rem] font-light text-ink placeholder:text-subtle transition-colors duration-300 hover:border-ink/50 focus:border-ink focus:outline-none focus:ring-0 aria-[invalid=true]:border-[#e0806b]';

const labelClass = 'eyebrow block';

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const next: Errors = {};
    if (!String(data.get('name') ?? '').trim()) next.name = 'Please tell us your name.';
    if (!EMAIL_PATTERN.test(String(data.get('email') ?? '').trim())) next.email = 'Please enter a valid email address.';
    if (String(data.get('message') ?? '').trim().length < 20)
      next.message = 'A few sentences helps us understand what you are working on.';
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const found = validate(form);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
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

  if (status === 'sent') {
    return (
      <div role="status" aria-live="polite" className="border-l border-ink pl-6">
        <p className="text-title font-normal">Thank you. Your message has reached the team.</p>
        <p className="mt-3 max-w-md text-muted">
          We read every message. If it is a fit for the studio, we will reply to the email address you gave us.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="link-underline mt-6 text-[0.9375rem] font-normal"
        >
          Send another message
        </button>
      </div>
    );
  }

  const describe = (field: keyof Errors) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form
      ref={formRef}
      name="venture-inquiry"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      noValidate
      onSubmit={onSubmit}
      aria-busy={status === 'sending'}
      className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2"
    >
      <input type="hidden" name="form-name" value="venture-inquiry" />
      <p className="hidden">
        <label>
          Leave this field empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describe('name')}
          className={fieldClass}
        />
        {errors.name ? (
          <p id="name-error" className="mt-2 text-sm text-[#e0806b]">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describe('email')}
          className={fieldClass}
        />
        {errors.email ? (
          <p id="email-error" className="mt-2 text-sm text-[#e0806b]">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="organisation" className={labelClass}>
          Organisation <span className="normal-case tracking-normal text-subtle">(optional)</span>
        </label>
        <input id="organisation" name="organisation" type="text" autoComplete="organization" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="role" className={labelClass}>
          I am a
        </label>
        <select id="role" name="role" defaultValue="Founder" className={`${fieldClass} cursor-pointer appearance-none`}>
          {roles.map((r) => (
            <option key={r} value={r} className="bg-raised text-ink">
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className={labelClass}>
          What are you working on?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describe('message') ?? 'message-hint'}
          placeholder="The technology, the problem it solves, and where you are today."
          className={`${fieldClass} resize-y`}
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-sm text-[#e0806b]">
            {errors.message}
          </p>
        ) : (
          <p id="message-hint" className="mt-2 text-sm text-subtle">
            No pitch deck needed. Links are welcome.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex h-12 min-w-[12rem] shrink-0 items-center whitespace-nowrap justify-center gap-3 rounded-full bg-ink px-7 text-[0.9375rem] font-normal text-paper transition-colors duration-300 hover:bg-white disabled:cursor-default disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
        <p className="text-sm text-subtle">
          Submissions are handled under the{' '}
          <a href={site.privacyUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">
            QuantumX privacy policy
          </a>
          .
        </p>
      </div>

      <div aria-live="assertive" className="sm:col-span-2">
        {status === 'error' ? (
          <p className="border-l border-[#e0806b] pl-4 text-[0.9375rem] text-ink">
            Your message could not be sent from here. Please email us directly at{' '}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
