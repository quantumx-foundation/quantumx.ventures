import { site } from '@/content/site';
import { ButtonLink } from '../ui';

export function ClosingCta({
  title = 'Working on a quantum technology that should be a company?',
  body = 'Founders, researchers and collaborators: tell us what you are building. We read every message.',
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="border-t border-line py-[clamp(6rem,13vw,12rem)]">
      <div className="container-site">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <p className="eyebrow col-span-12 lg:col-span-3" data-reveal>
            Start a conversation
          </p>
          <div className="col-span-12 lg:col-span-9">
            <h2 id="cta-title" className="max-w-[16ch] text-display font-light" data-reveal>
              {title}
            </h2>
            <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-end" data-reveal>
              <p className="max-w-md text-lead text-muted">{body}</p>
              <div className="flex flex-col gap-4 md:items-end">
                <ButtonLink href="/contact/" variant="solid">
                  Start a conversation
                </ButtonLink>
                <a href={`mailto:${site.email}`} className="link-underline text-[0.9375rem] text-muted hover:text-ink">
                  or email {site.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
