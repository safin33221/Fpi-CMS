import { serverFetch } from "@/lib/serverFetch";
import { IClassRoutine } from "@/types/routine";

export const getRoutines = async (): Promise<IClassRoutine[]> => {
    const response = await serverFetch.get("/routines");
    const result: { data?: IClassRoutine[] } = await response.json();

    return response.ok && result.data ? result.data : [];
};
