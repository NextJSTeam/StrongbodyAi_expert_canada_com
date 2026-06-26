"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import JobBoard from "@/components/recruitment/JobBoard";
import type { JobItem } from "@/utils/recruitment-loader";

interface RecruitmentListClientProps {
  jobs: JobItem[];
  currentPage: number;
  totalPages: number;
}

export default function RecruitmentListClient({
  jobs,
  currentPage,
  totalPages,
}: RecruitmentListClientProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        pages.push(i);
      } else if (i === currentPage - delta - 1 || i === currentPage + delta + 1) {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <>
      <JobBoard jobs={jobs} />

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <Link
            href="/recruitment?page=1"
            className={`p-2 rounded-lg border border-grey-200 text-grey-400 hover:bg-grey-50 transition-all ${currentPage === 1 ? "opacity-30 pointer-events-none" : ""}`}
          >
            <ChevronsLeft size={20} />
          </Link>
          <Link
            href={`/recruitment?page=${Math.max(1, currentPage - 1)}`}
            className={`p-2 rounded-lg border border-grey-200 text-grey-400 hover:bg-grey-50 transition-all ${currentPage === 1 ? "opacity-30 pointer-events-none" : ""}`}
          >
            <ChevronLeft size={20} />
          </Link>

          <div className="flex items-center gap-2 mx-2">
            {getPageNumbers().map((p, index) =>
              p === "..." ? (
                <span key={`dots-${index}`} className="text-grey-400 px-2">
                  ...
                </span>
              ) : (
                <Link
                  key={`page-${p}`}
                  href={`/recruitment?page=${p}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-all ${
                    currentPage === p
                      ? "bg-primary text-white shadow-lg"
                      : "text-grey-600 hover:bg-grey-50 border border-grey-200"
                  }`}
                >
                  {p}
                </Link>
              ),
            )}
          </div>

          <Link
            href={`/recruitment?page=${Math.min(totalPages, currentPage + 1)}`}
            className={`p-2 rounded-lg border border-grey-200 text-grey-400 hover:bg-grey-50 transition-all ${currentPage === totalPages ? "opacity-30 pointer-events-none" : ""}`}
          >
            <ChevronRight size={20} />
          </Link>
          <Link
            href={`/recruitment?page=${totalPages}`}
            className={`p-2 rounded-lg border border-grey-200 text-grey-400 hover:bg-grey-50 transition-all ${currentPage === totalPages ? "opacity-30 pointer-events-none" : ""}`}
          >
            <ChevronsRight size={20} />
          </Link>
        </div>
      )}
    </>
  );
}
