import { voiceCreatorFooterCopy } from '@/content/voice-creator-footer';
import { FOOTER_COLUMNS } from './footer-menu';
import HeaLabel from './HeaLabel';

/**
 * The four-column nav. Colours are the source's own hex values rather than this
 * repo's `text-primary` / `text-secondary` tokens: those resolve to the country
 * palette (red / navy) and would repaint a footer that is meant to match
 * strongbody.ai exactly.
 */
export default function FooterDesktop() {
  const { columns, links, ui } = voiceCreatorFooterCopy;

  return (
    <nav
      aria-label={ui.navAriaLabel}
      className="hidden justify-around border-b border-[#E9EAEC] py-[56px] md:relative md:flex"
    >
      {FOOTER_COLUMNS.map(column => (
        <div key={column.id}>
          <h3 className="mb-[24px] text-[16px] font-bold text-[#111827]">
            {columns[column.titleKey]}
          </h3>
          <ul className="space-y-[12px] text-[14px] leading-[20px] font-normal text-[#556575]">
            {column.items.map(item => (
              <li key={item.key}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] leading-[20px] font-normal text-[#556575] hover:text-[#262626]"
                >
                  {item.hea ? <HeaLabel text={links[item.key]} /> : links[item.key]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
