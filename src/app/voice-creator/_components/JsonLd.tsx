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
      // The advertised brand and the brand on the domain differ, so the
      // provider node states the relationship rather than leaving a crawler to
      // infer it: StrongBody runs this domain, MultiMe AI is the product.
      provider: {
        '@type': 'Organization',
        name: 'StrongBody',
        url: VOICE_CREATOR_SITE_URL,
        brand: { '@type': 'Brand', name: 'MultiMe AI', url: 'https://www.multime.ai' },
        sameAs: ['https://www.strongbody.ai', 'https://www.multime.ai'],
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
