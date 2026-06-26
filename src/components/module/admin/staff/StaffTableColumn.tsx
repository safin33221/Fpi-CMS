import {
    Briefcase,
    Building2,
    Mail,
    Phone,
    ShieldCheck,
    CalendarDays,
} from "lucide-react";

import { columns } from "@/components/shared/ManagementTable";
import { DateCell } from "@/components/shared/cell/DateCell";
import { IUser } from "@/types/user";



const STATUS_COLORS = {
    true: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
    false: "bg-red-500/10 text-red-600 border border-red-500/20",
};

export const StaffColumns: columns<IUser>[] = [
    {
        header: "Staff",
        accessor: (staff) => (
            <div className="flex items-center gap-3">
                <div
                    className="
                        flex h-10 w-10 items-center justify-center
                        rounded-xl
                        bg-linear-to-br
                        from-blue-500
                        via-indigo-500
                        to-violet-500
                        text-sm font-semibold text-white
                        shadow-md
                    "
                >
                    {staff.name?.charAt(0)}
                </div>

                <div className="min-w-0">
                    <p className="truncate font-medium">
                        {staff.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {staff.loginId || "N/A"}
                    </p>
                </div>
            </div>
        ),
    },

    {
        header: "Contact",
        accessor: (staff) => (
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                    <Mail size={13} />
                    <span>{staff.email}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone size={12} />
                    <span>
                        {staff.phone || "N/A"}
                    </span>
                </div>
            </div>
        ),
    },

    {
        header: "Role",
        accessor: (staff) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                    <ShieldCheck size={13} />
                </div>

                <span className="font-medium">
                    {staff.role
                        .split("_")
                        .map(
                            (word) =>
                                word.charAt(0) +
                                word
                                    .slice(1)
                                    .toLowerCase()
                        )
                        .join(" ")}
                </span>
            </div>
        ),
    },

    {
        header: "Designation",
        accessor: (staff) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-violet-500/10 p-1.5 text-violet-600">
                    <Briefcase size={13} />
                </div>

                <span>
                    {staff.teacher
                        ?.designation || "N/A"}
                </span>
            </div>
        ),
    },

    {
        header: "Department",
        accessor: (staff) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-sky-500/10 p-1.5 text-sky-600">
                    <Building2 size={13} />
                </div>

                <span>
                    {staff.teacher?.department
                        ?.name || "N/A"}
                </span>
            </div>
        ),
    },

    {
        header: "Experience",
        accessor: (staff) => (
            <span className="font-medium">
                {staff.teacher
                    ?.experienceYears
                    ? `${staff.teacher.experienceYears} Years`
                    : "N/A"}
            </span>
        ),
    },

    {
        header: "Status",
        accessor: (staff) => (
            <span
                className={`
                    inline-flex items-center gap-2
                    rounded-full px-3 py-1
                    text-xs font-semibold
                    ${STATUS_COLORS[
                    String(
                        staff.isActive
                    ) as keyof typeof STATUS_COLORS
                    ]
                    }
                `}
            >
                <span className="h-2 w-2 rounded-full bg-current" />

                {staff.isActive
                    ? "Active"
                    : "Inactive"}
            </span>
        ),
    },

    {
        header: "Joined",
        accessor: (staff) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-slate-500/10 p-1.5 text-slate-600">
                    <CalendarDays size={13} />
                </div>

                <span className="text-sm">
                    <DateCell
                        date={
                            staff.teacher
                                ?.joiningDate ||
                            staff.createdAt
                        }
                    />
                </span>
            </div>
        ),
    },
];