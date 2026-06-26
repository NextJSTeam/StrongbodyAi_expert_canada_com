import Link from "next/link";
import { ArrowLeft, Briefcase, Globe2, MapPin, Sparkles } from "lucide-react";
import Container from "@/components/layout/Container";
import OpenProfileShopPanel from "@/components/recruitment/OpenProfileShopPanel";
import PartnerRecruitmentApplyAside from "@/components/recruitment/PartnerRecruitmentApplyAside";
import PartnerRecruitmentRegisterCta, {
  PartnerRecruitmentRegisterCtaMobile,
} from "@/components/recruitment/PartnerRecruitmentRegisterCta";
import { PARTNER_RECRUITMENT_ACTIVATION_FEE } from "@/constants/profile-shop-benefits";
import { OPEN_PROFILE_SHOP_URL } from "@/config/links";
import { partnerRecruitmentPost } from "@/content/partner-recruitment-post";
import type { JobDetail } from "@/utils/recruitment-loader";
import {
  getPartnerRecruitmentBuildShopUrl,
  getProfessionFromJob,
} from "@/utils/recruitment-loader";

interface RecruitmentJobDetailViewProps {
  job: JobDetail;
  backLabel?: string;
}

const META_ICONS = [Briefcase, Globe2, MapPin, Sparkles] as const;

export default function RecruitmentJobDetailView({
  job,
  backLabel = partnerRecruitmentPost.backToJobs,
}: RecruitmentJobDetailViewProps) {
  const copy = partnerRecruitmentPost;
  const profession = getProfessionFromJob(job);
  const registerUrl = getPartnerRecruitmentBuildShopUrl();
  const feeLabel = `$${PARTNER_RECRUITMENT_ACTIVATION_FEE}/year`;
  const metaItems = copy.hero.meta.map((item) => item.replace("{fee}", feeLabel));
  const metaChips = metaItems.slice(0, -1);
  const feeNote = metaItems[metaItems.length - 1];

  return (
    <main className="bi-theme-seller min-h-screen bg-grey-50 font-sans">
      <section className="border-b border-grey-200 bg-white pt-28 md:pt-32">
        <Container>
          <Link
            href="/recruitment"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-grey-200 bg-white px-4 py-2 text-sm font-semibold text-text-m transition hover:border-bi-teal/40 hover:text-bi-teal"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>

          <div className="mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-light px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              Partner recruitment
            </span>

            <h1
              id="partner-recruitment-heading"
              className="mt-5 text-3xl font-bold leading-tight tracking-tight text-bi-ink md:text-5xl md:leading-[1.15]"
            >
              {copy.hero.titleBefore}{" "}
              <span className="text-bi-teal">{profession || job.title}</span>
            </h1>
          </div>

          <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-4 border-b border-grey-200 pb-8 md:flex-row md:items-start md:justify-between md:gap-8">
            <div className="min-w-0 flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                {metaChips.map((item, index) => {
                  const Icon = META_ICONS[index] ?? Sparkles;
                  return (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-grey-200 bg-grey-50 px-4 py-2 text-sm font-medium text-text-m"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-bi-teal" aria-hidden />
                      {item}
                    </span>
                  );
                })}
              </div>
              {feeNote ? (
                <p className="mt-4 text-sm leading-relaxed text-text-s md:max-w-2xl">{feeNote}</p>
              ) : null}
            </div>

            <Link
              href={OPEN_PROFILE_SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bi-btn-teal w-full shrink-0 md:w-auto md:self-center"
            >
              {copy.hero.applyNow}
            </Link>
          </div>
        </Container>
      </section>

      <section className="bi-section border-b border-grey-200 bg-white">
        <Container>
          <div className="mb-6 md:mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-bi-teal">Profile shop</p>
            <h2 className="mt-2 text-2xl font-bold text-bi-ink md:text-3xl">{copy.openProfileShop.title}</h2>
          </div>
          <div className="bi-card overflow-hidden p-5 md:p-8 lg:p-10">
            <OpenProfileShopPanel subscribeUrl={OPEN_PROFILE_SHOP_URL} />
          </div>
        </Container>
      </section>

      <section className="bi-section">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-10">
            <article
              className="bi-card min-w-0 p-6 md:p-10"
              itemScope
              itemType="https://schema.org/JobPosting"
            >
              <meta itemProp="title" content={job.title} />
              <div className="mb-6 border-b border-grey-100 pb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-text-s">Role details</p>
                <h2 className="mt-2 text-xl font-bold text-bi-ink md:text-2xl">{job.title}</h2>
              </div>
              <div className="prp-content">
                <div className="article-html" dangerouslySetInnerHTML={{ __html: job.content }} />
              </div>
              <PartnerRecruitmentRegisterCtaMobile registerUrl={registerUrl} />
            </article>

            <PartnerRecruitmentApplyAside position={profession} />
          </div>
        </Container>
      </section>

      <PartnerRecruitmentRegisterCta registerUrl={registerUrl} />
    </main>
  );
}
