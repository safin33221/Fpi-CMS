"use client";

import {
  GraduationCap,
  Building2,
  BookOpen,
  BriefcaseBusiness,
  UserSquare2,
  CalendarClock,
} from "lucide-react";

import { IUser } from "@/types/user";
import StatCard from "./StatCard";

interface Props {
  user: IUser;
}

export default function QuickStats({ user }: Props) {
  if (user.student) {
    return (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Department"
          value={user.student.department?.name || "-"}
          icon={<Building2 size={28} />}
          color="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Semester"
          value={user.student.semester?.name || "-"}
          icon={<BookOpen size={28} />}
          color="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          title="Roll"
          value={user.student.roll}
          icon={<GraduationCap size={28} />}
          color="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Session"
          value={user.student.session || "-"}
          icon={<CalendarClock size={28} />}
          color="bg-orange-50 text-orange-600"
        />
      </div>
    );
  }

  if (user.teacher) {
    return (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Department"
          value={user.teacher.department?.name || "-"}
          icon={<Building2 size={28} />}
          color="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Designation"
          value={user.teacher.designation}
          icon={<BriefcaseBusiness size={28} />}
          color="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          title="Teacher ID"
          value={user.teacher.teacherId}
          icon={<UserSquare2 size={28} />}
          color="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Experience"
          value={`${user.teacher.experienceYears ?? 0} Years`}
          icon={<CalendarClock size={28} />}
          color="bg-orange-50 text-orange-600"
        />
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-3">
      <StatCard
        title="Role"
        value={user.role}
        icon={<UserSquare2 size={28} />}
        color="bg-blue-50 text-blue-600"
      />

      <StatCard
        title="Status"
        value={user.isActive ? "Active" : "Inactive"}
        icon={<BriefcaseBusiness size={28} />}
        color="bg-emerald-50 text-emerald-600"
      />

      <StatCard
        title="Verified"
        value={user.isVerified ? "Yes" : "No"}
        icon={<GraduationCap size={28} />}
        color="bg-indigo-50 text-indigo-600"
      />
    </div>
  );
}