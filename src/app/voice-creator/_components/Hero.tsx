'use client';

import { ArrowDown, Check, Mic } from 'lucide-react';
import type { VoiceCreatorPage } from '@/lib/voice-creator';
import AppDownload from './AppDownload';
import { IMAGES } from './data';
import { Reveal, Waveform } from './motion';

export default function Hero({ page }: { page: VoiceCreatorPage }) {
  const { ui, platforms, compliance } = page.copy;

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-12 md:pt-36 md:pb-16">
      {/* soft colour wash instead of a full-bleed photo — keeps the artwork
          inside its own frame so it can never crop the subject badly */}
      <div className="absolute inset-0 bg-linear-to-b from-[#FFF1F2] via-[#FDF7FF] to-[#FFFDF9]" />
      <div className="vc-glow -top-24 -left-24 h-[380px] w-[380px] bg-[#f59e0b]/30" />
      <div className="vc-glow top-10 right-0 h-[420px] w-[420px] bg-[#7c3aed]/25" />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e5242a]/20 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-[1.2px] text-[#e5242a] uppercase shadow-[0_6px_20px_rgba(229,36,42,0.12)] md:text-[12px]">
                <Mic aria-hidden="true" className="h-3.5 w-3.5" />
                {ui.badge}
              </span>
            </Reveal>

            {/* the H1 is the search phrase itself, in this site's language */}
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-[clamp(2rem,5.4vw,3.6rem)] leading-[1.08]">
                {page.headline}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[560px] border-l-4 border-[#f59e0b] pl-5 text-[17px] leading-[1.5] font-semibold text-[#2c1d5a] md:text-[20px]">
                {page.promise}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-5 max-w-[560px] text-[15px] leading-[1.7] text-[#5b5570] md:text-[16px]">
                {page.subheadline}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-7 space-y-3">
                {page.bullets.map(bullet => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10b981]/15">
                      <Check aria-hidden="true" className="h-3 w-3 text-[#10b981]" />
                    </span>
                    <span className="text-[14px] leading-[1.55] text-[#5b5570] md:text-[15px]">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-9 flex flex-col gap-4">
                <AppDownload downloadOn={ui.downloadOn} />
                <div className="flex items-center gap-4">
                  <a
                    href="#what"
                    data-scroll-to="#what"
                    className="inline-flex items-center gap-2 text-[13px] font-bold tracking-wide text-[#7c3aed] uppercase transition-colors hover:text-[#e5242a]"
                  >
                    {ui.seeHow}
                    <ArrowDown aria-hidden="true" className="h-4 w-4" />
                  </a>
                  <div className="h-8 w-24">
                    <Waveform bars={18} />
                  </div>
                </div>
                <p className="text-[12px] text-[#8b849e]">{ui.heroNote}</p>
                {/* Repeats what the header says, because the header hides this
                    line on phones — and phones are where most ad clicks land. */}
                <p className="max-w-[560px] text-[12px] leading-[1.6] text-[#8b849e]">
                  {compliance.operatedBy} · {compliance.earningsShort}
                </p>
              </div>
            </Reveal>
          </div>

          {/* artwork: fixed frame, right-anchored crop, colour card behind it */}
          <Reveal delay={0.1} className="relative">
            <div
              aria-hidden="true"
              className="absolute -top-4 -right-3 bottom-6 left-6 rounded-[28px] bg-linear-to-br from-[#7c3aed] to-[#ec4899] opacity-90 md:-top-6 md:-right-5"
            />
            <div className="relative overflow-hidden rounded-[24px] border-4 border-white bg-white shadow-[0_24px_60px_rgba(44,29,90,0.18)]">
              {/* the cover artwork is a wide banner with its subject on the
                  right, so the frame stays close to landscape and the crop is
                  anchored right of centre instead of cutting the subject off */}
              <div className="aspect-[16/11] w-full lg:aspect-[5/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMAGES.hero}
                  alt={ui.heroImageAlt}
                  className="h-full w-full object-cover object-[72%_center]"
                />
              </div>
              <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_10px_30px_rgba(44,29,90,0.14)] backdrop-blur">
                <span className="h-8 w-16 shrink-0">
                  <Waveform bars={12} className="vc-wave-warm" />
                </span>
                <span className="text-[12px] leading-tight font-semibold text-[#2c1d5a] md:text-[13px]">
                  {ui.heroCaption}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* marquee of the audio formats partners publish */}
      <div className="relative mt-14 overflow-hidden border-y border-[#ece7f8] bg-white py-4 md:mt-20">
        <div className="vc-marquee">
          {[0, 1].map(copy => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {platforms.map(platform => (
                <li
                  key={`${copy}-${platform}`}
                  className="flex items-center gap-6 px-6 text-[15px] font-extrabold text-[#2c1d5a]/45 md:text-[18px]"
                >
                  {platform}
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#e5242a]" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
