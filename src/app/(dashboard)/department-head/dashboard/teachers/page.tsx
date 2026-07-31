import TeacherManagement from "@/components/module/departmentHead/teachers/TeacherManagement";
import TeacherManagementHeader from "@/components/module/departmentHead/teachers/TeacherManagementHeader";
import { getDepartmentTeachers } from "@/services/staff/get-department-teachers";
import { ITeacher } from "@/types/teacher";

export default async function SettingsPage() {
    const teachers: ITeacher[] = await getDepartmentTeachers()
    return (
        <div>
            <TeacherManagementHeader />
            <TeacherManagement teachers={teachers} />
        </div>
    );
}
