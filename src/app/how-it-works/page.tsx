import HowItWorks from "@/components/sections/marketing/HowItWorks";
import { Metadata } from "next";
import { generateUnifiedMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
    return generateUnifiedMetadata(undefined, { title: "How It Works | StrongBody AI Step-by-Step Guide", description: "Connect with verified experts in 4 steps — download MultiMe AI, voice chat, transparent offers, and secure platform payments." });
}


export default function HowItWorksPage() {
    return (
        <main className="min-h-screen pt-20">
            <HowItWorks />
        </main>
    );
}
