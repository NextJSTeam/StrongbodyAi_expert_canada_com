"use client";

import { useEffect, useMemo, useState } from "react";
import { WELLNESS_TEST_COPY as copy } from "@/lib/wellness-test-copy";
import type { WellnessCompleteResponse } from "@/lib/wellness-test";
import { loadResult } from "../_lib/session-storage";

const getLevelLabel = (score: number | null) => {
  if (score === null) return "Pending";
  if (score < 4) return "Needs Attention";
  if (score < 7) return "Average";
  return "Strong Wellness";
};

export default function ResultPanel({ slug, submissionId }: { slug: string; submissionId?: string }) {
  const [result, setResult] = useState<WellnessCompleteResponse | null>(null);

  useEffect(() => {
    if (!submissionId) return;
    setResult(loadResult(slug, submissionId));
  }, [slug, submissionId]);

  const overallScore = useMemo(() => {
    if (!result?.scores?.length) return null;
    const values = result.scores
      .map((score) => Number(score.score ?? 0))
      .filter((value) => !Number.isNaN(value));
    if (!values.length) return null;
    const avg = values.reduce((total, value) => total + value, 0) / values.length;
    return Math.round(avg * 10) / 10;
  }, [result]);

  const insights = useMemo(() => {
    if (!result?.scores?.length) return [];
    return result.scores.map((score, index) => ({
      title: score.tag_name || score.atomic_factor_name || copy.insight + " " + (index + 1),
      value: score.score ?? "-",
      level: score.level || "",
      insight: score.insight || "",
    }));
  }, [result]);

  if (!submissionId || !result) return null;

  return (
    <section className="mt-12">
      <div className="rounded-[32px] border border-[#e5e7eb] bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#10b981]">{copy.resultTitle}</div>
            <h2 className="mt-4 text-3xl font-bold text-[#111827]">Your latest assessment summary</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#6b7280]">
              {result.insight || "Your latest saved test result is ready. Retake the assessment anytime to update your score."}
            </p>
          </div>

          <div className="min-w-[240px] rounded-[28px] border border-[#e5e7eb] bg-[#f8fafc] p-6 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b7280]">{copy.score}</div>
            <div className="mt-5 text-[3.75rem] font-extrabold text-[#111827]">{overallScore ?? "-"}</div>
            <div className="mt-2 text-sm text-[#687588]">out of 10</div>
            <div className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#111827] shadow-sm">
              {getLevelLabel(overallScore)}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] bg-[#f9fafb] p-6">
            <h3 className="text-lg font-semibold text-[#111827]">Deep insights</h3>
            <p className="mt-3 text-sm leading-7 text-[#6b7280]">These are the strongest themes from your latest completed assessment.</p>

            <div className="mt-6 space-y-4">
              {insights.length > 0 ? (
                insights.map((insight, index) => (
                  <div key={index} className="rounded-3xl bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-[#111827]">{insight.title}</div>
                        {insight.level ? <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[#6b7280]">{insight.level}</div> : null}
                      </div>
                      <div className="text-lg font-bold text-[#111827]">{insight.value}</div>
                    </div>
                    {insight.insight ? <p className="mt-3 text-sm leading-6 text-[#6b7280]">{insight.insight}</p> : null}
                  </div>
                ))
              ) : (
                <div className="rounded-3xl bg-white p-6 text-sm text-[#6b7280]">No detailed scores are available yet.</div>
              )}
            </div>
          </div>

          <aside className="rounded-[28px] border border-[#e5e7eb] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#111827]">Take action next</h3>
            <p className="mt-3 text-sm leading-7 text-[#6b7280]">Use your score to choose the right expert and improve your wellness habits with targeted support.</p>
            <div className="mt-6 space-y-3">
              <div className="rounded-3xl bg-[#f8fafc] p-4 text-sm text-[#111827]">Unlock expert recommendations based on your results.</div>
              <div className="rounded-3xl bg-[#f8fafc] p-4 text-sm text-[#111827]">Retake the quiz anytime to track changes over time.</div>
              <div className="rounded-3xl bg-[#f8fafc] p-4 text-sm text-[#111827]">Share your score with a coach or wellness partner.</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
