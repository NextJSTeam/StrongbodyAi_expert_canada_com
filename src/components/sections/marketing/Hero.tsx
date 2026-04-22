import React from "react";
import Link from "next/link";
import {
    ArrowRight,
    ShieldCheck,
    Lock,
    Sparkles,
    CheckCircle2,
    Star,
    Stethoscope,
    Map,
    Activity,
    Users
} from "lucide-react";
import Container from "@/components/layout/Container";
import { Reveal, ScaleIn, Float, FadeIn } from "@/components/animations/Reveal";

const stats = [
    { icon: <ShieldCheck size={20} className="text-primary" />, val: "500+", label: "Professionals" },
    { icon: <Stethoscope size={20} className="text-primary" />, val: "20+", label: "Specialties" },
    { icon: <Map size={20} className="text-primary" />, val: "194", label: "Countries Covered" },
    { icon: <Activity size={20} className="text-primary" />, val: "98%", label: "Dispute-Free Transactions" },
];

const partners = [
    { name: "Global Experts", icon: <CheckCircle2 size={16} className="text-primary" /> },
    { name: "AI Translation", icon: <CheckCircle2 size={16} className="text-primary" /> },
    { name: "Secure Escrow", icon: <CheckCircle2 size={16} className="text-primary" /> },
];

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
            {/* Premium Tech Background - Using solid surfaces instead of image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-secondary"></div>
                {/* Subtle tech surface detail */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            </div>

            <Container className="w-full pt-40 pb-20 relative z-10">
                {/* Centered Hero Content - Stacked Vertically */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    {/* Live Badge - Redesigned for Premium Look */}
                    <Reveal>
                        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-12">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                            </span>
                            Now Live in 194 Countries
                        </div>
                    </Reveal>

                    <Reveal>
                        <h1 className="text-6xl lg:text-8xl font-black !text-white tracking-tighter leading-[0.95] mb-8 text-balance uppercase">
                            StrongBody <span className="text-primary">AI</span>
                        </h1>
                    </Reveal>

                    <Reveal>
                        <h2 className="text-2xl lg:text-3xl font-bold !text-white/90 mb-10 text-balance tracking-tight">
                            The Health Service Hub for the Multi-Lingual World
                        </h2>
                        <p className="text-lg text-white/70 mb-14 leading-relaxed font-medium max-w-2xl mx-auto border-l-2 border-primary/30 pl-8">
                            Real-time AI Voice Translation (40+ languages) • Personal Care Team • Transparent Offers • Secure Escrow • All inside one free app.
                        </p>
                    </Reveal>

                    {/* CTA Buttons */}
                    <Reveal>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
                            <Link
                                href="/multime"
                                className="bg-primary text-white px-12 py-5 rounded-2xl text-[16px] font-extrabold transition-all shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:-translate-y-1 flex items-center justify-center gap-3 uppercase tracking-wider"
                            >
                                Download MultiMe AI App <ArrowRight size={20} />
                            </Link>
                        </div>
                    </Reveal>

                    {/* Partners */}
                    <FadeIn>
                        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                            {partners.map((p) => (
                                <div key={p.name} className="flex items-center gap-3 text-white/40 hover:text-white transition-all cursor-default group">
                                    <div className="grayscale group-hover:grayscale-0 transition-all">{p.icon}</div>
                                    <span className="text-[11px] font-black uppercase tracking-[0.15em]">{p.name}</span>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>

                {/* Statistics - Redesigned as Premium Floating Cards */}
                <FadeIn>
                    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((s, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-[32px] border border-grey-200 flex flex-col items-center text-center shadow-xl shadow-black/10 hover:-translate-y-2 transition-all duration-300 group">
                                <div className="w-14 h-14 rounded-2xl bg-grey-50 flex items-center justify-center mb-6 group-hover:bg-primary/5 transition-colors">
                                    {s.icon}
                                </div>
                                <div className="text-4xl font-black text-grey-900 leading-none mb-2 tracking-tighter">{s.val}</div>
                                <div className="text-[11px] font-black text-grey-500 uppercase leading-snug tracking-[0.2em]">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </Container>
        </section>
    );
};



export default Hero;

