"use server";

import { revalidatePath } from "next/cache";
import { unstable_rethrow } from "next/navigation";
import { serverFetch } from "@/lib/serverFetch";

type CreateRoomInput = {
    buildingName: string;
    roomCode: string;
    capacity?: number;
};

type RoomActionResult = { success: boolean; message: string };

export const createRoom = async (
    input: CreateRoomInput
): Promise<RoomActionResult> => {
    try {
        const response = await serverFetch.post("/rooms", {
            body: JSON.stringify(input),
        });
        const result: { message?: string } = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message ?? "Could not create classroom",
            };
        }

        revalidatePath("/admin/dashboard/rooms");
        revalidatePath("/department-head/dashboard/routine");
        return {
            success: true,
            message: result.message ?? "Classroom created successfully",
        };
    } catch (error) {
        unstable_rethrow(error);
        return {
            success: false,
            message:
                error instanceof Error ? error.message : "Could not create classroom",
        };
    }
};

