import { fetchBlogsByCategory } from "@/app/api";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const host = request.headers.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const lastMod = new Date().toISOString();

  // Get total posts from metadata - our updated fetcher now handles multiple total fields
  const { meta } = await fetchBlogsByCategory(undefined, 1, 1);
  const totalPosts = meta?.total || meta?.total_entries || (meta?.total_pages ? meta.total_pages * 1 : 0) || 0;
  
  const postsPerSitemapFile = 10000;
  const postSitemapCount = Math.max(1, Math.ceil(totalPosts / postsPerSitemapFile));

  const sitemaps = [
    { loc: `${baseUrl}/sitemap/page-sitemap.xml`, lastmod: lastMod },
    ...Array.from({ length: postSitemapCount }, (_, i) => ({
      loc: `${baseUrl}/sitemap/post-sitemap-${i + 1}.xml`,
      lastmod: lastMod
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-index.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
      .map(
        (s) => `
  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`
      )
      .join("")}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate",
      "X-Robots-Tag": "noindex",
    },
  });
}
