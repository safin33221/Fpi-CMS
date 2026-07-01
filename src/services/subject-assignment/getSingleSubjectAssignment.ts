import { serverFetch } from "@/lib/serverFetch";

export const getSingleSubjectAssignment =
    async (id: string) => {
        try {
            const res =
                await serverFetch.get(
                    `/subject-assignment/${id}`
                );

            if (!res.ok) {
                return null;
            }

            const result =
                await res.json();

            return result.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };