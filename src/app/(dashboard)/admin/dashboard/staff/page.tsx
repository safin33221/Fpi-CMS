import StaffManagementPageHeader from "@/components/module/admin/staff/StaffManagementPageHeader"

export default function page() {
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

            <div className="rounded-xl border">
                <div className="border-b p-4">
                    <h2 className="font-semibold">
                        Staff List
                    </h2>
                </div>

                <div className="p-8 text-center text-muted-foreground">
                    No staff found.
                </div>
            </div>
        </div>
    );
}