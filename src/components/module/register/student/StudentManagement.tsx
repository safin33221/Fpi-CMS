"use client"
import ManagementTable from "@/components/shared/ManagementTable";
import { IStudent } from "@/types/student";
import { StudentColumns } from "./StudentTableColumn";

export default function StudentManagement({ students }: { students: IStudent[] }) {
    return (
        <div>
            <ManagementTable
                data={students}
                columns={StudentColumns}
                getRowKey={(row) => row.id}
            />
        </div>
    );
};
