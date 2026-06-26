import Link from "next/link";
import Container from "@/components/layout/Container";
import { PARTNER_RECRUITMENT_ACTIVATION_FEE } from "@/constants/profile-shop-benefits";
import { BUILD_YOUR_SHOP_URL } from "@/config/links";
import { partnerRecruitmentPost } from "@/content/partner-recruitment-post";

interface PartnerRecruitmentRegisterCtaProps {
  registerUrl?: string;
}

export function PartnerRecruitmentRegisterCtaMobile({
  registerUrl = BUILD_YOUR_SHOP_URL,
}: PartnerRecruitmentRegisterCtaProps) {
  const copy = partnerRecruitmentPost.registerCta;
  const feeLabel = `$${PARTNER_RECRUITMENT_ACTIVATION_FEE}/year`;

  return (
    <section
      className="mt-8 rounded-2xl border border-grey-200 bg-bi-stone p-5 md:hidden"
      aria-label={copy.ariaLabel}
      id="register"
    >
      <h2 className="text-xl font-bold text-bi-ink">{copy.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-text-m">{copy.subtitle}</p>

      <div className="mt-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-s">{copy.joinProcess}</h3>
        <ol className="mt-4 space-y-0">
          {copy.steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bi-teal text-sm font-bold text-white">
                  {index + 1}
                </div>
                {index < copy.steps.length - 1 && <div className="w-0.5 flex-1 bg-grey-200" />}
              </div>
              <div className="pb-5">
                <p className="font-semibold text-bi-ink">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-text-m">
                  {step.description.replace("{fee}", feeLabel)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <Link
        href={registerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bi-btn-teal mt-2 w-full justify-center"
      >
        {copy.register}
      </Link>
    </section>
  );
}

export default function PartnerRecruitmentRegisterCta({
  registerUrl = BUILD_YOUR_SHOP_URL,
}: PartnerRecruitmentRegisterCtaProps) {
  const copy = partnerRecruitmentPost.registerCta;
  const feeLabel = `$${PARTNER_RECRUITMENT_ACTIVATION_FEE}/year`;

  return (
    <section className="hidden border-t border-grey-200 bg-bi-stone py-16 md:block md:py-20" aria-label={copy.ariaLabel}>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-bi-ink">{copy.title}</h2>
          <p className="mt-3 text-lg text-bi-teal">{copy.subtitle}</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
          {copy.steps.map((step, index) => (
            <div key={step.title} className="bi-card p-6 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-bi-teal text-sm font-bold text-white">
                {index + 1}
              </div>
              <p className="mt-4 text-lg font-bold text-bi-ink">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-m">
                {step.description.replace("{fee}", feeLabel)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bi-btn-teal inline-flex"
          >
            {copy.register}
          </Link>
          <p className="mt-4 text-sm text-text-s">{copy.feeNote.replace("{fee}", feeLabel)}</p>
        </div>
      </Container>
    </section>
  );
}
