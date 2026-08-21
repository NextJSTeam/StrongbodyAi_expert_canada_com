import type { VoiceCreatorFooterCopy } from '@/content/voice-creator-footer';

/**
 * The four columns strongbody.ai shows a signed-out visitor, in the same order.
 *
 * Every href is absolute: these are marketplace routes that exist on
 * strongbody.ai and not on this country domain, so linking relatively would
 * point every one of them at a 404.
 */
const SITE = 'https://www.strongbody.ai';

export type FooterLabelKey = keyof VoiceCreatorFooterCopy['links'];

export interface FooterItem {
  key: FooterLabelKey;
  href: string;
  /** Renders with the palm mark, as on strongbody.ai. */
  hea?: boolean;
  /** strongbody.ai hides this from signed-out visitors in the mobile menu. */
  authOnly?: boolean;
}

export interface FooterColumn {
  id: string;
  titleKey: keyof VoiceCreatorFooterCopy['columns'];
  items: FooterItem[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    id: 'discover',
    titleKey: 'discover',
    items: [
      { key: 'servicesCategories', href: `${SITE}/service-categories` },
      { key: 'productCollections', href: `${SITE}/products` },
      { key: 'strongbodyMultimeAi', href: `${SITE}/multimeapp` },
      { key: 'transYourVoice', href: 'https://www.multime.ai/profile' },
      { key: 'popularServices', href: `${SITE}/popular-services`, hea: true },
      { key: 'featuredExperts', href: `${SITE}/featured-experts` },
      { key: 'successStories', href: `${SITE}/success-story` },
    ],
  },
  {
    id: 'for_users',
    titleKey: 'forUser',
    items: [
      { key: 'howItWorks', href: `${SITE}/how-we-work` },
      { key: 'howToWriteRequest', href: `${SITE}/mini-jd` },
      { key: 'solutionsForBuyer', href: `${SITE}/solutions-for-buyer` },
      { key: 'trustSafety', href: `${SITE}/trust-and-safety` },
      { key: 'verificationGuide', href: `${SITE}/verification-guidelines` },
      { key: 'paymentProtection', href: `${SITE}/secure-payment-protect` },
      { key: 'helpCenter', href: `${SITE}/help-center` },
    ],
  },
  {
    id: 'business',
    titleKey: 'business',
    items: [
      { key: 'becomePublisher', href: `${SITE}/become-publisher` },
      { key: 'becomeProvider', href: `${SITE}/become-seller/profession-search` },
      { key: 'affiliateProgram', href: `${SITE}/affiliate/introduction`, authOnly: true },
      { key: 'whatIsHea', href: `${SITE}/what-is-hea`, hea: true },
      { key: 'forStudents', href: `${SITE}/education` },
      { key: 'hrFreelancer', href: `${SITE}/freelance-recuiter` },
      { key: 'saleGlobalVoice', href: `${SITE}/sale-apply` },
      { key: 'letterOrganization', href: `${SITE}/letter-organization` },
    ],
  },
  {
    id: 'company',
    titleKey: 'company',
    items: [
      { key: 'aboutUs', href: `${SITE}/about-us` },
      { key: 'getInspired', href: `${SITE}/well-ness-global-get-inspired-hea` },
      { key: 'blogNews', href: `${SITE}/blogs` },
      { key: 'termsOfService', href: `${SITE}/articles/terms-and-conditions` },
      { key: 'privacyPolicy', href: `${SITE}/articles/privacy-policy` },
      { key: 'contactUs', href: `${SITE}/contact` },
    ],
  },
];
