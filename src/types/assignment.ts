import { IDepartment } from "./department";
import { ISemester } from "./semester";
import { ISubject } from "./subject";
import { ITeacher } from "./teacher";

export interface ITeachingAssignment {
    id: string;

    teacherId: string;
    teacher: ITeacher;

    createdAt: string;
    updatedAt: string;
}

export interface ISubjectAssignment {
    id: string;

    subjectId: string;
    subject: ISubject;

    departmentId: string;
    department: IDepartment;

    semesterId: string;
    semester: ISemester;

    isActive: boolean;

    teachingAssignments: ITeachingAssignment[];

    createdAt: string;
    updatedAt: string;
}