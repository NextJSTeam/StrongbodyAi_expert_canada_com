"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export type TranslationScenario = {
  title: string;
  desc: string;
  image: string;
};

type TranslationScenariosCarouselProps = {
  scenarios: TranslationScenario[];
  scrollLeftLabel: string;
  scrollRightLabel: string;
};

export default function TranslationScenariosCarousel({
  scenarios,
  scrollLeftLabel,
  scrollRightLabel,
}: TranslationScenariosCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount =
      direction === "left"
        ? -scrollRef.current.offsetWidth + 40
        : scrollRef.current.offsetWidth - 40;

    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="group relative mt-10">
      <button
        type="button"
        onClick={() => scroll("left")}
        className="absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-[#111824] shadow-lg transition-all hover:border-[#da1f27] hover:text-[#da1f27] sm:h-12 sm:w-12 md:-translate-x-6"
        aria-label={scrollLeftLabel}
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <button
        type="button"
        onClick={() => scroll("right")}
        className="absolute top-1/2 right-0 z-10 flex h-10 w-10 translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-[#111824] shadow-lg transition-all hover:border-[#da1f27] hover:text-[#da1f27] sm:h-12 sm:w-12 md:translate-x-6"
        aria-label={scrollRightLabel}
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-6 [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {scenarios.map((scenario, index) => (
          <article
            key={scenario.title}
            className="group/card relative h-[340px] min-w-[82vw] shrink-0 snap-center overflow-hidden rounded-2xl shadow-lg sm:h-[450px] sm:min-w-[360px] sm:rounded-3xl"
          >
            <Image
              src={scenario.image}
              alt={scenario.title}
              fill
              className="object-cover transition-transform duration-700 group-hover/card:scale-105"
              sizes="(max-width: 768px) 82vw, 360px"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-5 sm:p-8">
              <h3 className="text-xl font-bold text-white sm:text-2xl">{scenario.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white sm:mt-3 sm:text-base sm:leading-7">
                {scenario.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
