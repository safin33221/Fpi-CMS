import { FileSpreadsheet } from "lucide-react";

import { Button } from "@/components/ui/button";
import ImportStudentForm from "@/components/module/register/student/ImportStudentForm";

export default function ImportStudentsPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Import Students
                    </h1>

                    <p className="mt-1 text-muted-foreground">
                        Import existing students using an Excel file.
                    </p>
                </div>

                <Button variant="outline">
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Download Template
                </Button>
            </div>

            <ImportStudentForm />
        </div>
    );
}