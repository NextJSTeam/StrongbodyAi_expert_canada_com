import { cmsApi } from "@/config/api";
import { parseFooterMenuFromCms, type CmsMenuItem } from "@/lib/cms-menu";
import FooterView from "./FooterView";

type FooterProps = {
    settings?: {
        site_title?: string;
        meta_description?: string;
        site_tagline?: string;
        contact_email?: string;
        logo_url?: string;
    };
};

const Footer = async ({ settings }: FooterProps) => {
    let clientsLinks: { name: string; href: string }[] = [];
    let partnersLinks: { name: string; href: string }[] = [];
    let legalLinks: { name: string; href: string }[] = [];
    let columns = { clients: "", partners: "", legal: "" };

    try {
        const res = await cmsApi.getFooterMenu();
        const items = (res?.data?.items || res?.items) as CmsMenuItem[] | undefined;
        const parsed = items?.length ? parseFooterMenuFromCms(items) : null;

        if (parsed) {
            clientsLinks = parsed.clients;
            partnersLinks = parsed.partners;
            legalLinks = parsed.legal;
            columns = parsed.columns;
        } else if (items?.length) {
            console.warn("[Footer] footer-menu exists but has no valid link groups");
        } else {
            console.warn("[Footer] footer-menu missing or empty — add menu in CMS");
        }
    } catch (err) {
        console.error("[Footer] Failed to load footer-menu from CMS:", err);
    }

    return (
        <FooterView
            settings={settings}
            columns={columns}
            clientsLinks={clientsLinks}
            partnersLinks={partnersLinks}
            legalLinks={legalLinks}
        />
    );
};

export default Footer;
