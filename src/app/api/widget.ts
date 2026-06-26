import { apiFetch } from "@/config/api";

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

/** Locale comes from API_LANGUAGE header in apiFetch; pass language only to override. */
export async function fetchPostDetail(slug: string, language?: string) {
    const langParam = language ? `?language=${encodeURIComponent(language)}` : "";
    const res = await apiFetch(`/posts/${slug}${langParam}`);
    return res?.data || res;
}

export async function fetchPostsByCategory(
    category?: string,
    page?: number,
    limit?: number,
    language?: string,
    options: RequestInit = {},
) {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (language) params.set("language", language);
    if (page) params.set("page", String(page));
    if (limit) params.set("limit", String(limit));
    const query = params.toString();
    const url = query ? `/posts?${query}` : "/posts";
    return apiFetch(url, options);
}
