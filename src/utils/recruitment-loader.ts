import { apiFetch, API_BASE_URL, API_CONFIG } from '@/config/api';
import { BECOME_SELLER_URL, BUILD_YOUR_SHOP_URL } from '@/config/links';

export interface JobItem {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
}

export interface JobDetail extends JobItem {
    requirements: string[];
    benefits: string[];
    content: string;
}

export interface JobsListMeta {
    page: number;
    total_pages: number;
    total: number;
}

function mapPostToJobItem(item: any): JobItem {
    const contentHtml = item.content || '';
    const plainText = stripHtml(contentHtml);
    const decodedText = decodeHtmlEntities(plainText);

    const location = extractField(decodedText, 'Work Location') || extractField(decodedText, 'Location') || extractField(decodedText, 'Locatie') || '';
    const type = extractField(decodedText, 'Employment Type') || extractField(decodedText, 'Type') || extractField(decodedText, 'Dienstverband') || '';

    const title = item.title || item.name || '';
    let department = 'Careers';
    const upperTitle = title.toUpperCase();
    if (upperTitle.includes('SALES') || upperTitle.includes('B2B') || upperTitle.includes('MARKETING') || upperTitle.includes('VERKOOP')) {
        department = 'Sales & Marketing';
    } else if (upperTitle.includes('PRODUCTION') || upperTitle.includes('OPERATIONS') || upperTitle.includes('PRODUCTIE')) {
        department = 'Operations';
    } else if (upperTitle.includes('QC') || upperTitle.includes('QA') || upperTitle.includes('QUALITY') || upperTitle.includes('KWALITEIT')) {
        department = 'Quality Assurance';
    } else if (upperTitle.includes('R&D') || upperTitle.includes('RESEARCH') || upperTitle.includes('ENGINEER') || upperTitle.includes('ONTWIKKELING')) {
        department = 'Research & Development';
    }

    let description = item.excerpt || '';
    if (!description) {
        const aboutUsMatch = decodedText.match(/ABOUT US\s*\n+([^]+?)(?=\n+[A-Z\s]{4,}|\n*$)/i);
        if (aboutUsMatch) description = aboutUsMatch[1].trim().split('\n')[0];
        if (!description) {
            const lines = decodedText.split('\n').map((l) => l.trim()).filter(Boolean);
            description = lines.find((l) => l.length > 30 && !l.includes('JOB') && !l.includes('COMPANY')) || '';
        }
    }

    return {
        id: item.slug || String(item.id),
        title,
        department,
        location,
        type,
        description,
    };
}

function parseJobsListMeta(responseData: any, page: number, limit: number, itemCount: number): JobsListMeta {
    const meta = responseData?.meta;
    const total = meta?.total ?? responseData?.total ?? responseData?.total_entries ?? itemCount;
    const totalPages = meta?.total_pages ?? responseData?.total_pages ?? Math.max(1, Math.ceil(total / limit));

    return {
        page: meta?.page ?? page,
        total_pages: totalPages,
        total,
    };
}

export const RECRUITMENT_JOBS_PER_PAGE = 10;

export async function loadJobsPaginated(
    page: number = 1,
    limit: number = RECRUITMENT_JOBS_PER_PAGE,
    language: string = 'en',
): Promise<{ jobs: JobItem[]; meta: JobsListMeta }> {
    try {
        const lang = language.toUpperCase();
        const responseData = await apiFetch(
            `/posts?category=partner-recruitment&page=${page}&limit=${limit}`,
            { headers: { language: lang } },
        );

        const items = Array.isArray(responseData?.data)
            ? responseData.data
            : (responseData?.data?.items || []);

        let jobs = items.map(mapPostToJobItem);
        let meta = parseJobsListMeta(responseData, page, limit, items.length);

        if (jobs.length > limit && meta.total_pages <= 1 && items.length > limit) {
            const total = items.length;
            const totalPages = Math.max(1, Math.ceil(total / limit));
            const start = (page - 1) * limit;
            jobs = jobs.slice(start, start + limit);
            meta = { page, total_pages: totalPages, total };
        }

        return { jobs, meta };
    } catch (error) {
        console.error('Error loading paginated jobs:', error);
        return { jobs: [], meta: { page, total_pages: 1, total: 0 } };
    }
}

export async function loadJobs(language: string = 'en'): Promise<JobItem[]> {
    try {
        const { jobs } = await loadJobsPaginated(1, 100, language);
        return jobs;
    } catch (error) {
        console.error('Error loading jobs:', error);
        return [];
    }
}

export function getProfessionFromJob(job: Pick<JobDetail, 'id' | 'title'>): string {
    const title = (job.title || '').trim();
    if (!title) return '';

    const patterns = [
        /Build profile shop for\s+(.+?)(?:\s*\||$)/i,
        /Recruitment of\s+(.+?)\s+Expert/i,
        /Partner Recruitment[:\s-]+(.+?)(?:\s*\||$)/i,
        /Become a\s+(.+?)\s+Partner/i,
    ];

    for (const pattern of patterns) {
        const match = title.match(pattern);
        if (match?.[1]) return match[1].trim();
    }

    const slugWords = job.id
        .replace(/_/g, '-')
        .split('-')
        .filter((word) => {
            const lower = word.toLowerCase();
            return word.length > 0 && !['partner', 'recruitment', 'strongbody', 'expert', 'us', 'job'].includes(lower);
        });

    if (slugWords.length > 0) {
        return slugWords.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    return title;
}

export function getPartnerRecruitmentApplyUrl(profession: string): string {
    const query = profession.trim().toLowerCase();
    if (!query) return BECOME_SELLER_URL;
    return `${BECOME_SELLER_URL}?q=${encodeURIComponent(query)}`;
}

export function getPartnerRecruitmentRegisterUrl(profession: string): string {
    const applyUrl = getPartnerRecruitmentApplyUrl(profession);
    return `${applyUrl}#register`;
}

export function getPartnerRecruitmentBuildShopUrl(): string {
    return BUILD_YOUR_SHOP_URL;
}

export function isRecruitmentPost(post: any): boolean {
    if (!post) return false;

    const categorySlug =
        post?.category?.slug ||
        post?.category_slug ||
        post?.category?.code ||
        "";

    if (categorySlug === "partner-recruitment") return true;

    const categories = post?.categories;
    if (Array.isArray(categories)) {
        return categories.some((cat: any) => {
            const slug = cat?.slug || cat?.code || "";
            return slug === "partner-recruitment";
        });
    }

    return false;
}

function stripHtml(html: string): string {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '\n');
}

