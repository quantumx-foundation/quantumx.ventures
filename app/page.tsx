import type { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import {
  HomeCapabilities,
  HomeCta,
  HomeEcosystem,
  HomeInsights,
  HomePeople,
  HomeProcess,
  HomeStudio,
  HomeThesis,
  HomeVentures,
} from '@/components/home/sections';
import { site } from '@/content/site';
import { homeOgImage } from '@/lib/metadata';

const socialTitle = `${site.name}: ${site.tagline.replace(/\.$/, '')}`;

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: site.name,
    url: '/',
    title: socialTitle,
    description: site.description,
    images: [homeOgImage],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeStudio />
      <HomeCapabilities />
      <HomeThesis />
      <HomeVentures />
      <HomeProcess />
      <HomeEcosystem />
      <HomePeople />
      <HomeInsights />
      <HomeCta />
    </>
  );
}
