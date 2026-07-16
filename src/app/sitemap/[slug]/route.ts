import { fetchBlogsByCategory, cmsApi } from "@/app/api";
import { getFixedSourceLanguagePairSlugs } from "@/lib/voice-translation-languages";
import { listWellnessTopics } from "@/lib/wellness-test";

export const dynamic = 'force-dynamic';
export const revalidate = 0;


// XML escaping helper to prevent broken sitemaps
function escapeXml(unsafe: string) {
    if (!unsafe) return "";
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
}

// Normalize a menu URL into a clean sitemap-friendly path with trailing slash.
function normalizeMenuPath(raw: string | undefined | null): string | null {
    if (!raw) return null;
    let path = String(raw).trim();
    if (!path || path === "#") return null;
    if (/^https?:\/\//i.test(path)) return null;
    if (path.startsWith("#")) return null;
    path = path.split("#")[0].split("?")[0];
    if (!path.startsWith("/")) path = "/" + path;
    if (path === "/") return "/";
    if (!path.endsWith("/")) path = path + "/";
    return path;
}

function collectMenuPaths(items: any[], acc: Set<string>) {
    for (const item of items || []) {
        const norm = normalizeMenuPath(item?.url);
        if (norm) acc.add(norm);
        if (Array.isArray(item?.children) && item.children.length) {
            collectMenuPaths(item.children, acc);
        }
    }
}

async function getDynamicPagePaths(): Promise<string[]> {
    try {
        const [headerRes, sitemapRes] = await Promise.allSettled([
            cmsApi.getMenu("header-menu"),
            cmsApi.getMenu("sitemap-menu"),
        ]);
        const set = new Set<string>();
        set.add("/voice-translation-app/");
        set.add("/wellness-test/");

        if (headerRes.status === "fulfilled") {
            const headerItems = headerRes.value?.data?.items || headerRes.value?.items || [];
            if (Array.isArray(headerItems) && headerItems.length > 0) {
                collectMenuPaths(headerItems, set);
            }
        }

        if (sitemapRes.status === "fulfilled") {
            const sitemapItems = sitemapRes.value?.data?.items || sitemapRes.value?.items || [];
            if (Array.isArray(sitemapItems) && sitemapItems.length > 0) {
                collectMenuPaths(sitemapItems, set);
            }
        }

        return Array.from(set);
    } catch (err) {
        console.error("[Sitemap] Failed to load CMS menus:", err);
    }
    return [];
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const host = request.headers.get("host");
    const protocol = host?.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    let routes: any[] = [];
    const lastMod = new Date().toISOString();

    if (slug === "page-sitemap.xml") {
        const paths = await getDynamicPagePaths();
        routes = paths.map((path) => ({
            url: `${baseUrl}${path}`,
            lastModified: lastMod,
        }));
    } else if (slug === "wellness-test.xml") {
        try {
            const topics = await listWellnessTopics();
            routes = [
                { url: `${baseUrl}/wellness-test/`, lastModified: lastMod },
                ...topics
                    .filter((topic) => topic.slug)
                    .map((topic) => ({
                        url: `${baseUrl}/wellness-test/${topic.slug}/`,
                        lastModified: lastMod,
                    })),
            ];
        } catch (e) {
            console.error("Error fetching wellness test topics for sitemap:", e);
            routes = [{ url: `${baseUrl}/wellness-test/`, lastModified: lastMod }];
        }
    } else if (slug === "voice-translation-pairs.xml") {
        routes = getFixedSourceLanguagePairSlugs().map((pairSlug) => ({
            url: `${baseUrl}/voice-translation-app/${pairSlug}/`,
            lastModified: lastMod,
        }));
    } else if (slug.startsWith("post-sitemap")) {
        const match = slug.match(/post-sitemap-(\d+)\.xml/);
        const index = match ? parseInt(match[1]) : 1;
        
        // Use resilient batched fetching
        const postsPerSitemapFile = 10000;
        const postsPerBatch = 100;

        try {
            // Get total posts using the same robust logic as the index
            const { meta } = await fetchBlogsByCategory(undefined, 1, 1, "");
            const totalPosts = meta?.total || meta?.total_entries || (meta?.total_pages ? meta.total_pages * 1 : 0) || 0;
            
            // Calculate how many API pages we actually need to fetch for this sitemap file
            const startPost = (index - 1) * postsPerSitemapFile;
            const endPost = Math.min(startPost + postsPerSitemapFile, totalPosts);
            
            // If totalPosts is 0 but we are at the first sitemap, 
            // we should still try to fetch once just in case the meta was wrong
            const effectiveEndPost = (totalPosts === 0 && index === 1) ? postsPerBatch : endPost;

            if (effectiveEndPost > startPost) {
                const totalToFetch = effectiveEndPost - startPost;
                const batchesNeeded = Math.ceil(totalToFetch / postsPerBatch);
                const startPage = Math.floor(startPost / postsPerBatch) + 1;

                const batchPromises = Array.from({ length: batchesNeeded }, (_, i) => 
                    fetchBlogsByCategory(undefined, startPage + i, postsPerBatch, "")
                );
                
                const results = await Promise.allSettled(batchPromises);
                
                const allPosts: any[] = [];
                results.forEach(result => {
                    if (result.status === 'fulfilled' && result.value?.posts) {
                        allPosts.push(...result.value.posts);
                    }
                });

                if (allPosts.length > 0) {
                    routes = allPosts.map((post: any) => ({
                        url: `${baseUrl}/${post.slug}/`,
                        lastModified: post.date || lastMod,
                        image: post.image,
                    }));
                }
            }
        } catch (e) {
            console.error("Error fetching batched posts for canada sitemap chunk:", e);
        }
    } else {
        routes = [];
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${routes
            .map(
                (route) => `
  <url>
    <loc>${escapeXml(route.url)}</loc>
    <lastmod>${route.lastModified}</lastmod>${route.image ? `
    <image:image>
      <image:loc>${escapeXml(route.image)}</image:loc>
    </image:image>` : ""}
  </url>`
            )
            .join("")}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate",
        },
    });
}
