"use client";

import { useMemo, useState } from "react";

import ManagementTable from "@/components/shared/ManagementTable";

import SemesterTabs from "./SemesterTabs";
import AssignSubjectSheet from "./AssignSubjectSheet";
import { SubjectAssignmentColumns } from "./SubjectAssignmentColumns";
import AssignTeacherDialog from "./AssignTeacherDialog";

import { ISemester } from "@/types/semester";
import { ISubject } from "@/types/subject";
import { ISubjectAssignment } from "@/types/assignment";
import { ITeacher } from "@/types/teacher";
import { IClassRoutine, IRoom } from "@/types/routine";

type Props = {
    semesters: ISemester[];
    subjects: ISubject[];
    assignments: ISubjectAssignment[];
    teachers: ITeacher[];
    rooms: IRoom[];
    routines: IClassRoutine[];
};

export default function CurriculumManagement({
    semesters,
    subjects,
    assignments,
    teachers,
    rooms,
    routines,
}: Props) {
    const [selectedSemesterId, setSelectedSemesterId] =
        useState(semesters[0]?.id ?? "");

    const [open, setOpen] =
        useState(false);
    const [selectedAssignment, setSelectedAssignment] =
        useState<ISubjectAssignment | null>(null);

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
                columns={SubjectAssignmentColumns({
                    onViewDetails: setSelectedAssignment,
                })}
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

            <AssignTeacherDialog
                assignment={selectedAssignment}
                teachers={teachers}
                rooms={rooms}
                routines={routines}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        setSelectedAssignment(null);
                    }
                }}
            />
        </div>
    );
}
