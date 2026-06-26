"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  PARTNER_RECRUITMENT_ACTIVATION_FEE,
  PROFILE_SHOP_BENEFIT_TABS,
  PROFILE_SHOP_BENEFITS,
} from "@/constants/profile-shop-benefits";
import { partnerRecruitmentPost } from "@/content/partner-recruitment-post";

interface OpenProfileShopPanelProps {
  subscribeUrl: string;
}

export default function OpenProfileShopPanel({ subscribeUrl }: OpenProfileShopPanelProps) {
  const copy = partnerRecruitmentPost.openProfileShop;
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [voucherInput, setVoucherInput] = useState("");
  const activeSection = PROFILE_SHOP_BENEFITS[activeIndex];
  const slideCount = PROFILE_SHOP_BENEFITS.length;

  const goToPrevious = useCallback(() => {
    setSlideDirection(-1);
    setActiveIndex((currentIndex) => (currentIndex - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goToNext = useCallback(() => {
    setSlideDirection(1);
    setActiveIndex((currentIndex) => (currentIndex + 1) % slideCount);
  }, [slideCount]);

  const goToTab = (index: number) => {
    if (index === activeIndex) return;
    setSlideDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x <= -60) {
      goToNext();
      return;
    }
    if (info.offset.x >= 60) {
      goToPrevious();
    }
  };

  const formattedPrice = `$${PARTNER_RECRUITMENT_ACTIVATION_FEE}/year`;

  const checkoutUrl = useMemo(() => {
    const code = voucherInput.trim().toUpperCase();
    if (!code) return subscribeUrl;
    const separator = subscribeUrl.includes("?") ? "&" : "?";
    return `${subscribeUrl}${separator}voucherCode=${encodeURIComponent(code)}`;
  }, [subscribeUrl, voucherInput]);

  return (
    <div className="grid w-full gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-stretch lg:gap-x-10 lg:gap-y-4">
      <div className="relative min-w-0 rounded-2xl border border-grey-100 bg-grey-50/80 p-4 md:p-6 lg:col-start-1 lg:row-start-1">
        <div className="relative min-h-[320px] overflow-hidden sm:min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection.number}
                className="absolute inset-0 cursor-grab touch-pan-y select-none active:cursor-grabbing"
                initial={{ x: slideDirection > 0 ? "100%" : "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: slideDirection > 0 ? "-100%" : "100%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={handleDragEnd}
              >
                <article className="flex h-full flex-col gap-5">
                  <div className="mx-auto w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px]">
                    <img
                      src={activeSection.imageUrl}
                      alt={activeSection.imageAlt}
                      className="h-auto w-full object-contain drop-shadow-sm"
                      loading="lazy"
                    />
                  </div>
                  <div className="mx-auto max-w-[560px] text-center">
                    <h3 className="mb-2 text-lg font-bold text-bi-ink md:text-xl">{activeSection.title}</h3>
                    {activeSection.paragraphs.map((paragraph, index) => (
                      <p key={index} className="text-sm leading-relaxed text-text-m md:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-grey-200 bg-white text-bi-ink shadow-sm transition hover:border-bi-teal/30 hover:text-bi-teal md:flex"
            aria-label="Previous Profile Shop benefit"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute top-1/2 right-2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-grey-200 bg-white text-bi-ink shadow-sm transition hover:border-bi-teal/30 hover:text-bi-teal md:flex"
            aria-label="Next Profile Shop benefit"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 lg:col-start-1 lg:row-start-2">
        {PROFILE_SHOP_BENEFITS.map((section, index) => (
          <button
            key={section.number}
            type="button"
            onClick={() => goToTab(index)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition md:text-sm ${
              activeIndex === index
                ? "border-bi-teal bg-bi-teal text-white shadow-sm"
                : "border-grey-200 bg-white text-text-s hover:border-bi-teal/40 hover:text-bi-teal"
            }`}
            aria-current={activeIndex === index ? "true" : undefined}
          >
            {PROFILE_SHOP_BENEFIT_TABS[index]}
          </button>
        ))}
      </div>

      <div className="lg:col-start-2 lg:row-start-1 lg:flex lg:items-center lg:self-stretch">
        <aside className="w-full rounded-2xl border border-grey-200 bg-white p-5 shadow-sm md:p-6 lg:sticky lg:top-32">
          <h3 className="text-lg font-bold text-bi-ink">{copy.title}</h3>

          <div className="mt-5 space-y-0 rounded-xl border border-grey-100 bg-grey-50/60 px-4">
            <DetailRow label={copy.originalPrice} value={formattedPrice} />
            <DetailRow
              label={copy.total}
              value={<span className="text-lg font-bold text-bi-teal">{formattedPrice}</span>}
            />
          </div>

          <div className="mt-5">
            <label htmlFor="voucher-code" className="mb-2 block text-sm font-semibold text-bi-ink">
              {copy.voucherLabel}
            </label>
            <input
              id="voucher-code"
              type="text"
              value={voucherInput}
              onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
              placeholder={copy.voucherPlaceholder}
              className="w-full rounded-lg border border-grey-200 bg-white px-4 py-3 text-sm uppercase placeholder:normal-case placeholder:text-text-s focus:border-bi-teal focus:outline-none focus:ring-2 focus:ring-bi-teal/20"
            />
          </div>

          <Link
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bi-btn-teal mt-6 w-full justify-center"
          >
            {copy.subscribeNow}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-grey-100 py-3.5 last:border-b-0">
      <p className="text-sm font-medium text-text-m">{label}</p>
      <div className="text-right text-sm text-bi-ink">{value}</div>
    </div>
  );
}
