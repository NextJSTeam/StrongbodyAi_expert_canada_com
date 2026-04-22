import React from "react";
import { Quote } from "lucide-react";
import Container from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";

const testimonials = [
    {
        quote: "The platform has completely transformed how we handle patient referrals and expert consultations. The AI insights are a game-change.",
        author: "Platform User",
        role: "Health Administrator"
    },
    {
        quote: "Being part of this ecosystem allows me to reach patients more effectively while maintaining the highest standards of care.",
        author: "Dr. Chin",
        role: "Pediatrician"
    },
    {
        quote: "StrongBody AI provides the security and transparency we need to collaborate in a data-sensitive industry like Pharma.",
        author: "Business Manager",
        role: "Amazing Pharma"
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 relative overflow-hidden" style={{ background: 'var(--brand-gradient)' }}>
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-white font-bold tracking-wider uppercase text-sm mb-3">Community</h2>
                    <p className="text-4xl font-extrabold text-white mb-4">What Our Community Shares</p>
                    <div className="w-20 h-1.5 bg-white mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <Reveal
                            key={index}
                            delay={index * 0.1}
                            className="h-full"
                        >
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow relative h-full">
                                <Quote className="text-primary-text/20 absolute top-4 right-4 w-12 h-12 -z-0" />
                                <div className="relative z-10 flex flex-col h-full">
                                    <p className="text-slate-600 mb-6 leading-relaxed flex-1">"{t.quote}"</p>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{t.author}</h4>
                                        <p className="text-sm text-slate-500">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Testimonials;

