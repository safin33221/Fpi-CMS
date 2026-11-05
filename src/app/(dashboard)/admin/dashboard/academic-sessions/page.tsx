import AcademicSessionManagement from "@/components/module/admin/academicSession/AcademicSessionManagement";
import { getAllAcademicSessions } from "@/services/academicSession/getAllAcademicSessions";

export const dynamic = "force-dynamic";

export default async function AdminAcademicSessionsPage() {
    const sessions = await getAllAcademicSessions();

    return <AcademicSessionManagement sessions={sessions} />;
}

