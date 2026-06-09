import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});


import { generateUnifiedMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generateUnifiedMetadata();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "StrongBody AI",
    url: "https://get-expert-canada.com",
    logo: "https://get-expert-canada.com/images/logo.png",
    description: "AI-Native Health Services Marketplace connecting verified professionals and clients globally.",
    sameAs: [
      "https://link.multime.ai/uVD7/b4zsnrc1",
      "https://link.multime.ai/uVD7/b4zsnrc1"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      url: "https://get-expert-canada.com/contact",
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

      </head>
      <body className={`${jakarta.variable} font-sans antialiased text-base text-slate-900 bg-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
