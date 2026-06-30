"use client";

import { IUser } from "@/types/user";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  GraduationCap,
  IdCard,
  School,
 Star,
} from "lucide-react";

interface Props {
  user: IUser;
}

export default function TeacherCard({ user }: Props) {
  if (!user.teacher) return null;

  const teacher = user.teacher;

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
            <BriefcaseBusiness size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Teacher Information
            </h2>

            <p className="text-sm text-gray-500">
              Professional details and department information.
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 border-b border-gray-100 bg-gray-50 p-6 md:grid-cols-4">
        <SummaryCard
          title="Teacher ID"
          value={teacher.teacherId}
          icon={<IdCard size={18} />}
        />

        <SummaryCard
          title="Designation"
          value={teacher.designation}
          icon={<BriefcaseBusiness size={18} />}
        />

        <SummaryCard
          title="Department"
          value={teacher.department?.name || "-"}
          icon={<Building2 size={18} />}
        />

        <SummaryCard
          title="Experience"
          value={`${teacher.experienceYears ?? 0} Years`}
          icon={<Star size={18} />}
        />
      </div>

      {/* Details */}
      <div className="grid gap-8 p-6 lg:grid-cols-2">
        <Section title="Professional Details">
          <Row
            icon={<IdCard size={18} />}
            label="Teacher ID"
            value={teacher.teacherId}
          />

          <Row
            icon={<BriefcaseBusiness size={18} />}
            label="Designation"
            value={teacher.designation}
          />

          <Row
            icon={<GraduationCap size={18} />}
            label="Qualification"
            value={teacher.qualification}
          />

          <Row
            icon={<Building2 size={18} />}
            label="Department"
            value={teacher.department?.name}
          />
        </Section>

        <Section title="Employment Details">
          <Row
            icon={<CalendarDays size={18} />}
            label="Joining Date"
            value={
              teacher.joiningDate
                ? new Date(teacher.joiningDate).toLocaleDateString("en-BD", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "-"
            }
          />

          <Row
            icon={<Star size={18} />}
            label="Experience"
            value={`${teacher.experienceYears ?? 0} Years`}
          />

          <Row
            icon={<School size={18} />}
            label="Department"
            value={teacher.department?.name}
          />
        </Section>
      </div>
    </div>
  );
}

/* ---------- Shared UI ---------- */

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
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
        {icon}
      </div>

      <p className="text-sm text-gray-500">{title}</p>

      <p className="mt-1 font-semibold text-gray-900">
        {value || "-"}
      </p>
    </div>
  );
}

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
    <div className="flex items-center justify-between rounded-2xl border border-gray-100 p-4 transition hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-violet-50 p-2 text-violet-600">
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