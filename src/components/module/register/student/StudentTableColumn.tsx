"use client"

import {
    BadgeCheck,
    Building2,
    CalendarDays,
    GraduationCap,
    Phone,
    User,
} from "lucide-react";

import { columns } from "@/components/shared/ManagementTable";

import { IStudent } from "@/types/student";

export const StudentColumns: columns<IStudent>[] = [
    {
        header: "Student",
        accessor: (student) => (
            <div className="flex items-center gap-3">
                <div
                    className="
                        flex h-10 w-10 items-center justify-center
                        rounded-xl
                        bg-linear-to-br
                        from-sky-500
                        via-blue-500
                        to-indigo-500
                        text-sm font-semibold
                        text-white
                        shadow-md
                    "
                >
                    {student.name.charAt(0)}
                </div>

                <div>
                    <p className="font-medium">
                        {student.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {student.user?.email ??
                            student.user?.loginId}
                    </p>
                </div>
            </div>
        ),
    },

    {
        header: "Academic",
        accessor: (student) => (
            <div className="space-y-1">
                <p className="font-medium">
                    Roll: {student.roll}
                </p>

                <p className="text-xs text-muted-foreground">
                    Reg: {student.registrationNo}
                </p>
            </div>
        ),
    },

    {
        header: "Department",
        accessor: (student) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-indigo-500/10 p-1.5 text-indigo-600">
                    <Building2 size={13} />
                </div>

                <div>
                    <p className="font-medium">
                        {student.department.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {student.department.code}
                    </p>
                </div>
            </div>
        ),
    },

    {
        header: "Semester",
        accessor: (student) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-violet-500/10 p-1.5 text-violet-600">
                    <GraduationCap size={13} />
                </div>

                <div>
                    <p className="font-medium">
                        {student.semester.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        Semester {student.semester.number}
                    </p>
                </div>
            </div>
        ),
    },

    {
        header: "Session",
        accessor: (student) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-orange-500/10 p-1.5 text-orange-600">
                    <CalendarDays size={13} />
                </div>

                <span className="font-medium">
                    {student.session}
                </span>
            </div>
        ),
    },

    {
        header: "Phone",
        accessor: (student) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600">
                    <Phone size={13} />
                </div>

                <span>{student.phone}</span>
            </div>
        ),
    },

    {
        header: "Gender",
        accessor: (student) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-sky-500/10 p-1.5 text-sky-600">
                    <User size={13} />
                </div>

                <span>{student.user?.gender}</span>
            </div>
        ),
    },

    {
        header: "Status",
        accessor: (student) =>
            student.user?.isActive ? (
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                    <BadgeCheck size={13} />
                    Active
                </div>
            ) : (
                <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    Inactive
                </div>
            ),
    },
];