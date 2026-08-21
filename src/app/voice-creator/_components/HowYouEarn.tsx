import { Globe2, Infinity as InfinityIcon, Users } from 'lucide-react';
import type { VoiceCreatorPage } from '@/lib/voice-creator';
import { Reveal } from './motion';

/** Icon + tint per fact; the words themselves come from the copy. */
const FACT_STYLES = [
  { icon: Users, color: 'bg-[#e5242a]/12 text-[#e5242a]' },
  { icon: Globe2, color: 'bg-[#0ea5e9]/12 text-[#0ea5e9]' },
  { icon: InfinityIcon, color: 'bg-[#10b981]/12 text-[#10b981]' },
];

/** Card tints, cycled so the four points stay visually distinct. */
const CARD_TINTS = [
  'bg-[#FFF1F2] border-[#ffd9dc]',
  'bg-[#F3F0FF] border-[#e2d9f8]',
  'bg-[#ECFDF5] border-[#c9f2e0]',
  'bg-[#FFF7ED] border-[#ffe4c2]',
];

/** Section 4 — how the money works. Keyword-sensitive lead, fixed mechanics. */
export default function HowYouEarn({ page }: { page: VoiceCreatorPage }) {
  const { ui, facts, moneyPoints } = page.copy;

  return (
    <section id="earn" className="scroll-mt-16 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-[11px] font-bold tracking-[2px] text-[#f59e0b] uppercase">
                {ui.earnEyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.12]">
                {ui.earnTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[15px] leading-[1.75] text-[#5b5570] md:text-[17px]">
                {page.monetizationLead}
              </p>
            </Reveal>

            <div className="mt-10 space-y-4">
              {facts.map(({ value, label }, index) => {
                const { icon: Icon, color } = FACT_STYLES[index % FACT_STYLES.length];
                return (
                  <Reveal key={label} delay={0.05 * index}>
                    <div className="flex items-center gap-4 rounded-2xl border-2 border-[#f1ecfb] bg-white p-4 shadow-[0_10px_28px_rgba(44,29,90,0.06)]">
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${color}`}
                      >
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="vc-display block text-[18px] text-[#2c1d5a]">{value}</span>
                        <span className="block text-[13px] text-[#5b5570]">{label}</span>
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {moneyPoints.map((point, index) => (
              <Reveal key={point.title} delay={index * 0.07} className="h-full">
                <article className={`h-full rounded-3xl border-2 p-6 ${CARD_TINTS[index % 4]}`}>
                  <span className="vc-display text-[13px] tracking-[1px] text-[#7c3aed]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 text-[19px] leading-tight">{point.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.65] text-[#5b5570]">{point.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
