export interface HeaderNavLink {
  id: string;
  href: string;
  label: string;
  children?: HeaderNavLink[];
}

/** Static header menu when CMS `header-menu` is unavailable. */
export function getHeaderNavLinks(): HeaderNavLink[] {
  return [
    { id: "nav-home", href: "/", label: "Home" },
    { id: "nav-about", href: "/about", label: "About" },
    {
      id: "nav-platform",
      href: "#",
      label: "Platform",
      children: [
        { id: "nav-how", href: "/how-it-works", label: "How It Works" },
        { id: "nav-multime", href: "/multime", label: "MultiMe AI App" },
        { id: "nav-recruitment", href: "/recruitment", label: "Partner Recruitment" },
      ],
    },
    {
      id: "nav-community",
      href: "#",
      label: "Community",
      children: [
        { id: "nav-clients", href: "/for-clients", label: "For Clients" },
        { id: "nav-partners", href: "/for-partners", label: "For Partners" },
        { id: "nav-blog", href: "/blog", label: "Blog" },
      ],
    },
    { id: "nav-contact", href: "/contact", label: "Contact" },
  ];
}
