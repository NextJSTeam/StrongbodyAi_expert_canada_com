import Hero from "@/components/sections/marketing/Hero";
import AboutSection from "@/components/sections/marketing/AboutUs";
import HowItWorks from "@/components/sections/marketing/HowItWorks";
import ForClients from "@/components/sections/marketing/ForClients";
import WhyDifferent from "@/components/sections/marketing/WhyUs";

import FinalCTA from "@/components/sections/marketing/FinalCTA";
import TrustSection from "@/components/sections/marketplace/TrustSection";
import FAQSection from "@/components/sections/marketplace/FAQSection";
import PartnershipOverview from "@/components/sections/partners/PartnershipOverview";
import BlogSection from "@/components/sections/marketing/BlogSection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <Hero />
      <AboutSection />
      <HowItWorks />
      <BlogSection />
      <ForClients />
      <PartnershipOverview />

      <WhyDifferent />
      <TrustSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
