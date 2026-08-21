import { SITE } from '@/config/site';
import { voiceCreatorCopy } from '@/content/voice-creator-copy';
import { VOICE_CREATOR_KEYWORDS } from '@/content/voice-creator-keywords';

/**
 * Keyword-driven landing pages for the MultiMe AI "Audio Creator Partner"
 * program (target audience: KOL / KOC / content creators).
 *
 * Every keyword in `voice-creator-keywords.ts` becomes one page under
 * `/voice-creator/<slug>`. The page skeleton is identical; only the
 * intent-sensitive copy (H1, promise, hero bullets, meta, one FAQ) changes per
 * keyword *theme*, so a visitor who searched for a remote recording job lands
 * on wording about working from home while someone who searched for creator
 * monetization reads about repurposing an existing catalogue.
 *
 * Unlike the multi-locale strongbody.ai build, this is a single-language site:
 * both the slugs and the copy are in ${SITE.language}, so the URL matches the
 * phrase a local visitor actually typed.
 */

export type VoiceCreatorTheme = 'earn' | 'jobs' | 'sell' | 'creator';

export interface VoiceCreatorKeyword {
  /** Display form — properly cased and punctuated; this is the page's H1. */
  keyword: string;
  /** ASCII slug for the URL. */
  slug: string;
  theme: VoiceCreatorTheme;
}

interface ThemeCopy {
  promise: string;
  subheadline: string;
  bullets: string[];
  monetizationLead: string;
  faqQuestion: string;
  faqAnswer: string;
  seoDescription: string;
}

/** Anchor ids shared by the nav, the section elements and the smooth scroller. */
export type VoiceCreatorNavKey = 'who' | 'what' | 'earn' | 'start' | 'faq';

/**
 * Every string the chrome renders. Spelled out rather than typed as a
 * `Record<string, string>`: `nav` is an object, so an index signature of
 * `string` would not describe this shape.
 */
export interface VoiceCreatorUi {
  badge: string;
  getApp: string;
  downloadOn: string;
  seeHow: string;
  heroNote: string;
  heroCaption: string;
  heroImageAlt: string;
  studioImageAlt: string;
  whoEyebrow: string;
  whoTitle: string;
  whoLead: string;
  whatEyebrow: string;
  whatTitle: string;
  whatTablistLabel: string;
  whatCaption: string;
  earnEyebrow: string;
  earnTitle: string;
  startEyebrow: string;
  startTitle: string;
  startCtaTitle: string;
  startCtaText: string;
  benefitsEyebrow: string;
  benefitsTitle: string;
  requirementsTitle: string;
  faqEyebrow: string;
  faqTitle: string;
  relatedTitle: string;
  ctaTitle: string;
  ctaText: string;
  ctaContact: string;
  stickyCta: string;
  navLabel: string;
  nav: Record<VoiceCreatorNavKey, string>;
}

export interface VoiceCreatorCopy {
  ui: VoiceCreatorUi;
  facts: Array<{ value: string; label: string }>;
  platforms: string[];
  audiences: Array<{ tag: string; title: string; text: string }>;
  roles: Array<{ label: string; title: string; text: string; points: string[] }>;
  moneyPoints: Array<{ title: string; text: string }>;
  steps: Array<{ title: string; text: string }>;
  benefits: Array<{ title: string; text: string }>;
  requirements: string[];
  faqs: Array<{ question: string; answer: string }>;
  themes: Record<VoiceCreatorTheme, ThemeCopy>;
  hub: { headline: string; seoTitle: string; seoDescription: string };
  seoTitleSuffix: string;
}

const KEYWORD_BY_SLUG = new Map(VOICE_CREATOR_KEYWORDS.map(item => [item.slug, item]));

export function getAllVoiceCreatorSlugs(): string[] {
  return VOICE_CREATOR_KEYWORDS.map(item => item.slug);
}

export { VOICE_CREATOR_KEYWORDS };

/* ── page model ────────────────────────────────────────────────────────── */

export interface VoiceCreatorPage {
  /** `null` on the hub page at `/voice-creator`. */
  slug: string | null;
  /** H1 — the localized search phrase. */
  headline: string;
  /** Same phrase, for prose and metadata where the raw query reads better. */
  keyword: string;
  theme: VoiceCreatorTheme;
  promise: string;
  subheadline: string;
  bullets: string[];
  monetizationLead: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  path: string;
  faqs: Array<{ question: string; answer: string }>;
  related: Array<{ href: string; label: string }>;
  copy: VoiceCreatorCopy;
}

