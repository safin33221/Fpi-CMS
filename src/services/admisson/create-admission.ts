"use server"
import { serverFetch } from "@/lib/serverFetch";


interface AdmissionPayload {
    feeVerified: boolean;
    documentVerified: boolean;
    remarks?: string;
}

export const createAdmission = async (
    studentId: string,
    payload: AdmissionPayload
) => {
    const res = await serverFetch.post(
        `/admissions/${studentId}/confirm`,
        {
            body: JSON.stringify(payload),
            cache: "no-store",
        }
    );

    const result = await res.json();

    if (!res.ok) {
        throw new Error(
            result?.message || "Failed to confirm admission"
        );
    }

    return result.data;
};