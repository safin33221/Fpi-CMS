import TeacherRoutineView from "@/components/module/teacher/TeacherRoutineView";
import { getRoutines } from "@/services/routine/getRoutines";
import { myProfile } from "@/services/user/my-profile";

export const dynamic = "force-dynamic";

export default async function TeacherRoutinePage() {
    const [routines, userProfile] = await Promise.all([
        getRoutines(),
        myProfile(),
    ]);

    const teacherName = userProfile?.name ?? "Teacher";
    const designation = userProfile?.teacher?.designation ?? "Faculty Member";
    const departmentName =
        userProfile?.teacher?.department?.name ?? "Academic Department";

    return (
        <TeacherRoutineView
            routines={routines}
            teacherName={teacherName}
            designation={designation}
            departmentName={departmentName}
        />
    );
}

