import { IDepartment } from "./department";
import { ISemester } from "./semester";

export interface IStudent {
  id: string;

  userId?: string | null;

  name: string;
  roll: string;
  registrationNo: string;

  session?: string | null;
  batch?: string | null;

  phone?: string | null;
  dob?: string | null;

  departmentId: string;
  semesterId: string;

  department?: IDepartment;
  semester?: ISemester;

  createdAt: string;
  updatedAt: string;
}