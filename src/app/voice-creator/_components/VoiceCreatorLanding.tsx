'use client';

import type { VoiceCreatorPage } from '@/lib/voice-creator';
import Benefits from './Benefits';
import Faq from './Faq';
import FinalCta from './FinalCta';
import Header from './Header';
import Hero from './Hero';
import HowYouEarn from './HowYouEarn';
import RelatedKeywords from './RelatedKeywords';
import Steps from './Steps';
import StickyCta from './StickyCta';
import WhatYouDo from './WhatYouDo';
import WhoCanJoin from './WhoCanJoin';
import { SmoothScroll } from './motion';

/**
 * The whole landing page. Every section is shared across keywords; `page`
 * carries the intent-sensitive copy (H1, promise, hero bullets, FAQ, links).
 */
export default function VoiceCreatorLanding({ page }: { page: VoiceCreatorPage }) {
  return (
    <SmoothScroll>
      <div className="vc-progress-track">
        <div className="vc-progress-bar" />
      </div>

      <Header ui={page.copy.ui} compliance={page.copy.compliance} />

      <main className="overflow-hidden">
        <Hero page={page} />
        <WhoCanJoin copy={page.copy} />
        <WhatYouDo copy={page.copy} />
        <HowYouEarn page={page} />
        <Steps copy={page.copy} />
        <Benefits copy={page.copy} />
        <Faq faqs={page.faqs} ui={page.copy.ui} />
        <RelatedKeywords page={page} />
        <FinalCta page={page} />
      </main>

      <StickyCta ui={page.copy.ui} />
    </SmoothScroll>
  );
}
