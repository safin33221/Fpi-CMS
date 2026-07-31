import { serverFetch } from "@/lib/serverFetch";

interface GetStudentsParams {
    searchTerm?: string;
    departmentId?: string;
    semesterId?: string;
    batchId?: string;
    status?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

export const getAllStudent = async (
    params?: GetStudentsParams
) => {
    const searchParams = new URLSearchParams();

    Object.entries(params ?? {}).forEach(([key, value]) => {
        if (
            value !== undefined &&
            value !== null &&
            value !== ""
        ) {
            searchParams.append(key, String(value));
        }
    });
console.log(searchParams);
    const res = await serverFetch.get(
        `/student?${searchParams.toString()}`,
        {
            cache: "no-store",
        }
    );

    const result = await res.json();

    if (!res.ok) {
        throw new Error(
            result?.message || "Failed to fetch students"
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
