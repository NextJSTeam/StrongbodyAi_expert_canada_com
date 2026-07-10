import type { LanguageOption } from "@/lib/voice-translation-languages";

export const VOICE_TRANSLATION_COPY = {
  openGraphLocale: "en_CA",
  toConnector: "to",
  sourceLanguageLabel: (source: string) => `Source language: ${source}`,
  baseMetadataTitle: (source: string) => `Voice Translation App from ${source} | MultiMe AI`,
  baseMetadataDescription: (source: string) =>
    `Translate voice and chat messages from ${source} into other languages with MultiMe AI. Choose a language pair and start communicating across languages.`,
  baseHeroTitle: "MultiMeAI App - Speak & Translation Without Limits",
  baseHeroDescription:
    "The next-generation Voice translation Chat App that helps you speak naturally, translate instantly, and build real connections across languages.",
  baseConfiguredDescription: (source: string) =>
    `This country site is configured for ${source} as the source language. Choose a target language pair below.`,
  popularPairsHeading: "Popular language pairs",
  baseOverviewTitle: "Voice translation, chat translation, and real conversations in one app",
  baseOverviewDescription:
    "MultiMe AI helps travelers, businesses, freelancers, and wellness experts communicate with fewer language barriers.",
  downloadOn: "Download on the",
  getItOn: "Get it on",
  appStore: "App Store",
  googlePlay: "Google Play",
  pairFallbackTitle: "Translation App | MultiMe AI",
  pairMetadataTitle: (from: string, to: string) => `${from} to ${to} Translation App | MultiMe AI`,
  pairMetadataDescription: (from: string, to: string) =>
    `Translate ${from} to ${to} with MultiMe AI. Use voice translation, chat translation, and real-time conversations to connect across languages.`,
  pairKeywords: (from: string, to: string) => [
    `${from} to ${to} translation app`,
    `translate ${from} to ${to}`,
    `${from} ${to} voice translator`,
    "MultiMe AI translation app",
    "voice translation app",
    "chat translation app",
  ],
  featureList: (from: string, to: string) => [
    `${from} to ${to} voice translation`,
    `${from} to ${to} chat translation`,
    "Real-time multilingual communication",
    "Cross-border conversations for travel, work, wellness, and services",
  ],
  localizedIntroBySourceLanguage: {
    en: "For English speakers who need to communicate in another language, MultiMe AI helps make voice and chat translation easier in one app.",
  } as Record<string, string>,
  heroTitleLine1: (from: string) => `Speak ${from}.`,
  heroTitleLine2: (to: string) => `Be understood in ${to}.`,
  heroDescription: (to: string) =>
    `MultiMe AI helps you talk, chat, and connect with ${to} speakers without switching between translation tools.`,
  heroSubDescription: "Just open the app, speak naturally, and keep the conversation moving.",
  trustText: (from: string, to: string) =>
    `Built for ${from} speakers who need clear ${to} communication in daily conversations, service chats, and global business.`,
  trustItems: [
    "Voice-to-voice translation",
    "Business in chat",
    "Global services and experts",
    "iOS and Android app",
  ],
  howTitle: "How MultiMeAI App Works",
  howDescription: (from: string, to: string) =>
    `Open the app, speak or send a message, and let MultiMe AI help turn your ${from} into clear ${to}.`,
  howSteps: (from: string, to: string) => [
    {
      step: "1",
      title: "Download MultiMe AI",
      body: "Get the app from the App Store or Google Play and open your conversation.",
    },
    {
      step: "2",
      title: `Speak in ${from}`,
      body: "Talk naturally or send a voice/chat message inside the app.",
    },
    {
      step: "3",
      title: `Connect in ${to}`,
      body: "MultiMe AI helps translate the message so the other person can understand and reply.",
    },
  ],
  videoTitle: "How MultiMeAI App Works",
  businessTitle: "Business in Chat with Voice Translation",
  businessDescription: (from: string, to: string) =>
    `Help ${from} and ${to} speakers keep meetings, negotiations, and service conversations moving.`,
  businessImageAlt: "Business in Chat with Voice Translation",
  scenarioSectionTitle: (from: string, to: string) =>
    `Where ${from} to ${to} translation matters`,
  scenarioSectionDescription:
    "MultiMe AI is useful when translation is part of a real relationship, not just a one-time word lookup.",
  scenarios: (from: string, to: string) => [
    {
      title: "Travel and local help",
      desc: `Ask questions in ${from}, understand directions, and feel more confident when local support happens in ${to}.`,
      image:
        "https://strongbody-files-api.s3.ap-southeast-1.amazonaws.com/public/Transvoice/1773885934535957852_a2.webp",
    },
    {
      title: "Business introductions",
      desc: `Start conversations with partners and customers when ${from} and ${to} are both part of the relationship.`,
      image:
        "https://strongbody-files-api.s3.ap-southeast-1.amazonaws.com/public/Transvoice/1773886731859213808_z7635016227828_1d3694f53476bc34803451c2b8e01e06.jpg",
    },
    {
      title: "Wellness expert consultations",
      desc: "Talk with health and wellness experts without letting language slow down trust, clarity, or next steps.",
      image:
        "https://strongbody-files-api.s3.ap-southeast-1.amazonaws.com/public/Transvoice/1773885934684323682_a3.webp",
    },
    {
      title: "Freelancer and client chats",
      desc: "Keep service conversations moving when clients and freelancers prefer different languages.",
      image:
        "https://strongbody-files-api.s3.ap-southeast-1.amazonaws.com/public/Transvoice/1773885934708921985_sub-banner.webp",
    },
  ],
  scenarioNote: "MultiMe AI is built for real conversations, not just one-off word lookup.",
  pricingTitle: "Translation chat, save your voice translations, and find support from experts for free",
  pricingDescription:
    "Download the app and try fast, accurate text translation for free. When you are ready for smoother live conversations, unlock premium voice-to-voice translation for $179 per year.",
  freeLabel: "Free",
  textPlanTitle: "Text translation",
  textPlanDescription:
    "A quick way to translate typed messages and understand the meaning before you reply.",
  textPlanPrice: "$0",
  textFeatures: [
    "Translate text between two languages quickly and accurately",
    "Keep the meaning close to the context of the conversation",
    "Enjoy a simple, easy-to-use translation experience",
  ],
  premiumLabel: "Premium",
  voicePlanTitle: "Voice-to-voice translation",
  voicePlanDescription:
    "Speak naturally and let MultiMe AI help keep conversations moving across languages.",
  voicePlanPrice: "$179",
  voicePlanPeriod: "/ year",
  voiceFeatures: [
    "Voice-to-voice translation",
    "Made for real conversations",
    "One yearly plan for premium access",
  ],
  subscribe: "Subscribe",
  faqTitle: (from: string, to: string) => `Questions about ${from} to ${to} translation`,
  faqs: (from: string, to: string) => [
    {
      question: `Can MultiMe AI translate ${from} to ${to}?`,
      answer: `MultiMe AI is designed to help users communicate across languages, including ${from} and ${to}, through voice and chat translation flows.`,
    },
    {
      question: `Who is this ${from} to ${to} translation page for?`,
      answer: `It is for people who start from ${from} and need to connect with ${to} speakers for travel, business, online services, wellness support, or everyday conversations.`,
    },
    {
      question: "Do I need to switch apps during a conversation?",
      answer:
        "The goal of MultiMe AI is to keep communication, translated chat, and app-based connections in one place so the conversation feels easier to manage.",
    },
  ],
  finalTitle: (from: string, to: string) => `Start translating ${from} to ${to}`,
  finalDescription:
    "Download MultiMe AI and use one app for voice, chat, and global conversations.",
  scrollLeft: "Scroll left",
  scrollRight: "Scroll right",
} satisfies {
  openGraphLocale: string;
  toConnector: string;
  sourceLanguageLabel: (source: string) => string;
  baseMetadataTitle: (source: string) => string;
  baseMetadataDescription: (source: string) => string;
  baseHeroTitle: string;
  baseHeroDescription: string;
  baseConfiguredDescription: (source: string) => string;
  popularPairsHeading: string;
  baseOverviewTitle: string;
  baseOverviewDescription: string;
  downloadOn: string;
  getItOn: string;
  appStore: string;
  googlePlay: string;
  pairFallbackTitle: string;
  pairMetadataTitle: (from: string, to: string) => string;
  pairMetadataDescription: (from: string, to: string) => string;
  pairKeywords: (from: string, to: string) => string[];
  featureList: (from: string, to: string) => string[];
  localizedIntroBySourceLanguage: Record<string, string>;
  heroTitleLine1: (from: string) => string;
  heroTitleLine2: (to: string) => string;
  heroDescription: (to: string) => string;
  heroSubDescription: string;
  trustText: (from: string, to: string) => string;
  trustItems: string[];
  howTitle: string;
  howDescription: (from: string, to: string) => string;
  howSteps: (from: string, to: string) => Array<{ step: string; title: string; body: string }>;
  videoTitle: string;
  businessTitle: string;
  businessDescription: (from: string, to: string) => string;
  businessImageAlt: string;
  scenarioSectionTitle: (from: string, to: string) => string;
  scenarioSectionDescription: string;
  scenarios: (from: string, to: string) => Array<{
    title: string;
    desc: string;
    image: string;
  }>;
  scenarioNote: string;
  pricingTitle: string;
  pricingDescription: string;
  freeLabel: string;
  textPlanTitle: string;
  textPlanDescription: string;
  textPlanPrice: string;
  textFeatures: string[];
  premiumLabel: string;
  voicePlanTitle: string;
  voicePlanDescription: string;
  voicePlanPrice: string;
  voicePlanPeriod: string;
  voiceFeatures: string[];
  subscribe: string;
  faqTitle: (from: string, to: string) => string;
  faqs: (from: string, to: string) => Array<{ question: string; answer: string }>;
  finalTitle: (from: string, to: string) => string;
  finalDescription: string;
  scrollLeft: string;
  scrollRight: string;
};

export function getSourceLanguageName(language: LanguageOption): string {
  return language.name;
}
