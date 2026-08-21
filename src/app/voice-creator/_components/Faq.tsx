'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { VoiceCreatorCopy } from '@/lib/voice-creator';
import { Reveal } from './motion';

type FaqItem = { question: string; answer: string };

/** Section 7 — accordion FAQ. Mirrored into FAQPage structured data by the page. */
export default function Faq({ faqs, ui }: { faqs: FaqItem[]; ui: VoiceCreatorCopy['ui'] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-16 border-t border-[#ece7f8] bg-[#FFFDF9] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[900px] px-5 md:px-10">
        <div className="text-center">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[2px] text-[#0ea5e9] uppercase">
              {ui.faqEyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.12]">
              {ui.faqTitle}
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border-2 bg-white px-5 transition-colors duration-300 md:px-6 ${
                  isOpen ? 'border-[#7c3aed]' : 'border-[#f1ecfb]'
                } ${isOpen ? 'vc-faq-open' : ''}`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`vc-faq-${index}`}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={`text-[15px] leading-snug font-bold transition-colors md:text-[17px] ${
                        isOpen ? 'text-[#7c3aed]' : 'text-[#2c1d5a]'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <Plus
                      aria-hidden="true"
                      className="vc-faq-icon mt-0.5 h-5 w-5 shrink-0 text-[#e5242a] transition-transform duration-300"
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`vc-faq-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0, 0, 0.3642, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pr-10 pb-6 text-[14px] leading-[1.75] text-[#5b5570] md:text-[15px]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
