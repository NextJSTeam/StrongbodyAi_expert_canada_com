import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJobDetail, loadJobs } from '@/utils/recruitment-loader';
import ApplyButtonClient from '@/components/recruitment/ApplyButtonClient';
import { generateUnifiedMetadata } from '@/utils/seo';
import { API_CONFIG } from '@/config/api';
import type { Metadata } from 'next';

export async function generateStaticParams() {
    try {
        const locale = (API_CONFIG.HEADERS.language as string) || 'nl';
        const apiJobs = await loadJobs(locale);
        return apiJobs.map((job) => ({
            id: job.id,
        }));
    } catch (e) {
        console.error('Error loading static params for jobs:', e);
        return [];
    }
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const { id } = await params;
    return generateUnifiedMetadata(id);
}

export default async function JobDetailPage({ 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    const { id } = await params;
    const locale = (API_CONFIG.HEADERS.language as string) || 'nl';
    const job = await getJobDetail(id, locale);

    if (!job) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white font-sans pt-32 pb-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link 
                    href="/recruitment" 
                    className="inline-flex items-center text-primary font-bold mb-8 hover:underline text-sm gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Terug naar alle vacatures
                </Link>

                <div className="bg-grey-50 rounded-3xl p-8 md:p-12 border border-grey-200 shadow-sm">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {job.department && (
                            <span className="text-xs font-bold uppercase tracking-wider bg-primary/5 text-primary px-3 py-1.5 rounded-lg">
                                {job.department}
                            </span>
                        )}
                        {job.type && (
                            <span className="text-xs font-bold uppercase tracking-wider bg-grey-200 text-grey-700 px-3 py-1.5 rounded-lg">
                                {job.type}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-text-p mb-6 leading-tight">
                         {job.title}
                    </h1>

                    {job.location && (
                        <div className="flex items-center text-text-s mb-10 gap-6 text-sm">
                            <span className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-grey-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {job.location}
                            </span>
                        </div>
                    )}

                    <div 
                        className="prose prose-slate max-w-none text-text-m"
                        dangerouslySetInnerHTML={{ __html: job.content }}
                    />

                    <div className="mt-12 pt-10 border-t border-grey-200 flex flex-wrap gap-4">
                        <ApplyButtonClient jobId={job.id} jobTitle={job.title} />
                    </div>
                </div>
            </div>
        </main>
    );
}
