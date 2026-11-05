import { serverFetch } from "@/lib/serverFetch";
import { IAcademicSession } from "@/types/academicSession";

export const getCurrentAcademicSession = async (): Promise<IAcademicSession | null> => {
    try {
        const response = await serverFetch.get("/academic-sessions/current");
        const result: { data?: IAcademicSession } = await response.json();

        return response.ok && result.data ? result.data : null;
    } catch {
        return null;
    }
};

