'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

/** Scrolling back up this far closes an open section, as on strongbody.ai. */
const SCROLL_COLLAPSE_THRESHOLD = 100;

export default function FooterAccordionSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let accumulatedScrollUp = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      if (diff < 0) {
        accumulatedScrollUp += Math.abs(diff);
        if (accumulatedScrollUp > SCROLL_COLLAPSE_THRESHOLD && open) {
          setOpen(false);
          accumulatedScrollUp = 0;
        }
      } else {
        accumulatedScrollUp = 0;
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [open]);

  return (
    <div className="pb-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between text-left"
      >
        <h3 className="text-[16px] leading-[24px] text-[#262626]">{title}</h3>
        {open ? (
          <ChevronDown size={18} className="text-[#556575]" />
        ) : (
          <ChevronRight size={18} className="text-[#556575]" />
        )}
      </button>
      <div
        className={`flex flex-col gap-[20px] overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'mt-4 max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
