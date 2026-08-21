'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { VoiceCreatorCopy } from '@/lib/voice-creator';
import { STEP_NUMBERS } from './data';
import { Reveal } from './motion';
import AppDownload from './AppDownload';

/**
 * Section 5 — the four-step onboarding. The connecting line fills as the
 * section scrolls through the viewport, so progress on screen mirrors progress
 * in the flow.
 */
export default function Steps({ copy }: { copy: VoiceCreatorCopy }) {
  const { ui, steps } = copy;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%'],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="start"
      className="scroll-mt-16 border-y border-[#ece7f8] bg-[#ECFDF5] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <div className="max-w-[720px]">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[2px] text-[#10b981] uppercase">
              {ui.startEyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.12]">
              {ui.startTitle}
            </h2>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-12 md:mt-16">
          {/* progress rail: vertical on mobile, horizontal from md up */}
          <div className="absolute top-0 bottom-0 left-[19px] w-[3px] rounded-full bg-white md:top-[19px] md:right-0 md:bottom-auto md:left-0 md:h-[3px] md:w-full">
            <motion.div
              style={{ height: fill }}
              className="w-[3px] rounded-full bg-linear-to-b from-[#7c3aed] to-[#10b981] md:hidden"
            />
            <motion.div
              style={{ width: fill }}
              className="hidden h-[3px] rounded-full bg-linear-to-r from-[#7c3aed] to-[#10b981] md:block"
            />
          </div>

          <ol className="relative grid gap-9 md:grid-cols-4 md:gap-6">
            {steps.map((step, index) => (
              <li key={step.title} className="relative pl-14 md:pt-14 md:pl-0">
                {/* kept outside Reveal: a transformed ancestor would become the
                    badge's containing block and shift it mid-animation */}
                <span className="vc-display absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-[#7c3aed] text-[13px] text-white shadow-[0_8px_20px_rgba(124,58,237,0.25)]">
                  {STEP_NUMBERS[index]}
                </span>
                <Reveal delay={index * 0.08}>
                  <h3 className="text-[18px] leading-tight md:text-[20px]">{step.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.65] text-[#5b5570]">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-start gap-5 rounded-3xl border-2 border-white bg-white p-6 shadow-[0_16px_44px_rgba(44,29,90,0.08)] md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <h3 className="text-[20px] leading-tight md:text-[24px]">{ui.startCtaTitle}</h3>
              <p className="mt-2 text-[14px] text-[#5b5570] md:text-[15px]">{ui.startCtaText}</p>
            </div>
            <AppDownload downloadOn={ui.downloadOn} size="sm" className="shrink-0" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
