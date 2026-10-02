import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight } from './icons';

export function isExternal(href: string) {
  return /^(https?:|mailto:)/.test(href);
}

/** Link that opens external URLs in a new tab and routes internal ones through next/link. */
export function SmartLink({
  href,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  if (isExternal(href)) {
    const newTab = href.startsWith('http');
    return (
      <a
        href={href}
        className={className}
        aria-label={ariaLabel}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

type ButtonVariant = 'solid' | 'outline';

const buttonBase =
  'group inline-flex h-12 items-center justify-center gap-3 rounded-full px-6 text-[0.9375rem] font-normal tracking-[-0.005em] transition-colors duration-300 ease-out';

const buttonVariants: Record<ButtonVariant, string> = {
  solid: 'bg-ink text-paper hover:bg-white',
  outline: 'border border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-paper',
};

export function ButtonLink({
  href,
  children,
  variant = 'outline',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  const external = isExternal(href) && href.startsWith('http');
  return (
    <SmartLink href={href} className={`${buttonBase} ${buttonVariants[variant]} ${className}`}>
      <span>{children}</span>
      {external ? (
        <ArrowUpRight />
      ) : (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
      )}
    </SmartLink>
  );
}

/** Text link with an arrow, for "read more" style actions. */
export function ArrowLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = isExternal(href) && href.startsWith('http');
  return (
    <SmartLink
      href={href}
      className={`group inline-flex items-center gap-2 text-[0.9375rem] font-normal text-ink ${className}`}
    >
      <span className="link-underline">{children}</span>
      {external ? (
        <ArrowUpRight className="h-3.5 w-3.5 text-muted transition-colors group-hover:text-ink" />
      ) : (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
      )}
    </SmartLink>
  );
}

/**
 * Section opener used across the site: a small index label on the left and a
 * large heading, with optional supporting copy, on an asymmetric grid.
 */
export function SectionHeading({
  index,
  label,
  title,
  children,
  id,
  as: Tag = 'h2',
}: {
  index?: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  as?: 'h1' | 'h2';
}) {
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-6">
      <p className="eyebrow col-span-12 flex items-baseline gap-3 lg:col-span-3" data-reveal>
        {index ? <span className="tabular-nums text-subtle">{index}</span> : null}
        <span>{label}</span>
      </p>
      <div className="col-span-12 lg:col-span-9">
        <Tag id={id} className="max-w-[18ch] text-headline font-light" data-reveal>
          {title}
        </Tag>
        {children ? (
          <div className="mt-8 max-w-2xl text-lead text-muted" data-reveal>
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function Section({
  children,
  className = '',
  id,
  labelledBy,
  bordered = true,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${bordered ? 'border-t border-line' : ''} py-[clamp(5rem,11vw,10rem)] ${className}`}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}
