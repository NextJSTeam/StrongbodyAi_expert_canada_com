import { fetchAllBlogPosts } from "@/app/api";

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
        routes = [
            "/",
            "/about/",
            "/how-it-works/",
            "/for-clients/",
            "/for-partners/",
            "/faq/",
            "/contact/",
            "/blog/",
            "/legal/",
            "/multime/"
        ].map((route) => ({
            url: route === "/" ? `${baseUrl}/` : `${baseUrl}${route}`,
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
            const { meta } = await fetchAllBlogPosts(1, 1, "");
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
                    fetchAllBlogPosts(startPage + i, postsPerBatch, "")
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

