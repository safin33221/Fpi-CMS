"use server";

import { serverFetch } from "@/lib/serverFetch";

export const getAllSubjects = async () => {
    const res = await serverFetch.get("/subjects");

    const result = await res.json();

    return result.data;
};