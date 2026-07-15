"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useState } from "react";
import { WELLNESS_TEST_COPY as copy } from "@/lib/wellness-test-copy";

export type WellnessTestCard = {
  id: number;
  slug: string;
  title: string;
  insight: string;
  time: string;
  questions: number;
  href: string;
};

type TestCardsSectionProps = {
  testCards: WellnessTestCard[];
  title?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

const CARDS_PER_PAGE = 8;

export default function TestCardsSection({
  testCards,
  title = copy.testsTitle,
  description = copy.testsLead,
  ctaHref,
  ctaLabel,
}: TestCardsSectionProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(testCards.length / CARDS_PER_PAGE));
  const visibleCards = testCards.slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE);

  return (
    <section id="wellness-tests" className="scroll-mt-20 bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col gap-4 items-center justify-center text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div className="max-w-[640px]">
            <h2 className="mb-4 text-[1.75rem] font-bold text-[#111827] md:text-[2.25rem]">
              {title}
            </h2>
            {description ? (
              <p className="mx-auto max-w-[540px] text-[15px] leading-[1.7] text-[#687588] md:mx-0">
                {description}
              </p>
            ) : null}
          </div>

          {ctaHref && ctaLabel ? (
            <Link
              href={ctaHref}
              className="inline-flex rounded-full border border-[#da1f27] bg-white px-5 py-3 text-sm font-semibold text-[#da1f27] transition hover:bg-[#da1f27]/10"
            >
              {ctaLabel}
            </Link>
          ) : null}
        </div>

        {testCards.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {visibleCards.map((card) => (
                <article key={card.id} className="group flex flex-col rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#da1f27]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)]">
                  <h3 className="mb-2 line-clamp-2 min-h-[3.5rem] text-base font-semibold leading-7 text-[#111827] md:min-h-[3rem] md:text-lg md:leading-6">{card.title}</h3>
                  <p className="mb-5 line-clamp-4 min-h-[6.4rem] grow text-sm leading-[1.6] text-[#687588] md:min-h-[5.6rem]">{card.insight}</p>
                  <div className="mb-4 flex items-center gap-3 text-xs text-[#9ca3af] md:text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {card.time}
                    </span>
                    {card.questions > 0 && (
                      <>
                        <span>·</span>
                        <span>{card.questions} {copy.questions}</span>
                      </>
                    )}
                  </div>
                  <Link href={card.href} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#da1f27] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#bf1a21] md:text-base">
                    {copy.start}
                  </Link>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#687588] transition hover:border-[#da1f27] hover:text-[#da1f27] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i)}
                      className={"h-2 rounded-full transition-all duration-300 " + (i === page ? "w-6 bg-[#da1f27]" : "w-2 bg-[#e5e7eb] hover:bg-[#da1f27]/40")}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#687588] transition hover:border-[#da1f27] hover:text-[#da1f27] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#e5e7eb] bg-[#fafafa] px-6 py-12 text-center">
            <p className="text-[15px] font-medium text-[#111827]">{copy.noTests}</p>
          </div>
        )}
      </div>
    </section>
  );
}
