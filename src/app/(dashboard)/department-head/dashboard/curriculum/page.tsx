

import CurriculumManagement from "@/components/module/departmentHead/curriculum/CurriculumManagement";
import { getAllSemester } from "@/services/semester/getAllSemester";
import { getAllSubjects } from "@/services/subject";
import { getAllSubjectAssignments } from "@/services/subject-assignment/getAllSubjectAssignments";
import { getDepartmentTeachers } from "@/services/staff/get-department-teachers";
import { getAllRooms } from "@/services/room/getAllRooms";
import { getRoutines } from "@/services/routine/getRoutines";


export default async function Page() {
    const [semesters, subjects, assignments, teachers, rooms, routines] =
        await Promise.all([
            getAllSemester(),
            getAllSubjects(),
            getAllSubjectAssignments(),
            getDepartmentTeachers(),
            getAllRooms(),
            getRoutines(),
        ]);

    return (
        <div className="space-y-6">
            {/* <CurriculumPageHeader /> */}

            {/* <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">
                        Total Subjects
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                        {subjects.length}
                    </h3>
                </div>

                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">
                        Assigned Subjects
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                        {assignments.length}
                    </h3>
                </div>

                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">
                        Semesters
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                        {semesters.length}
                    </h3>
                </div>

                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">
                        Unassigned Subjects
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                        {subjects.length - assignments.length}
                    </h3>
                </div>
            </div> */}

            <CurriculumManagement
                semesters={semesters}
                subjects={subjects}
                assignments={assignments}
                teachers={teachers}
                rooms={rooms}
                routines={routines}
            />
        </div>
    );
}
