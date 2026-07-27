import React from 'react';
import Link from 'next/link';
import { Cpu, Building2, Zap, Laptop, Wrench, Flame, ArrowRight } from 'lucide-react';

const DEPARTMENTS = [
  {
    name: 'Computer Technology',
    code: '85',
    seats: 100,
    icon: Laptop,
    href: '/departments/computer',
    description: 'Software development, networking, AI & hardware engineering.',
  },
  {
    name: 'Civil Technology',
    code: '64',
    seats: 100,
    icon: Building2,
    href: '/departments/civil',
    description: 'Structural engineering, surveying, and construction management.',
  },
  {
    name: 'Electrical Technology',
    code: '67',
    seats: 100,
    icon: Zap,
    href: '/departments/electrical',
    description: 'Power systems, electrical circuits, and industrial automation.',
  },
  {
    name: 'Mechanical Technology',
    code: '70',
    seats: 100,
    icon: Wrench,
    href: '/departments/mechanical',
    description: 'Machine design, manufacturing, thermodynamics, and CAD/CAM.',
  },
  {
    name: 'Power Technology',
    code: '71',
    seats: 50,
    icon: Flame,
    href: '/departments/power',
    description: 'Automobile engineering, IC engines, and power generation.',
  },
  {
    name: 'Electronics Technology',
    code: '68',
    seats: 50,
    icon: Cpu,
    href: '/departments/electronics',
    description: 'Embedded systems, microcontrollers, and telecommunication.',
  },
];

export function AcademicDepartments() {
  return (
    <section className="w-full bg-slate-50/60 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Academic Programs
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
            Offered Diploma Technologies
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            4-Year Diploma in Engineering curriculum affiliated with Bangladesh Technical Education Board (BTEB).
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.name}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-200"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      Code: {dept.code}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {dept.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>Capacity: <strong className="text-slate-800">{dept.seats} Seats/Shift</strong></span>
                  <Link href={dept.href} className="inline-flex items-center gap-1 text-blue-600 hover:underline font-semibold">
                    Details <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}