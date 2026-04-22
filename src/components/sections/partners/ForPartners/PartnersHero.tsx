import React from "react";
import Container from "@/components/layout/Container";
import { Reveal, FadeIn } from "@/components/animations/Reveal";

const PartnersHero = () => {
    return (
        <section className="py-24 bg-white">
            <Container>
                <div className="max-w-3xl">
                    <FadeIn>
                        <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Partnership Recruitment — United States
                        </span>
                    </FadeIn>
                    <Reveal delay={0.1}>
                        <h1 className="text-4xl md:text-5xl font-bold text-text-p mb-6 leading-tight">
                            Become a Strategic Health Service Partner
                        </h1>
                    </Reveal>
                    <p className="text-lg text-text-m font-medium leading-relaxed mb-6">
                        StrongBody AI is conducting a selective Partnership Recruitment program in the United States to onboard professionals and organizations that meet our standards of expertise, compliance, and ethical practice.
                    </p>
                    <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
                        <p className="text-primary font-bold text-sm">
                            We don't recruit "sellers." We select <span>Strategic Health Service Partners.</span>
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default PartnersHero;
