import type { Metadata } from 'next';
import { FoundershipForm } from '@/components/foundership-form';
import { supportOptions } from '@/content/foundership';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/json-ld';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/structured-data';

const seo = {
  title: 'Apply: QuantumX Foundership Program',
  socialTitle: 'Apply to the QuantumX Foundership Program.',
  description:
    'Building in quantum technology? Apply to the QuantumX Foundership Program for investment, incubation, mentorship and more. Fill the form and we will reach out.',
  path: '/foundership-apply/',
};

export const metadata: Metadata = pageMetadata({
  ...seo,
  image: { slug: 'foundership', alt: 'Apply to build with QuantumX. The QuantumX Foundership Program.' },
});

const structuredData = graph(
  webPageSchema({ type: 'WebPage', path: seo.path, name: seo.title, description: seo.description, image: '/og/foundership.jpg' }),
  breadcrumbSchema([{ name: 'Foundership Program', path: seo.path }]),
);

export default function FoundershipApplyPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <section
        aria-labelledby="foundership-title"
        className="pb-[clamp(5rem,11vw,10rem)] pt-[calc(var(--header-h)+clamp(3.5rem,11vw,9rem))]"
      >
        {/* Phones: intro, then the form, then the details. Desktop: intro and details on the left, form on the right. */}
        <div className="container-site grid grid-cols-12 gap-x-6 gap-y-12 lg:grid-rows-[auto_1fr] lg:gap-y-14">
          <div className="col-span-12 lg:col-span-5">
            <h1
              id="foundership-title"
              className="animate-rise max-w-[12ch] text-display font-light"
              style={{ ['--delay' as string]: '80ms' }}
            >
              Apply to build with us.
            </h1>
            <p className="animate-rise mt-6 max-w-md text-lead text-ink/80 sm:mt-8" style={{ ['--delay' as string]: '160ms' }}>
              Fill in the form and tell us what you need. We will reach out to you with the details.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
            <div className="animate-rise border-t border-line pt-8 sm:pt-10" style={{ ['--delay' as string]: '200ms' }}>
              <h2 className="sr-only">Application form</h2>
              <FoundershipForm />
            </div>
          </div>

          <dl
            className="animate-rise col-span-12 space-y-8 self-start border-t border-line pt-8 lg:col-span-5"
            style={{ ['--delay' as string]: '240ms' }}
          >
            <div>
              <dt className="eyebrow">How it works</dt>
              <dd className="mt-3 text-[1.0625rem] text-ink/85">
                Apply in a few minutes. The team reviews every application and follows up by email.
              </dd>
            </div>
            {/* On phones the form's own toggles already list these. */}
            <div className="hidden lg:block">
              <dt className="eyebrow">What we offer</dt>
              <dd className="mt-3 text-[1.0625rem] text-ink/85">{supportOptions.join(', ')}</dd>
            </div>
            <div>
              <dt className="eyebrow">Questions</dt>
              <dd className="mt-3">
                <a href={`mailto:${site.email}`} className="group inline-flex min-h-11 items-center text-[1.0625rem]">
                  <span className="link-underline">{site.email}</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
