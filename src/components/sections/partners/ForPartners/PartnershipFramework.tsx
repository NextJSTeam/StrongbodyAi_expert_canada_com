import React from "react";
import Container from "@/components/layout/Container";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

const PartnershipFramework = () => {
    return (
        <section className="py-20 bg-white">
            <Container>
                <div className="grid lg:grid-cols-2 gap-16">
                    <div>
                        <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Framework</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-text-p mb-6">Partnership Framework</h2>
                        <p className="text-text-m font-medium mb-8 leading-relaxed">
                            StrongBody AI operates as a technology marketplace infrastructure provider. Here's what that means for our partners:
                        </p>

                        <div className="space-y-4">
                            <div className="p-5 rounded-2xl bg-grey-50 border border-grey-200">
                                <h4 className="font-bold text-text-p mb-2 text-xl">Partners Retain Full Independence</h4>
                                <ul className="space-y-2 text-sm text-text-m font-medium">
                                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" /> Full professional autonomy over services</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" /> Complete control over pricing and service configuration</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" /> Professional liability as per local regulations</li>
                                </ul>
                            </div>
                            <div className="p-5 rounded-2xl bg-grey-50 border border-grey-200">
                                <h4 className="font-bold text-text-p mb-2">Platform Provides</h4>
                                <ul className="space-y-2 text-sm text-text-m font-medium">
                                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" /> Transaction infrastructure and marketplace access</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" /> AI-powered communication and translation tools</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" /> Secure platform payment processing</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" /> Review and transparency management system</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Standards</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-text-p mb-6">Compliance & Professional Standards</h2>
                        <p className="text-text-m font-medium mb-8 leading-relaxed">
                            All selected partners must adhere to the following requirements:
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Hold a valid professional license recognized in the United States",
                                "Comply with all applicable federal and state regulations",
                                "Accept transparency and performance evaluation mechanisms",
                                "Agree to the platform's professional code of ethics"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-grey-50 border border-grey-200 shadow-sm">
                                    <ShieldCheck size={18} className="text-primary shrink-0 mt-0.5" />
                                    <span className="text-sm font-bold text-text-p">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default PartnershipFramework;
