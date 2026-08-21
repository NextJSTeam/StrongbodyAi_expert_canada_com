import type { Metadata } from 'next';
import { SITE } from '@/config/site';
import { getVoiceCreatorHubPage, VOICE_CREATOR_KEYWORDS } from '@/lib/voice-creator';
import VoiceCreatorLanding from './_components/VoiceCreatorLanding';
import JsonLd from './_components/JsonLd';
import { IMAGES } from './_components/data';

export function generateMetadata(): Metadata {
  const page = getVoiceCreatorHubPage();

  return {
    title: { absolute: page.seoTitle },
    description: page.seoDescription,
    keywords: VOICE_CREATOR_KEYWORDS.slice(0, 20).map(item => item.keyword),
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

export default function VoiceCreatorHubPage() {
  const page = getVoiceCreatorHubPage();

  return (
    <>
      <JsonLd page={page} />
      <VoiceCreatorLanding page={page} />
    </>
  );
}
