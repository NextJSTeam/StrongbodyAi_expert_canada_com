import { voiceCreatorFooterCopy } from '@/content/voice-creator-footer';
import FooterAccordionSection from './FooterAccordionSection';
import { FOOTER_COLUMNS } from './footer-menu';
import HeaLabel from './HeaLabel';

/**
 * The accordion the source renders below `md`. `authOnly` items are dropped:
 * strongbody.ai hides them from signed-out visitors, and this site has no
 * session at all.
 */
export default function FooterMobile() {
  const { columns, links, ui } = voiceCreatorFooterCopy;

  return (
    <div className="px-6 pt-6 md:hidden" aria-label={ui.navAriaLabel}>
      {FOOTER_COLUMNS.map(column => (
        <FooterAccordionSection key={column.id} title={columns[column.titleKey]}>
          {column.items
            .filter(item => !item.authOnly)
            .map(item => (
              <a
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base leading-[24px] text-[#556575] hover:text-[#262626]"
              >
                {item.hea ? <HeaLabel text={links[item.key]} /> : links[item.key]}
              </a>
            ))}
        </FooterAccordionSection>
      ))}
    </div>
  );
}
