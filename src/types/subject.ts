import { IDepartment } from "./department";
import { ISemester } from "./semester";
import { ITeacher } from "./teacher";


export interface ITeachingAssignment {
    id: string;

    teacherId: string;
    subjectId: string;

    isActive: boolean;
    assignedAt: string;

    teacher: ITeacher;
}

export interface ISubject {
    id: string;

    code: string;
    name: string;

    credit: number;

    theoryMarks: number | 0
    practicalMarks: number | 0
    totalMarks: number | 0

    isActive: boolean;

    semesterId: string;
    semester: ISemester;

    departmentId: string;
    department: IDepartment;

    teachingAssignments: ITeachingAssignment[];

    createdAt: string;
    updatedAt: string;
}