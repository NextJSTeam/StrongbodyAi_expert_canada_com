'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import type { VoiceCreatorCopy } from '@/lib/voice-creator';
import { IMAGES } from './data';
import { Reveal, ScaleImg, Waveform } from './motion';

/**
 * Section 3 — what a partner actually does, as three switchable tabs so the
 * page stays short while still covering all three jobs from the JD.
 */
export default function WhatYouDo({ copy }: { copy: VoiceCreatorCopy }) {
  const { ui, roles } = copy;
  const [active, setActive] = useState(0);
  const role = roles[active];

  return (
    <section
      id="what"
      className="vc-grid-bg scroll-mt-16 border-y border-[#ece7f8] bg-[#F6F3FF] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <div className="max-w-[720px]">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[2px] text-[#7c3aed] uppercase">
              {ui.whatEyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.12]">
              {ui.whatTitle}
            </h2>
          </Reveal>
        </div>

        {/* tab bar */}
        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label={ui.whatTablistLabel}
            className="mt-10 flex flex-wrap gap-2"
          >
            {roles.map((item, index) => (
              <button
                key={item.label}
                type="button"
                role="tab"
                id={`vc-tab-${index}`}
                aria-selected={active === index}
                aria-controls={`vc-panel-${index}`}
                onClick={() => setActive(index)}
                className={`rounded-full border-2 px-5 py-2.5 text-[13px] font-bold tracking-wide uppercase transition-colors duration-300 ${
                  active === index
                    ? 'border-[#7c3aed] bg-[#7c3aed] text-white shadow-[0_10px_24px_rgba(124,58,237,0.28)]'
                    : 'border-[#e2d9f8] bg-white text-[#5b5570] hover:border-[#7c3aed] hover:text-[#7c3aed]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div
            role="tabpanel"
            id={`vc-panel-${active}`}
            aria-labelledby={`vc-tab-${active}`}
            className="min-h-[280px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={role.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0, 0, 0.3642, 1] }}
              >
                <h3 className="text-[24px] leading-tight md:text-[30px]">{role.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#5b5570] md:text-[16px]">
                  {role.text}
                </p>
                <ul className="mt-6 space-y-3">
                  {role.points.map(point => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10b981]/15">
                        <Check aria-hidden="true" className="h-3 w-3 text-[#10b981]" />
                      </span>
                      <span className="text-[14px] leading-[1.55] text-[#5b5570] md:text-[15px]">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <Reveal delay={0.05}>
            <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-white shadow-[0_20px_50px_rgba(44,29,90,0.14)]">
              <div className="aspect-[4/3] w-full">
                <ScaleImg src={IMAGES.studio} alt={ui.studioImageAlt} from={1.16} to={1} />
              </div>
              <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 backdrop-blur">
                <span className="h-8 w-20 shrink-0">
                  <Waveform bars={14} />
                </span>
                <p className="text-[12px] leading-tight font-semibold text-[#2c1d5a] md:text-[13px]">
                  {ui.whatCaption}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
