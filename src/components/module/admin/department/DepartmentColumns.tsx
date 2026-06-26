import {
    GraduationCap,
    Users,
    UserCheck
} from "lucide-react";

import { columns } from "@/components/shared/ManagementTable";

import { IDepartment } from "@/types/department";

export const DepartmentColumns: columns<IDepartment>[] = [
    {
        header: "Department",
        accessor: (department) => (
            <div className="flex items-center gap-3">
                <div
                    className="
                        flex h-10 w-10 items-center justify-center
                        rounded-xl
                        bg-linear-to-br
                        from-indigo-500
                        via-violet-500
                        to-purple-500
                        text-sm font-semibold
                        text-white
                        shadow-md
                    "
                >
                    {department.name.charAt(0)}
                </div>

                <div>
                    <p className="font-medium">
                        {department.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {department.code}
                    </p>
                </div>
            </div>
        ),
    },

    {
        header: "Head",
        accessor: (department) =>
            department?.head ? (
                <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                        <UserCheck size={13} />
                    </div>

                    <div>
                        <p className="font-medium">
                            {department?.head?.user?.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            Department Head
                        </p>
                    </div>
                </div>
            ) : (
                <span className="text-xs text-muted-foreground">
                    Not Assigned
                </span>
            ),
    },

    {
        header: "Teachers",
        accessor: (department) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-sky-500/10 p-1.5 text-sky-600">
                    <Users size={13} />
                </div>

                <span className="font-medium">
                    {department._count?.teachers ?? 0}
                </span>
            </div>
        ),
    },

    {
        header: "Students",
        accessor: (department) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600">
                    <GraduationCap size={13} />
                </div>

                <span className="font-medium">
                    {department.students?.length ?? 0}
                </span>
            </div>
        ),
    },

    // {
    //     header: "Subjects",
    //     accessor: (department) => (
    //         <div className="flex items-center gap-2">
    //             <div className="rounded-lg bg-orange-500/10 p-1.5 text-orange-600">
    //                 <BookOpen size={13} />
    //             </div>

    //             <span className="font-medium">
    //                 {department?.subjects?.length ?? 0}
    //             </span>
    //         </div>
    //     ),
    // },

];