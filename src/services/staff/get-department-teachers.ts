import { serverFetch } from "@/lib/serverFetch";

export const getDepartmentTeachers = async () => {
    const res = await serverFetch.get("/staff/department/teachers", {
        cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(
            result?.message ||
            "Failed to fetch Teachers"
        );
    }

    return result.data;
};
