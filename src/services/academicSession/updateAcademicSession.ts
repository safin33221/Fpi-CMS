"use server";

import { revalidatePath } from "next/cache";
import { unstable_rethrow } from "next/navigation";
import { serverFetch } from "@/lib/serverFetch";

type UpdateAcademicSessionInput = {
    name?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    isActive?: boolean;
};

type ActionResult = { success: boolean; message: string };

export const updateAcademicSession = async (
    id: string,
    input: UpdateAcademicSessionInput
): Promise<ActionResult> => {
    try {
        const response = await serverFetch.patch(`/academic-sessions/${id}`, {
            body: JSON.stringify(input),
        });
        const result: { message?: string } = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message ?? "Could not update academic session",
            };
        }

        revalidatePath("/admin/dashboard/academic-sessions");
        revalidatePath("/department-head/dashboard/routine");
        return {
            success: true,
            message: result.message ?? "Academic session updated successfully",
        };
    } catch (error) {
        unstable_rethrow(error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Could not update academic session",
        };
    }
};

