import SubjectManagement from "@/components/module/departmentHead/subject/SubjectManagement";
import SubjectManagementPageHeader from "@/components/module/departmentHead/subject/SubjectManagementPageHeader";
import { getAllSubjects } from "@/services/subject";

export default async function page() {
    const subjects = await getAllSubjects()
    return (
        <div>
            <SubjectManagementPageHeader />
            <SubjectManagement subjects={subjects} />
        </div>
    );
};
