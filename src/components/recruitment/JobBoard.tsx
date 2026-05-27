'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import JobApplicationModal from './JobApplicationModal';

interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
}

interface JobBoardProps {
    jobs: Job[];
}

export default function JobBoard({ jobs }: JobBoardProps) {
    const [selectedJob, setSelectedJob] = useState<{ id: string; title: string } | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 gap-4">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="group relative bg-white border border-grey-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between hover:border-primary transition-all hover:shadow-lg"
                    >
                        <div className="mb-4 md:mb-0">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {job.department && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/5 text-primary px-2 py-1 rounded">
                                        {job.department}
                                    </span>
                                )}
                                {job.type && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-grey-100 text-grey-600 px-2 py-1 rounded">
                                        {job.type}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-text-p mb-1">{job.title}</h3>
                            {job.location && (
                                <p className="text-text-s text-sm flex items-center gap-1">
                                    <svg className="w-4 h-4 text-grey-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {job.location}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href={`/recruitment/${job.id}`}
                                className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-bold text-primary border border-primary/20 hover:bg-primary/5 transition-all text-sm"
                            >
                                Details
                            </Link>
                            <button
                                onClick={() => setSelectedJob({ id: job.id, title: job.title })}
                                className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-bold text-white bg-primary hover:bg-primary-hover shadow-sm transition-all text-sm cursor-pointer"
                            >
                                Nu solliciteren
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <JobApplicationModal 
                isOpen={!!selectedJob}
                onClose={() => setSelectedJob(null)}
                jobTitle={selectedJob?.title || ''}
                jobId={selectedJob?.id || ''}
            />
        </>
    );
}
