import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Award } from "lucide-react";
import Container from "@/components/layout/Container";
import { Reveal, FadeIn } from "@/components/animations/Reveal";

const eligibleProfessions = [
    "Licensed Physicians / Medical Doctors",
    "Registered Pharmacists",
    "Board-certified Dermatologists, Plastic Surgeons, Medical Aesthetic Doctors",
    "Registered Dietitians, Nutritionists, Lifestyle Medicine Physicians",
    "Certified Fitness Trainers, Yoga Instructors, Wellness Coaches",
    "Licensed Psychologists, Psychiatrists, Mental Health Counselors",
    "Traditional Medicine Practitioners, Physiotherapists, Rehabilitation Specialists",
    "Owners of Accredited Clinics & Medical Aesthetic Centers"
];

const partnerBenefits = [
    "Access to tens of millions of premium clients from US, UK, EU, Canada, Australia…",
    "Create professional Offers directly in MultiMe AI Chat (voice + text)",
    "Secure platform payments – fast withdrawal options",
    "AI Voice Translate – international clients understand you instantly",
    "Build personal brand via Voice Hub & blog",
    "Keep 100% of your revenue (you don't pay platform fees)",
    "Profile optimization & marketing support from StrongBody AI team"
];

const PartnershipOverview = () => {
    return (
        <section className="py-32 bg-grey-50 relative overflow-hidden text-grey-900 border-t border-grey-200">
            <Container className="relative z-10">
                <div className="text-center mb-20">
                    <span className="text-primary font-black tracking-[0.2em] text-[11px] uppercase mb-5 block">
                        Partnership Recruitment
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-grey-900 mb-6 leading-tight tracking-tight">
                        Become a Strategic Partner
                    </h2>
                    <p className="text-lg text-grey-500 font-medium leading-relaxed max-w-2xl mx-auto">
                        We are selectively recruiting licensed health professionals to join our global network.
                    </p>
                </div>


                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
                    {/* Left side */}
                    <div>
                        <Reveal>
                            <h3 className="text-lg font-extrabold mb-6 flex items-center gap-3 text-grey-900 uppercase tracking-tight">
                                <Award className="text-primary" size={20} /> Perfect Fit For:
                            </h3>
                            <ul className="space-y-2.5 mb-8">
                                {eligibleProfessions.map((prof, idx) => (
                                    <li key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-grey-200 hover:border-primary/20 transition-colors">
                                        <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                                        <span className="text-sm font-medium text-grey-600 leading-relaxed">{prof}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 text-primary text-sm font-extrabold mb-8 uppercase tracking-wide">
                                Minimum requirement: You must hold a valid practicing license in your jurisdiction.
                            </div>
                        </Reveal>
                    </div>

                    {/* Right side */}
                    <div>
                        <Reveal delay={0.2} className="h-full">
                            <div className="p-10 md:p-12 rounded-[32px] h-full flex flex-col bg-secondary border border-grey-800 shadow-2xl relative overflow-hidden">
                                <div className="relative z-10 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-extrabold mb-8 !text-white tracking-tight">What You Get as a Strategic Partner</h3>
                                    <ul className="space-y-3 mb-10 flex-1">
                                        {partnerBenefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/8 transition-colors">
                                                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                                                    <CheckCircle2 size={12} className="text-primary" />
                                                </div>
                                                <span className="text-sm font-medium leading-relaxed text-white/70">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-auto">
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-6">
                                            Selective recruitment policy – Not all applications are accepted.
                                        </p>
                                        <Link
                                            href="https://www.strongbody.ai/signup"
                                            className="w-full inline-flex items-center justify-center gap-2.5 bg-primary text-white px-7 py-4 rounded-2xl text-sm font-extrabold uppercase tracking-wider hover:-translate-y-0.5 transition-all shadow-xl shadow-primary/30 text-center"
                                        >
                                            Apply to Become a Strategic Partner <ArrowRight size={16} />
                                        </Link>
                                        <p className="text-xs text-white/30 mt-4 font-medium text-center">
                                            Takes 2 minutes • Request Partnership Kit • Schedule Consultation
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    );
};


export default PartnershipOverview;
