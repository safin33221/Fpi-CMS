"use server";

import { unstable_rethrow } from "next/navigation";
import { serverFetch } from "@/lib/serverFetch";

export const deleteSubject = async (
    id: string
) => {
    try {
        const res =
            await serverFetch.delete(
                `/subjects/${id}`
            );

        return await res.json();
    } catch (error) {
        unstable_rethrow(error);

        throw error;
    }
};