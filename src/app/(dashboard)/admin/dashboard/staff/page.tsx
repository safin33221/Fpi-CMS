import StaffManagement from "@/components/module/admin/staff/StaffManagement";
import StaffManagementPageHeader from "@/components/module/admin/staff/StaffManagementPageHeader"
import { getAllStaff } from "@/services/staff/getStaff";

export default async function page() {
    const staffs = await getAllStaff()
    console.log({ staffs });
    return (
        <div className="space-y-6">
            <StaffManagementPageHeader />

            <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">
                        Total Staff
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">
                        0
                    </h3>
                </div>

                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">
                        Teachers
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">
                        0
                    </h3>
                </div>

                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">
                        Department Heads
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">
                        0
                    </h3>
                </div>

                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">
                        Active Staff
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">
                        0
                    </h3>
                </div>
            </div>

            <StaffManagement

                staffs={staffs}
            />
        </div>
    );
}