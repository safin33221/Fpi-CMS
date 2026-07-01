/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";

import { serverFetch } from "@/lib/serverFetch";

export const deleteSubjectAssignment =
    async (id: string) => {
        try {
            const res =
                await serverFetch.delete(
                    `/subject-assignment/${id}`
                );

            const result =
                await res.json();

            if (!res.ok) {
                return {
                    success: false,
                    message:
                        result.message ??
                        "Delete failed",
                };
            }

            revalidatePath(
                "/department-head/curriculum"
            );

            return {
                success: true,
                message:
                    result.message,
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