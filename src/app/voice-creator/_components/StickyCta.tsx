'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { APP_DOWNLOAD_URL } from '@/config/links';
import type { VoiceCreatorCopy } from '@/lib/voice-creator';

/**
 * Mobile-only sticky bar. It appears after the hero CTA scrolls out of reach so
 * the download action is never more than a thumb away, and hides again at the
 * footer where the full CTA block already lives.
 */
export default function StickyCta({ ui }: { ui: VoiceCreatorCopy['ui'] }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolledPastHero = window.scrollY > window.innerHeight * 0.9;
      const nearBottom =
        window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 700;
      setVisible(scrolledPastHero && !nearBottom);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0, 0, 0.3642, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[#ece7f8] bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden"
        >
          <a
            href={APP_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#e5242a] px-5 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_26px_rgba(229,36,42,0.3)]"
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            {ui.stickyCta}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
