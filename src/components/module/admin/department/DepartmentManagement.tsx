"use client"

import ManagementTable from "@/components/shared/ManagementTable";
import { IDepartment } from "@/types/department";
import { DepartmentColumns } from "./DepartmentColumns";

export default function DepartmentManagement({ departments }: { departments: IDepartment[] }) {
  return (
    <div>
      <ManagementTable
        data={departments}
        columns={DepartmentColumns}
        getRowKey={(row) => row.id}

      />
    </div>
  );
};
