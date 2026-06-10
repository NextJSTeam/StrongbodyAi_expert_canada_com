export const STRONGBODY_API_BASE_URL = process.env.STRONGBODY_API_BASE_URL;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/** api-v2.strongbody.ai — not Catalog wk_live_* / API_KEY */
export const STRONGBODY_API_KEY =
    process.env.STRONGBODY_API_KEY || process.env.ADMIN_API_KEY || "your_api_key";

export const API_CONFIG = {
    HEADERS: {
        "X-Site-Code": process.env.API_SITE_CODE,
        "X-Tenant-Code": process.env.API_TENANT_CODE,
        "language": process.env.API_LANGUAGE,
        "x-api-key": process.env.API_KEY
    }
};

export const MAIL_CONFIG = {
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL
};


export type ApiFetchOptions = RequestInit & { omitLanguage?: boolean };

export async function apiFetch(endpoint: string, options: ApiFetchOptions = {}) {
    const { omitLanguage, ...fetchOptions } = options;
    const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
    const headers: Record<string, string | undefined> = {
        ...(API_CONFIG.HEADERS as Record<string, string | undefined>),
    };
    if (omitLanguage) {
        delete headers.language;
    }

    try {
        const response = await fetch(url, {
            ...fetchOptions,
            headers: {
                ...headers,
                ...fetchOptions.headers,
            },
            next: { revalidate: 60, ...fetchOptions?.next }
        } as any);

        if (!response.ok) {
            console.error(`API Error: ${response.status} ${response.statusText} for ${url}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error(`Fetch Error for ${url}:`, error);
        return null;
    }
}

const MENU_LANG = (process.env.API_LANGUAGE || "en");

function menuEndpoint(menuCode: string, language = MENU_LANG) {
    return `/menus/${menuCode}?language=${encodeURIComponent(language)}`;
}

export const cmsApi = {
    getMenu: (menuCode: string, language: string = MENU_LANG) =>
        apiFetch(menuEndpoint(menuCode, language), { omitLanguage: true }),
    getFooterMenu: () => apiFetch(menuEndpoint("footer-menu"), { omitLanguage: true }),
};