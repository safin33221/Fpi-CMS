import StudentRoutineView from "@/components/module/student/StudentRoutineView";
import { getRoutines } from "@/services/routine/getRoutines";
import { myProfile } from "@/services/user/my-profile";

export const dynamic = "force-dynamic";

export default async function StudentRoutinePage() {
    const [routines, userProfile] = await Promise.all([
        getRoutines(),
        myProfile(),
    ]);

    const studentName = userProfile?.name ?? "Student";
    const roll = userProfile?.student?.roll ?? "";
    const registrationNo = userProfile?.student?.registrationNo ?? "";
    const departmentName =
        userProfile?.student?.department?.name ?? "Academic Department";
    const semesterName =
        userProfile?.student?.semester?.name ?? "Current Semester";

    return (
        <StudentRoutineView
            routines={routines}
            studentName={studentName}
            roll={roll}
            registrationNo={registrationNo}
            departmentName={departmentName}
            semesterName={semesterName}
        />
    );
}
