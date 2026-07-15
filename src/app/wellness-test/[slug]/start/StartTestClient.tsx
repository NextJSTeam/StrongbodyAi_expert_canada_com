"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WELLNESS_TEST_COPY as copy } from "@/lib/wellness-test-copy";
import type { WellnessQuestion } from "@/lib/wellness-test";
import { startWellnessTest } from "@/lib/wellness-test";
import { savePendingSubmission } from "../../_lib/session-storage";

export default function StartTestClient({ slug, questions }: { slug: string; questions: WellnessQuestion[] }) {
  const router = useRouter();
  const total = questions.length;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(total).fill(-1));
  const [submissionId, setSubmissionId] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const current = questions[index];
  const hasOptions = (current.options?.length ?? 0) > 0;
  const canProceed = !hasOptions || answers[index] !== -1;
  const percent = Math.round(((index + 1) / total) * 100);

  useEffect(() => {
    let mounted = true;
    startWellnessTest(slug)
      .then((res) => {
        if (mounted && res?.submission_id) setSubmissionId(res.submission_id);
      })
      .catch(() => undefined);
    return () => {
      mounted = false;
    };
  }, [slug]);

  const questionLabel = useMemo(() => {
    return copy.questionOf.replace("{current}", String(index + 1)).replace("{total}", String(total));
  }, [index, total]);

  function choose(optionIndex: number) {
    const next = [...answers];
    next[index] = optionIndex;
    setAnswers(next);
  }

  function finish() {
    if (!canProceed) return;
    setBusy(true);
    savePendingSubmission(slug, {
      submissionId,
      answers: questions.map((question, questionIndex) => {
        const answerIndex = answers[questionIndex];
        return answerIndex === -1 ? { question_id: question.id } : { question_id: question.id, value: answerIndex };
      }),
    });
    router.push("/wellness-test/" + slug + "/processing?pending=1");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 pt-24 pb-10 text-slate-950 sm:px-6 md:pt-28 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between text-sm font-semibold text-slate-500">
          <span>{questionLabel}</span>
          <span>{percent}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-red-600 transition-all" style={{ width: percent + "%" }} />
        </div>
        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold leading-tight sm:text-3xl">{current.text}</h1>
          {hasOptions ? (
            <div className="mt-8 grid gap-3">
              {current.options.map((option, optionIndex) => {
                const selected = answers[index] === optionIndex;
                return (
                  <button
                    key={optionIndex}
                    type="button"
                    onClick={() => choose(optionIndex)}
                    className={"rounded-xl border p-4 text-left text-sm leading-6 transition " + (selected ? "border-red-500 bg-red-50 text-slate-950" : "border-slate-200 bg-white text-slate-700 hover:border-red-200")}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          ) : null}
        </section>
        <div className="mt-8 flex items-center justify-between">
          {index > 0 ? (
            <button type="button" onClick={() => setIndex(index - 1)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold">
              <ChevronLeft className="h-4 w-4" /> {copy.back}
            </button>
          ) : <span />}
          {index < total - 1 ? (
            <button type="button" disabled={!canProceed} onClick={() => setIndex(index + 1)} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
              {copy.next} <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button type="button" disabled={!canProceed || busy} onClick={finish} className="inline-flex rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
              {busy ? copy.saving : copy.finish}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
