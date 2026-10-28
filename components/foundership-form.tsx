'use client';

import { useRef, useState, type FormEvent } from 'react';
import {
  commitments,
  focusAreas,
  referralSources,
  stages,
  supportOptions,
  teamSizes,
} from '@/content/foundership';
import { site } from '@/content/site';
import { EMAIL_PATTERN, MAX_LENGTH, submitNetlifyForm } from '@/lib/netlify-form';
import { recaptchaEnabled } from '@/lib/recaptcha';
import { ArrowRight, ChevronDown } from './icons';
import { Recaptcha, type RecaptchaHandle } from './recaptcha';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Field =
  | 'name'
  | 'email'
  | 'phone'
  | 'location'
  | 'focusArea'
  | 'teamSize'
  | 'commitment'
  | 'support'
  | 'raising'
  | 'founderProfile'
  | 'xProfile'
  | 'website'
  | 'pitch'
  | 'captcha';
type Errors = Partial<Record<Field, string>>;

const fieldClass =
  'block w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-[1.0625rem] font-light text-ink placeholder:text-subtle transition-colors duration-300 hover:border-ink/50 focus:border-ink focus:outline-none focus:ring-0 aria-[invalid=true]:border-[#e0806b]';

const labelClass = 'eyebrow block';

const optional = <span className="normal-case tracking-normal text-subtle">(optional)</span>;

