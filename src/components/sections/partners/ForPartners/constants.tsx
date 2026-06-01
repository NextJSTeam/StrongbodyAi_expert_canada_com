import {
    Stethoscope, Building2, Sparkles, Wifi, Heart, Briefcase,
    FileText, Search, ShieldCheck, UserCheck, Settings, CheckCircle2, Zap,
    Globe2, CreditCard, MessageSquare, BarChart3
} from "lucide-react";
import React from "react";

export const targetProfiles = [
    { icon: <Stethoscope size={22} />, label: "Licensed Healthcare Professionals" },
    { icon: <Building2 size={22} />, label: "Accredited Clinics and Medical Centers" },
    { icon: <Sparkles size={22} />, label: "Medical Aesthetic Institutions" },
    { icon: <Wifi size={22} />, label: "Telehealth Providers" },
    { icon: <Heart size={22} />, label: "Rehabilitation & Wellness Facilities" },
    { icon: <Briefcase size={22} />, label: "Specialized Health Service Entrepreneurs" },
];

export const values = [
    { icon: <Globe2 size={24} />, title: "Market Expansion", desc: "Access a domestic and cross-border client network through our AI-native marketplace infrastructure." },
    { icon: <FileText size={24} />, title: "Structured Digital Commerce", desc: "Standardized, transparent Offer-based transaction system for every service engagement." },
    { icon: <CreditCard size={24} />, title: "Secure Platform Payments", desc: "Payments processed through trusted providers on the platform, with clear offers and completion tracking." },
    { icon: <MessageSquare size={24} />, title: "AI-Assisted Communication", desc: "Real-time multilingual communication powered by advanced AI translation models." },
    { icon: <BarChart3 size={24} />, title: "Reputation Architecture", desc: "Build a data-driven professional profile based on verified reviews and real performance metrics." },
    { icon: <Zap size={24} />, title: "Global Reach Without Borders", desc: "Expand your practice globally — serve clients anywhere through our borderless AI marketplace." },
];

export const processSteps = [
    { num: "01", title: "Expression of Interest", desc: "Submit your interest through our partner application form.", icon: <FileText size={22} /> },
    { num: "02", title: "Credential Verification", desc: "We verify your licenses, certifications, and professional credentials.", icon: <Search size={22} /> },
    { num: "03", title: "Compliance Review", desc: "Regulatory and compliance evaluation per US healthcare standards.", icon: <ShieldCheck size={22} /> },
    { num: "04", title: "Professional Evaluation", desc: "Review of your credentials, expertise, and fit with our wellness platform standards — no interviews.", icon: <UserCheck size={22} /> },
    { num: "05", title: "Profile Structuring", desc: "We help you build an optimized digital professional profile.", icon: <Settings size={22} /> },
    { num: "06", title: "Formal Activation", desc: "You are activated as a Strategic Partner on the StrongBody AI marketplace.", icon: <CheckCircle2 size={22} /> },
];
