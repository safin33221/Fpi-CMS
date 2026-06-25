export interface ITeacher {
  id: string;

  userId: string;

  teacherId: string;

  designation: string;

  qualification?: string | null;

  joiningDate?: string | null;

  experienceYears?: number | null;

  departmentId: string;

//   department?: IDepartment;
}