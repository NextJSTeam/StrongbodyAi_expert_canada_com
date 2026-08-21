import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { VoiceCreatorPage } from '@/lib/voice-creator';
import { Reveal } from './motion';

/**
 * Internal linking across the keyword network — same-intent pages first, then a
 * spread across the other intents so every landing page is reachable.
 */
export default function RelatedKeywords({ page }: { page: VoiceCreatorPage }) {
  if (page.related.length === 0) return null;

  return (
    <section className="border-t border-[#ece7f8] bg-[#FDF7FF] py-16 md:py-20">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <Reveal>
          <p className="text-[11px] font-bold tracking-[2px] text-[#7c3aed] uppercase">
            {page.copy.ui.relatedTitle}
          </p>
        </Reveal>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {page.related.map((item, index) => (
            <Reveal key={item.href} delay={(index % 4) * 0.04}>
              <Link
                href={item.href}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-[#eee8fb] bg-white px-4 py-2.5 text-[13px] font-medium text-[#5b5570] transition-colors duration-300 hover:border-[#7c3aed] hover:text-[#2c1d5a] md:text-[14px]"
              >
                {item.label}
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-[#a99fc4] transition-colors group-hover:text-[#7c3aed]"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
