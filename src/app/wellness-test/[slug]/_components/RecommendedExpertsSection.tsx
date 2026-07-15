import Link from "next/link";
import { getWellnessExperts, type WellnessExpert } from "@/lib/wellness-experts";

const EXPERT_CARD_COUNT = 20;

function normalizeCountries(expert: WellnessExpert): string[] {
  if (expert.user?.country?.title) return [expert.user.country.title];
  return [];
}

function normalizeSkills(expert: WellnessExpert): string[] {
  return Array.isArray(expert.skills) ? expert.skills.map((skill) => skill.trim()).filter(Boolean) : [];
}

function getDisplayName(expert: WellnessExpert): string {
  return expert.shop_name?.trim() || "";
}

function getProfession(expert: WellnessExpert): string {
  return expert.profession || expert.professions?.[0]?.name || "";
}

function getImageSrc(expert: WellnessExpert): string {
  return expert.banner_picture || expert.user?.profile_picture || "";
}

function truncateWords(text: string, maxWords: number) {
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + " ...";
}

function ExpertCard({ expert }: { expert: WellnessExpert }) {
  const author = getDisplayName(expert);
  const categoryName = getProfession(expert);
  const countries = normalizeCountries(expert);
  const skills = normalizeSkills(expert);
  const imageSrc = getImageSrc(expert);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#e5e7eb] bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-col items-center gap-3 p-4 sm:flex-row sm:items-start sm:gap-4">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={author || categoryName || "Expert"}
            className="h-[80px] w-[80px] rounded-full object-cover sm:h-[90px] sm:w-[90px]"
          />
        ) : (
          <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#f3f4f6] text-sm font-semibold text-[#6b7280] sm:h-[90px] sm:w-[90px]">
            {author?.charAt(0) || categoryName?.charAt(0) || "E"}
          </div>
        )}

        <div className="min-w-0 flex flex-col items-center text-center sm:items-start sm:text-left">
          {author ? <span className="text-base font-semibold text-[#111827] sm:text-lg">{author}</span> : null}
          {categoryName ? <span className="block w-full truncate text-sm text-[#6b7280]">{categoryName}</span> : null}
          {countries.length > 0 ? <span className="text-xs text-[#6b7280] sm:text-sm">{countries.join(", ")}</span> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4">
        {expert.about ? (
          <p className="mb-3 line-clamp-2 text-sm font-normal text-[#374151] sm:text-[15px]">
            {expert.about}
          </p>
        ) : null}

        {skills.length > 0 ? (
          <div className="mb-3 flex flex-wrap gap-2">
            {skills.slice(0, 2).map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-medium text-[#111827] ring-1 ring-[#e5e7eb] ring-inset"
              >
                {truncateWords(skill, 4)}
              </span>
            ))}

            {skills.length > 2 && (
              <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-medium text-[#687588] ring-1 ring-[#e5e7eb] ring-inset">
                +{skills.length - 2}
              </span>
            )}
          </div>
        ) : null}

        <div className="mt-auto flex">
          <Link
            href={"https://strongbody.ai/message-center/" + expert.user_id}
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#da1f27] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#b91c1f] sm:w-auto"
          >
            Chat now
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function RecommendedExpertsSection() {
  const experts = await getWellnessExperts(EXPERT_CARD_COUNT);

  if (!experts.length) return null;

  return (
    <section className="bg-[#f8fafc] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#da1f27]">
              Recommended experts
            </p>

            <h2 className="text-[2rem] font-bold text-[#111827] md:text-[2.5rem]">
              Recommended Experts For You
            </h2>

            <p className="mt-4 max-w-[640px] text-[15px] leading-[1.8] text-[#687588]">
              After your wellness assessment, get connected with trusted experts who can help you take the next step.
            </p>
          </div>

          <Link
            href="https://strongbody.ai/experts"
            className="shrink-0 rounded-full border border-[#da1f27] px-5 py-2 text-sm font-semibold text-[#da1f27] transition hover:bg-[#da1f27] hover:text-white"
          >
            View all
          </Link>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="grid min-w-max grid-flow-col grid-rows-1 gap-5 md:grid-rows-2">
            {experts.map((expert) => (
              <div key={expert.id} className="w-[300px]">
                <ExpertCard expert={expert} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
