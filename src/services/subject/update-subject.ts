/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { unstable_rethrow } from "next/navigation";
import { serverFetch } from "@/lib/serverFetch";

export const updateSubject = async (
    id: string,
    payload: any
) => {
    try {
        const res =
            await serverFetch.patch(
                `/subjects/${id}`,
                {
                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify(
                        payload
                    ),
                }
            );

        return await res.json();
    } catch (error) {
        unstable_rethrow(error);

        throw error;
    }
};