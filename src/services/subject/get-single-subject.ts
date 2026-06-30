"use server";

import { serverFetch } from "@/lib/serverFetch";

export const getSingleSubject = async (
    id: string
) => {
    const res =
        await serverFetch.get(
            `/subjects/${id}`
        );

    const result = await res.json();

    return result.data;
};