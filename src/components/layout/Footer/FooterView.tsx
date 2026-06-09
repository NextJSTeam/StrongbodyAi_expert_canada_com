import React from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { Mail, MapPin } from "lucide-react";
import type { FooterLink } from "@/lib/cms-menu";
import { footerContent } from "@/config/footer-content";

type FooterViewProps = {
    settings?: {
        site_title?: string;
        meta_description?: string;
        site_tagline?: string;
        contact_email?: string;
        logo_url?: string;
    };
    columns: { clients: string; partners: string; legal: string };
    clientsLinks: FooterLink[];
    partnersLinks: FooterLink[];
    legalLinks: FooterLink[];
};

const FooterLinkItem = ({ link }: { link: FooterLink }) => {
    const isExternal = link.href.startsWith("http");
    const className = "text-[16px] font-normal text-[#111827] hover:text-primary transition-colors";

    if (isExternal) {
        return (
            <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                {link.name}
            </a>
        );
    }

    return (
        <Link href={link.href} className={className}>
            {link.name}
        </Link>
    );
};

const FooterView = ({ settings, columns, clientsLinks, partnersLinks, legalLinks }: FooterViewProps) => {
    const siteTitle = settings?.site_title || "StrongBody AI";
    const siteDescription =
        settings?.meta_description || settings?.site_tagline || "";
    const contactEmail = settings?.contact_email || "customercare@strongbody.ai";
    const logoUrl = settings?.logo_url || "/images/logo.png";
    const year = new Date().getFullYear();

    return (
        <footer className="bg-white pt-16 pb-8 border-t border-grey-300 relative overflow-hidden">
            <Container className="relative z-10">
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 ${
                        clientsLinks.length || partnersLinks.length || legalLinks.length
                            ? "lg:grid-cols-5"
                            : "lg:grid-cols-2"
                    }`}
                >
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <img
                                src={logoUrl}
                                alt={`${siteTitle} Logo`}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-[16px] font-normal text-[#111827] leading-[1.8] max-w-xs">
                            {siteDescription}
                        </p>

                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-[8px] bg-[#FAFAFA] border border-grey-200 text-primary flex items-center justify-center">
                                    <Mail size={16} />
                                </div>
                                <a
                                    href={`mailto:${contactEmail}`}
                                    className="text-[14px] text-[#111827] hover:text-primary transition-colors"
                                >
                                    {contactEmail}
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-[8px] bg-[#FAFAFA] border border-grey-200 text-primary flex items-center justify-center">
                                    <MapPin size={16} />
                                </div>
                                <span className="text-[14px] font-normal text-[#111827]">
                                    {footerContent.address}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <a
                                href="https://link.multime.ai/uVD7/b4zsnrc1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                                    alt={footerContent.appStoreAlt}
                                    className="h-[40px] w-auto border border-grey-200 rounded-[8px]"
                                />
                            </a>
                            <a
                                href="https://link.multime.ai/uVD7/b4zsnrc1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                    alt={footerContent.playStoreAlt}
                                    className="h-[40px] w-auto border border-grey-200 rounded-[8px]"
                                />
                            </a>
                        </div>
                    </div>

                    {clientsLinks.length > 0 && (
                        <div>
                            <h4 className="text-[16px] font-bold uppercase text-[#111827] mb-6">
                                {columns.clients}
                            </h4>
                            <ul className="space-y-3">
                                {clientsLinks.map((link) => (
                                    <li key={`${link.name}-${link.href}`}>
                                        <FooterLinkItem link={link} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {partnersLinks.length > 0 && (
                        <div>
                            <h4 className="text-[16px] font-bold uppercase text-[#111827] mb-6">
                                {columns.partners}
                            </h4>
                            <ul className="space-y-3">
                                {partnersLinks.map((link) => (
                                    <li key={`${link.name}-${link.href}`}>
                                        <FooterLinkItem link={link} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {legalLinks.length > 0 && (
                        <div>
                            <h4 className="text-[16px] font-bold uppercase text-[#111827] mb-6">
                                {columns.legal}
                            </h4>
                            <ul className="space-y-3">
                                {legalLinks.map((link) => (
                                    <li key={`${link.name}-${link.href}`}>
                                        <FooterLinkItem link={link} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="pt-8 border-t border-grey-300 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[12px] font-normal text-[#111827] text-center md:text-left">
                        © {year} <span className="notranslate">{siteTitle}</span>{" "}
                        {footerContent.copyrightPrimaryAfterTitle}
                    </p>
                    <p className="text-[12px] font-normal text-[#111827] text-center md:text-right">
                        <span className="notranslate">{siteTitle}</span> {footerContent.copyrightSecondarySuffix}
                    </p>
                </div>
            </Container>
        </footer>
    );
};

export default FooterView;
