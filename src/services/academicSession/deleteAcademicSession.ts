"use server";

import { revalidatePath } from "next/cache";
import { unstable_rethrow } from "next/navigation";
import { serverFetch } from "@/lib/serverFetch";

type ActionResult = { success: boolean; message: string };

export const deleteAcademicSession = async (
    id: string
): Promise<ActionResult> => {
    try {
        const response = await serverFetch.delete(`/academic-sessions/${id}`);
        const result: { message?: string } = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message ?? "Could not delete academic session",
            };
        }

        revalidatePath("/admin/dashboard/academic-sessions");
        revalidatePath("/department-head/dashboard/routine");
        return {
            success: true,
            message: result.message ?? "Academic session processed successfully",
        };
    } catch (error) {
        unstable_rethrow(error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Could not delete academic session",
        };
    }
};

