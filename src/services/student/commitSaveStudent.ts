"use server";

import { serverFetch } from "@/lib/serverFetch";

export const commitImport = async (
    fileId: string
) => {
    const res = await serverFetch.post(
        `/student-import/commit/${fileId}`
    );


    const data = await res.json();

    if (!res.ok) {
        throw new Error(
            data.message ||
                "Failed to import students."
        );
    }

    return data.data;
};