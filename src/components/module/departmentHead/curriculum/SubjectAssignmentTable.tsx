"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";


import { SubjectAssignmentColumns } from "./SubjectAssignmentColumns";

import { ISubjectAssignment } from "@/types/assignment";
import ManagementTable from "@/components/shared/ManagementTable";

type Props = {
    data: ISubjectAssignment[];

    loading?: boolean;

    onAssignSubject: () => void;
};

export default function SubjectAssignmentTable({
    data,
    onAssignSubject,
}: Props) {

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">
                        Assigned Subjects
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        Manage subjects assigned
                        to the selected semester.
                    </p>
                </div>

                <Button
                    onClick={onAssignSubject}
                >
                    <Plus className="mr-2 h-4 w-4" />

                    Assign Subject
                </Button>
            </div>

            <ManagementTable
                data={data}
                columns={SubjectAssignmentColumns}
                getRowKey={(row) => row.id}

            />
        </div>
    );
}