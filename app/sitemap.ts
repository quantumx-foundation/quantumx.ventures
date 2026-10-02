import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { sortedInsights } from '@/content/insights';

export const dynamic = 'force-static';

// The site is rebuilt on every content change, so build time is the last
// modification time. Insights uses its newest article date.
const built = new Date();
const latestInsight = new Date(sortedInsights()[0]?.date ?? built);

const routes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly'; lastModified?: Date }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/studio/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ventures/', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/thesis/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/insights/', priority: 0.7, changeFrequency: 'weekly', lastModified: latestInsight },
  { path: '/about/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact/', priority: 0.6, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: r.lastModified ?? built,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
