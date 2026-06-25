"use client"
import ManagementTable from "@/components/shared/ManagementTable";
import { IUser } from "@/types/user";
import { StaffColumns } from "./StaffTableColumn";

export default function StaffManagement({ staffs }: { staffs: IUser[] }) {
    return (
        <div>
            <ManagementTable
                data={staffs}
                columns={StaffColumns}
                getRowKey={(row) => row.id}
            // onView={(row) =>
            //     handleView(row)
            // }
            // onEdit={(row) =>
            //     setSelectedStudent(
            //         row
            //     )
            // }
            />
        </div>
    );
};
