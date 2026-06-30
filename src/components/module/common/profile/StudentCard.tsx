"use client";

import { IUser } from "@/types/user";
import {
  Building2,
  CalendarRange,
  GraduationCap,
  Hash,
  IdCard,
  Phone,
  School,
  UserRound,
} from "lucide-react";

interface Props {
  user: IUser;
}

export default function StudentCard({ user }: Props) {
  if (!user.student) return null;

  const student = user.student;

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <GraduationCap size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Student Information
            </h2>

            <p className="text-sm text-gray-500">
              Academic profile and institute records.
            </p>
          </div>
        </div>
      </div>

      {/* Top Summary */}
      <div className="grid gap-4 border-b border-gray-100 bg-gray-50 p-6 md:grid-cols-4">
        <SummaryCard
          title="Roll"
          value={student.roll}
          icon={<Hash size={18} />}
        />

        <SummaryCard
          title="Registration"
          value={student.registrationNo}
          icon={<IdCard size={18} />}
        />

        <SummaryCard
          title="Semester"
          value={student.semester?.name || "-"}
          icon={<School size={18} />}
        />

        <SummaryCard
          title="Session"
          value={student.session || "-"}
          icon={<CalendarRange size={18} />}
        />
      </div>

      {/* Details */}
      <div className="grid gap-8 p-6 lg:grid-cols-2">
        <Section title="Academic Details">
          <Row
            icon={<UserRound size={18} />}
            label="Student Name"
            value={student.name}
          />

          <Row
            icon={<Building2 size={18} />}
            label="Department"
            value={student.department?.name}
          />

          <Row
            icon={<School size={18} />}
            label="Semester"
            value={student.semester?.name}
          />

          <Row
            icon={<CalendarRange size={18} />}
            label="Session"
            value={student.session}
          />

          <Row
            icon={<GraduationCap size={18} />}
            label="Batch"
            value={student.batch}
          />
        </Section>

        <Section title="Additional Information">
          <Row
            icon={<Hash size={18} />}
            label="Roll Number"
            value={student.roll}
          />

          <Row
            icon={<IdCard size={18} />}
            label="Registration No"
            value={student.registrationNo}
          />

          <Row
            icon={<Phone size={18} />}
            label="Phone"
            value={student.phone}
          />

          <Row
            icon={<CalendarRange size={18} />}
            label="Date of Birth"
            value={
              student.dob
                ? new Date(student.dob).toLocaleDateString("en-BD", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "-"
            }
          />
        </Section>
      </div>
    </div>
  );
}

/* ---------------- Summary Card ---------------- */

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value?: string | number | null;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <p className="text-sm text-gray-500">{title}</p>

      <p className="mt-1 font-semibold text-gray-900">
        {value || "-"}
      </p>
    </div>
  );
}

/* ---------------- Section ---------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold text-gray-900">
        {title}
      </h3>

      <div className="space-y-4">{children}</div>
    </div>
  );
}

/* ---------------- Row ---------------- */

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-100 p-4 hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
          {icon}
        </div>

        <span className="text-gray-600">{label}</span>
      </div>

      <span className="font-semibold text-gray-900">
        {value || "-"}
      </span>
    </div>
  );
}