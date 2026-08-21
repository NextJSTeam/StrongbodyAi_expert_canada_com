import { Check } from 'lucide-react';
import type { VoiceCreatorCopy } from '@/lib/voice-creator';
import { Reveal } from './motion';

/** A rotating set of tints so the grid feels lively rather than uniform. */
const TINTS = [
  'bg-[#FFF1F2] border-[#ffd9dc]',
  'bg-[#F3F0FF] border-[#e2d9f8]',
  'bg-[#ECFEFF] border-[#c7eef5]',
  'bg-[#FFF7ED] border-[#ffe4c2]',
  'bg-[#ECFDF5] border-[#c9f2e0]',
  'bg-[#FDF2F8] border-[#fbd5e8]',
];

/** Section 6 — why creators join, and the (very short) list of requirements. */
export default function Benefits({ copy }: { copy: VoiceCreatorCopy }) {
  const { ui, benefits, requirements } = copy;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <div className="max-w-[720px]">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[2px] text-[#ec4899] uppercase">
              {ui.benefitsEyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.12]">
              {ui.benefitsTitle}
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={(index % 3) * 0.06} className="h-full">
              <article
                className={`h-full rounded-3xl border-2 p-7 transition-transform duration-300 hover:-translate-y-1 ${TINTS[index % TINTS.length]}`}
              >
                <h3 className="text-[18px] leading-tight md:text-[20px]">{benefit.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-[#5b5570]">{benefit.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-3xl border-2 border-[#e2d9f8] bg-linear-to-r from-[#F3F0FF] to-[#FFF7ED] p-6 md:p-8">
            <h3 className="text-[18px] md:text-[20px]">{ui.requirementsTitle}</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {requirements.map(requirement => (
                <li key={requirement} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7c3aed]/15">
                    <Check aria-hidden="true" className="h-3 w-3 text-[#7c3aed]" />
                  </span>
                  <span className="text-[14px] leading-[1.55] text-[#5b5570] md:text-[15px]">
                    {requirement}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
