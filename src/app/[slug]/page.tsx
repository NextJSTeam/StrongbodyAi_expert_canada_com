import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Share2, Facebook, Twitter, Linkedin, Headset, Calendar } from "lucide-react";
import Container from "@/components/layout/Container";
import { Metadata } from "next";

import { fetchPostDetail, fetchAllBlogPosts } from "@/app/api";

import ShareButtons from "@/components/blog/ShareButtons";
import RecruitmentJobDetailView from "@/components/recruitment/RecruitmentJobDetailView";
import { getJobDetail, isRecruitmentPost } from "@/utils/recruitment-loader";
import { API_CONFIG } from "@/config/api";

import { generateUnifiedMetadata } from "@/utils/seo";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    return generateUnifiedMetadata(resolvedParams.slug);
}

const decodeHtml = (html: string) => {
    if (!html) return "";
    const entities: { [key: string]: string } = {
        "&#8220;": "“",
        "&#8221;": "”",
        "&#8216;": "‘",
        "&#8217;": "’",
        "&quot;": '"',
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&#39;": "'",
        "&hellip;": "..."
    };
    return html.replace(/&#\d+;|&[a-z]+;/g, (match) => entities[match] || match);
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const resolvedParams = await params;

    // Fetch detailed post
    const post = await fetchPostDetail(resolvedParams.slug);

    if (!post) {
        notFound();
    }
    if (isRecruitmentPost(post)) {
        const locale = (API_CONFIG.HEADERS.language as string) || "en";
        const job = await getJobDetail(resolvedParams.slug, locale);
        if (!job) {
            notFound();
        }
        return <RecruitmentJobDetailView job={job} />;
    }


    const title = post.title;
    const content = post.content || post.details?.content || "<p>No content available.</p>";
    const image = post.featured_image_url || post.image || null;
    const category = post.categories?.[0]?.name || post.category?.name || "Uncategorized";
    const date = post.published_at || post.date || new Date().toISOString();

    // Fetch related posts (limited for the discovery section)
    const { posts: allPosts } = await fetchAllBlogPosts(1, 10);
    const relatedPosts = allPosts || [];

    // Filter discovery posts (bottom of page)
    const discoveryPosts = relatedPosts.filter((p: any) => p.slug !== resolvedParams.slug).slice(0, 3);

    // JSON-LD Article Schema
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: post.excerpt || "",
        image: image || "/images/logo.png",
        datePublished: date,
        dateModified: post.updated_at || date,
        author: {
            "@type": "Person",
            name: "StrongBody AI",
        },
        publisher: {
            "@type": "Organization",
            name: "StrongBody AI",
            logo: {
                "@type": "ImageObject",
                url: "https://get-expert-canada.com/images/logo.png",
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://get-expert-canada.com/${resolvedParams.slug}`,
        },
    };

    return (
        <main className="min-h-screen bg-white text-grey-900">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            {/* Hero Image */}
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <img
                        src="/blogDefault.png?v=2"
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                )}
</div>

            <Container>
                <div className="py-12">
                    {/* Back Button */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-primary font-bold hover:underline transition-all mb-8"
                    >
                        <ArrowLeft size={18} />
                        Back to Blog
                    </Link>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <article className="lg:col-span-2">
                            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-grey-900 leading-tight">
                                {decodeHtml(title)}
                            </h1>
                            <div
                                className="prose prose-lg prose-grey max-w-none
                                    prose-headings:text-grey-900 prose-headings:font-bold prose-headings:leading-tight
                                    prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg
                                    prose-p:text-grey-600 prose-p:leading-relaxed prose-p:text-base
                                    prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                                    prose-strong:text-grey-900
                                    prose-img:rounded-xl prose-img:shadow-md
                                    prose-blockquote:border-l-primary prose-blockquote:text-grey-600
                                    prose-ul:text-grey-600 prose-ol:text-grey-600
                                    prose-li:marker:text-primary
                                    prose-table:text-sm
                                    prose-th:text-grey-900 prose-th:font-bold
                                    prose-td:text-grey-600"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />

                            {/* Share Section */}
                            <div className="mt-8 pt-8 border-t border-grey-200">
                                <ShareButtons
                                    url={`https://get-expert-canada.com/${resolvedParams.slug}`}
                                    title={title}
                                    labels={{
                                        shareTitle: "Share this article",
                                        copySuccess: "Link copied!"
                                    }}
                                />
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="sticky top-24 space-y-8">
                                {/* Related Posts (Sidebar) */}
                                {relatedPosts.filter((p: any) => p.slug !== resolvedParams.slug).length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-bold text-grey-900 mb-6">Related Articles</h3>
                                        <div className="space-y-4">
                                            {relatedPosts
                                                .filter((p: any) => p.slug !== resolvedParams.slug)
                                                .slice(0, 3)
                                                .map((relatedPost: any) => (
                                                    <Link
                                                        key={relatedPost.id}
                                                        href={`/${relatedPost.slug}`}
                                                        className="block group"
                                                    >
                                                        <div className="flex gap-4">
                                                            <img
                                                                src={relatedPost.image || relatedPost.featured_image_url || "/blogDefault.png?v=2"}
                                                                alt={relatedPost.title}
                                                                className="w-20 h-20 rounded-xl object-cover flex-shrink-0 opacity-80"
                                                            />
                                                            <div>
                                                                <h4 className="text-sm font-bold text-grey-900 group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                                                    {decodeHtml(relatedPost.title)}
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                        </div>
                                    </div>
                                )}

                                {/* CTA Card */}
                                <div className="p-8 bg-secondary rounded-[2rem] relative overflow-hidden group shadow-xl shadow-secondary/20">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform duration-500">
                                            <Headset className="text-white" size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Free Consultation</h3>
                                        <p className="text-grey-400 text-sm font-medium leading-relaxed mb-6">
                                            Get personalized health advice from our professional medical network.
                                        </p>
                                        <Link
                                            href="/contact"
                                            className="flex items-center justify-center gap-2 bg-white text-secondary py-3.5 rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-lg shadow-black/5"
                                        >
                                            Book Now <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                {/* Further Discoveries Section */}
                {discoveryPosts.length > 0 && (
                    <div className="py-24 border-t border-grey-100">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl font-bold text-grey-900">Explore More Insights</h2>
                            <Link href="/blog" className="text-primary font-bold flex items-center gap-2 hover:underline group">
                                View Library <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {discoveryPosts.map((discoveryPost: any) => (
                                <Link
                                    key={discoveryPost.id}
                                    href={`/${discoveryPost.slug}`}
                                    className="group bg-white rounded-2xl border-2 border-grey-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                                >
                                    <div className="relative aspect-video w-full overflow-hidden">
                                        {(discoveryPost.image || discoveryPost.featured_image_url) ? (
                                            <img
                                                src={discoveryPost.image || discoveryPost.featured_image_url}
                                                alt={discoveryPost.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <img
                                                src="/blogDefault.png?v=2"
                                                alt={discoveryPost.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                            />
                                        )}
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-lg font-bold text-grey-900 mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                            {decodeHtml(discoveryPost.title)}
                                        </h3>
                                        <p className="text-xs text-grey-500 font-medium leading-relaxed mb-4 line-clamp-2 flex-1">
                                            {discoveryPost.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-grey-100">
                                            <div className="flex items-center gap-2 text-primary font-bold text-xs group-hover:gap-2.5 transition-all">
                                                Read more <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </main>
    );
}
