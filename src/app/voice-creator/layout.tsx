import './voice-creator.css';
import SiteFooter from './_components/footer';

/**
 * The landing page restyles every h1/h2/h3 under it, so it gets its own scoped
 * wrapper. The site navbar and the country footer are suppressed on this route
 * (see `ChromeSlot` in the root layout); the header and footer this page uses
 * are the ones strongbody.ai ships.
 *
 * The page inherits Plus Jakarta Sans from the root layout (`--font-jakarta`),
 * so no extra web font is loaded.
 */
export default function VoiceCreatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="vc-root">{children}</div>

      {/* Outside `.vc-root` on purpose: the landing page restyles every
          h1/h2/h3 under it, and this footer keeps its own type scale. */}
      <SiteFooter />
    </>
  );
}
