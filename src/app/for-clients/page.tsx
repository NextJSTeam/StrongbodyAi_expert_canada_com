import ForClients from "@/components/sections/marketing/ForClients";
import { Metadata } from "next";
import { generateUnifiedMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
    return generateUnifiedMetadata(undefined, { title: "For Clients | Access World-Class Experts | StrongBody AI", description: "Find verified wellness & health-support experts worldwide. Book wellness services, MultiMe AI voice translation, and secure platform payments." });
}


export default function ForClientsPage() {
    return (
        <main className="min-h-screen pt-20">
            <ForClients />
        </main>
    );
}
