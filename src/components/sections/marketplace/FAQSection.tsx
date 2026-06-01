import React from "react";
import { FAQAccordion } from "./FAQAccordion";

interface FAQItem {
    q: string;
    a: string;
}

const FAQSection = async () => {
    const clientFAQs: FAQItem[] = [
        {
            q: "Does StrongBody AI deliver services directly?",
            a: "No. StrongBody AI is a wellness marketplace that connects users with independently verified experts. We provide technology and communication tools — experts deliver their own services on the platform."
        },
        {
            q: "How do I pay for services?",
            a: "Through our secure payment flow on the platform. You review transparent offers, pay when you accept, and confirm when agreed wellness or consultation support is completed."
        },
        {
            q: "Can I choose a professional from another country?",
            a: "Yes. StrongBody AI enables global connections. You can browse and consult professionals worldwide with AI-powered real-time translation."
        },
        {
            q: "What if there's a dispute?",
            a: "Our transparent dispute resolution system supports both parties. Related payments may be paused until the matter is resolved fairly."
        }
    ];

    const partnerFAQs: FAQItem[] = [
        {
            q: "What are the requirements to join?",
            a: "You must hold a valid professional license, pass our credential verification process, and agree to our platform's ethical standards through selective review."
        },
        {
            q: "What are the platform fees?",
            a: "Platform fees are competitive and only apply to completed transactions. There are no upfront costs or hidden charges."
        },
        {
            q: "Does StrongBody AI verify credentials?",
            a: "Yes. Every partner undergoes rigorous credential and license verification as part of our selective recruitment process."
        },
        {
            q: "Do I have full control over my pricing?",
            a: "Absolutely. You set your own service fees and configure your own Offers. Full autonomy over pricing and service delivery."
        }
    ];

    return (
        <section className="py-32 bg-white border-t border-grey-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary font-black tracking-[0.2em] text-[11px] uppercase mb-5 block">
                        Help
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-grey-900 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    <div>
                        <h3 className="text-[11px] font-black text-grey-400 mb-5 flex items-center gap-2.5 uppercase tracking-[0.2em]">
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                            </div>
                            For Clients
                        </h3>
                        <FAQAccordion items={clientFAQs} />
                    </div>
                    <div>
                        <h3 className="text-[11px] font-black text-grey-400 mb-5 flex items-center gap-2.5 uppercase tracking-[0.2em]">
                            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                            </div>
                            For Partners
                        </h3>
                        <FAQAccordion items={partnerFAQs} />
                    </div>
                </div>
            </div>
        </section>
    );

};

export default FAQSection;


