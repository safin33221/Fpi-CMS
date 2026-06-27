export interface IImportPreview {
    totalRows: number;
    validRows: number;
    invalidRows: number;

    students: {
        row: number;
        valid: boolean;
        errors: string[];

        data: {
            fullName: string;
            roll: string;
            registrationNo: string;
            phone?: string;

            departmentCode: string;

            semesterNumber: number;

            session?: string;
        };
    }[];
}