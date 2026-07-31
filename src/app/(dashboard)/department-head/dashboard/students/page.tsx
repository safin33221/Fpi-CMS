import { getAllStudent } from "@/services/student/student";
import { myProfile } from "@/services/user/my-profile";
import { IUser } from "@/types/user";
import { IStudent } from "@/types/student";
import StudentManagement from "@/components/module/student/StudentManagement";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";

export default async function StudentsPage() {
    const profile: IUser = await myProfile();

    const students: IStudent[] = await getAllStudent({
        departmentId: profile.teacher?.department?.id,
    });

    return (
        <>
            <ManagementPageHeader
                title="Student Management"
            />
            <StudentManagement students={students} />
        </>
    );
}
