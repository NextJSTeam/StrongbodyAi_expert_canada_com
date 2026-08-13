"use client";

import { capturePostHogEvent } from "@/components/analytics/PostHogPageView";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Crown, Download, HeartHandshake, Moon, Plane, Sparkles, Stethoscope, TrendingUp, UsersRound } from "lucide-react";
import { SAMPLE_REQUESTS } from "@/content/samples";

const APP_DOWNLOAD_URL = "https://link.multime.ai/uVD7/b4zsnrc1";
const POST_REQUEST_URL = "https://www.strongbody.ai/post-request";

function withSource(href: string, source: string) {
  const url = new URL(href);
  url.searchParams.set("source", source);
  return url.toString();
}

function postRequestHref(description?: string) {
  const url = new URL(POST_REQUEST_URL);
  url.searchParams.set("source", "homepage_sample_requests");
  if (description) url.searchParams.set("description", description);
  return url.toString();
}

const ICONS = [BriefcaseBusiness, UsersRound, Stethoscope, Plane, HeartHandshake, TrendingUp, Sparkles, Moon, Crown];

const RequestExamples = () => {
  return (
    <section id="sample-requests" className="bi-section bg-grey-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <span className="section-eyebrow text-xs font-bold uppercase tracking-wider text-primary">Sample requests</span>
          <h2 className="section-title mt-3 text-3xl font-bold tracking-tight text-grey-900 md:text-5xl">Real requests users can post in minutes</h2>
          <p className="mt-5 text-base font-medium leading-relaxed text-text-m md:text-lg">These examples make the marketplace concrete: describe the need, set a budget, receive expert offers, and continue inside MultiMe AI.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SAMPLE_REQUESTS.map((request, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <article key={request.category} className="flex h-full min-w-0 flex-col rounded-2xl border border-grey-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <span className="min-w-0 text-[11px] font-bold uppercase tracking-wider text-grey-400">{request.category}</span>
                  <Icon size={18} strokeWidth={1.5} className="shrink-0 text-grey-300" />
                </div>
                <p className="flex-grow text-xl font-black leading-snug text-grey-900">{request.quote}</p>
                <div className="mt-6 flex flex-col gap-3 border-t border-grey-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs font-black tracking-wider text-secondary">{request.budget}</span>
                  <Link href={postRequestHref(request.quote)} className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline" onClick={() => capturePostHogEvent("request_template_click", { source: "sample_requests", category: request.category, budget: request.budget })}>Use template <ArrowRight size={14} /></Link>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href={withSource(APP_DOWNLOAD_URL, "sample_requests_download")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30" onClick={() => capturePostHogEvent("app_download_click", { source: "sample_requests_download", destination: APP_DOWNLOAD_URL })}>Download app <Download size={16} /></Link>
          <Link href={postRequestHref()} className="inline-flex items-center justify-center gap-2 rounded-xl border border-grey-300 bg-white px-7 py-4 text-sm font-bold text-grey-900 transition-all hover:border-primary/30" onClick={() => capturePostHogEvent("request_create_click", { source: "sample_requests" })}>Create request <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
};

export default RequestExamples;


