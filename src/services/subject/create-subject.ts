/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { unstable_rethrow } from "next/navigation";
import { serverFetch } from "@/lib/serverFetch";

export type CreateSubjectResponse = {
    success: boolean;
    message: string;
};

export const createSubject = async (
    _prevState: unknown,
    formData: FormData
): Promise<CreateSubjectResponse> => {
    const payload = {
        name: formData.get("name"),
        code: formData.get("code"),

        credit: Number(formData.get("credit")),

        theoryMarks: Number(
            formData.get("theoryMarks")
        ),

        practicalMarks: Number(
            formData.get("practicalMarks")
        ),

        totalMarks: Number(
            formData.get("totalMarks")
        ),

        semesterId: formData.get("semesterId"),

        departmentId:
            formData.get("departmentId"),
    };

    try {
        const res = await serverFetch.post(
            "/subjects",
            {
                headers: {
                    "Content-Type":
                        "application/json",
                },

                body: JSON.stringify(payload),
            }
        );

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message:
                    result?.message ??
                    "Failed to create subject",
            };
        }

        return {
            success: true,
            message:
                result?.message ??
                "Subject created successfully",
        };
    } catch (error: any) {
        unstable_rethrow(error);

        return {
            success: false,
            message:
                error?.message ??
                "Something went wrong",
        };
    }
};