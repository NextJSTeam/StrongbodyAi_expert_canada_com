/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/config/site";
import { VOICE_TRANSLATION_URL } from "@/config/links";
import AppDownloadBadges from "@/components/ui/AppDownloadBadges";
import {
  buildLanguagePairSlug,
  getEmojiFlag,
  getLanguageDisplayName,
  parseFixedSourceLanguagePairSlug,
  type LanguageOption,
} from "@/lib/voice-translation-languages";
import { getSourceLanguageName, VOICE_TRANSLATION_COPY } from "@/lib/voice-translation-copy";
import TranslationScenariosCarousel from "./_components/TranslationScenariosCarousel";

type PageProps = {
  params: Promise<{
    languagePair: string;
  }>;
};

const heroImage =
  "https://strongbody-files-api.s3.ap-southeast-1.amazonaws.com/public/Transvoice/1779347752160037786_thumb_multime-02.png";

function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return fromEnv || `https://${SITE.brandDomain}`;
}

function getPairOrNotFound(languagePair: string) {
  const pair = parseFixedSourceLanguagePairSlug(languagePair);
  if (!pair) notFound();
  return pair;
}

function pairTitle(from: LanguageOption, to: LanguageOption) {
  return VOICE_TRANSLATION_COPY.pairMetadataTitle(
    getSourceLanguageName(from),
    getLanguageDisplayName(to),
  );
}

function pairDescription(from: LanguageOption, to: LanguageOption) {
  return VOICE_TRANSLATION_COPY.pairMetadataDescription(
    getSourceLanguageName(from),
    getLanguageDisplayName(to),
  );
}

