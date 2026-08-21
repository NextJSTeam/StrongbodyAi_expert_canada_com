import { voiceCreatorFooterCopy } from '@/content/voice-creator-footer';

/** The wordmark strongbody.ai puts at the foot of the page. */
export default function FooterLogo({
  width = 124,
  height = 32,
  className = '',
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <a href="https://www.strongbody.ai" aria-label={voiceCreatorFooterCopy.ui.homeAriaLabel}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/footer-logo.svg"
        width={width}
        height={height}
        style={{ height: 'auto' }}
        className={`object-contain transition-opacity hover:opacity-80 ${className}`}
        alt={voiceCreatorFooterCopy.ui.logoAlt}
      />
    </a>
  );
}
