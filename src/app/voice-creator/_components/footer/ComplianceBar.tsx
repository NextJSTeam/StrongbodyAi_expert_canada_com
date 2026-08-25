import { voiceCreatorCopy } from '@/content/voice-creator-copy';
import { SITE } from '@/config/site';
import { CONTACT } from '../data';

/**
 * The disclosure strip that sits above the footer's bottom bar.
 *
 * The rest of this footer is the strongbody.ai footer, ported wholesale — every
 * link in it points off this domain. That left the landing page with no route
 * to its own About, Contact or Legal page, on a domain whose wordmark says
 * StrongBody while the ad that sent the visitor here says MultiMe AI. This
 * block is the fix: who operates the site, under what legal entity, how to
 * reach them, where the on-domain policy pages are, and what the payout model
 * actually is.
 *
 * It renders on every `/voice-creator` page because the route replaces the
 * country chrome (see `ChromeSlot` in the root layout) — there is no other
 * footer here to carry it.
 *
 * Centred and column-capped rather than flush left: the columns above it run
 * the full width of the footer, so a left-aligned wall of legal prose read as
 * an unstyled afterthought. Held to ~70 characters a line it reads as a closing
 * statement, which is what it is.
 */
export default function ComplianceBar() {
  const { compliance } = voiceCreatorCopy;

  /** Links, the contact address and the domain — one row, one separator rule. */
  const items = [
    ...compliance.links,
    { label: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: SITE.brandDomain, href: null },
  ];

  return (
    <section
      aria-label={compliance.legalTitle}
      className="border-t border-gray-200 px-6 py-10 md:px-0 md:py-12"
    >
      <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
        <h2 className="text-[11px] leading-[16px] font-bold tracking-[1.4px] text-[#8b949f] uppercase">
          {compliance.legalTitle}
        </h2>

        <p className="mt-4 text-[14px] leading-[24px] text-[#556575]">
          <span className="font-semibold text-[#111827]">{compliance.operatedBy}</span>{' '}
          {compliance.operatorLegal}
        </p>

        <p className="mt-3 text-[13px] leading-[22px] text-[#7b8794]">
          {compliance.earningsDisclaimer}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-y-2 text-[14px] leading-[20px]">
          {items.map((item, index) => (
            <span key={item.label} className="flex items-center">
              {index > 0 && (
                <span aria-hidden="true" className="px-3 text-[#d3d9df]">
                  ·
                </span>
              )}
              {item.href ? (
                <a
                  href={item.href}
                  className="text-[#556575] underline underline-offset-4 transition-colors hover:text-[#111827]"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-[#8b949f]">{item.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
