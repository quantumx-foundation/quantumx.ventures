import type { Metadata } from 'next';
import { site } from '@/content/site';

/** Per-page metadata with matching canonical, Open Graph and Twitter fields. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: site.name, type: 'website' },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
  };
}
