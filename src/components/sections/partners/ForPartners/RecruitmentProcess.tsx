import React from "react";
import { processSteps } from "./constants";
import Container from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";

const RecruitmentProcess = () => {
    return (
        <section className="py-20 relative overflow-hidden" style={{ background: 'var(--brand-gradient)' }}>
            <Container>
                <span className="text-white font-bold tracking-widest text-xs uppercase mb-4 block">The Process</span>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Partnership Recruitment Process</h2>
                <p className="text-white font-medium mb-10 max-w-2xl">
                    Our selective recruitment process ensures that every partner meets the highest standards of professionalism and compliance.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {processSteps.map((step, idx) => (
                        <Reveal
                            key={idx}
                            delay={idx * 0.06}
                            className="h-full"
                        >
                            <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm relative h-full hover:shadow-md transition-shadow">
                                <div className="text-4xl font-black text-slate-100 absolute top-5 right-5">{step.num}</div>
                                <div className="w-11 h-11 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-4">
                                    {step.icon}
                                </div>
                                <h4 className="text-base font-bold text-slate-900 mb-2">{step.title}</h4>
                                <p className="text-sm text-primary font-medium leading-relaxed">{step.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <div className="mt-8 p-5 rounded-2xl bg-amber-50 border border-amber-100">
                    <p className="text-amber-800 font-bold text-sm">
                        StrongBody AI applies a selective recruitment policy. Not all applications will be approved.
                    </p>
                </div>
            </Container>
        </section>
    );
};

export default RecruitmentProcess;
