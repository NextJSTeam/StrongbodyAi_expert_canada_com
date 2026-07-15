import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, ClipboardList, Clock, Heart, Sparkles, Star, ThumbsUp, Users } from "lucide-react";
import { WELLNESS_TEST_COPY as copy } from "@/lib/wellness-test-copy";
import { formatDuration, listWellnessTopics } from "@/lib/wellness-test";
import TestCardsSection, { type WellnessTestCard } from "./_components/TestCardsSection";
import SampleQuestionsSection, { type SampleQuestion } from "./_components/SampleQuestionsSection";

export const metadata: Metadata = {
  title: copy.metaTitle,
  description: copy.metaDescription,
};

export default async function WellnessTestPage() {
  const topics = await listWellnessTopics();

  const testCards: WellnessTestCard[] = topics.map((topic) => ({
    id: topic.id,
    slug: topic.slug,
    title: topic.title,
    insight: topic.insight,
    time: formatDuration(topic.durationSec, topic.questionCount) + " " + copy.minutes,
    questions: topic.questionCount || topic.questions?.length || 0,
    href: "/wellness-test/" + topic.slug,
  }));

  const sampleQuestions: SampleQuestion[] = topics
    .flatMap((topic) =>
      (topic.questions || []).slice(0, 1).map((question) => ({
        question,
        testSlug: topic.slug,
        testTitle: topic.title,
      })),
    )
    .slice(0, 20);

  return (
    <main className="bg-white text-[#111827]">
      <section className="relative overflow-hidden bg-white pt-24 pb-16 md:pt-28 md:pb-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 40%, #da1f27 0%, transparent 60%), radial-gradient(circle at 10% 80%, #7c3aed 0%, transparent 50%)",
          }}
        />

        <div className="container mx-auto px-4 md:px-6">
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-[#687588]">
            <Link href="/" className="transition-colors hover:text-[#da1f27]">Home</Link>
            <span>/</span>
            <span className="text-[#111827]">{copy.heroTitle}</span>
          </nav>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#da1f27]/20 bg-[#da1f27]/5 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-[#da1f27]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#da1f27]" />
                {copy.eyebrow}
              </div>

              <h1 className="text-[2rem] font-extrabold leading-tight text-[#111827] md:text-[2.75rem] lg:text-[3rem]">
                {copy.heroTitle}
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #da1f27 0%, #7c3aed 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {copy.metaTitle.split("|")[0].replace(copy.heroTitle, "").replace(/^-/, "").trim() || copy.heroCta}
                </span>
              </h1>

              <p className="mt-5 max-w-[540px] text-[15px] leading-[1.7] text-[#687588]">{copy.heroLead}</p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#wellness-tests"
                  className="inline-flex items-center gap-2 rounded-full bg-[#da1f27] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(218,31,39,0.3)] transition-all hover:bg-[#bf1a21] hover:shadow-[0_10px_24px_rgba(218,31,39,0.4)]"
                >
                  {copy.start}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {["#da1f27", "#7c3aed", "#059669", "#d97706"].map((color, i) => (
                      <div
                        key={i}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white"
                        style={{ backgroundColor: color }}
                      >
                        {["A", "M", "K", "J"][i]}
                      </div>
                    ))}
                  </div>
                  <div className="text-[12px] leading-snug">
                    <p className="font-semibold text-[#111827]">50,000+ users</p>
                    <p className="text-[#687588]">took a test this month</p>
                  </div>
                </div>
                <div className="h-7 w-px bg-[#e5e7eb]" />
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-[#687588]" />
                  <span className="text-[12px] text-[#687588]">
                    <span className="font-semibold text-[#111827]">1,200+</span> verified experts
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:w-[340px]">
              <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                <div className="mb-6 rounded-2xl bg-[#f8fafc] p-4">
                  <div className="mb-3 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5" fill="#FBBF24" stroke="#FBBF24" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-semibold text-[#111827]">4.9/5 from 1,200+ reviews</p>
                    <ThumbsUp className="h-4 w-4 text-[#7c3aed]" fill="#7c3aed" />
                  </div>
                </div>

                <div className="mb-6 rounded-2xl border border-[#e5e7eb] bg-white p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffe5e5]">
                      <Clock className="h-5 w-5 text-[#da1f27]" />
                    </div>
                    <h3 className="text-[15px] font-bold text-[#111827]">Quick 2-3 Min Assessment</h3>
                  </div>
                  <p className="text-[13px] leading-[1.6] text-[#687588]">{copy.step2Text}</p>
                </div>

                <ul className="space-y-3">
                  {[copy.step1Title, copy.step2Title, copy.step3Title].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#059669]" />
                      <span className="text-[13px] font-medium text-[#374151]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-3 text-center text-[12px] font-semibold uppercase tracking-widest text-[#da1f27]">
            Simple · Accurate · Personal
          </div>
          <h2 className="mb-4 text-center text-[1.75rem] font-bold text-[#111827] md:text-[2.25rem]">{copy.howTitle}</h2>
          <p className="mx-auto mb-14 max-w-[540px] text-center text-[15px] leading-[1.7] text-[#687588]">{copy.howLead}</p>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { number: "01", icon: <ClipboardList className="h-6 w-6" />, iconBg: "from-[#da1f27] to-[#f43f5e]", title: copy.step1Title, description: copy.step1Text },
              { number: "02", icon: <Heart className="h-6 w-6" />, iconBg: "from-[#7c3aed] to-[#8b5cf6]", title: copy.step2Title, description: copy.step2Text },
              { number: "03", icon: <Sparkles className="h-6 w-6" />, iconBg: "from-[#059669] to-[#10b981]", title: copy.step3Title, description: copy.step3Text },
            ].map((step, index) => (
              <div key={step.number} className="relative">
                {index < 2 && <div className="absolute left-full top-10 z-10 hidden h-px w-8 bg-gradient-to-r from-[#e5e7eb] to-transparent md:block" />}
                <article className="group relative rounded-2xl border border-[#e5e7eb] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                  <span className="absolute right-5 top-5 select-none text-[3rem] font-extrabold leading-none text-[#f0f0f5]">{step.number}</span>
                  <div className={"mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md " + step.iconBg}>{step.icon}</div>
                  <h3 className="mb-3 text-[1.1rem] font-bold text-[#111827]">{step.title}</h3>
                  <p className="text-[14px] leading-[1.7] text-[#687588]">{step.description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestCardsSection testCards={testCards} />
      <SampleQuestionsSection questions={sampleQuestions} />
    </main>
  );
}
