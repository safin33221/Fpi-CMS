import { serverFetch } from "@/lib/serverFetch";

export const getAllStaff = async () => {
    const res = await serverFetch.get("/staff", {
        cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(
            result?.message ||
            "Failed to fetch staff"
        );
    }

    return result.data;
};



export const getSingleStaff = async (
    staffId: string
) => {
    const res = await serverFetch.get(
        `/staff/${staffId}`,
        {
            cache: "no-store",
        }
    );

    const result = await res.json();

    if (!res.ok) {
        throw new Error(
            result?.message ||
            "Failed to fetch staff"
        );
    }

    return result;
};