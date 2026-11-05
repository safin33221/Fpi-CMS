import { serverFetch } from "@/lib/serverFetch";
import { IClassRoutine, Weekday } from "@/types/routine";

export type RoutineQueryFilter = {
    semesterId?: string;
    departmentId?: string;
    day?: Weekday;
};

export const getRoutines = async (
    filter?: RoutineQueryFilter
): Promise<IClassRoutine[]> => {
    const params = new URLSearchParams();
    if (filter?.semesterId) params.append("semesterId", filter.semesterId);
    if (filter?.departmentId) params.append("departmentId", filter.departmentId);
    if (filter?.day) params.append("day", filter.day);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    const response = await serverFetch.get(`/routines${queryString}`);
    const result: { data?: IClassRoutine[] } = await response.json();

    return response.ok && result.data ? result.data : [];
};
