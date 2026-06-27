"use server";

import { serverFetch } from "@/lib/serverFetch";

export const getImportPreview = async (
    fileId: string
) => {
    const res = await serverFetch.get(
        `/student-import/preview/${fileId}`
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(
            data.message || "Failed to load import preview."
        );
    }

    return data.data;
};