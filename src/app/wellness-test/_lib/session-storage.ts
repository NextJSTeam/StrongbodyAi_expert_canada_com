"use client";

import type { WellnessCompleteResponse } from "@/lib/wellness-test";

const pendingKey = (slug: string) => "strongbody-wellness-pending-" + slug;
const resultKey = (slug: string, id: string | number) => "strongbody-wellness-result-" + slug + "-" + id;

export function savePendingSubmission(slug: string, data: { answers: Array<{ question_id: number; value?: number }>; submissionId?: number | null }) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(pendingKey(slug), JSON.stringify(data));
}

export function loadPendingSubmission(slug: string): { answers: Array<{ question_id: number; value?: number }>; submissionId?: number | null } | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(pendingKey(slug));
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearPendingSubmission(slug: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(pendingKey(slug));
}

export function saveResult(slug: string, id: string | number, result: WellnessCompleteResponse) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(resultKey(slug, id), JSON.stringify(result));
}

export function loadResult(slug: string, id: string | number): WellnessCompleteResponse | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(resultKey(slug, id));
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
