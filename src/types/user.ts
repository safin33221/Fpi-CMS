import { Gender, UserRole } from "./enum";
import { IStudent } from "./student";
import { ITeacher } from "./teacher";

export interface IUser {
    id: string;
    name: string;
    email: string;

    role: UserRole;

    isVerified: boolean;
    isActive: boolean;

    profileImage?: string | null;

    gender?: Gender | null;
    dateOfBirth?: string | null;

    phone?: string | null;
    address?: string | null;
    city?: string | null;
    district?: string | null;

    lastLogin?: string | null;

    student?: IStudent | null;
    teacher?: ITeacher | null;

    createdAt: string;
    updatedAt: string;
}