function decodeHtmlEntities(str: string): string {
    if (!str) return '';
    return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ');
}

function extractField(content: string, fieldName: string): string {
    const regex = new RegExp(`${fieldName}\\s*:\\s*([^<\\n]+)`, 'i');
    const match = content.match(regex);
    if (match && match[1]) return match[1].trim();
    return '';
}

function parseJobSections(plainText: string) {
    const lines = plainText.split('\n').map((l) => l.trim()).filter(Boolean);
    const requirements: string[] = [];
    const benefits: string[] = [];

    let currentSection = '';
    for (const line of lines) {
        const upperLine = line.toUpperCase();
        if (upperLine.includes('REQUIREMENTS') || upperLine.includes('VEREISTEN') || upperLine.includes('PROFIEL')) {
            currentSection = 'requirements';
            continue;
        } else if (upperLine.includes('BENEFITS') || upperLine.includes('AANBOD') || upperLine.includes('VOORDELEN')) {
            currentSection = 'benefits';
            continue;
        } else if (
            upperLine.includes('JOB RESPONSIBILITIES') ||
            upperLine.includes('RESPONSIBILITIES') ||
            upperLine.includes('ABOUT US') ||
            upperLine.includes('WORKING HOURS') ||
            upperLine.includes('HOW TO APPLY') ||
            upperLine.includes('PROCESS') ||
            upperLine.includes('CONTACT') ||
            upperLine.includes('COMPANY PROFILE') ||
            upperLine.includes('JOB DETAILS') ||
            upperLine.includes('TAKEN') ||
            upperLine.includes('FUNCTIE')
        ) {
            currentSection = '';
            continue;
        }

        if (currentSection === 'requirements') {
            requirements.push(line);
        } else if (currentSection === 'benefits') {
            benefits.push(line);
        }
    }

    return { requirements, benefits };
}

export async function getJobDetail(slug: string, language: string = 'en'): Promise<JobDetail | null> {
    try {
        const lang = language.toLowerCase();
        let responseData = await apiFetch(`/posts/${slug}?language=${lang}`, {
            headers: { language: lang },
        });

        let data = responseData?.data || responseData;
        if (!data) {
            const customHeaders = { ...API_CONFIG.HEADERS };
            delete (customHeaders as any).language;

            const fallbackResponse = await fetch(`${API_BASE_URL}/posts/${slug}`, {
                method: 'GET',
                headers: customHeaders as any,
                next: { revalidate: 60 },
            });

            if (fallbackResponse.ok) {
                const fallbackData = await fallbackResponse.json();
                data = fallbackData?.data || fallbackData;
            }
        }

        if (!data) return null;

        const contentHtml = data.content || '';
        const plainText = stripHtml(contentHtml);
        const decodedText = decodeHtmlEntities(plainText);

        const location = extractField(decodedText, 'Work Location') || extractField(decodedText, 'Location') || extractField(decodedText, 'Locatie') || '';
        const type = extractField(decodedText, 'Employment Type') || extractField(decodedText, 'Type') || extractField(decodedText, 'Dienstverband') || '';

        const title = data.title || data.name || '';
        let department = 'Careers';
        const upperTitle = title.toUpperCase();
        if (upperTitle.includes('SALES') || upperTitle.includes('B2B') || upperTitle.includes('MARKETING') || upperTitle.includes('VERKOOP')) {
            department = 'Sales & Marketing';
        } else if (upperTitle.includes('PRODUCTION') || upperTitle.includes('OPERATIONS') || upperTitle.includes('PRODUCTIE')) {
            department = 'Operations';
        } else if (upperTitle.includes('QC') || upperTitle.includes('QA') || upperTitle.includes('QUALITY') || upperTitle.includes('KWALITEIT')) {
            department = 'Quality Assurance';
        } else if (upperTitle.includes('R&D') || upperTitle.includes('RESEARCH') || upperTitle.includes('ENGINEER') || upperTitle.includes('ONTWIKKELING')) {
            department = 'Research & Development';
        }

        let description = data.excerpt || '';
        if (!description) {
            const aboutUsMatch = decodedText.match(/ABOUT US\s*\n+([^]+?)(?=\n+[A-Z\s]{4,}|\n*$)/i);
            if (aboutUsMatch) description = aboutUsMatch[1].trim().split('\n')[0];
            if (!description) {
                const lines = decodedText.split('\n').map((l) => l.trim()).filter(Boolean);
                description = lines.find((l) => l.length > 30 && !l.includes('JOB') && !l.includes('COMPANY')) || '';
            }
        }

        const { requirements, benefits } = parseJobSections(decodedText);

        return {
            id: data.slug || String(data.id),
            title,
            department,
            location,
            type,
            description,
            requirements,
            benefits,
            content: contentHtml,
        };
    } catch (error) {
        console.error(`Error loading job detail for ${slug}:`, error);
        return null;
    }
}
