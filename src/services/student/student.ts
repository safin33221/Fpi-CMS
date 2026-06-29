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
