import { apiFetch } from "@/config/api";

const DEFAULT_LANG = process.env.API_LANGUAGE || "en";

export async function fetchCategories(parentSlug?: string) {
    const endpoint = parentSlug ? `/categories/${parentSlug}` : `/categories`;
    const res = await apiFetch(endpoint);
    return res?.data || res;
}

export async function fetchWidgetItems(code: string) {
    let data = await apiFetch(`/widgets/${code}`);
    if (!data && code.includes("-")) {
        const sanitizedCode = code.replace(/-/g, "");
        data = await apiFetch(`/widgets/${sanitizedCode}`);
    }
    return data?.data || data;
}

export async function fetchPostDetail(slug: string, language: string = DEFAULT_LANG) {
    const langParam = language ? `?language=${language}` : "";
    const res = await apiFetch(`/posts/${slug}${langParam}`);
    return res?.data || res;
}

export async function fetchPostsByCategory(category?: string, page?: number, limit?: number, language?: string, options: any = {}) {
    const params = new URLSearchParams();
    if (language) params.append("language", language);
    if (category) params.append("category", category);
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());
    
    const queryString = params.toString();
    const url = `/posts${queryString ? `?${queryString}` : ""}`;
    return apiFetch(url, options);
}
