import AdmissionVerificationCard from "@/components/module/register/admisson/AdmissionVerificationCard";
import StudentInformationCard from "@/components/module/register/admisson/StudentInformationCard";
import { getStudent } from "@/services/student/student";
import { IStudent } from "@/types/student";


interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    const student: IStudent = await getStudent(id);
    console.log(student);

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <StudentInformationCard student={student} />
            </div>

            <div>
                <AdmissionVerificationCard student={student} />
            </div>
        </div>
    );
}