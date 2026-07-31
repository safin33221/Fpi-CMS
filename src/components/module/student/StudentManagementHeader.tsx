"use client"
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentManagementHeader() {
    const router = useRouter()
    return (
        <div>
            <ManagementPageHeader
                title="Student Management"
                action={{
                    icon: Plus,
                    label: "import Students",
                    onClick: () => {
                        router.push("/registrar/dashboard/students/import")
                    }
                }}
            />
        </div>
    );
};
