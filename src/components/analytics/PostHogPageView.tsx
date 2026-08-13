"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { SITE } from "@/config/site";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
const POSTHOG_ENABLED = process.env.NEXT_PUBLIC_POSTHOG_ENABLED !== "false";

let initialized = false;
let lastCapturedUrl = "";

function getSiteProperty(key: string): string {
  const value = (SITE as Record<string, unknown>)[key];
  return typeof value === "string" ? value : "";
}

function siteProperties() {
  return {
    site_code: getSiteProperty("siteCode"),
    site_name: getSiteProperty("siteName"),
    domain: getSiteProperty("brandDomain"),
    country: getSiteProperty("country"),
    country_en: getSiteProperty("countryEn"),
    locale: getSiteProperty("locale"),
    language: getSiteProperty("language"),
  };
}

function initPostHog() {
  if (initialized || !POSTHOG_ENABLED || !POSTHOG_KEY || typeof window === "undefined") {
    return initialized;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false,
    person_profiles: "identified_only",
    persistence: "localStorage+cookie",
    loaded: (client) => {
      client.register(siteProperties());
    },
  });

  initialized = true;
  return true;
}

export function capturePostHogEvent(eventName: string, properties: Record<string, unknown> = {}) {
  if (!initPostHog()) return;
  posthog.capture(eventName, {
    ...siteProperties(),
    ...properties,
  });
}

export default function PostHogPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (!initPostHog()) return;

    const currentUrl = window.location.href;
    if (currentUrl === lastCapturedUrl) return;
    lastCapturedUrl = currentUrl;

    posthog.capture("$pageview", {
      ...siteProperties(),
      $current_url: currentUrl,
      path: window.location.pathname,
      search: window.location.search,
      title: document.title,
    });
  }, [pathname]);

  return null;
}
