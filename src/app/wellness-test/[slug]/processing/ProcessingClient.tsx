"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WELLNESS_TEST_COPY as copy } from "@/lib/wellness-test-copy";
import { completeWellnessTest } from "@/lib/wellness-test";
import { clearPendingSubmission, loadPendingSubmission, saveResult } from "../../_lib/session-storage";

export default function ProcessingClient({ slug }: { slug: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const started = useRef(false);
  const [progress, setProgress] = useState(24);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setProgress((value) => Math.min(98, value + 7)), 500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (started.current || searchParams.get("pending") !== "1") return;
    started.current = true;
    const pending = loadPendingSubmission(slug);
    if (!pending?.answers?.length) {
      setError(copy.missingAnswers);
      return;
    }
    completeWellnessTest(slug, pending.answers)
      .then((result) => {
        if (!result) {
          setError(copy.submitError);
          return;
        }
        const id = result.submission?.id || result.submission_id || pending.submissionId || "temp-" + Date.now();
        saveResult(slug, id, result);
        clearPendingSubmission(slug);
        setProgress(100);
        window.setTimeout(() => router.push("/wellness-test/" + slug + "?submissionId=" + encodeURIComponent(String(id))), 700);
      })
      .catch(() => setError(copy.submitError));
  }, [router, searchParams, slug]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 pt-28 pb-20 text-slate-950 sm:px-6 md:pt-32 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-red-200 border-t-red-600" />
        </div>
        <h1 className="text-2xl font-bold">{copy.analyzingTitle}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{copy.analyzingText}</p>
        {error ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
        ) : (
          <div className="mt-8 text-left">
            <div className="mb-2 text-sm font-semibold text-red-600">{copy.finishing}</div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-red-600 transition-all" style={{ width: progress + "%" }} />
            </div>
          </div>
        )}
        <p className="mt-8 text-sm text-slate-500">{copy.secure}</p>
      </div>
    </main>
  );
}
