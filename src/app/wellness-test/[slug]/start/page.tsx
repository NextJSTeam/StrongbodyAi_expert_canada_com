import { notFound } from "next/navigation";
import { getWellnessTopic } from "@/lib/wellness-test";
import StartTestClient from "./StartTestClient";

export default async function StartWellnessTestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = await getWellnessTopic(slug);
  if (!topic?.questions?.length) notFound();
  return <StartTestClient slug={slug} questions={topic.questions} />;
}
