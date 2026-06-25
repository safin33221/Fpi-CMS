import { IStudent } from "./student";
import { ITeacher } from "./teacher";

export interface IDepartment {
    id: string;
    name: string;
    code: string;

    headId?: string | null;

    createdAt: string;
    updatedAt: string;

    students?: IStudent[];
    teachers?: ITeacher[];

    _count?: {
        students: number;
        teachers: number;
    };
}