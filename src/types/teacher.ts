import { IDepartment } from "./department";
import { IUser } from "./user";

export interface ITeacher {
  id: string;

  userId: string;
  user: IUser

  teacherId: string;

  designation: string;

  qualification?: string | null;

  joiningDate?: string | null;

  experienceYears?: number | null;

  departmentId: string;

  department?: IDepartment;
}