import DepartmentManagement from "@/components/module/admin/department/DepartmentManagement";
import DepartmentManagementHeader from "@/components/module/admin/department/DepartmentManagementHeader";
import { getAllDepartment } from "@/services/department/getDepartment";
import { IDepartment } from "@/types/department";

export default async function Page() {
    const departments: IDepartment[] = await getAllDepartment();
    console.log(departments);
    return (
        <div className="space-y-4">
            <DepartmentManagementHeader />
            <DepartmentManagement
                departments={departments}
            />
        </div>
    );
}
