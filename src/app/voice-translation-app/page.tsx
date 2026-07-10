import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/config/site";
import AppDownloadBadges from "@/components/ui/AppDownloadBadges";
import {
  buildLanguagePairSlug,
  FIXED_SOURCE_LANGUAGE,
  getEmojiFlag,
  getLanguageDisplayName,
  GOOGLE_TRANSLATE_LANGUAGES,
  type LanguageOption,
} from "@/lib/voice-translation-languages";
import { getSourceLanguageName, VOICE_TRANSLATION_COPY } from "@/lib/voice-translation-copy";

const popularTargetCodes = ["en", "es", "fr", "de", "it", "pt", "vi", "th", "zh-CN", "ja", "ko"];

function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return fromEnv || `https://${SITE.brandDomain}`;
}

function getPopularTargets(): LanguageOption[] {
  const byCode = new Map(GOOGLE_TRANSLATE_LANGUAGES.map((lang) => [lang.code, lang]));
  return popularTargetCodes
    .map((code) => byCode.get(code))
    .filter((lang): lang is LanguageOption => Boolean(lang))
    .filter((lang) => lang.code !== FIXED_SOURCE_LANGUAGE.code);
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: VOICE_TRANSLATION_COPY.baseMetadataTitle(getSourceLanguageName(FIXED_SOURCE_LANGUAGE)),
  description: VOICE_TRANSLATION_COPY.baseMetadataDescription(
    getSourceLanguageName(FIXED_SOURCE_LANGUAGE),
  ),
  alternates: {
    canonical: "/voice-translation-app",
  },
};

export default function VoiceTranslationAppPage() {
  const popularTargets = getPopularTargets();
  const sourceName = getSourceLanguageName(FIXED_SOURCE_LANGUAGE);

  return (
    <main className="min-h-screen bg-white text-[#111824]">
      <section className="bg-stone-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#111824] shadow-sm ring-1 ring-stone-200">
              <span className="text-lg">{getEmojiFlag(FIXED_SOURCE_LANGUAGE.countryCode)}</span>
              <span>{VOICE_TRANSLATION_COPY.sourceLanguageLabel(sourceName)}</span>
            </div>
            <h1 className="text-[34px] leading-[42px] font-semibold text-[#111824] sm:text-5xl sm:leading-[58px] lg:text-6xl lg:leading-[68px]">
              {VOICE_TRANSLATION_COPY.baseHeroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#111824] sm:text-lg">
              {VOICE_TRANSLATION_COPY.baseHeroDescription}
            </p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#111824] sm:text-lg">
              {VOICE_TRANSLATION_COPY.baseConfiguredDescription(sourceName)}
            </p>
            <AppDownloadBadges className="mt-7" size="md" />
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-200 sm:p-8">
            <h2 className="text-2xl font-semibold text-[#111824]">
              {VOICE_TRANSLATION_COPY.popularPairsHeading}
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {popularTargets.map((target) => (
                <Link
                  key={target.code}
                  href={`/voice-translation-app/${buildLanguagePairSlug(
                    FIXED_SOURCE_LANGUAGE,
                    target,
                  )}`}
                  className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm font-semibold text-[#111824] transition hover:border-[#da1f27] hover:bg-white"
                >
                  <span className="mr-2">{getEmojiFlag(FIXED_SOURCE_LANGUAGE.countryCode)}</span>
                  {sourceName}
                  <span className="mx-2 text-stone-400">
                    {VOICE_TRANSLATION_COPY.toConnector}
                  </span>
                  <span>{getEmojiFlag(target.countryCode)}</span>
                  <span className="ml-2">{getLanguageDisplayName(target)}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-[1200px] text-center">
          <h2 className="text-[20px] leading-[30px] font-medium text-[#111824] md:text-[30px] md:leading-[38px]">
            {VOICE_TRANSLATION_COPY.baseOverviewTitle}
          </h2>
          <p className="mt-3 text-[14px] leading-[22px] text-[#111824] md:mt-4 md:text-[20px] md:leading-[28px]">
            {VOICE_TRANSLATION_COPY.baseOverviewDescription}
          </p>
        </div>
      </section>
    </main>
  );
}
