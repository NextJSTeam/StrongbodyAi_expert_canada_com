import React from "react";
import { Mail, Phone, MapPin, Send, Headset } from "lucide-react";
import Container from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import ContactForm from "./ContactForm";

const ContactContent = () => {
    return (
        <section className="py-24 bg-white">
            <Container>
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Info */}
                    <div>
                        <Reveal>
                            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Get in Touch</span>
                            <h1 className="text-4xl md:text-5xl font-bold text-text-p mb-6 leading-tight">
                                Contact <span className="notranslate text-primary" translate="no">StrongBody AI</span>
                            </h1>
                            <p className="text-lg text-text-m font-medium leading-relaxed mb-10">
                                Whether you're a client exploring services or a professional interested in partnership — we'd love to hear from you.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-5 p-6 rounded-2xl bg-grey-50 border border-grey-200 group hover:border-primary/20 transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                        <Headset size={22} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-text-s uppercase tracking-[0.2em] mb-1">Global Support</div>
                                        <div className="text-lg font-bold text-text-p hover:text-primary transition-colors">Available 24/7</div>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-secondary-light/50 border border-secondary/5">
                                    <h4 className="text-sm font-bold text-secondary mb-2">Platform Support</h4>
                                    <p className="text-xs text-text-m font-medium leading-relaxed">
                                        For technical assistance with the MultiMe AI App or your Professional Profile, please include your User ID in the email.
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Form */}
                    <div>
                        <Reveal delay={0.2}>
                            <ContactForm />
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ContactContent;
