import { voiceCreatorFooterCopy } from '@/content/voice-creator-footer';
import FooterDesktop from './FooterDesktop';
import FooterLogo from './FooterLogo';
import FooterMobile from './FooterMobile';

/**
 * The strongbody.ai site footer, ported for this route.
 *
 * It replaces the country footer here (see `ChromeSlot` in the root layout) so
 * the landing page reads end to end the way it does on strongbody.ai. Every
 * link points at strongbody.ai, because that is where those pages live.
 *
 * Deliberately outside `.vc-root`: the landing page restyles every h1/h2/h3
 * under it, and this footer keeps its own type scale.
 */
export default function VoiceCreatorSiteFooter() {
  const { ui } = voiceCreatorFooterCopy;

  return (
    <footer
      className="border-t border-gray-200 bg-[#FAFAFA]"
      role="contentinfo"
      aria-label={ui.footerAriaLabel}
    >
      {/* Tailwind v4 dropped the v3 `container.center` / `container.padding` config
          the source relies on, so the centring and padding are spelled out here. */}
      <div className="md:container md:mx-auto md:px-4">
        <FooterDesktop />
        <FooterMobile />

        {/* bottom bar — desktop */}
        <div className="hidden flex-col items-center gap-4 py-[20px] md:flex md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            <FooterLogo className="hidden md:block" />
            <p className="text-[16px] leading-[24px] font-normal text-[#111827]">{ui.address}</p>
          </div>
        </div>

        {/* bottom bar — mobile */}
        <div className="flex flex-col gap-6 px-6 pt-2 pb-3 md:hidden">
          <div className="mt-8 flex justify-between">
            <FooterLogo width={116} height={30} />
          </div>
          <p className="text-center text-[16px] leading-6 text-[#556575]">{ui.address}</p>
        </div>
      </div>
    </footer>
  );
}
