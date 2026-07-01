"use client";

import { useMemo, useState } from "react";

import ManagementTable from "@/components/shared/ManagementTable";

import SemesterTabs from "./SemesterTabs";
import AssignSubjectSheet from "./AssignSubjectSheet";
import { SubjectAssignmentColumns } from "./SubjectAssignmentColumns";

import { ISemester } from "@/types/semester";
import { ISubject } from "@/types/subject";
import { ISubjectAssignment } from "@/types/assignment";

type Props = {
    semesters: ISemester[];
    subjects: ISubject[];
    assignments: ISubjectAssignment[];
};

export default function CurriculumManagement({
    semesters,
    subjects,
    assignments,
}: Props) {
    const [selectedSemesterId, setSelectedSemesterId] =
        useState(semesters[0]?.id ?? "");

    const [open, setOpen] =
        useState(false);
    console.log(assignments);

    const selectedSemester = useMemo(
        () =>
            semesters.find(
                (semester) =>
                    semester.id ===
                    selectedSemesterId
            ),
        [selectedSemesterId, semesters]
    );

    const filteredAssignments =
        useMemo(() => {
            if (!selectedSemesterId)
                return [];

            return assignments.filter(
                (assignment) =>
                    assignment.semesterId ===
                    selectedSemesterId
            );
        }, [
            assignments,
            selectedSemesterId,
        ]);

    return (
        <div className="space-y-6">
            <SemesterTabs
                semesters={semesters}
                selectedSemesterId={
                    selectedSemesterId
                }
                onChange={
                    setSelectedSemesterId
                }
                onAssignSubject={() =>
                    setOpen(true)
                }
            />

            <ManagementTable
                data={filteredAssignments}
                columns={
                    SubjectAssignmentColumns
                }
                getRowKey={(row) =>
                    row.id
                }

            />

            {selectedSemester && (
                <AssignSubjectSheet
                    open={open}
                    onOpenChange={setOpen}
                    semesterId={
                        selectedSemester.id
                    }
                    semesterName={
                        selectedSemester.name
                    }
                    subjects={subjects}
                />
            )}
        </div>
    );
}