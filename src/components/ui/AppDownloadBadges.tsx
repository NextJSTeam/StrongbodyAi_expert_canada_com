"use client";

import { APP_DOWNLOAD_URL } from "@/config/links";
import { footerContent } from "@/config/footer-content";
import { APP_STORE_BADGE_IMG, GOOGLE_PLAY_BADGE_IMG } from "@/constants/app-download";
import { capturePostHogEvent } from "@/components/analytics/PostHogPageView";

type AppDownloadBadgesProps = {
  className?: string;
  /** Visual height of both badges. */
  size?: "sm" | "md";
};

const sizeClasses = {
  sm: {
    appStore: "h-[38px] sm:h-[42px]",
    googlePlay: "h-[56px] -mx-[8px] -my-[9px] sm:h-[62px] sm:-mx-[9px] sm:-my-[10px]",
  },
  md: {
    appStore: "h-[46px] sm:h-[52px]",
    googlePlay: "h-[68px] -mx-[10px] -my-[11px] sm:h-[78px] sm:-mx-[10px] sm:-my-[13px]",
  },
} as const;

export default function AppDownloadBadges({
  className = "",
  size = "sm",
}: AppDownloadBadgesProps) {
  const slot = sizeClasses[size];

  return (
    <div className={`flex flex-wrap items-center gap-2.5 sm:gap-3 ${className}`}>
      <a
        href={APP_DOWNLOAD_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={footerContent.appStoreAlt}
        onClick={() => capturePostHogEvent("app_download_click", { source: "app_store_badge", destination: APP_DOWNLOAD_URL })}
        className="inline-flex shrink-0 items-center transition hover:opacity-90 hover:-translate-y-0.5 active:scale-[0.98]"
      >
        <img
          src={APP_STORE_BADGE_IMG}
          alt=""
          className={`${slot.appStore} w-auto max-w-none object-contain`}
          loading="lazy"
          decoding="async"
        />
      </a>
      <a
        href={APP_DOWNLOAD_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={footerContent.playStoreAlt}
        onClick={() => capturePostHogEvent("app_download_click", { source: "google_play_badge", destination: APP_DOWNLOAD_URL })}
        className="inline-flex shrink-0 items-center transition hover:opacity-90 hover:-translate-y-0.5 active:scale-[0.98]"
      >
        <img
          src={GOOGLE_PLAY_BADGE_IMG}
          alt=""
          className={`${slot.googlePlay} w-auto max-w-none object-contain`}
          loading="lazy"
          decoding="async"
        />
      </a>
    </div>
  );
}
