import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE } from '@/config/site';
import { getAllVoiceCreatorSlugs, resolveVoiceCreatorPage } from '@/lib/voice-creator';
import VoiceCreatorLanding from '../_components/VoiceCreatorLanding';
import JsonLd from '../_components/JsonLd';
import { IMAGES } from '../_components/data';

type PageProps = { params: Promise<{ slug: string }> };

/**
 * The catalogue is a fixed list of 50 slugs and every page renders from local
 * data, so pre-rendering all of them costs almost nothing at build time.
 */
export function generateStaticParams() {
  return getAllVoiceCreatorSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = resolveVoiceCreatorPage(slug);

  if (!page) {
    return {
      title: { absolute: 'Audio Creator Partner | StrongBody AI' },
      robots: { index: false, follow: false },
    };
  }

  return {
    title: { absolute: page.seoTitle },
    description: page.seoDescription,
    keywords: [page.keyword, 'MultiMe AI', 'Audio Creator Partner'],
    alternates: { canonical: page.canonicalUrl },
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      url: page.canonicalUrl,
      type: 'website',
      siteName: SITE.siteName,
      locale: SITE.locale,
      images: [{ url: IMAGES.hero, width: 1200, height: 630, alt: page.headline }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seoTitle,
      description: page.seoDescription,
      images: [IMAGES.hero],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export default async function VoiceCreatorKeywordPage({ params }: PageProps) {
  const { slug } = await params;
  const page = resolveVoiceCreatorPage(slug);

  if (!page) notFound();

  return (
    <>
      <JsonLd page={page} />
      <VoiceCreatorLanding page={page} />
    </>
  );
}
