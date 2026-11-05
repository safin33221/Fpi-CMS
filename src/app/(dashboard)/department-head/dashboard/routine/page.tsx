import RoutineManagement from "@/components/module/departmentHead/routine/RoutineManagement";
import { getAllSemester } from "@/services/semester/getAllSemester";
import { getAllSubjectAssignments } from "@/services/subject-assignment/getAllSubjectAssignments";
import { getDepartmentTeachers } from "@/services/staff/get-department-teachers";
import { getAllRooms } from "@/services/room/getAllRooms";
import { getRoutines } from "@/services/routine/getRoutines";
import { getActiveAcademicSessions } from "@/services/academicSession/getActiveAcademicSessions";
import { myProfile } from "@/services/user/my-profile";

export const dynamic = "force-dynamic";

export default async function RoutinePage() {
    const [semesters, assignments, teachers, rooms, routines, userProfile, sessions] =
        await Promise.all([
            getAllSemester(),
            getAllSubjectAssignments(),
            getDepartmentTeachers(),
            getAllRooms(),
            getRoutines(),
            myProfile(),
            getActiveAcademicSessions(),
        ]);

    const departmentName =
        userProfile?.teacher?.department?.name ?? "Department";

    return (
        <RoutineManagement
            semesters={semesters}
            assignments={assignments}
            teachers={teachers}
            rooms={rooms}
            routines={routines}
            departmentName={departmentName}
            sessions={sessions}
        />
    );
}
