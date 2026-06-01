export type FooterLink = { name: string; href: string };

export interface CmsMenuItem {
    id?: string;
    parent_id?: string | null;
    url?: string;
    type?: string;
    slug?: string;
    label?: string;
    open_in_new_tab?: boolean;
    sort_order?: number;
    translations?: { language_code: string; label: string }[];
    children?: CmsMenuItem[];
}

export function getItemLabel(item: CmsMenuItem): string {
    return (
        item.label ||
        item.translations?.find((t) => t.label)?.label ||
        item.translations?.[0]?.label ||
        ""
    );
}

export function getItemHref(item: CmsMenuItem): string {
    let href = item.url || "";
    if (!href) {
        if (item.type === "category" && item.slug) {
            href = `/blogs/category/${item.slug}`;
        } else if (item.type === "post" && item.slug) {
            href = `/${item.slug}`;
        } else {
            href = "#";
        }
    }
    return href;
}

export function cmsItemsToLinks(items: CmsMenuItem[]): FooterLink[] {
    return items
        .map((item) => ({
            name: getItemLabel(item),
            href: getItemHref(item),
        }))
        .filter((link) => link.name && link.href !== "#");
}

export type FooterMenuFromCms = {
    columns: { clients: string; partners: string; legal: string };
    clients: FooterLink[];
    partners: FooterLink[];
    legal: FooterLink[];
};

/** Parse footer-menu from CMS only — no hardcoded fallback. */
export function parseFooterMenuFromCms(items: CmsMenuItem[]): FooterMenuFromCms | null {
    if (!items?.length) return null;

    const groups = items
        .filter((item) => item.children && item.children.length > 0)
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

    if (groups.length < 3) return null;

    const clients = cmsItemsToLinks(groups[0].children!);
    const partners = cmsItemsToLinks(groups[1].children!);
    const legal = cmsItemsToLinks(groups[2].children!);

    if (!clients.length && !partners.length && !legal.length) return null;

    return {
        columns: {
            clients: getItemLabel(groups[0]),
            partners: getItemLabel(groups[1]),
            legal: getItemLabel(groups[2]),
        },
        clients,
        partners,
        legal,
    };
}
