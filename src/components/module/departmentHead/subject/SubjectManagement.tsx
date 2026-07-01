"use client"
import ManagementTable from "@/components/shared/ManagementTable";
import { ISubject } from "@/types/subject";
import { SubjectColumns } from "./SubjectTableColumn";

export default function SubjectManagement({ subjects }: { subjects: ISubject[] }) {

    return (
        <div>
            <ManagementTable
                data={subjects}
                columns={SubjectColumns}
                getRowKey={(row) => row.id}
            />
        </div>
    );
};
