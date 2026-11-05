import { serverFetch } from "@/lib/serverFetch";
import { IRoom } from "@/types/routine";

export const getAllRooms = async (): Promise<IRoom[]> => {
    const response = await serverFetch.get("/rooms");
    const result: { data?: IRoom[] } = await response.json();

    return response.ok && result.data ? result.data : [];
};
