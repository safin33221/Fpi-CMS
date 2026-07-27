'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Download, ArrowRight } from 'lucide-react';

type Category = 'Academic' | 'Exam' | 'General';

type Notice = {
  day: string;
  month: string;
  year: string;
  title: string;
  category: Category;
  size: string;
  slug: string;
  downloadUrl: string;
};

const NOTICES: Notice[] = [
  {
    day: '24',
    month: 'Jul',
    year: '2026',
    title: '5th Semester Class Routine (Shift A & B) published for all technologies',
    category: 'Academic',
    size: 'PDF · 420 KB',
    slug: '5th-semester-class-routine-2026',
    downloadUrl: '/notices/routine-5th-sem.pdf',
  },
  {
    day: '21',
    month: 'Jul',
    year: '2026',
    title: 'BTEB Probidhan-2022 final examination seat plan and centre allocation',
    category: 'Exam',
    size: 'PDF · 1.1 MB',
    slug: 'bteb-probidhan-2022-seat-plan',
    downloadUrl: '/notices/seat-plan-2026.pdf',
  },
  {
    day: '18',
    month: 'Jul',
    year: '2026',
    title: 'Notice regarding ERP portal login credentials for newly admitted students',
    category: 'General',
    size: 'PDF · 260 KB',
    slug: 'erp-portal-login-credentials',
    downloadUrl: '/notices/erp-credentials.pdf',
  },
  {
    day: '12',
    month: 'Jul',
    year: '2026',
    title: 'Form fill-up schedule for 2nd, 4th and 6th semester board examination',
    category: 'Exam',
    size: 'PDF · 512 KB',
    slug: 'form-fillup-schedule-2026',
    downloadUrl: '/notices/form-fillup.pdf',
  },
  {
    day: '05',
    month: 'Jul',
    year: '2026',
    title: 'Industrial attachment placement list — Computer & Electronics Technology',
    category: 'Academic',
    size: 'PDF · 780 KB',
    slug: 'industrial-attachment-placement-list',
    downloadUrl: '/notices/industrial-attachment.pdf',
  },
  {
    day: '01',
    month: 'Jul',
    year: '2026',
    title: 'Campus cleanliness week and tree plantation programme announcement',
    category: 'General',
    size: 'PDF · 190 KB',
    slug: 'campus-cleanliness-week-2026',
    downloadUrl: '/notices/tree-plantation.pdf',
  },
];

const CATEGORY_STYLES: Record<Category, string> = {
  Academic: 'bg-blue-50 text-blue-700 border-blue-200',
  Exam: 'bg-indigo-600 text-white border-indigo-600',
  General: 'bg-slate-100 text-slate-700 border-slate-200',
};

const FILTERS: Array<'All' | Category> = ['All', 'Academic', 'Exam', 'General'];

export function NoticeBoard() {
  const [filter, setFilter] = useState<'All' | Category>('All');
  const visible = filter === 'All' ? NOTICES : NOTICES.filter((n) => n.category === filter);

  return (
    <section id="notices" aria-labelledby="notices-heading" className="w-full bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Notice Board
            </p>
            <h2 id="notices-heading" className="mt-3 font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
              Latest notices &amp; circulars
            </h2>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter notices by category">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  filter === item
                    ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Notices List */}
        <ul className="mt-8 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          {visible.map((notice) => (
            <li
              key={notice.title}
              className="flex flex-col gap-4 p-4 transition-colors hover:bg-slate-50/80 sm:flex-row sm:items-center sm:gap-6 sm:p-5"
            >
              {/* Date Box */}
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl border border-blue-100 bg-blue-50/60 text-center leading-none">
                <span className="text-xl font-black text-blue-700">{notice.day}</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  {notice.month} {notice.year}
                </span>
              </div>

              {/* Notice Details */}
              <div className="min-w-0 flex-1">
                <span
                  className={`inline-flex rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    CATEGORY_STYLES[notice.category]
                  }`}
                >
                  {notice.category}
                </span>
                
                <h3 className="mt-2 text-[15px] font-semibold leading-snug text-slate-900">
                  <Link href={`/notice/${notice.slug}`} className="transition-colors hover:text-blue-600 hover:underline">
                    {notice.title}
                  </Link>
                </h3>
                
                <p className="mt-1 text-xs text-slate-500">{notice.size}</p>
              </div>

              {/* Download Action */}
              <a
                href={notice.downloadUrl}
                download
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-blue-600/30 bg-blue-50/30 px-4 py-2.5 text-xs font-semibold text-blue-700 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-95"
                aria-label={`Download PDF: ${notice.title}`}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download PDF
              </a>
            </li>
          ))}
        </ul>

        {/* Bottom CTA */}
        <div className="mt-8">
          <Link
            href="/notice"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            View all notices
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  );
}