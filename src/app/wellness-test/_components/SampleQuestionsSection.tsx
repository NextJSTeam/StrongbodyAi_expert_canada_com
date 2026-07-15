"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { WellnessQuestion } from "@/lib/wellness-test";
import { WELLNESS_TEST_COPY as copy } from "@/lib/wellness-test-copy";

export type SampleQuestion = {
  question: WellnessQuestion;
  testSlug: string;
  testTitle: string;
};

export default function SampleQuestionsSection({ questions }: { questions: SampleQuestion[] }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const autoRotateRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (questions.length === 0 || selectedOption !== null) {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
      return;
    }

    autoRotateRef.current = setInterval(() => {
      setCurrentQ((c) => (c + 1) % questions.length);
    }, 4000);

    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [questions.length, selectedOption]);

  if (questions.length === 0) return null;

  const goNext = () => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    setCurrentQ((c) => (c + 1) % questions.length);
    setSelectedOption(null);
  };

  const goPrev = () => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    setCurrentQ((c) => (c - 1 + questions.length) % questions.length);
    setSelectedOption(null);
  };

  const { question, testSlug, testTitle } = questions[currentQ];
  const hasOptions = (question.options?.length ?? 0) > 0;
  const showTakeTestCta = !hasOptions || selectedOption !== null;

  return (
    <section className="bg-[#f8fafc] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-3 text-center text-[12px] font-semibold tracking-widest text-[#da1f27] uppercase">
          Try before you begin
        </div>
        <h2 className="mb-4 text-center text-[1.75rem] font-bold text-[#111827] md:text-[2.25rem]">
          Sample Questions
        </h2>
        <p className="mx-auto mb-12 max-w-[520px] text-center text-[15px] leading-[1.7] text-[#687588]">
          {copy.testsLead}
        </p>

        <div className="mx-auto max-w-[640px]">
          <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.07)]">
            <div className="flex items-center justify-between border-b border-[#f0f0f5] px-6 py-4">
              <Link href={"/wellness-test/" + testSlug} className="text-xs md:text-sm font-semibold tracking-wide text-[#da1f27] uppercase transition hover:text-[#bf1a21]">
                {testTitle}
              </Link>
            </div>

            <div className="px-6 py-7">
              <p className="mb-6 text-[15px] leading-snug font-semibold text-[#111827] md:text-[16px]">
                {question.text}
              </p>

              {hasOptions ? (
                <div className="space-y-3">
                  {question.options.map((option, i) => {
                    const isSelected = selectedOption === i;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedOption(i)}
                        className={"group flex w-full cursor-pointer items-start gap-3 rounded-xl border px-4 py-3.5 text-left text-[13px] leading-snug transition-all duration-200 md:text-[14px] " + (isSelected ? "border-[#059669] bg-[#059669]/5 font-medium text-[#059669]" : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#da1f27]/40 hover:bg-[#da1f27]/5")}
                      >
                        <span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors " + (isSelected ? "border-[#059669] bg-[#059669]" : "border-[#d1d5db] group-hover:border-[#da1f27]/60")}>
                          {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-white" />}
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {showTakeTestCta && (
              <div className="flex justify-center border-t border-[#f0f0f5] bg-[#f8fafc] px-6 py-4">
                <button
                  onClick={() => router.push("/wellness-test/" + testSlug + "/start")}
                  className="inline-block rounded-[10px] bg-[#da1f27] px-4 py-2 text-sm md:text-base font-semibold text-white transition hover:bg-[#bf1a21]"
                >
                  {copy.start}
                </button>
              </div>
            )}
          </div>

          {questions.length > 1 && (
            <div className="hidden md:flex mt-6 flex items-center justify-center gap-4">
              <button onClick={goPrev} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#687588] transition hover:border-[#da1f27] hover:text-[#da1f27]">
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                {questions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentQ(i);
                      setSelectedOption(null);
                    }}
                    className={"h-2 rounded-full transition-all duration-300 " + (i === currentQ ? "w-6 bg-[#da1f27]" : "w-2 bg-[#e5e7eb] hover:bg-[#da1f27]/40")}
                  />
                ))}
              </div>

              <button onClick={goNext} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#687588] transition hover:border-[#da1f27] hover:text-[#da1f27]">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          <p className="mt-6 text-center text-[13px] text-[#687588]">
            {copy.readyPrompt}{" "}
            <a href="#wellness-tests" className="font-semibold text-[#da1f27] underline underline-offset-2 transition hover:text-[#bf1a21]">
              {copy.heroCta} →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
