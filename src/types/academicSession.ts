export interface IAcademicSession {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
    _count?: {
        routines?: number;
        sections?: number;
        teachingAssignments?: number;
    };
}

