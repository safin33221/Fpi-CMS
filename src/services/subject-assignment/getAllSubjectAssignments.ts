import { serverFetch } from "@/lib/serverFetch";

export const getAllSubjectAssignments =
    async () => {
        try {
            const res =
                await serverFetch.get(
                    "/subject-assignment"
                );

            if (!res.ok) {
                return [];
            }

            const result =
                await res.json();

            return result.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };