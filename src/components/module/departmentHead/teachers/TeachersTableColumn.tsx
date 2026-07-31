"use client";

import {
    BadgeCheck,
    Building2,
    GraduationCap,
    UserRound,
} from "lucide-react";

import { columns } from "@/components/shared/ManagementTable";
import { ITeacher } from "@/types/teacher";

export const TeacherTableColumns: columns<ITeacher>[] = [
    {
        header: "Teacher",
        accessor: (teacher) => (
            <div className="flex items-center gap-3">
                <div
                    className="
                        flex h-10 w-10 items-center justify-center
                        rounded-xl
                        bg-linear-to-br
                        from-blue-500
                        via-indigo-500
                        to-violet-500
                        text-sm font-semibold
                        text-white
                        shadow-md
                    "
                >
                    {teacher?.user?.name.charAt(0).toUpperCase()}
                </div>

                <div>
                    <p className="font-medium">
                        {teacher?.user?.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {teacher?.user?.loginId}
                    </p>
                </div>
            </div>
        ),
    },

    {
        header: "Designation",
        accessor: (teacher) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600">
                    <BadgeCheck size={13} />
                </div>

                <span className="font-medium">
                    {teacher.designation}
                </span>
            </div>
        ),
    },

    {
        header: "Qualification",
        accessor: (teacher) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-amber-500/10 p-1.5 text-amber-600">
                    <GraduationCap size={13} />
                </div>

                <span className="font-medium">
                    {teacher.qualification ?? "-"}
                </span>
            </div>
        ),
    },

    {
        header: "Department",
        accessor: (teacher) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-indigo-500/10 p-1.5 text-indigo-600">
                    <Building2 size={13} />
                </div>

                <span className="font-medium">
                    {teacher.department?.name ?? "-"}
                </span>
            </div>
        ),
    },

    {
        header: "Teacher ID",
        accessor: (teacher) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-sky-500/10 p-1.5 text-sky-600">
                    <UserRound size={13} />
                </div>

                <span className="font-medium">
                    {teacher.teacherId}
                </span>
            </div>
        ),
    },
];