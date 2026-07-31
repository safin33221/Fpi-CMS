import { serverFetch } from "@/lib/serverFetch";

export const getAllStudent = async () => {
    const res = await serverFetch.get("/student", {
        cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(
            result?.message ||
            "Failed to fetch Student"
        );
    }


    return result.data;
};

export const getStudent = async (id: string) => {
    const res = await serverFetch.get(`/student/${id}`, {
        cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(
            result?.message || "Failed to fetch student"
        );
    }

    return result.data;
};
