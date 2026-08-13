import React from "react";
import { values } from "./constants";
import Container from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";

const StrategicValue = () => {
    return (
        <section className="py-20 bg-white">
            <Container>
                <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Partnership value</span>
                <h2 className="text-3xl md:text-4xl font-bold text-text-p mb-10">Strategic Value of Partnership</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {values.map((val, idx) => (
                        <Reveal
                            key={idx}
                            delay={idx * 0.08}
                            className="h-full"
                        >
                            <div className="p-7 rounded-2xl bg-grey-50 border border-grey-200 hover:bg-white hover:shadow-lg transition-all group h-full">
                                <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                                    {val.icon}
                                </div>
                                <h4 className="text-lg font-bold text-text-p mb-2">{val.title}</h4>
                                <p className="text-sm text-text-m font-medium leading-relaxed">{val.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default StrategicValue;
