import ForPartnersContent from "@/components/sections/partners/ForPartnersContent";
import { Metadata } from "next";
import { generateUnifiedMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
    return generateUnifiedMetadata(undefined, { title: "Become a Strategic Partner | StrongBody AI Recruitment", description: "Apply to join StrongBody AI" });
}


export default function ForPartnersPage() {
    return (
        <main className="bi-theme-seller min-h-screen">
            <ForPartnersContent />
        </main>
    );
}
