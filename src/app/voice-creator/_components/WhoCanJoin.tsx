import type { VoiceCreatorCopy } from '@/lib/voice-creator';
import { AUDIENCE_IMAGES } from './data';
import { Reveal, ScaleImg } from './motion';

/** One accent colour per card so the row reads as three distinct groups. */
const ACCENTS = [
  { tag: 'bg-[#7c3aed]', ring: 'hover:border-[#7c3aed]' },
  { tag: 'bg-[#ec4899]', ring: 'hover:border-[#ec4899]' },
  { tag: 'bg-[#0ea5e9]', ring: 'hover:border-[#0ea5e9]' },
];

/** Section 2 — the three groups the program is open to. */
export default function WhoCanJoin({ copy }: { copy: VoiceCreatorCopy }) {
  const { ui, audiences } = copy;

  return (
    <section id="who" className="scroll-mt-16 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <div className="max-w-[720px]">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[2px] text-[#e5242a] uppercase">
              {ui.whoEyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.12]">{ui.whoTitle}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-[15px] leading-[1.7] text-[#5b5570] md:text-[16px]">
              {ui.whoLead}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
          {audiences.map((audience, index) => (
            <Reveal key={audience.title} delay={index * 0.08} className="h-full">
              <article
                className={`h-full overflow-hidden rounded-3xl border-2 border-[#f1ecfb] bg-white shadow-[0_14px_40px_rgba(44,29,90,0.07)] transition-colors duration-300 ${ACCENTS[index % 3].ring}`}
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <ScaleImg
                    src={AUDIENCE_IMAGES[index % AUDIENCE_IMAGES.length]}
                    alt={audience.title}
                    from={1.18}
                    to={1.02}
                  />
                  <span
                    className={`absolute top-4 left-4 rounded-full px-3 py-1 text-[11px] font-bold tracking-[1.2px] text-white uppercase ${ACCENTS[index % 3].tag}`}
                  >
                    {audience.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-[20px] leading-tight md:text-[22px]">{audience.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.65] text-[#5b5570] md:text-[15px]">
                    {audience.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
