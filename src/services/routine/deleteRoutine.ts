"use server";

import { revalidatePath } from "next/cache";
import { unstable_rethrow } from "next/navigation";
import { serverFetch } from "@/lib/serverFetch";

type RoutineActionResult = { success: boolean; message: string };

export const deleteRoutine = async (
    routineId: string
): Promise<RoutineActionResult> => {
    try {
        const response = await serverFetch.delete(`/routines/${routineId}`);
        const result: { message?: string } = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message ?? "Could not delete routine entry",
            };
        }

        revalidatePath("/department-head/dashboard/routine");
        revalidatePath("/department-head/dashboard/curriculum");
        return {
            success: true,
            message: result.message ?? "Routine entry deleted successfully",
        };
    } catch (error) {
        unstable_rethrow(error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Could not delete routine entry",
        };
    }
};

