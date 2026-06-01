import React from "react";
import { Server, Scale, ShieldCheck, AlertTriangle } from "lucide-react";
import Container from "@/components/layout/Container";
import { Reveal, FadeIn } from "@/components/animations/Reveal";

const items = [
    { icon: <Server size={22} />, title: "Data Protection Compliance", desc: "Adherence to GDPR and applicable local data protection laws." },
    { icon: <Scale size={22} />, title: "Local Regulatory Awareness", desc: "Active monitoring of evolving wellness marketplace regulations across jurisdictions." },
    { icon: <ShieldCheck size={22} />, title: "Secure Payment Infrastructure", desc: "Payments via trusted providers with PCI DSS compliance. Wellness marketplace — consultation and accompaniment on the platform only." },
];

const TrustSection = () => {
    return (
        <section className="py-32 bg-secondary">
            <Container>
                <div className="text-center mb-20">
                    <span className="text-primary font-black tracking-[0.2em] text-[11px] uppercase mb-5 block">
                        Compliance
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold !text-white mb-4 tracking-tight">
                        Trust, Legal & Compliance
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {items.map((item, idx) => (
                        <Reveal key={idx} delay={idx * 0.08} className="h-full">
                            <div className="bg-white/5 p-8 rounded-[24px] border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all duration-300 group h-full">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                                    {item.icon}
                                </div>
                                <h4 className="text-[15px] font-extrabold !text-white mb-3 tracking-tight">{item.title}</h4>
                                <p className="text-sm text-white/50 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Platform Disclaimer */}
                <Reveal delay={0.3}>
                    <div className="p-7 rounded-2xl bg-primary/8 border border-primary/15 flex items-start gap-5">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <AlertTriangle size={18} />
                        </div>
                        <div>
                            <h4 className="text-sm font-extrabold text-white mb-1.5 uppercase tracking-wider">Platform Disclaimer</h4>
                            <p className="text-sm text-white/50 font-medium leading-relaxed">
                                Important Disclaimer: <span className="notranslate" translate="no">StrongBody AI</span> & <span className="notranslate" translate="no">MultiMe AI</span> are technology platforms connecting users with independent licensed professionals. We do not deliver sessions ourselves. All professional responsibility belongs to the verified Strategic Partners.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
};


export default TrustSection;
