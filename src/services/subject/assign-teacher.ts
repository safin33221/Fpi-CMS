"use server";

import { unstable_rethrow } from "next/navigation";
import { serverFetch } from "@/lib/serverFetch";

export const assignTeacher = async (
    subjectId: string,
    teacherId: string
) => {
    try {
        const res =
            await serverFetch.patch(
                `/subjects/${subjectId}/assign-teacher`,
                {
                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        teacherId,
                    }),
                }
            );

        return await res.json();
    } catch (error) {
        unstable_rethrow(error);

        throw error;
    }
};