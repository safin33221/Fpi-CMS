"use server";

import { unstable_rethrow } from "next/navigation";
import { revalidatePath } from "next/cache";
import { serverFetch } from "@/lib/serverFetch";

type AssignTeacherResult = {
    success: boolean;
    message: string;
};

export const assignTeacher = async (
    subjectId: string,
    teacherId: string,
    subjectAssignmentId: string
): Promise<AssignTeacherResult> => {
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
                        subjectAssignmentId,
                    }),
                }
            );

        const result: { message?: string } = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result.message ?? "Failed to assign teacher",
            };
        }

        revalidatePath("/department-head/dashboard/curriculum");

        return {
            success: true,
            message: result.message ?? "Teacher assigned successfully",
        };
    } catch (error) {
        unstable_rethrow(error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong",
        };
    }
};
