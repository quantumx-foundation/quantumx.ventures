import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-end pb-[clamp(4rem,9vw,8rem)] pt-[calc(var(--header-h)+4rem)]">
      <div className="container-site">
        <p className="eyebrow">404</p>
        <h1 className="mt-8 max-w-[14ch] text-mega font-light">This state collapsed.</h1>
        <p className="mt-10 max-w-md text-lead text-muted">The page you were looking for does not exist or has moved.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" variant="solid">
            Back to the studio
          </ButtonLink>
          <ButtonLink href="/contact/">Start a conversation</ButtonLink>
        </div>
      </div>
    </section>
  );
}
