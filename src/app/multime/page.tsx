import React from "react";
import Container from "@/components/layout/Container";
import { Smartphone, Globe, Shield, MessageSquare, ArrowRight, Download, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Reveal, FadeIn, ScaleIn } from "@/components/animations/Reveal";
import { Metadata } from "next";
import { generateUnifiedMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
    return generateUnifiedMetadata(undefined, { title: "MultiMe AI App | One App, 40+ Languages, Endless Possibilities", description: "Download MultiMe AI to access global wellness experts, real-time MultiMe AI voice translation, secure platform payments, and personalized health support." });
}
const MultiMePage = () => {
    return (
        <main className="min-h-screen pt-24 pb-16 bg-white overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-20">
                <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-primary/5 rounded-bl-[100px] -z-10 animate-pulse"></div>
                <Container>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <Reveal>
                            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block notranslate" translate="no">MultiMe AI Super App</span>
                            <h1 className="text-4xl md:text-6xl font-bold !text-grey-900 mb-6 leading-tight">
                                One App. <span className="text-primary">40+ Languages.</span> Endless Care.
                            </h1>
                            <p className="text-lg text-grey-600 font-medium mb-10 leading-relaxed max-w-xl">
                                Download the <span className="notranslate" translate="no">MultiMe AI</span> app to unlock the full power of <span className="notranslate" translate="no">StrongBody AI</span>. Chat with global experts, get real-time voice translation, and manage your health journey in your own language.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="https://apps.apple.com/us/app/multime-ai/id6748796219" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-secondary text-white px-8 py-4 rounded-2xl font-bold hover:bg-secondary/90 transition-all shadow-xl">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-6" />
                                </a>
                                <a href="https://play.google.com/store/apps/details?id=com.multime.app.prod" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-secondary text-white px-8 py-4 rounded-2xl font-bold hover:bg-secondary/90 transition-all shadow-xl">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-6" />
                                </a>
                            </div>
                        </Reveal>

                        <div className="relative">
                            <ScaleIn>
                                <div className="relative z-10 mx-auto w-[280px] h-[580px] bg-secondary rounded-[3rem] border-[8px] border-secondary shadow-2xl overflow-hidden">
                                    <div className="absolute top-0 inset-x-0 h-6 rounded-b-xl mx-auto w-1/3 z-20"></div>
                                    <img
                                        src="/images/app.jpg"
                                        alt="App Interface"
                                        className="w-full h-full object-cover opacity-90"
                                    />
                                </div>
                                {/* Floating Elements */}
                                <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
                            </ScaleIn>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Features */}
            <section className="py-24 bg-grey-50">
                <Container>
                    <div className="text-center mb-16">
                        <Reveal>
                            <h2 className="text-3xl md:text-4xl font-bold !text-grey-900 mb-4">Inside the MultiMe AI App</h2>
                            <p className="text-grey-500 font-medium">Everything you need for your global health journey.</p>
                        </Reveal>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Globe className="text-primary" />,
                                title: "AI Voice Translate",
                                desc: "Speak naturally in your language. Experts hear you in theirs. Real-time, zero friction."
                            },
                            {
                                icon: <Shield className="text-primary" />,
                                title: "Secure Payments",
                                desc: "Pay on the platform with clear offers. Confirm when your agreed wellness or consultation support is completed."
                            },
                            {
                                icon: <MessageSquare className="text-primary" />,
                                title: "Direct Hub Chat",
                                desc: "One-on-one consultation with verified doctors, pharmacists, and specialists worldwide."
                            }
                        ].map((feature, idx) => (
                            <Reveal key={idx} delay={idx * 0.1}>
                                <div className="bg-white p-8 rounded-[2rem] border border-grey-100 shadow-sm hover:shadow-xl transition-all duration-300">
                                    <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mb-6">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold !text-grey-900 mb-3">{feature.title}</h3>
                                    <p className="text-grey-600 font-medium leading-relaxed">{feature.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Call to Action */}
            <section className="py-24">
                <Container>
                    <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold !text-white mb-6">Experience the future today.</h2>
                            <p className="text-white text-lg font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                                Free to download. Free to join. Only pay for the health services you choose.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <Link
                                    href="https://www.strongbody.ai/signup"
                                    className="bg-white text-primary px-8 py-4 rounded-2xl font-bold hover:bg-grey-50 transition-all flex items-center gap-2 shadow-xl shadow-white/10"
                                >
                                    Create Free Account <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default MultiMePage;
