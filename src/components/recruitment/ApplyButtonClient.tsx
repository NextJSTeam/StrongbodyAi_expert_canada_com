'use client';

import React, { useState } from 'react';
import JobApplicationModal from './JobApplicationModal';

interface ApplyButtonClientProps {
    jobId: string;
    jobTitle: string;
}

export default function ApplyButtonClient({ jobId, jobTitle }: ApplyButtonClientProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center rounded-2xl px-10 py-5 text-lg font-bold text-white bg-primary hover:bg-primary-hover shadow-xl hover:shadow-primary/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
                Solliciteer voor deze functie
            </button>

            <JobApplicationModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                jobTitle={jobTitle}
                jobId={jobId}
            />
        </>
    );
}
