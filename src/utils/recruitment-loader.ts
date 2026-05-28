import { apiFetch, API_BASE_URL, API_CONFIG } from '@/config/api';

// Job Interfaces
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


// Helpers for dynamic recruitment job parsing
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
    if (match && match[1]) {
        return match[1].trim();
    }
    return '';
}

function parseJobSections(plainText: string) {
    const lines = plainText.split('\n').map(l => l.trim()).filter(Boolean);
    const requirements: string[] = [];
    const benefits: string[] = [];
    
    let currentSection = '';
    for (const line of lines) {
        const upperLine = line.toUpperCase();
        if (upperLine.includes('REQUIREMENTS') || upperLine === 'YÊU CẦU' || upperLine.includes('VEREISTEN') || upperLine.includes('PROFIEL')) {
            currentSection = 'requirements';
            continue;
        } else if (upperLine.includes('BENEFITS') || upperLine === 'QUYỀN LỢI' || upperLine.includes('CHẾ ĐỘ') || upperLine.includes('AANBOD') || upperLine.includes('VOORDELEN')) {
            currentSection = 'benefits';
            continue;
        } else if (
            upperLine.includes('JOB RESPONSIBILITIES') || 
            upperLine.includes('RESPONSIBILITIES') || 
            upperLine === 'NHIỆM VỤ' || 
            upperLine === 'MÔ TẢ CÔNG VIỆC' || 
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

export async function loadJobs(language: string = 'en'): Promise<JobItem[]> {
    try {
        const lang = language.toUpperCase();
        const responseData = await apiFetch(`/posts?category=partner-recruitment&limit=100`, {
            headers: {
                'language': lang,
            },
        });

        const items = Array.isArray(responseData?.data) 
            ? responseData.data 
            : (responseData?.data?.items || []);

        return items.map((item: any) => {
            const contentHtml = item.content || '';
            const plainText = stripHtml(contentHtml);
            const decodedText = decodeHtmlEntities(plainText);
            
            let location = extractField(decodedText, 'Work Location') || extractField(decodedText, 'Location') || extractField(decodedText, 'Locatie') || '';
            let type = extractField(decodedText, 'Employment Type') || extractField(decodedText, 'Type') || extractField(decodedText, 'Dienstverband') || '';

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
                if (aboutUsMatch) {
                    description = aboutUsMatch[1].trim().split('\n')[0];
                }
                if (!description) {
                    const lines = decodedText.split('\n').map(l => l.trim()).filter(Boolean);
                    description = lines.find(l => l.length > 30 && !l.includes('JOB') && !l.includes('COMPANY')) || '';
                }
            }

            return {
                id: item.slug || String(item.id),
                title: title,
                department: department,
                location: location,
                type: type,
                description: description,
            };
        });
    } catch (error) {
        console.error('Error loading jobs:', error);
        return [];
    }
}

export async function getJobDetail(slug: string, language: string = 'en'): Promise<JobDetail | null> {
    try {
        const lang = language.toLowerCase();
        let responseData = await apiFetch(`/posts/${slug}?language=${lang}`, {
            headers: {
                'language': lang,
            },
        });

        let data = responseData?.data || responseData;

        // Fallback: if not found in requested language, fetch default/English post
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

        let location = extractField(decodedText, 'Work Location') || extractField(decodedText, 'Location') || extractField(decodedText, 'Locatie') || '';
        let type = extractField(decodedText, 'Employment Type') || extractField(decodedText, 'Type') || extractField(decodedText, 'Dienstverband') || '';

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
            if (aboutUsMatch) {
                description = aboutUsMatch[1].trim().split('\n')[0];
            }
            if (!description) {
                const lines = decodedText.split('\n').map(l => l.trim()).filter(Boolean);
                description = lines.find(l => l.length > 30 && !l.includes('JOB') && !l.includes('COMPANY')) || '';
            }
        }

        const { requirements, benefits } = parseJobSections(decodedText);

        return {
            id: data.slug || String(data.id),
            title: title,
            department: department,
            location: location,
            type: type,
            description: description,
            requirements: requirements,
            benefits: benefits,
            content: contentHtml,
        };
    } catch (error) {
        console.error(`Error loading job detail for ${slug}:`, error);
        return null;
    }
}
