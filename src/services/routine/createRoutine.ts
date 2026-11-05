"use server";

import { revalidatePath } from "next/cache";
import { unstable_rethrow } from "next/navigation";
import { serverFetch } from "@/lib/serverFetch";
import { Weekday } from "@/types/routine";

type CreateRoutineInput = {
    subjectAssignmentId: string;
    teacherId: string;
    roomId: string;
    day: Weekday;
    startTime: string;
    endTime: string;
};

type RoutineActionResult = { success: boolean; message: string };

export const createRoutine = async (
    input: CreateRoutineInput
): Promise<RoutineActionResult> => {
    try {
        const response = await serverFetch.post("/routines", {
            body: JSON.stringify(input),
        });
        const result: { message?: string } = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message ?? "Could not save class routine",
            };
        }

        revalidatePath("/department-head/dashboard/curriculum");
        revalidatePath("/department-head/dashboard/routine");
        return {
            success: true,
            message: result.message ?? "Class routine saved successfully",
        };
    } catch (error) {
        unstable_rethrow(error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Could not save class routine",
        };
    }
};
