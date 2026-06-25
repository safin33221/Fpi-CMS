"use client"
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StaffManagementPageHeader() {
    const router = useRouter()
    return (
        <div>
            <ManagementPageHeader
                title="Staff Management"
                description="Manage teachers, accountants,
                        registrars, librarians and
                        exam controllers."
                action={{
                    icon: Plus,
                    label: "Add",
                    onClick: () => {
                        router.push("/admin/dashboard/staff/create")
                    }
                }}
            />
        </div>
    );
};
