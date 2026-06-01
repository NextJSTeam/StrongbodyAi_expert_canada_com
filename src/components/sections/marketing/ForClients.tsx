import React from "react";
import Link from "next/link";
import { ShieldCheck, DollarSign, Users, Globe2, Activity, Star, ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import { Reveal, FadeIn } from "@/components/animations/Reveal";

const benefits = [
    { icon: <Users size={22} />, title: "Personalized Care Team", desc: "Build your own Personal Care Team — doctors, pharmacists, aesthetic specialists, nutritionists, trainers..." },
    { icon: <Activity size={22} />, title: "Flexible Online Support", desc: "Enjoy flexible online health & wellness consultations & support – anytime, no waiting." },
    { icon: <Globe2 size={22} />, title: "Affordable Global Experts", desc: "Access high-quality services at affordable prices from global experts." },
    { icon: <Star size={22} />, title: "Native Communication", desc: "Communicate effortlessly in your native language thanks to AI Voice Translate." },
    { icon: <DollarSign size={22} />, title: "Transparent Offers", desc: "Compare transparent Offers before deciding on your care." },
    { icon: <ShieldCheck size={22} />, title: "Secure Payments & History", desc: "Pay securely on the platform when you accept an offer. Full consultation history safely stored." },
];

const ForClients = () => {
    return (
        <section id="for-clients" className="py-32 bg-grey-50 border-t-2" style={{ borderColor: '#CBD5E1' }}>
            <Container>
                <div className="text-center mb-20">
                    <span className="text-primary font-black tracking-[0.2em] text-[11px] uppercase mb-5 block">
                        For Clients
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-grey-900 mb-5 tracking-tight">
                        Why Love <span className="notranslate whitespace-nowrap" translate="no">StrongBody AI</span> on <span className="notranslate whitespace-nowrap" translate="no">MultiMe</span>
                    </h2>
                    <p className="text-base text-grey-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        You are a perfect fit if you want to experience borderless healthcare without language barriers, high costs, or compromising on quality.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid lg:grid-cols-3 gap-4 mb-10">
                    {/* Featured Card */}
                    <Reveal delay={0.05} className="lg:row-span-2 h-full">
                        <div className="p-10 rounded-[28px] bg-white border border-grey-200 hover:border-primary/20 hover:shadow-xl transition-all duration-300 group h-full flex flex-col justify-between shadow-sm">
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                                    {benefits[0].icon}
                                </div>
                                <h4 className="text-2xl font-extrabold text-grey-900 mb-4 tracking-tight leading-tight">{benefits[0].title}</h4>
                                <p className="text-base text-grey-500 font-medium leading-relaxed mb-10">{benefits[0].desc}</p>
                            </div>
                            <div className="p-5 rounded-2xl bg-grey-50 border border-grey-200">
                                <p className="text-[10px] font-black text-grey-400 uppercase tracking-[0.2em] mb-2">Featured</p>
                                <p className="text-sm font-bold text-grey-700">Hand-pick your own team of healthcare pros – worldwide.</p>
                            </div>
                        </div>
                    </Reveal>

                    {/* Remaining Cards */}
                    {benefits.slice(1).map((b, idx) => (
                        <Reveal key={idx} delay={(idx + 1) * 0.05} className="h-full">
                            <div className="p-7 rounded-[24px] bg-white border border-grey-200 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group h-full">
                                <div className="w-11 h-11 rounded-xl bg-grey-50 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all border border-grey-200">
                                    {b.icon}
                                </div>
                                <h4 className="text-sm font-extrabold text-grey-900 mb-2 uppercase tracking-wide">{b.title}</h4>
                                <p className="text-sm text-grey-500 font-medium leading-relaxed">{b.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/multime"
                        className="inline-flex items-center justify-center gap-2 bg-primary text-white px-10 py-4 rounded-2xl text-sm font-extrabold uppercase tracking-wider shadow-xl shadow-primary/25 hover:-translate-y-0.5 transition-all"
                    >
                        Download <span className="notranslate" translate="no">MultiMe AI</span> & Build Your Personal Care Team <ArrowRight size={16} />
                    </Link>
                </div>
            </Container>
        </section>
    );
};

export default ForClients;
