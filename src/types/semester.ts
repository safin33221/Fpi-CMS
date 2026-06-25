import { IStudent } from "./student";

export interface ISemester {
    id: string;
    name: string;
    number: number;

    createdAt: string;
    updatedAt: string;

    students?: IStudent[];


    _count?: {
        students: number;
    };
}