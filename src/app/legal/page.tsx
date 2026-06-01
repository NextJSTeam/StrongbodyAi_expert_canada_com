"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Scale, Server, AlertTriangle } from "lucide-react";
// Note: metadata cannot be exported from a 'use client' page directly
// SEO is handled via the root layout and page title


const sections = [
    {
        icon: <Server size={24} />,
        title: "Data Protection Compliance",
        content: "StrongBody AI is committed to protecting your personal data. Our platform adheres to applicable US data protection regulations, including state-level privacy laws. We implement industry-standard encryption, access controls, and regular security audits to safeguard your information."
    },
    {
        icon: <Scale size={24} />,
        title: "Local Regulatory Awareness",
        content: "We actively monitor and adapt to evolving wellness marketplace regulations across all jurisdictions where we operate. Our compliance team works to ensure that our marketplace infrastructure aligns with federal and state requirements, including digital wellness services."
    },
    {
        icon: <ShieldCheck size={24} />,
        title: "Secure Payment Infrastructure",
        content: "Financial transactions on StrongBody AI use secure, PCI DSS–aligned payment infrastructure via trusted providers. We are a wellness & health-support marketplace connecting users with independent experts for consultation and accompaniment on the platform only."
    },
    {
        icon: <AlertTriangle size={24} />,
        title: "Platform Disclaimer",
        content: "StrongBody AI is a technology marketplace platform. We do not deliver services or professional advice ourselves. All wellness sessions listed on our platform are provided by independent, verified professionals who maintain their own professional liability. StrongBody AI facilitates the connection, transaction infrastructure, and communication tools — professionals are solely responsible for the services they deliver."
    },
];

export default function LegalPage() {
    return (
        <main className="min-h-screen pt-20">
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block"
                        >
                            Compliance
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
                        >
                            Trust, Legal & Compliance
                        </motion.h1>
                        <p className="text-lg text-slate-500 font-medium max-w-2xl">
                            Transparency and trust are the foundation of our platform. Here's how we protect our users and partners.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {sections.map((section, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className={`p-8 rounded-2xl border ${idx === sections.length - 1 ? "bg-amber-50 border-amber-100" : "bg-slate-50 border-slate-100"}`}
                            >
                                <div className="flex items-start gap-5">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${idx === sections.length - 1 ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-primary"}`}>
                                        {section.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h3>
                                        <p className="text-slate-600 font-medium leading-relaxed">{section.content}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
