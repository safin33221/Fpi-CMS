"use server";

import { unstable_rethrow } from "next/navigation";
import { serverFetch } from "@/lib/serverFetch";

export const removeTeacher = async (
    subjectId: string
) => {
    try {
        const res =
            await serverFetch.delete(
                `/subjects/${subjectId}/remove-teacher`
            );

        return await res.json();
    } catch (error) {
        unstable_rethrow(error);

        throw error;
    }
};