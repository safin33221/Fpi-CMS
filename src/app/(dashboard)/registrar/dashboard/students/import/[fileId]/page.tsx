import { notFound } from "next/navigation";

import ImportPreviewTable from "@/components/module/register/student/ImportPreviewTable";
import { Button } from "@/components/ui/button";
import { getImportPreview } from "@/services/student/getImportPreview";



type Props = {
    params: Promise<{
        fileId: string;
    }>;
};

export default async function ImportPreviewPage({
    params,
}: Props) {
    const { fileId } = await params;

    let preview = null;

    try {
        preview =
            await getImportPreview(fileId);
    } catch {
        notFound();
    }

    return (
        <div className="mx-auto max-w-7xl space-y-6">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        Import Preview
                    </h1>

                    <p className="text-muted-foreground">
                        Review the imported student data before saving.
                    </p>

                </div>

                <Button
                    variant="outline"
                    
                >
                    <a href="/registrar/student-import">
                        Upload Another File
                    </a>
                </Button>

            </div>

            <ImportPreviewTable
                fileId={fileId}
                preview={preview}
            />

        </div>
    );
}