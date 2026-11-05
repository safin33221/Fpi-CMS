"use server";

import { revalidatePath } from "next/cache";
import { unstable_rethrow } from "next/navigation";
import { serverFetch } from "@/lib/serverFetch";

type UpdateRoomInput = {
    buildingName?: string;
    roomCode?: string;
    capacity?: number;
    isActive?: boolean;
};

type RoomActionResult = { success: boolean; message: string };

export const updateRoom = async (
    id: string,
    input: UpdateRoomInput
): Promise<RoomActionResult> => {
    try {
        const response = await serverFetch.patch(`/rooms/${id}`, {
            body: JSON.stringify(input),
        });
        const result: { message?: string } = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message ?? "Could not update classroom",
            };
        }

        revalidatePath("/admin/dashboard/rooms");
        revalidatePath("/department-head/dashboard/routine");
        return {
            success: true,
            message: result.message ?? "Classroom updated successfully",
        };
    } catch (error) {
        unstable_rethrow(error);
        return {
            success: false,
            message:
                error instanceof Error ? error.message : "Could not update classroom",
        };
    }
};

export const deleteRoom = async (id: string): Promise<RoomActionResult> => {
    try {
        const response = await serverFetch.delete(`/rooms/${id}`);
        const result: { message?: string } = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message ?? "Could not delete classroom",
            };
        }

        revalidatePath("/admin/dashboard/rooms");
        revalidatePath("/department-head/dashboard/routine");
        return {
            success: true,
            message: result.message ?? "Classroom deleted successfully",
        };
    } catch (error) {
        unstable_rethrow(error);
        return {
            success: false,
            message:
                error instanceof Error ? error.message : "Could not delete classroom",
        };
    }
};

