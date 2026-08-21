/**
 * Locale-independent assets for the Voice Creator landing page.
 * All copy lives in `src/content/voice-creator-copy.ts`.
 */

const HERO_IMG =
  'https://strongbody-files-api.s3.ap-southeast-1.amazonaws.com/public/wellness%20test/1786937014333450583_hero.png';

/** Unsplash, sized and cropped at the CDN — every shot is a creator at work. */
const unsplash = (id: string, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const IMAGES = {
  hero: HERO_IMG,
  /** Two people recording together with headsets on. */
  studio: unsplash('1668606143326-4d53db523e00', 1200),
};

/** One photo per "who it is for" card, in the same order as the copy. */
export const AUDIENCE_IMAGES = [
  /** A creator filming another creator — the KOC/UGC shoot. */
  unsplash('1695408246612-584543865997', 900),
  /** A performer with a mic in hand. */
  unsplash('1560297035-0ed84c4175f6', 900),
  /** A podcaster recording in front of a studio mic. */
  unsplash('1593697909683-bccb1b9e68a4', 900),
];

/** Step numbers are presentation, not copy. */
export const STEP_NUMBERS = ['01', '02', '03', '04'];

export const CONTACT = {
  name: 'Emily Brown',
  email: 'customercare@strongbody.ai',
};
