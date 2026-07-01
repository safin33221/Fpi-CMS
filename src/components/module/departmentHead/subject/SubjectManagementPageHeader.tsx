"use client"
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubjectManagementPageHeader() {
  const router = useRouter()
  return (
    <div>
      <ManagementPageHeader
        title="Manage Subjects"
        description="See all the Subjects in your institution."
        action={{
          icon: Plus,
          label: "Create",
          onClick: (() => {
            router.push("/admin/dashboard/subjects/create")
          })
        }}
      />
    </div>
  );
};
