import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import { Reveal, FadeIn } from "@/components/animations/Reveal";
import Link from "next/link";

const AboutSection = () => {
    return (
        <section id="multime-ai-app" className="py-32 bg-white border-t-2" style={{ borderColor: '#CBD5E1' }}>
            <Container>
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
                    <div className="max-w-2xl">
                        <span className="text-primary font-black tracking-[0.2em] text-[11px] uppercase mb-5 block notranslate" translate="no">MultiMe AI App</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-grey-900 leading-[1.05] tracking-tight">
                            Why Download the <span className="notranslate" translate="no">MultiMe AI</span> App?
                        </h2>
                    </div>
                    <p className="text-base text-grey-500 font-medium max-w-lg leading-relaxed border-l-2 border-grey-200 pl-6">
                        The only app you need to experience <span className="notranslate">StrongBody AI</span> fully. One account – <span className="notranslate">MultiMe AI</span> voice translation, offers, secure payments, and your personal wellness team.
                    </p>
                </div>

                {/* Cards */}
                <div className="space-y-4">
                    {/* Block 1 – Client block */}
                    <Reveal delay={0.1}>
                        <div className="p-10 lg:p-14 rounded-[28px] bg-grey-50 border border-grey-200">
                            <div className="flex flex-col lg:flex-row gap-12">
                                <div className="lg:w-1/3 flex flex-col justify-between">
                                    <div>
                                        <div className="inline-block bg-primary/8 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-5 border border-primary/15">For Clients</div>
                                        <h4 className="text-2xl font-extrabold text-grey-900 mb-4 leading-tight tracking-tight">
                                            Get World-Class Care in Your Own Voice
                                        </h4>
                                        <p className="text-sm font-bold text-grey-400 mb-6 uppercase tracking-widest">You get:</p>
                                    </div>
                                    <Link
                                        href="/multime"
                                        className="w-full lg:w-fit inline-flex items-center justify-center gap-2 bg-primary text-white px-7 py-4 rounded-2xl text-[13px] font-extrabold uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-xl shadow-primary/30 mt-6"
                                    >
                                        Download MultiMe AI & Build Your Care Team
                                    </Link>
                                </div>
                                <div className="lg:w-2/3">
                                    <ul className="grid md:grid-cols-2 gap-3">
                                        {[
                                            "Real-time AI Voice Translate: Speak in your local language – experts hear and reply in theirs instantly.",
                                            "Build your Personal Care Team personalized in minutes (doctors + pharmacists + nutritionists + trainers + aesthetic specialists…).",
                                            "Compare transparent Offers from thousands of global experts.",
                                            "Secure platform payment – pay when you accept an offer and confirm when support is completed.",
                                            "Manage full consultation history, results, and care team inside one app.",
                                            "Flexible 24/7 services at affordable prices (often 40-70% less than local options)."
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 p-5 rounded-2xl bg-white border border-grey-200 hover:border-primary/20 transition-colors">
                                                <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                                                <span className="text-sm text-grey-600 font-medium leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* Block 2 – Pro block: dark */}
                    <Reveal delay={0.2}>
                        <div className="p-10 lg:p-14 rounded-[28px] bg-secondary border border-grey-800">
                            <div className="flex flex-col lg:flex-row gap-12">
                                <div className="lg:w-1/3 flex flex-col justify-between">
                                    <div>
                                        <div className="inline-block bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-5 border border-white/15">For Professionals</div>
                                        <h4 className="text-2xl font-extrabold !text-white mb-4 leading-tight tracking-tight">
                                            Turn Your Expertise into Global Revenue
                                        </h4>
                                        <p className="text-sm font-bold text-white/50 mb-6 uppercase tracking-widest">You gain immediately:</p>
                                    </div>
                                    <Link
                                        href="/multime"
                                        className="w-full lg:w-fit inline-flex items-center justify-center gap-2 bg-white text-secondary px-7 py-4 rounded-2xl text-[13px] font-extrabold uppercase tracking-wider transition-all hover:bg-white/90 mt-6"
                                    >
                                        Download MultiMe AI & Receive Global Clients
                                    </Link>
                                </div>
                                <div className="lg:w-2/3">
                                    <ul className="grid md:grid-cols-2 gap-3">
                                        {[
                                            "Reach tens of millions of high-paying clients from US, UK, EU, Canada, Australia… without running ads.",
                                            "AI Voice Translate lets international clients understand you perfectly – even if you only speak your local language.",
                                            "Create professional Offers (price, package, schedule, terms) directly inside voice conversations.",
                                            "Receive secure platform payments – fast withdrawal to your bank when available.",
                                            "Build powerful personal brand through Voice Hub – your personal 'radio station' auto-translated to 40+ languages.",
                                            "Keep 100% of your revenue (you don't pay platform fees) from premium international clients.",
                                            "Proactively reach potential clients via Active Message + Voice Hub – sell services globally 24/7 from home."
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 p-5 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/8 transition-colors">
                                                <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                                                <span className="text-sm text-white/80 font-medium leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

            </Container>
        </section>
    );
};

export default AboutSection;

