import Link from "next/link";
import { Building2, MapPin } from "lucide-react";
import { PARTNER_RECRUITMENT_ACTIVATION_FEE } from "@/constants/profile-shop-benefits";
import { OPEN_PROFILE_SHOP_URL } from "@/config/links";
import { partnerRecruitmentPost } from "@/content/partner-recruitment-post";

interface PartnerRecruitmentApplyAsideProps {
  position: string;
}

export default function PartnerRecruitmentApplyAside({ position }: PartnerRecruitmentApplyAsideProps) {
  const copy = partnerRecruitmentPost.applyAside;
  const feeLabel = `$${PARTNER_RECRUITMENT_ACTIVATION_FEE}/year`;

  const rows = [
    [copy.position, position || copy.defaultPosition],
    [copy.company, copy.companyValue],
    [copy.network, copy.networkValue],
    [copy.industry, copy.industryValue],
    [copy.address, copy.addressValue],
  ] as const;

  return (
    <aside className="w-full lg:sticky lg:top-32 lg:self-start">
      <div className="bi-card overflow-hidden">
        <div className="border-b border-grey-100 bg-bi-teal-light/50 px-5 py-5 md:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
              <Building2 className="h-5 w-5 text-bi-teal" aria-hidden />
            </div>
            <h2 className="text-lg font-bold leading-snug text-bi-ink">
              {copy.titleLine1}
              <br />
              <span className="text-bi-teal">{copy.titleLine2}</span>
            </h2>
          </div>
        </div>

        <div className="space-y-0 px-5 py-2 md:px-6">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-[100px_1fr] gap-3 border-b border-grey-100 py-4 last:border-b-0"
            >
              <p className="text-sm font-medium text-text-s">{label}</p>
              <p className="text-right text-sm leading-relaxed text-bi-ink">{value}</p>
            </div>
          ))}

          <div className="grid grid-cols-[100px_1fr] gap-3 border-b border-grey-100 py-4">
            <p className="text-sm font-medium text-text-s">{copy.activationFee}</p>
            <p className="text-right text-lg font-bold text-bi-teal">{feeLabel}</p>
          </div>
        </div>

        <div className="border-t border-grey-100 bg-grey-50/80 px-5 py-5 md:px-6">
          <p className="text-center text-sm leading-relaxed text-primary">
            {copy.activationFeeNote.replace("{fee}", feeLabel)}
          </p>

          <Link
            href={OPEN_PROFILE_SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bi-btn-teal mt-4 w-full justify-center"
          >
            {copy.applyNow}
          </Link>
        </div>
      </div>

      <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-text-s">
        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        StrongBody connects independent wellness experts with clients worldwide.
      </p>
    </aside>
  );
}
