/**
 * schema.org JSON-LD builders. Everything here is derived from content/ so the
 * structured data always matches what the page shows.
 */
import { site } from '@/content/site';
import { people } from '@/content/people';
import type { Insight } from '@/content/insights';

const abs = (path: string) => new URL(path, site.url).toString();

export const ids = {
  organization: abs('/#organization'),
  website: abs('/#website'),
  parent: `${site.parent.url}#organization`,
};

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ids.organization,
    name: site.name,
    alternateName: site.shortName,
    url: abs('/'),
    logo: { '@type': 'ImageObject', url: abs('/icon.png'), width: 1024, height: 1024 },
    image: abs('/og/home.jpg'),
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    address: { '@type': 'PostalAddress', ...site.address },
    parentOrganization: { '@type': 'Organization', '@id': ids.parent, name: site.parent.name, url: site.parent.url },
    founder: people.map((p) => ({ '@type': 'Person', name: p.name, jobTitle: p.role })),
    knowsAbout: [
      'Quantum computing',
      'Quantum software',
      'Post-quantum cryptography',
      'Quantum sensing',
      'Venture building',
      'Research commercialisation',
    ],
    sameAs: site.social.map((s) => s.href),
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: abs('/'),
    name: site.name,
    description: site.description,
    inLanguage: 'en',
    publisher: { '@id': ids.organization },
  };
}

type PageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';

export function webPageSchema({
  type = 'WebPage',
  path,
  name,
  description,
  image,
}: {
  type?: PageType;
  path: string;
  name: string;
  description: string;
  image?: string;
}) {
  return {
    '@type': type,
    '@id': `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    inLanguage: 'en',
    isPartOf: { '@id': ids.website },
    about: { '@id': ids.organization },
    ...(image ? { primaryImageOfPage: { '@type': 'ImageObject', url: abs(image) } } : {}),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  const items = [{ name: 'Home', path: '/' }, ...trail];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function peopleSchema() {
  return people.map((p) => ({
    '@type': 'Person',
    name: p.name,
    jobTitle: p.role,
    description: p.summary,
    image: abs(p.photo.src),
    worksFor: { '@id': ids.organization },
    url: p.profileUrl,
    sameAs: [p.profileUrl, p.linkedin, p.x].filter(Boolean),
  }));
}

export function insightsListSchema(items: readonly Insight[]) {
  return {
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Article',
        headline: item.title,
        description: item.description,
        datePublished: item.date,
        url: item.href,
        publisher: { '@type': 'Organization', '@id': ids.parent, name: item.publisher },
      },
    })),
  };
}

/** Wraps nodes in a single @graph document. */
export function graph(...nodes: (object | object[])[]) {
  return { '@context': 'https://schema.org', '@graph': nodes.flat() };
}
