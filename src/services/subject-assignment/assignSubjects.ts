/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";

import { serverFetch } from "@/lib/serverFetch";

export const assignSubjects = async (
    _prevState: unknown,
    formData: FormData
) => {
    try {
        console.log({
            semesterId: formData.get("semesterId"),
            subjectId: formData.get("subjectId"),
        });
        const payload = {
            semesterId:
                formData.get("semesterId"),

            subjects: JSON.parse(
                formData.get(
                    "subjects"
                ) as string
            ),
        };


        const res =
            await serverFetch.post(
                "/subject-assignment",
                {
                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify(
                        payload
                    ),
                }
            );

        const result =
            await res.json();

        if (!res.ok) {
            return {
                success: false,
                message:
                    result.message ??
                    "Failed to assign subjects",
            };
        }

        revalidatePath(
            "/department-head/curriculum"
        );

        console.log(result);
        return {
            success: true,
            message:
                result.message ??
                "Subjects assigned successfully",
        };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.message ??
                "Something went wrong",
        };
    }
};