import React from "react";
import Link from "next/link";
import { Search, MessageSquare, FileCheck, ShieldCheck } from "lucide-react";
import Container from "@/components/layout/Container";
import { Reveal, FadeIn } from "@/components/animations/Reveal";

const steps = [
    {
        num: "01",
        title: "Download & Sign In",
        desc: "Install MultiMe AI → log in with your StrongBody account (auto-linked).",
        icon: <Search size={22} />,
    },
    {
        num: "02",
        title: "Discover & Voice Chat",
        desc: "Find experts in Canada or worldwide → voice chat with real-time translation.",
        icon: <MessageSquare size={22} />,
    },
    {
        num: "03",
        title: "Receive Transparent Offer",
        desc: "Expert creates detailed Offer inside chat (price, package, terms).",
        icon: <FileCheck size={22} />,
    },
    {
        num: "04",
        title: "Secure Completion",
        desc: "Pay securely on the platform → receive wellness support → review → completion confirmed in-app.",
        icon: <ShieldCheck size={22} />,
    },
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-32 bg-secondary overflow-hidden relative">
            <Container>
                <div className="text-center mb-20">
                    <span className="text-primary font-black tracking-[0.2em] text-[11px] uppercase mb-5 block">
                        Process
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold !text-white mb-6 tracking-tight">How It Works</h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed font-medium">
                        Accessing global expert knowledge is now as simple as a voice message.
                        Follow our streamlined process to begin your health journey.
                    </p>
                    <p className="text-base text-white/40 font-medium max-w-2xl mx-auto mt-4">
                        From discovery to completion — every step is transparent, secure, and powered by AI inside MultiMe AI App.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {steps.map((step, idx) => (
                        <Reveal key={idx} delay={idx * 0.1}>
                            <div className="group relative p-8 rounded-[24px] bg-white/5 border border-white/10 hover:bg-white/8 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                                {/* Step number */}
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">{step.num}</span>
                                    <div className="w-10 h-10 rounded-xl bg-white/5 text-white/50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                        {step.icon}
                                    </div>
                                </div>
                                {/* Divider */}
                                <div className="w-8 h-0.5 bg-primary/30 mb-6 group-hover:bg-primary transition-colors group-hover:w-12 duration-300"></div>
                                <h3 className="text-[15px] font-extrabold !text-white mb-3 leading-tight tracking-tight">{step.title}</h3>
                                <p className="text-sm text-white/50 font-medium leading-relaxed flex-1">{step.desc}</p>
                                {/* Connector line (right side, hidden on last) */}
                                {idx < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-white/10 z-10"></div>
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>

            </Container>
        </section>
    );
};


export default HowItWorks;

