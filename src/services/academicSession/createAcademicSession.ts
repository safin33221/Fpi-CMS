"use server";

import { revalidatePath } from "next/cache";
import { unstable_rethrow } from "next/navigation";
import { serverFetch } from "@/lib/serverFetch";

type CreateAcademicSessionInput = {
    name: string;
    startDate: string;
    endDate: string;
    isCurrent?: boolean;
    isActive?: boolean;
};

type AcademicSessionActionResult = { success: boolean; message: string };

export const createAcademicSession = async (
    input: CreateAcademicSessionInput
): Promise<AcademicSessionActionResult> => {
    try {
        const response = await serverFetch.post("/academic-sessions", {
            body: JSON.stringify(input),
        });
        const result: { message?: string } = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message ?? "Could not create academic session",
            };
        }

        revalidatePath("/admin/dashboard/academic-sessions");
        revalidatePath("/department-head/dashboard/routine");
        return {
            success: true,
            message: result.message ?? "Academic session created successfully",
        };
    } catch (error) {
        unstable_rethrow(error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Could not create academic session",
        };
    }
};