function pairPath(from: LanguageOption, to: LanguageOption) {
  return `/voice-translation-app/${buildLanguagePairSlug(from, to)}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { languagePair } = await params;
  const pair = parseFixedSourceLanguagePairSlug(languagePair);

  if (!pair) {
    return {
      title: VOICE_TRANSLATION_COPY.pairFallbackTitle,
      robots: { index: false, follow: false },
    };
  }

  const { from, to } = pair;
  const title = pairTitle(from, to);
  const description = pairDescription(from, to);
  const path = pairPath(from, to);

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    keywords: VOICE_TRANSLATION_COPY.pairKeywords(
      getSourceLanguageName(from),
      getLanguageDisplayName(to),
    ),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      locale: VOICE_TRANSLATION_COPY.openGraphLocale,
      images: [
        {
          url: heroImage,
          width: 2220,
          height: 1242,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [heroImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LanguagePairTranslationPage({ params }: PageProps) {
  const { languagePair } = await params;
  const { from, to } = getPairOrNotFound(languagePair);
  const fromDisplay = getSourceLanguageName(from);
  const toDisplay = getLanguageDisplayName(to);
  const localizedIntro = VOICE_TRANSLATION_COPY.localizedIntroBySourceLanguage[from.code];
  const canonicalPath = pairPath(from, to);
  const siteUrl = getSiteUrl();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MultiMe AI",
    applicationCategory: "CommunicationApplication",
    operatingSystem: "iOS, Android",
    url: `${siteUrl}${canonicalPath}`,
    description: pairDescription(from, to),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: VOICE_TRANSLATION_COPY.featureList(fromDisplay, toDisplay),
  };

  const faqs = VOICE_TRANSLATION_COPY.faqs(fromDisplay, toDisplay);
  const translationScenarios = VOICE_TRANSLATION_COPY.scenarios(fromDisplay, toDisplay);

  return (
    <main className="min-h-screen bg-white text-[#111824]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative overflow-hidden bg-white pt-12 pb-14 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-5 inline-flex flex-wrap items-center gap-2 bg-white px-4 py-2 text-sm font-medium text-[#111824] shadow-sm ring-1 ring-stone-200">
              <span className="text-lg">{getEmojiFlag(from.countryCode)}</span>
              <span>{fromDisplay}</span>
              <span className="text-[#111824]">{VOICE_TRANSLATION_COPY.toConnector}</span>
              <span className="text-lg">{getEmojiFlag(to.countryCode)}</span>
              <span>{toDisplay}</span>
            </div>

            <h1 className="text-[34px] leading-[42px] font-semibold text-[#111824] sm:text-5xl sm:leading-[58px] lg:text-6xl lg:leading-[68px]">
              {VOICE_TRANSLATION_COPY.heroTitleLine1(fromDisplay)}
              <br />
              <span className="text-[#da1f27]">
                {VOICE_TRANSLATION_COPY.heroTitleLine2(toDisplay)}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 font-medium text-[#111824] sm:text-lg">
              {VOICE_TRANSLATION_COPY.heroDescription(toDisplay)}
            </p>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#111824] sm:text-lg">
              {VOICE_TRANSLATION_COPY.heroSubDescription}
            </p>

            {localizedIntro ? (
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#111824] sm:text-base">
                {localizedIntro}
              </p>
            ) : null}

            <AppDownloadBadges className="mt-7" size="md" />
          </div>

          <div className="relative aspect-square w-full sm:aspect-[4/3] lg:aspect-square">
            <Image
              src={heroImage}
              alt="MultiMe AI app"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-10 sm:py-14">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-4 md:px-0 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <p className="text-[20px] leading-[30px] font-medium text-[#111824] md:text-[30px] md:leading-[38px]">
            {VOICE_TRANSLATION_COPY.trustText(fromDisplay, toDisplay)}
          </p>
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {VOICE_TRANSLATION_COPY.trustItems.map((item, index) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#da1f27] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <span className="text-base leading-7 font-medium text-[#111824]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px] text-center">
            <h2 className="text-[20px] leading-[30px] font-medium text-[#111824] md:text-[30px] md:leading-[38px]">
              {VOICE_TRANSLATION_COPY.howTitle}
            </h2>
            <p className="mt-3 text-[14px] leading-[22px] text-[#111824] md:mt-4 md:text-[20px] md:leading-[28px]">
              {VOICE_TRANSLATION_COPY.howDescription(fromDisplay, toDisplay)}
            </p>
          </div>

          <div className="mt-10 grid gap-8 text-center md:grid-cols-3">
            {VOICE_TRANSLATION_COPY.howSteps(fromDisplay, toDisplay).map((item) => (
              <div key={item.step}>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#da1f27] bg-white text-2xl font-bold text-[#da1f27] shadow-lg sm:h-20 sm:w-20">
                  {item.step}
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#111824] sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#111824] sm:text-base">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div
            className="relative mt-12 w-full overflow-hidden rounded-2xl shadow-2xl sm:rounded-3xl"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/hsj3Ba1AIE8?rel=0"
              title={VOICE_TRANSLATION_COPY.videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section id="business-chat" className="bg-stone-50 py-14 sm:py-24">
        <div className="mx-auto sm:container">
          <div className="mx-auto max-w-[1200px] px-4 text-center">
            <h2 className="text-[20px] leading-[30px] font-medium text-[#111824] md:text-[30px] md:leading-[38px]">
              {VOICE_TRANSLATION_COPY.businessTitle}
            </h2>
            <p className="mt-3 text-[14px] leading-[22px] text-[#111824] md:mt-4 md:text-[20px] md:leading-[28px]">
              {VOICE_TRANSLATION_COPY.businessDescription(fromDisplay, toDisplay)}
            </p>
          </div>
          <div className="relative mx-auto mt-6 aspect-square w-full max-w-[1200px]">
            <Image
              src="https://strongbody-files-api.s3.ap-southeast-1.amazonaws.com/public/Transvoice/1779244833203236867_multimevoice.jpg"
              alt={VOICE_TRANSLATION_COPY.businessImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px] text-center">
            <h2 className="text-[20px] leading-[30px] font-medium text-[#111824] md:text-[30px] md:leading-[38px]">
              {VOICE_TRANSLATION_COPY.scenarioSectionTitle(fromDisplay, toDisplay)}
            </h2>
            <p className="mt-3 text-[14px] leading-[22px] text-[#111824] md:mt-4 md:text-[20px] md:leading-[28px]">
              {VOICE_TRANSLATION_COPY.scenarioSectionDescription}
            </p>
          </div>

          <TranslationScenariosCarousel
            scenarios={translationScenarios}
            scrollLeftLabel={VOICE_TRANSLATION_COPY.scrollLeft}
            scrollRightLabel={VOICE_TRANSLATION_COPY.scrollRight}
          />

          <div className="mx-auto mt-4 max-w-4xl rounded-2xl bg-[#da1f27] p-5 text-center text-white shadow-xl sm:mt-6 sm:rounded-3xl sm:p-8">
            <p className="text-base font-medium sm:text-xl">
              {VOICE_TRANSLATION_COPY.scenarioNote}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-14 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <h2 className="text-[20px] leading-[30px] font-medium text-[#111824] md:text-[30px] md:leading-[38px]">
              {VOICE_TRANSLATION_COPY.pricingTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-[1200px] text-[14px] leading-[22px] text-[#111824] md:mt-4 md:text-[20px] md:leading-[28px]">
              {VOICE_TRANSLATION_COPY.pricingDescription}
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold tracking-wide text-[#da1f27] uppercase">
                {VOICE_TRANSLATION_COPY.freeLabel}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-[#111824]">
                {VOICE_TRANSLATION_COPY.textPlanTitle}
              </h3>
              <p className="mt-3 text-base leading-7 text-[#111824]">
                {VOICE_TRANSLATION_COPY.textPlanDescription}
              </p>
              <div className="mt-6 text-4xl font-semibold text-[#111824]">
                {VOICE_TRANSLATION_COPY.textPlanPrice}
              </div>
              <ul className="mt-6 space-y-3">
                {VOICE_TRANSLATION_COPY.textFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-base text-[#111824]">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#da1f27]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <AppDownloadBadges className="mt-7" />
            </div>

            <div className="rounded-2xl border-2 border-[#da1f27] bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold tracking-wide text-[#da1f27] uppercase">
                {VOICE_TRANSLATION_COPY.premiumLabel}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-[#111824]">
                {VOICE_TRANSLATION_COPY.voicePlanTitle}
              </h3>
              <p className="mt-3 text-base leading-7 text-[#111824]">
                {VOICE_TRANSLATION_COPY.voicePlanDescription}
              </p>
              <div className="mt-6 flex items-end gap-2 text-[#111824]">
                <span className="text-4xl font-semibold">
                  {VOICE_TRANSLATION_COPY.voicePlanPrice}
                </span>
                <span className="pb-1 text-base">{VOICE_TRANSLATION_COPY.voicePlanPeriod}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {VOICE_TRANSLATION_COPY.voiceFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-base text-[#111824]">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#da1f27]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={VOICE_TRANSLATION_URL}
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#da1f27] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#b81920] focus-visible:ring-2 focus-visible:ring-[#da1f27] focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
              >
                {VOICE_TRANSLATION_COPY.subscribe}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white px-4 py-14 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mx-auto max-w-[1200px] text-center text-[20px] leading-[30px] font-medium text-[#111824] md:text-[30px] md:leading-[38px]">
            {VOICE_TRANSLATION_COPY.faqTitle(fromDisplay, toDisplay)}
          </h2>
          <div className="mt-8 divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-6">
                <h3 className="text-lg font-bold text-[#111824]">{faq.question}</h3>
                <p className="mt-3 text-base leading-7 text-[#111824]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="download"
        className="bg-stone-50 px-4 py-14 text-[#111824] sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-[20px] leading-[30px] font-semibold sm:text-[30px] sm:leading-[38px]">
              {VOICE_TRANSLATION_COPY.finalTitle(fromDisplay, toDisplay)}
            </h2>
            <p className="mt-3 text-base leading-7 text-[#111824] sm:text-lg">
              {VOICE_TRANSLATION_COPY.finalDescription}
            </p>
          </div>
          <AppDownloadBadges className="justify-center md:justify-end" size="md" />
        </div>
      </section>
    </main>
  );
}
