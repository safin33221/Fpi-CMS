/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { serverFetch } from "@/lib/serverFetch";
import { unstable_rethrow } from "next/navigation";

type CreateStaffResponse = {
    success: boolean;
    message: string;
    data?: unknown;
};

export const createStaff = async (
    _prevState: unknown,
    formData: FormData
): Promise<CreateStaffResponse> => {
    const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),

        gender: formData.get("gender"),
        role: formData.get("role"),

        departmentId: formData.get("departmentId"),

        designation: formData.get("designation"),
        qualification: formData.get("qualification"),

        joiningDate: formData.get("joiningDate"),

        experienceYears: formData.get("experienceYears")
            ? Number(formData.get("experienceYears"))
            : undefined,
    };


    try {
        const res = await serverFetch.post(
            "/staff",
            {
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        const result =
            await res.json();

        if (!res.ok) {
            return {
                success: false,
                message:
                    result?.message ||
                    "Failed to create staff",
            };
        }

        return {
            success: true,
            message:
                result?.message ||
                "Staff created successfully",
            data: result?.data,
        };
    } catch (error: any) {
        unstable_rethrow(error);

        console.error(
            "Create staff error:",
            error
        );

        return {
            success: false,
            message:
                error?.message ||
                "Something went wrong",
        };
    }
};