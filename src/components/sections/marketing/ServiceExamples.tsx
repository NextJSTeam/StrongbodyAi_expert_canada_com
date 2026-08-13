import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Crown, Download, HeartHandshake, Plane, Sparkles, TrendingUp, UsersRound } from "lucide-react";
import { SAMPLE_SERVICES } from "@/content/samples";

const APP_DOWNLOAD_URL = "https://link.multime.ai/uVD7/b4zsnrc1";
const BECOME_SELLER_URL = "https://www.strongbody.ai/become-seller/profession-search";

function withSource(href: string, source: string) {
  const url = new URL(href);
  url.searchParams.set("source", source);
  return url.toString();
}

const ICONS = [BriefcaseBusiness, UsersRound, Plane, TrendingUp, Sparkles, HeartHandshake, Crown];

const ServiceExamples = () => {
  return (
    <section id="sample-services" className="bi-section bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(260px,0.35fr)] lg:items-end">
          <div>
            <span className="section-eyebrow text-xs font-bold uppercase tracking-wider text-primary">Sample services</span>
            <h2 className="section-title mt-3 text-3xl font-bold tracking-tight text-grey-900 md:text-5xl">Offer formats partners can publish</h2>
            <p className="mt-5 text-base font-medium leading-relaxed text-text-m md:text-lg">The card keeps icon and title quiet while the value promise, outcome, and price carry the attention.</p>
          </div>
          <div className="rounded-2xl bg-grey-50 p-5"><p className="text-lg font-black leading-snug text-grey-900">Quiet label. Clear value. Faster decision.</p></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SAMPLE_SERVICES.map((service, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <article key={service.title} className="flex h-full min-w-0 flex-col rounded-2xl border border-grey-100 bg-grey-50 p-6 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-xl">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <span className="min-w-0 text-[11px] font-bold uppercase tracking-wider text-grey-400">{service.title}</span>
                  <Icon size={18} strokeWidth={1.5} className="shrink-0 text-grey-300" />
                </div>
                <p className="flex-grow text-xl font-black leading-snug text-grey-900">{service.quote}</p>
                <div className="mt-6 border-t border-grey-200 pt-4"><span className="text-xs font-black tracking-wider text-secondary">{service.pricing}</span></div>
              </article>
            );
          })}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href={withSource(APP_DOWNLOAD_URL, "sample_services_download")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30">Download app <Download size={16} /></Link>
          <Link href={withSource(BECOME_SELLER_URL, "sample_services_partner")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-7 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-secondary/90">Publish a service <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceExamples;

