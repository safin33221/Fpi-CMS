import StudentManagement from "@/components/module/student/StudentManagement";
import StudentManagementHeader from "@/components/module/student/StudentManagementHeader";
import { getAllStudent } from "@/services/student/student";

export default async function page() {
    const students = await getAllStudent()
    return (
        <div>
            <StudentManagementHeader />
            <StudentManagement students={students} />
        </div>
    );
};
