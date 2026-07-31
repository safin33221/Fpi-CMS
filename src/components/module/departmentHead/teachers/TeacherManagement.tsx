"use client"
import ManagementTable from "@/components/shared/ManagementTable";
import { ITeacher } from "@/types/teacher";
import { TeacherTableColumns } from "./TeachersTableColumn";

export default function TeacherManagement({ teachers }: { teachers: ITeacher[] }) {
    console.log(teachers);
    return (
        <div>
            <ManagementTable
                data={teachers}
                columns={TeacherTableColumns}
                getRowKey={(row) => row.id}
            />
        </div>
    );
};
