import React from "react";
import { Cpu, FileText, Smartphone, Globe2, BarChart3 } from "lucide-react";
import Container from "@/components/layout/Container";
import { Reveal, FadeIn } from "@/components/animations/Reveal";

const differentiators = [
    {
        icon: <Cpu size={24} />,
        title: "True AI-Native Voice Experience from day one",
        desc: "Built around AI voice translation — speak naturally in any language.",
    },
    {
        icon: <FileText size={24} />,
        title: "Offer-Based Commerce",
        desc: "Unique in chat apps: seamless wellness & support transactions with clear offers and secure platform payments.",
    },
    {
        icon: <Smartphone size={24} />,
        title: "One Account, One App",
        desc: "StrongBody + Global Voice Network — manage everything from a single secure account.",
    },
    {
        icon: <Globe2 size={24} />,
        title: "Cross-Border Power",
        desc: "Experts in Canada reach premium global clients easily and effectively.",
    },
    {
        icon: <BarChart3 size={24} />,
        title: "Structured Reputation",
        desc: "Built via Voice & Real Reviews, maintaining high-fidelity trust over time.",
    }
];

const WhyDifferent = () => {
    return (
        <section className="py-32 bg-white overflow-hidden relative border-t-2" style={{ borderColor: '#CBD5E1' }}>
            <Container className="relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-28 items-start">
                    {/* Left: Bold Statement */}
                    <div className="lg:w-2/5 lg:sticky lg:top-32">
                        <Reveal>
                            <span className="text-primary font-black tracking-[0.2em] text-[11px] uppercase mb-5 block">
                                The Difference
                            </span>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-grey-900 mb-8 leading-tight tracking-tight">
                                Why <span className="notranslate whitespace-nowrap" translate="no">StrongBody AI</span> is Different
                            </h2>
                            <p className="text-base text-grey-500 font-medium max-w-md leading-relaxed mb-10">
                                We are not just another healthcare directory. <span className="notranslate whitespace-nowrap" translate="no">StrongBody AI</span> is a complete commerce infrastructure designed for modern health services.
                            </p>
                            <div className="w-12 h-1 bg-primary rounded-sm"></div>
                        </Reveal>
                    </div>

                    {/* Right: Stacked list */}
                    <div className="lg:w-3/5 space-y-3">
                        {differentiators.map((item, idx) => (
                            <Reveal key={idx} delay={idx * 0.06}>
                                <div className="p-7 rounded-[24px] bg-grey-50 border border-grey-200 hover:border-primary/20 hover:bg-white hover:shadow-lg transition-all duration-300 group flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white text-primary flex items-center justify-center shrink-0 border border-grey-200 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shadow-sm">
                                        {item.icon}
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-[15px] font-extrabold mb-2 text-grey-900 group-hover:text-primary transition-colors tracking-tight">{item.title}</h4>
                                        <p className="text-sm text-grey-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};


export default WhyDifferent;