/** A dropdown that starts on a "Choose one" prompt, so nothing is picked by accident. */
function Select({
  name,
  label,
  options,
  error,
  required = false,
  defaultValue,
}: {
  name: string;
  label: string;
  options: readonly string[];
  error?: string;
  required?: boolean;
  /** Preselects an option and drops the "Choose one" prompt. */
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label} {required ? null : optional}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          defaultValue={defaultValue ?? ''}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`${fieldClass} cursor-pointer appearance-none pr-8 invalid:text-subtle`}
        >
          {defaultValue ? null : (
            <option value="" disabled={required} className="bg-raised text-subtle">
              Choose one
            </option>
          )}
          {options.map((o) => (
            <option key={o} value={o} className="bg-raised text-ink">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
      </div>
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-sm text-[#e0806b]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function isUrl(value: string) {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return url.hostname.includes('.');
  } catch {
    return false;
  }
}

export function FoundershipForm() {
  const captcha = useRef<RecaptchaHandle>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [support, setSupport] = useState<string[]>([]);
  const wantsInvestment = support.includes('Investment');

  function toggle(option: string) {
    setSupport((current) =>
      current.includes(option) ? current.filter((o) => o !== option) : [...current, option],
    );
    setErrors((e) => ({ ...e, support: undefined }));
  }

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const value = (key: Field) => String(data.get(key) ?? '').trim();
    const next: Errors = {};
    if (!value('name')) next.name = 'Please tell us your name.';
    if (!EMAIL_PATTERN.test(value('email'))) next.email = 'Please enter a valid email address.';
    if (value('phone').replace(/\D/g, '').length < 7) next.phone = 'Please enter a valid phone number.';
    if (!value('location')) next.location = 'Please tell us where you are based.';
    if (!value('focusArea')) next.focusArea = 'Please pick the closest area.';
    if (!value('teamSize')) next.teamSize = 'Please tell us how big the team is.';
    if (!value('commitment')) next.commitment = 'Please tell us how you are working on it.';
    if (support.length === 0) next.support = 'Pick at least one thing you are looking for.';
    if (wantsInvestment && !value('raising')) next.raising = 'Please give a rough amount, even a range.';
    if (!isUrl(value('founderProfile'))) next.founderProfile = 'Please add a link to your LinkedIn or founder profile.';
    if (value('xProfile') && !isUrl(value('xProfile'))) next.xProfile = 'That does not look like a link.';
    if (value('website') && !isUrl(value('website'))) next.website = 'That does not look like a link.';
    if (value('pitch').length < 20) next.pitch = 'A few sentences helps us understand what you are building.';
    if (recaptchaEnabled && !captcha.current?.getToken()) next.captcha = 'Please confirm you are not a robot.';
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const found = validate(form);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      const target = firstInvalid === 'support' ? '[data-support-option]' : `[name="${firstInvalid}"]`;
      form.querySelector<HTMLElement>(target)?.focus();
      return;
    }

    setStatus('sending');
    try {
      await submitNetlifyForm(form);
      setStatus('sent');
      setSupport([]);
      form.reset();
    } catch {
      captcha.current?.reset();
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" aria-live="polite" className="border-l border-ink pl-6">
        <p className="text-title font-normal">Thank you. Your application is in.</p>
        <p className="mt-3 max-w-md text-muted">
          The team reads every application. We will reach out to the email address you gave us with the details
          and next steps.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="link-underline mt-6 text-[0.9375rem] font-normal">
          Submit another application
        </button>
      </div>
    );
  }

  const describe = (field: Field) => (errors[field] ? `${field}-error` : undefined);
  const error = (field: Field) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-2 text-sm text-[#e0806b]">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form
      name="foundership"
      method="POST"
      data-netlify="true"
      netlify-honeypot="fax_number"
      data-netlify-recaptcha={recaptchaEnabled ? 'true' : undefined}
      noValidate
      onSubmit={onSubmit}
      aria-busy={status === 'sending'}
      className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 sm:gap-y-10"
    >
      <input type="hidden" name="form-name" value="foundership" />
      <input type="hidden" name="support" value={support.join(', ')} />
      <p className="hidden">
        <label>
          Leave this field empty
          <input name="fax_number" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div>
        <label htmlFor="name" className={labelClass}>
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={MAX_LENGTH.name}
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describe('name')}
          className={fieldClass}
        />
        {error('name')}
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
          maxLength={MAX_LENGTH.email}
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describe('email')}
          className={fieldClass}
        />
        {error('email')}
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={MAX_LENGTH.phone}
          required
          placeholder="+91 …"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={describe('phone')}
          className={fieldClass}
        />
        {error('phone')}
      </div>

      <div>
        <label htmlFor="location" className={labelClass}>
          City and country
        </label>
        <input
          id="location"
          name="location"
          type="text"
          autoComplete="address-level2"
          maxLength={MAX_LENGTH.short}
          required
          placeholder="Bengaluru, India"
          aria-invalid={Boolean(errors.location)}
          aria-describedby={describe('location') ?? 'location-hint'}
          className={fieldClass}
        />
        {errors.location ? (
          error('location')
        ) : (
          <p id="location-hint" className="mt-2 text-sm text-subtle">
            Where you and your team are based.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          Startup or project name {optional}
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={MAX_LENGTH.short}
          className={fieldClass}
        />
      </div>

      <Select name="stage" label="Stage" options={stages} defaultValue="Idea" required />

      <Select name="focusArea" label="Focus area" options={focusAreas} error={errors.focusArea} required />
      <Select name="teamSize" label="Team size" options={teamSizes} error={errors.teamSize} required />
      <Select name="commitment" label="Commitment" options={commitments} error={errors.commitment} required />
      <Select name="referral" label="How did you hear about us?" options={referralSources} />

      <fieldset className="sm:col-span-2" aria-describedby={describe('support') ?? 'support-hint'}>
        <legend className={labelClass}>What are you looking for?</legend>
        <p id="support-hint" className="mt-2 text-sm text-subtle">
          Pick all that apply.
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5 sm:mt-5 sm:gap-3">
          {supportOptions.map((option) => {
            const on = support.includes(option);
            return (
              <button
                key={option}
                type="button"
                data-support-option
                aria-pressed={on}
                onClick={() => toggle(option)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[0.9375rem] sm:px-5 font-normal transition-colors duration-300 ${
                  on ? 'border-ink bg-ink text-paper' : 'border-ink/30 text-ink hover:border-ink'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`inline-block h-1.5 w-1.5 rounded-full ${on ? 'bg-copper' : 'bg-ink/30'}`}
                />
                {option}
              </button>
            );
          })}
        </div>
        {error('support')}
      </fieldset>

      {wantsInvestment ? (
        <div className="sm:col-span-2">
          <label htmlFor="raising" className={labelClass}>
            How much are you raising?
          </label>
          <input
            id="raising"
            name="raising"
            type="text"
            maxLength={MAX_LENGTH.short}
            required
            placeholder="For example, ₹50 lakh or $250k"
            aria-invalid={Boolean(errors.raising)}
            aria-describedby={describe('raising') ?? 'raising-hint'}
            className={fieldClass}
          />
          {errors.raising ? (
            error('raising')
          ) : (
            <p id="raising-hint" className="mt-2 text-sm text-subtle">
              A rough amount or range is fine.
            </p>
          )}
        </div>
      ) : null}

      <div>
        <label htmlFor="founderProfile" className={labelClass}>
          LinkedIn or founder profile
        </label>
        <input
          id="founderProfile"
          name="founderProfile"
          type="url"
          inputMode="url"
          maxLength={MAX_LENGTH.url}
          required
          placeholder="linkedin.com/in/…"
          aria-invalid={Boolean(errors.founderProfile)}
          aria-describedby={describe('founderProfile')}
          className={fieldClass}
        />
        {error('founderProfile')}
      </div>

      <div>
        <label htmlFor="xProfile" className={labelClass}>
          X profile {optional}
        </label>
        <input
          id="xProfile"
          name="xProfile"
          type="url"
          inputMode="url"
          maxLength={MAX_LENGTH.url}
          placeholder="x.com/…"
          aria-invalid={Boolean(errors.xProfile)}
          aria-describedby={describe('xProfile')}
          className={fieldClass}
        />
        {error('xProfile')}
      </div>

      <div>
        <label htmlFor="github" className={labelClass}>
          GitHub or Google Scholar {optional}
        </label>
        <input id="github" name="github" type="url" inputMode="url" maxLength={MAX_LENGTH.url} className={fieldClass} />
      </div>

      <div>
        <label htmlFor="website" className={labelClass}>
          Website or pitch deck {optional}
        </label>
        <input
          id="website"
          name="website"
          type="url"
          inputMode="url"
          maxLength={MAX_LENGTH.url}
          aria-invalid={Boolean(errors.website)}
          aria-describedby={describe('website')}
          className={fieldClass}
        />
        {error('website')}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="pitch" className={labelClass}>
          What are you building?
        </label>
        <textarea
          id="pitch"
          name="pitch"
          rows={4}
          maxLength={MAX_LENGTH.long}
          required
          aria-invalid={Boolean(errors.pitch)}
          aria-describedby={describe('pitch') ?? 'pitch-hint'}
          placeholder="The technology, the problem it solves, and where you are today."
          className={`${fieldClass} resize-y`}
        />
        {errors.pitch ? (
          error('pitch')
        ) : (
          <p id="pitch-hint" className="mt-2 text-sm text-subtle">
            A few sentences is plenty. We will follow up for the details.
          </p>
        )}
      </div>

      {recaptchaEnabled ? (
        <div className="sm:col-span-2">
          <Recaptcha ref={captcha} onVerify={() => setErrors((e) => ({ ...e, captcha: undefined }))} />
          {error('captcha')}
        </div>
      ) : null}

      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex h-12 min-w-[12rem] shrink-0 items-center whitespace-nowrap justify-center gap-3 rounded-full bg-ink px-7 text-[0.9375rem] font-normal text-paper transition-colors duration-300 hover:bg-white disabled:cursor-default disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Submit application'}
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
            Your application could not be sent from here. Please email us directly at{' '}
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
