import {
    BookOpen,
    Building2,
    GraduationCap,
    UserRound,
} from "lucide-react";

import { columns } from "@/components/shared/ManagementTable";

import { Badge } from "@/components/ui/badge";

import { ISubjectAssignment } from "@/types/assignment";

export const SubjectAssignmentColumns: columns<ISubjectAssignment>[] = [
    {
        header: "Subject",
        accessor: (assignment) => (
            <div className="flex items-center gap-3">
                <div
                    className="
                        flex h-10 w-10 items-center justify-center
                        rounded-xl
                        bg-linear-to-br
                        from-indigo-500
                        via-violet-500
                        to-purple-500
                        text-white
                        shadow-md
                    "
                >
                    <BookOpen size={18} />
                </div>

                <div>
                    <p className="font-medium">
                        {assignment.subject.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {assignment.subject.code}
                    </p>
                </div>
            </div>
        ),
    },

    {
        header: "Owner",
        accessor: (assignment) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-sky-500/10 p-2 text-sky-600">
                    <Building2 size={14} />
                </div>

                <div>
                    <p className="font-medium">
                        {assignment?.department.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        Owner Department
                    </p>
                </div>
            </div>
        ),
    },

    {
        header: "Credit",
        accessor: (assignment) => (
            <Badge variant="secondary">
                {assignment.subject.credit}
            </Badge>
        ),
    },

    {
        header: "Teacher",
        accessor: (assignment) => {
            const teacher =
                assignment.teachingAssignments?.[0];

            if (!teacher) {
                return (
                    <span className="text-xs text-muted-foreground">
                        Not Assigned
                    </span>
                );
            }

            return (
                <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
                        <UserRound size={14} />
                    </div>

                    <div>
                        <p className="font-medium">
                            {teacher.teacher.user.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            Teacher
                        </p>
                    </div>
                </div>
            );
        },
    },

    {
        header: "Semester",
        accessor: (assignment) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-orange-500/10 p-2 text-orange-600">
                    <GraduationCap size={14} />
                </div>

                <span className="font-medium">
                    {assignment.semester.name}
                </span>
            </div>
        ),
    },

    {
        header: "Status",
        accessor: (assignment) => (
            <Badge
                variant={
                    assignment.isActive
                        ? "default"
                        : "secondary"
                }
            >
                {assignment.isActive
                    ? "Active"
                    : "Inactive"}
            </Badge>
        ),
    },

    {
        header: "Actions",
        accessor: () => (
            <div className="flex items-center gap-2">
                {/* DropdownMenu / RowActions */}
            </div>
        ),
    },
];