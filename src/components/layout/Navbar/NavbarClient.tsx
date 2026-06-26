"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavDropdownChildActive, isNavGroupActive, isNavLinkActive } from "./nav-utils";
import Container from "@/components/layout/Container";
import { Menu, X, ChevronDown, Shield, Globe, HelpCircle, User, Users, BookOpen, Info, LucideIcon } from "lucide-react";

interface NavLink {
    id: string;
    href: string;
    label: string;
    children?: NavLink[];
}

interface NavbarClientProps {
    navLinks: NavLink[];
}

const iconMap: Record<string, LucideIcon> = {
    "How It Works": Info,
    "MultiMe AI App": Globe,
    "For Clients": User,
    "For Partners": Users,
    "Blog": BookOpen,
    "FAQ": HelpCircle,
    "Legal": Shield,
};

const NavbarClient = ({ navLinks }: NavbarClientProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && ! (event.target as HTMLElement).closest('button[data-dropdown]')) {
                setActiveDropdown(null);
            }
        };

        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = (name: string) => {
        if (activeDropdown === name) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(name);
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled
                ? "bg-white border-b border-grey-100 py-2 shadow-sm"
                : "bg-white py-3"
                }`}
        >
            <Container>
                <div className="flex justify-between items-center text-grey-800">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
                        <img
                            src="/images/logo.png"
                            alt="StrongBody AI Logo"
                            className="h-9 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
                        {navLinks.map((link) => {
                            const hasChildren = link.children && link.children.length > 0;
                            const isActive = isNavGroupActive(pathname, link.href, link.children);

                            if (!hasChildren) {
                                return (
                                    <Link
                                        key={link.id}
                                        href={link.href}
                                        className={`px-3 py-2 text-[14px] font-bold transition-all rounded-lg ${isActive ? "text-primary bg-primary/5" : "hover:text-primary hover:bg-grey-50"}`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            }

                            return (
                                <div key={link.id} className="relative group/nav">
                                    <button
                                        className={`flex items-center gap-1 px-3 py-2 text-[14px] font-bold transition-all rounded-lg group-hover/nav:text-primary group-hover/nav:bg-primary/5 ${isActive
                                            ? "text-primary bg-primary/5"
                                            : "hover:text-primary hover:bg-grey-50"
                                            }`}
                                    >
                                        {link.label} <ChevronDown size={14} className="transition-transform duration-300 group-hover/nav:rotate-180" />
                                    </button>

                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 opacity-0 translate-y-2 invisible group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:visible transition-all duration-300 z-50">
                                        <div className="bg-white rounded-2xl shadow-2xl border border-grey-100 p-2 overflow-hidden">
                                            {link.children!.map((child) => {
                                                const isChildActive = isNavDropdownChildActive(pathname, child.href);
                                                const LinkIcon = iconMap[child.label] || Info;

                                                return (
                                                    <Link
                                                        key={child.id}
                                                        href={child.href}
                                                        className={`flex items-center gap-4 p-4 rounded-xl transition-all ${isChildActive ? "bg-primary/5 text-primary" : "text-grey-700 hover:bg-grey-50 hover:pl-5"
                                                            }`}
                                                    >
                                                        <div className={`p-2 rounded-lg ${isChildActive ? "bg-primary text-white" : "bg-grey-100 text-grey-500"}`}>
                                                            <LinkIcon size={18} />
                                                        </div>
                                                        <div>
                                                            <div className="text-[14px] font-bold">{child.label}</div>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Side: CTAs Moved to dynamic menu */}
                    <div className="flex items-center gap-2">

                        {/* Mobile menu button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-grey-700 p-2 bg-grey-50 rounded-xl border border-grey-100"
                            >
                                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full h-screen bg-white shadow-2xl z-[100] overflow-y-auto border-t border-grey-100 pb-20">
                    <div className="p-6 space-y-6">
                        {navLinks.map((link) => {
                            const hasChildren = link.children && link.children.length > 0;
                            const isActive = isNavLinkActive(pathname, link.href);

                            return (
                                <div key={link.id} className="space-y-3">
                                    {!hasChildren ? (
                                        <Link
                                            href={link.href}
                                            className={`block px-5 py-4 text-base font-bold rounded-xl ${isActive ? "text-primary bg-primary/5 border border-primary/10" : "text-grey-800 bg-grey-50"}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <>
                                            <div className="text-[11px] font-black text-grey-400 uppercase tracking-widest px-4">{link.label}</div>
                                            <div className="grid grid-cols-1 gap-2">
                                                {link.children!.map((child) => {
                                                    const isChildActive = isNavDropdownChildActive(pathname, child.href);
                                                    const LinkIcon = iconMap[child.label] || Info;
                                                    return (
                                                        <Link
                                                            key={child.id}
                                                            href={child.href}
                                                            className={`flex items-center gap-4 px-4 py-3.5 text-[15px] font-bold rounded-xl border border-grey-100 ${isChildActive ? "text-primary bg-primary/5 border-primary/20" : "text-grey-700 bg-white shadow-sm"}`}
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            <div className="w-10 h-10 rounded-lg bg-grey-50 flex items-center justify-center text-primary">
                                                                <LinkIcon size={20} />
                                                            </div>
                                                            {child.label}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}

                    </div>
                </div>
            )}

        </nav>
    );
};

export default NavbarClient;