export const VOICE_CREATOR_SITE_URL = `https://${SITE.brandDomain}`;

function urlFor(slug: string | null) {
  return slug
    ? `${VOICE_CREATOR_SITE_URL}/voice-creator/${slug}`
    : `${VOICE_CREATOR_SITE_URL}/voice-creator`;
}

/** `{keyword}` is the only placeholder these strings use. */
function fill(template: string, keyword: string) {
  return template.replace(/\{keyword\}/g, keyword);
}

const RELATED_COUNT = 8;

const THEME_ORDER: VoiceCreatorTheme[] = ['earn', 'jobs', 'sell', 'creator'];

function buildRelated(current: VoiceCreatorKeyword | null): VoiceCreatorPage['related'] {
  const sameTheme = current
    ? VOICE_CREATOR_KEYWORDS.filter(
        item => item.theme === current.theme && item.slug !== current.slug,
      )
    : [];

  // Round-robin over the other intents instead of walking the catalogue in
  // order: `earn` holds 30 of the 50 keywords, so a flat slice would spend the
  // whole quota there and `sell` / `creator` would never be linked at all.
  const queues = THEME_ORDER.filter(theme => theme !== current?.theme).map(theme =>
    VOICE_CREATOR_KEYWORDS.filter(item => item.theme === theme),
  );
  const otherThemes: VoiceCreatorKeyword[] = [];
  for (let round = 0; otherThemes.length < RELATED_COUNT; round += 1) {
    const before = otherThemes.length;
    for (const queue of queues) {
      if (queue[round]) otherThemes.push(queue[round]);
    }
    if (otherThemes.length === before) break;
  }

  // Same-intent links first (they convert), then a spread across the other
  // themes so the whole keyword network stays crawlable from any page.
  const picked = [...sameTheme.slice(0, RELATED_COUNT - 3), ...otherThemes].slice(
    0,
    RELATED_COUNT,
  );

  return picked.map(item => ({
    href: `/voice-creator/${item.slug}`,
    label: item.keyword,
  }));
}

/** Resolve a keyword page; returns `null` when the slug is unknown. */
export function resolveVoiceCreatorPage(slug: string): VoiceCreatorPage | null {
  const entry = KEYWORD_BY_SLUG.get(slug);
  if (!entry) return null;

  const theme = voiceCreatorCopy.themes[entry.theme];

  return {
    slug: entry.slug,
    headline: entry.keyword,
    keyword: entry.keyword,
    theme: entry.theme,
    promise: theme.promise,
    subheadline: theme.subheadline,
    bullets: theme.bullets,
    monetizationLead: theme.monetizationLead,
    seoTitle: `${entry.keyword} — ${voiceCreatorCopy.seoTitleSuffix}`,
    seoDescription: fill(theme.seoDescription, entry.keyword),
    canonicalUrl: urlFor(entry.slug),
    path: `/voice-creator/${entry.slug}`,
    faqs: [
      ...voiceCreatorCopy.faqs,
      {
        question: fill(theme.faqQuestion, entry.keyword),
        answer: fill(theme.faqAnswer, entry.keyword),
      },
    ],
    related: buildRelated(entry),
    copy: voiceCreatorCopy,
  };
}

/** The hub page at `/voice-creator` — same layout, broadest wording. */
export function getVoiceCreatorHubPage(): VoiceCreatorPage {
  const theme = voiceCreatorCopy.themes.earn;

  return {
    slug: null,
    headline: voiceCreatorCopy.hub.headline,
    keyword: voiceCreatorCopy.hub.headline,
    theme: 'earn',
    promise: theme.promise,
    subheadline: theme.subheadline,
    bullets: theme.bullets,
    monetizationLead: theme.monetizationLead,
    seoTitle: voiceCreatorCopy.hub.seoTitle,
    seoDescription: voiceCreatorCopy.hub.seoDescription,
    canonicalUrl: urlFor(null),
    path: '/voice-creator',
    faqs: voiceCreatorCopy.faqs,
    related: buildRelated(null),
    copy: voiceCreatorCopy,
  };
}
