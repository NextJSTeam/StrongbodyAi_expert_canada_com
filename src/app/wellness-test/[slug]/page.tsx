import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen, Clock3, Heart, Lock, ShieldCheck, Users } from "lucide-react";
import { WELLNESS_TEST_COPY as copy } from "@/lib/wellness-test-copy";
import { formatDuration, getWellnessTopic, listWellnessTopics } from "@/lib/wellness-test";
import ResultPanel from "./ResultPanel";
import RecommendedExpertsSection from "./_components/RecommendedExpertsSection";
import PostRequestCard from "./_components/PostRequestCard";
import TestCardsSection, { type WellnessTestCard } from "../_components/TestCardsSection";

function FactCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-[#f8fafc] p-4">
      <div className="mb-2 flex items-center gap-2 text-[#5b6cff]">{icon}</div>
      <div className="text-xs text-[#687588]">{title}</div>
      <div className="font-semibold text-[#111827]">{value}</div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getWellnessTopic(slug);
  return {
    title: topic ? topic.title + " - Wellness Test | StrongBody AI" : copy.notFound,
    description: topic?.insight || copy.metaDescription,
  };
}

export default async function WellnessTopicPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ submissionId?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const [topic, allTopics] = await Promise.all([getWellnessTopic(slug), listWellnessTopics()]);

  if (!topic) notFound();

  const minutes = formatDuration(topic.durationSec, topic.questionCount);
  const questionCount = topic.questionCount || topic.questions?.length || 0;
  const otherTests: WellnessTestCard[] = allTopics
    .filter((item) => item.slug !== slug)
    .slice(0, 8)
    .map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      insight: item.insight,
      time: formatDuration(item.durationSec, item.questionCount) + " " + copy.minutes,
      questions: item.questionCount || item.questions?.length || 0,
      href: "/wellness-test/" + item.slug,
    }));

  return (
    <div>
      <section className="relative overflow-hidden bg-white pt-24 pb-16 md:pt-28 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <nav className="mb-6 flex w-full items-center gap-1.5 overflow-hidden whitespace-nowrap text-xs text-[#687588] md:text-sm">
            <Link href="/" className="transition-colors hover:text-[#da1f27]">Home</Link>
            <span>/</span>
            <Link href="/wellness-test" className="transition-colors hover:text-[#da1f27]">{copy.heroTitle}</Link>
            <span>/</span>
            <span className="min-w-0 flex-1 truncate text-[#111827]">{topic.title}</span>
          </nav>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
            <div className="flex-1">
              <h1 className="text-[32px] font-bold leading-tight text-[#111827] md:text-[40px] lg:text-[48px]">
                {topic.title}
              </h1>
              <p className="mt-6 max-w-[680px] text-[15px] leading-[1.8] text-[#687588]">
                {topic.insight}
              </p>

              <div className="mt-10">
                <Link
                  href={"/wellness-test/" + slug + "/start"}
                  className="inline-flex items-center justify-center rounded-[10px] bg-[#da1f27] px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-[#bf1a21]"
                >
                  {query?.submissionId ? copy.retake : copy.start}
                </Link>

                <div className="mt-8 flex flex-wrap gap-6 text-sm text-[#687588]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#22c55e]" />
                    Fully Anonymous
                  </div>

                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#6d3df5]" />
                    Based on Psychological Research
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <ResultPanel slug={slug} submissionId={query?.submissionId} />
              </div>
            </div>

            <aside className="hidden lg:block lg:w-[380px]">
              <div className="rounded-[32px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,.08)]">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef2ff]">
                    <Heart className="h-7 w-7 text-[#5b6cff]" />
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#9ca3af]">
                      Category
                    </div>

                    <div className="text-lg font-bold text-[#111827]">
                      {topic.category || "General"}
                    </div>
                  </div>
                </div>

                <div className="my-6 border-t border-[#f3f4f6]" />

                <div className="grid grid-cols-2 gap-4">
                  <FactCard icon={<BookOpen className="h-4 w-4 text-[#5b6cff]" />} title="Questions" value={questionCount ? questionCount + " " + copy.questions : "-"} />
                  <FactCard icon={<Clock3 className="h-4 w-4 text-[#5b6cff]" />} title="Duration" value={minutes + " " + copy.minutes} />
                  <FactCard icon={<Lock className="h-4 w-4 text-[#5b6cff]" />} title="Privacy" value="100% encrypted" />
                  <FactCard icon={<Users className="h-4 w-4 text-[#5b6cff]" />} title="Best for" value="Ages 20-35" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <RecommendedExpertsSection />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <PostRequestCard />
        </div>
      </section>

      <TestCardsSection
        testCards={otherTests}
        title="Explore More Assessments"
        description="Discover more science-backed assessments to help you understand your wellness areas."
        ctaHref="/wellness-test"
        ctaLabel="All tests"
      />
    </div>
  );
}
