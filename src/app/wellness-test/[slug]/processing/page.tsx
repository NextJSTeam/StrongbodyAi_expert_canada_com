import { Suspense } from "react";
import ProcessingClient from "./ProcessingClient";

export default async function ProcessingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <Suspense fallback={null}>
      <ProcessingClient slug={slug} />
    </Suspense>
  );
}
