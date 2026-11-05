import { serverFetch } from "@/lib/serverFetch";
import { IAcademicSession } from "@/types/academicSession";

export const getActiveAcademicSessions = async (): Promise<IAcademicSession[]> => {
    try {
        const response = await serverFetch.get("/academic-sessions/active");
        const result: { data?: IAcademicSession[] } = await response.json();

        return response.ok && result.data ? result.data : [];
    } catch {
        return [];
    }
};

