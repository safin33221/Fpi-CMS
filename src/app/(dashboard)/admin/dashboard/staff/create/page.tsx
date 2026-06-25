import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { getAllDepartment } from "@/services/department/getDepartment";
import CreateStaffForm from "@/components/module/admin/staff/CreateStaffForm";

export default async function CreateStaffPage() {
    const departments = await getAllDepartment()

    return (
        <div className="space-y-6">
            <ManagementPageHeader

                title="Create Staff"
                description=" Create teacher, accountant,
                    registrar, librarian or exam
                    controller account."
            />


            <Card>
                <CardHeader>
                    <CardTitle>
                        Staff Information
                    </CardTitle>
                    <CardDescription>
                        Fill in the information below
                        to create a new staff account.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <CreateStaffForm
                        departments={departments}
                
                    />
                </CardContent>
            </Card>
        </div>
    );
}
