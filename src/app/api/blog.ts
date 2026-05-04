import { fetchWidgetItems, fetchPostsByCategory } from "./widget";

const sanitizeSlug = (slug: string) => {
    if (!slug) return "";
    return slug.toLowerCase().trim().replace(/\s+/g, '');
};

export async function fetchBlogCategories() {
    try {
        const widgetData = await fetchWidgetItems("blogs");
        if (!widgetData || !widgetData.items) return [];

        return widgetData.items.map((item: any) => ({
            id: item.id || Math.random().toString(),
            name: (item.name || item.title || "Untitled").trim(),
            slug: sanitizeSlug(item.slug || item.name || "")
        }));
    } catch (error) {
        console.error("Error in fetchBlogCategories:", error);
        return [];
    }
}

export async function fetchBlogPostsByWidget(code: string) {
    try {
        const sanitizedCode = sanitizeSlug(code);
        const widgetData = await fetchWidgetItems(sanitizedCode);
        if (!widgetData || !widgetData.items) return [];

        return widgetData.items.map((item: any) => {
            const authorObj = item.author;
            const authorName = authorObj && typeof authorObj === 'object'
                ? [authorObj.first_name, authorObj.last_name].filter(Boolean).join(' ')
                : (typeof authorObj === 'string' ? authorObj : "");

            return {
                id: item.id || Math.random().toString(),
                title: item.title || "",
                excerpt: item.excerpt || "",
                author: authorName,
                date: item.published_at || item.created_at || "",
                readTime: "",
                category: item.category_name || "",
                image: item.featured_image_url || item.image || item.thumbnail || null,
                slug: item.slug
            };
        });
    } catch (error) {
        console.error(`Error in fetchBlogPostsByWidget for ${code}:`, error);
        return [];
    }
}

export async function fetchBlogsByCategory(category?: string, page: number = 1, limit: number = 6, language?: string) {
    try {
        const options = language !== undefined ? { headers: { language } } : {};
        const res = await fetchPostsByCategory(category, page, limit, language, options);

        // Handle both flattened and nested data (res.data || res)
        const postsArray = res?.data || (Array.isArray(res) ? res : []);
        const meta = res?.meta || { page: 1, total_pages: 1, total: 0 };

        if (!postsArray || !Array.isArray(postsArray)) {
            return { posts: [], meta };
        }

        const mappedPosts = postsArray.map((item: any) => {
            const authorObj = item.author;
            const authorName = authorObj && typeof authorObj === 'object'
                ? [authorObj.first_name, authorObj.last_name].filter(Boolean).join(' ')
                : (typeof authorObj === 'string' ? authorObj : "");

            return {
                id: item.id || Math.random().toString(),
                title: item.title || "",
                excerpt: item.excerpt || "",
                author: authorName || "StrongBody AI",
                date: item.published_at || item.created_at || "",
                readTime: "",
                category: item.category_name || item.category?.name || "",
                image: item.featured_image_url || item.image || item.thumbnail || null,
                slug: item.slug
            };
        });

        return { posts: mappedPosts, meta };
    } catch (error) {
        console.error(`Error in fetchBlogsByCategory for ${category}:`, error);
        return { posts: [], meta: { page: 1, total_pages: 1, total: 0 } };
    }
}

export async function fetchAllBlogPosts(page: number = 1, limit: number = 6, language?: string) {
    return fetchBlogsByCategory(undefined, page, limit, language);
}
