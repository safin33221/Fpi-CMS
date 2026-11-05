import { ISubjectAssignment } from "./assignment";
import { ITeacher } from "./teacher";

export type Weekday =
    | "SATURDAY"
    | "SUNDAY"
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY";

export interface IRoom {
    id: string;
    name: string;
    code: string;
    capacity: number | null;
    isActive: boolean;
}

export interface IClassRoutine {
    id: string;
    day: Weekday;
    startTime: string;
    endTime: string;
    room: IRoom;
    teacher: ITeacher;
    subjectAssignment: ISubjectAssignment;
}
