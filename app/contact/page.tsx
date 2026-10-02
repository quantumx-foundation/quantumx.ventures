import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { site } from '@/content/site';
import { audiences } from '@/content/studio';
import { pageMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/json-ld';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/structured-data';

const seo = {
  title: 'Contact: Build a Quantum Company',
  socialTitle: 'Tell us what you are building.',
  description:
    'Founders, researchers and technical teams: tell QuantumX Ventures what you are building in quantum technology. Early is fine. A result or prototype is enough.',
  path: '/contact/',
};

export const metadata: Metadata = pageMetadata({
  ...seo,
  image: { slug: 'contact', alt: 'Tell us what you are building. Contact QuantumX Ventures.' },
});

const structuredData = graph(
  webPageSchema({ type: 'ContactPage', path: seo.path, name: seo.title, description: seo.description, image: '/og/contact.jpg' }),
  breadcrumbSchema([{ name: 'Contact', path: seo.path }]),
);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <section
        aria-labelledby="contact-title"
        className="pb-[clamp(5rem,11vw,10rem)] pt-[calc(var(--header-h)+clamp(3.5rem,11vw,9rem))]"
      >
        <div className="container-site grid grid-cols-12 gap-x-6 gap-y-16">
          <div className="col-span-12 lg:col-span-5">
            <p className="eyebrow animate-rise flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-copper" aria-hidden="true" />
              Start a conversation
            </p>
            <h1
              id="contact-title"
              className="animate-rise mt-8 max-w-[12ch] text-display font-light"
              style={{ ['--delay' as string]: '80ms' }}
            >
              Tell us what you are building.
            </h1>
            <p className="animate-rise mt-8 max-w-md text-lead text-ink/80" style={{ ['--delay' as string]: '160ms' }}>
              Early is fine. A research result, a prototype or a clear problem is enough to start.
            </p>

            <dl className="animate-rise mt-14 space-y-8 border-t border-line pt-8" style={{ ['--delay' as string]: '240ms' }}>
              <div>
                <dt className="eyebrow">Email</dt>
                <dd className="mt-3">
                  <a href={`mailto:${site.email}`} className="link-underline text-[1.0625rem]">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Based at</dt>
                <dd className="mt-3 text-[1.0625rem] text-ink/85">{site.location}</dd>
              </div>
              <div>
                <dt className="eyebrow">We work with</dt>
                <dd className="mt-3 text-[1.0625rem] text-ink/85">{audiences.map((a) => a.title).join(', ')}</dd>
              </div>
            </dl>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="animate-rise border-t border-line pt-10" style={{ ['--delay' as string]: '200ms' }}>
              <h2 className="sr-only">Contact form</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
