import TeacherManagement from "@/components/module/departmentHead/teachers/TeacherManagement";
import { getDepartmentTeachers } from "@/services/staff/get-department-teachers";
import { ITeacher } from "@/types/teacher";

export default async function SettingsPage() {
    const teachers: ITeacher[] = await getDepartmentTeachers()
    return (
        <div>
            <TeacherManagement teachers={teachers} />
        </div>
    );
}
