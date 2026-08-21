import { SITE } from '@/config/site';
import { VOICE_CREATOR_SITE_URL, type VoiceCreatorPage } from '@/lib/voice-creator';
import { IMAGES } from './data';

/**
 * Structured data for a keyword landing page: the FAQ block (rich results),
 * the breadcrumb trail, and the program itself described as a Service.
 */
export default function JsonLd({ page }: { page: VoiceCreatorPage }) {
  const url = page.canonicalUrl;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: SITE.locale,
      mainEntity: page.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: VOICE_CREATOR_SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Audio Creator Partner',
          item: `${VOICE_CREATOR_SITE_URL}/voice-creator`,
        },
        ...(page.slug
          ? [{ '@type': 'ListItem', position: 3, name: page.headline, item: url }]
          : []),
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'MultiMe AI Audio Creator Partner',
      serviceType: 'Audio content monetization for creators',
      description: page.seoDescription,
      areaServed: SITE.countryEn,
      url,
      image: IMAGES.hero,
      provider: {
        '@type': 'Organization',
        name: 'StrongBody',
        url: VOICE_CREATOR_SITE_URL,
      },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
