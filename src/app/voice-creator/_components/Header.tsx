'use client';

import { useEffect, useState } from 'react';
import { APP_DOWNLOAD_URL } from '@/config/links';
import type { VoiceCreatorCopy } from '@/lib/voice-creator';

const NAV_KEYS = ['who', 'what', 'earn', 'start', 'faq'] as const;

/**
 * Slim top bar. It gains a solid background once the hero is scrolled past, so
 * the coloured hero wash stays clean on first paint.
 *
 * This route hides the site navbar (see `ChromeSlot` in the root layout) and
 * ships this header instead, so the landing page looks the same here as it does
 * on strongbody.ai. The language switcher the multi-locale build puts next to
 * the CTA is dropped: this site serves one language.
 */
export default function Header({
  ui,
  compliance,
}: {
  ui: VoiceCreatorCopy['ui'];
  compliance: VoiceCreatorCopy['compliance'];
}) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? 'border-b border-[#ece7f8] bg-white/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-5 py-3.5 md:px-10">
        {/* The wordmark alone says StrongBody while every ad that points here
            says MultiMe AI. The operator line closes that gap on the first
            screen; below `sm` there is no room for it beside the CTA, so the
            hero carries the same sentence under its buttons. */}
        <div className="flex min-w-0 shrink items-center gap-2.5">
          <a
            href="#top"
            data-scroll-to="#top"
            aria-label="MultiMe AI by StrongBody"
            className="flex shrink-0 items-center"
          >
            {/* The same vector logo the strongbody.ai landing page uses, copied
                into this repo. Rendered with a plain <img>: the Next optimizer
                does not process SVG, so routing it through next/image would only
                add a request hop. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.svg"
              alt="StrongBody"
              width={132}
              height={35}
              className="h-7 w-auto object-contain md:h-8"
            />
          </a>

          <span className="hidden min-w-0 border-l border-[#ded7f0] pl-2.5 text-[10px] leading-[1.3] font-semibold text-[#5b5570] sm:block md:text-[11px]">
            {compliance.operatedBy}
          </span>
        </div>

        <nav aria-label={ui.navLabel} className="hidden items-center gap-7 lg:flex">
          {NAV_KEYS.map(key => (
            <a
              key={key}
              href={`#${key}`}
              data-scroll-to={`#${key}`}
              className="text-[13px] font-semibold text-[#5b5570] transition-colors hover:text-[#7c3aed]"
            >
              {ui.nav[key]}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 md:gap-3">
          <a
            href={APP_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#e5242a] px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_8px_22px_rgba(229,36,42,0.28)] transition-transform duration-300 hover:scale-[1.04] hover:bg-[#cf1f25] md:px-6 md:text-sm"
          >
            {ui.getApp}
          </a>
        </div>
      </div>
    </header>
  );
}
