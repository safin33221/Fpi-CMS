"use client"
import {
    BookOpen, Hash
} from "lucide-react";

import { columns } from "@/components/shared/ManagementTable";
import { ISubject } from "@/types/subject";

export const SubjectColumns: columns<ISubject>[] = [
    {
        header: "Subject",
        accessor: (subject) => (
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
                    <BookOpen size={18} />
                </div>

                <div>
                    <p className="font-medium">
                        {subject.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {subject.code}
                    </p>
                </div>
            </div>
        ),
    },


    {
        header: "Credit",
        accessor: (subject) => (
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-amber-500/10 p-1.5 text-amber-600">
                    <Hash size={13} />
                </div>

                <span className="font-medium">
                    {subject.credit ?? "-"}
                </span>
            </div>
        ),
    },


    {
        header: "Marks",
        accessor: (subject) => (
            <div className="space-y-1 text-sm">
                <p>
                    <span className="text-muted-foreground">
                        Theory:
                    </span>{" "}
                    {subject.theoryMarks ?? "-"}
                </p>

                <p>
                    <span className="text-muted-foreground">
                        Practical:
                    </span>{" "}
                    {subject.practicalMarks ?? "-"}
                </p>

                <p className="font-medium">
                    Total: {subject.totalMarks ?? "-"}
                </p>
            </div>
        ),
    },
];