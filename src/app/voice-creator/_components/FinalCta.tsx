import type { VoiceCreatorPage } from '@/lib/voice-creator';
import AppDownload from './AppDownload';
import { CONTACT } from './data';
import { Reveal, Waveform } from './motion';

/** Closing conversion block — the page exists to end here. */
export default function FinalCta({ page }: { page: VoiceCreatorPage }) {
  const { ui, compliance } = page.copy;

  return (
    <section className="bg-white px-5 py-16 md:px-10 md:py-24">
      <div className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[32px] bg-linear-to-br from-[#7c3aed] via-[#c026d3] to-[#f59e0b] px-6 py-16 text-center md:px-12 md:py-20">
        <div className="vc-glow -top-16 -left-10 h-[280px] w-[280px] bg-white/40" />
        <div className="vc-glow -right-10 -bottom-16 h-[300px] w-[300px] bg-[#0ea5e9]/40" />

        <div className="relative">
          <Reveal>
            <div className="mx-auto h-12 w-40 opacity-90">
              <Waveform bars={26} className="vc-wave-warm" />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-8 text-[clamp(1.9rem,5vw,3.2rem)] leading-[1.08] text-white!">
              {ui.ctaTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-[1.7] text-white/90 md:text-[17px]">
              {ui.ctaText}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex justify-center">
              <AppDownload downloadOn={ui.downloadOn} />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-[13px] text-white/80">
              {ui.ctaContact.replace('{name}', CONTACT.name)}{' '}
              <a
                href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(
                  `Audio Creator Partner — ${page.headline}`,
                )}`}
                className="font-semibold text-white underline-offset-4 hover:underline"
              >
                {CONTACT.email}
              </a>
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mx-auto mt-4 max-w-[620px] text-[12px] leading-[1.65] text-white/70">
              {compliance.operatedBy} · {compliance.earningsShort}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
