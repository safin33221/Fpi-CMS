"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import {
    AlertTriangle,
    CheckCircle2,
    FileSpreadsheet,
    Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IImportPreview } from "@/types/import";
import { commitImport } from "@/services/student/commitSaveStudent";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
    fileId: string;
    preview: IImportPreview;
};

export default function ImportPreviewTable({
    fileId,
    preview,
}: Props) {
    const [search, setSearch] = useState("");

    const rows = useMemo(() => {
        if (!search.trim()) {
            return preview.students;
        }

        const keyword = search.toLowerCase();

        return preview.students.filter(
            (student) =>
                student.data.fullName
                    ?.toLowerCase()
                    .includes(keyword) ||
                student.data.roll
                    ?.toLowerCase()
                    .includes(keyword) ||
                student.data.registrationNo
                    ?.toLowerCase()
                    .includes(keyword) ||
                student.data.departmentCode
                    ?.toLowerCase()
                    .includes(keyword)
        );
    }, [preview.students, search]);


    const router = useRouter();

    const [isPending, startTransition] =
        useTransition();

    const handleImport = () => {
        startTransition(async () => {
            try {
                const result =
                    await commitImport(fileId);

                toast.success(
                    `${result.imported} students imported successfully.`
                );

                router.push(
                    "/registrar/dashboard/students"
                );

                router.refresh();
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Import failed."
                );
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Summary */}

            <div className="grid gap-5 md:grid-cols-3">
                <div className="rounded-3xl border bg-card p-6 shadow-sm">
                    <p className="text-sm text-muted-foreground">
                        Total Records
                    </p>

                    <h2 className="mt-2 text-4xl font-bold">
                        {preview.totalRows}
                    </h2>
                </div>

                <div className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />

                        <span className="font-semibold text-green-700">
                            Ready to Import
                        </span>
                    </div>

                    <h2 className="mt-3 text-4xl font-bold text-green-700">
                        {preview.validRows}
                    </h2>
                </div>

                <div className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />

                        <span className="font-semibold text-red-700">
                            Validation Errors
                        </span>
                    </div>

                    <h2 className="mt-3 text-4xl font-bold text-red-700">
                        {preview.invalidRows}
                    </h2>
                </div>
            </div>

            {/* Warning */}

            {preview.invalidRows > 0 && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <div className="flex gap-3">
                        <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />

                        <div>
                            <p className="font-semibold text-amber-700">
                                Some records cannot be imported.
                            </p>

                            <p className="mt-1 text-sm text-amber-600">
                                Fix the invalid rows in Excel and upload again,
                                or continue importing only the valid students.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Toolbar */}

            <div className="flex flex-col gap-4 rounded-2xl border bg-card p-4 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                    <Input
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search student..."
                        className="pl-9"
                    />
                </div>

                <Button variant="outline">
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Download Error Report
                </Button>
            </div>

            {/* Table */}

            <div className="overflow-x-auto rounded-3xl border bg-card shadow-sm">
                <table className="w-full">
                    <thead className="border-b bg-muted/40">
                        <tr className="text-left text-sm">
                            <th className="px-5 py-4">#</th>
                            <th className="px-5 py-4">Roll</th>
                            <th className="px-5 py-4">Registration</th>
                            <th className="px-5 py-4">Student</th>
                            <th className="px-5 py-4">Department</th>
                            <th className="px-5 py-4">Semester</th>
                            <th className="px-5 py-4">Status</th>
                            <th className="px-5 py-4">Remark</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="py-10 text-center text-muted-foreground"
                                >
                                    No student found.
                                </td>
                            </tr>
                        ) : (
                            rows.map((row) => (
                                <tr
                                    key={row.row}
                                    className="border-b last:border-none hover:bg-muted/30"
                                >
                                    <td className="px-5 py-4">
                                        {row.row}
                                    </td>

                                    <td className="px-5 py-4 font-medium">
                                        {row.data.roll}
                                    </td>

                                    <td className="px-5 py-4">
                                        {row.data.registrationNo}
                                    </td>

                                    <td className="px-5 py-4">
                                        {row.data.fullName}
                                    </td>

                                    <td className="px-5 py-4">
                                        {row.data.departmentCode}
                                    </td>

                                    <td className="px-5 py-4">
                                        {row.data.semesterNumber}
                                    </td>

                                    <td className="px-5 py-4">
                                        {row.valid ? (
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                Valid
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                                                Invalid
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-red-600">
                                        {row.errors?.length
                                            ? row.errors.join(", ")
                                            : "-"}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}

            <div className="sticky bottom-0 flex flex-col gap-4 rounded-3xl border bg-background/95 p-5 backdrop-blur md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="font-semibold">
                        Ready to import
                    </p>

                    <p className="text-sm text-muted-foreground">
                        {preview.validRows} of {preview.totalRows} students
                        will be imported.
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline">
                        <Link href="/registrar/dashboard/students/import">
                            Back
                        </Link>
                    </Button>

                    <Button
                        disabled={
                            preview.validRows === 0 ||
                            isPending
                        }
                        onClick={handleImport}
                    >
                        {isPending
                            ? "Importing..."
                            : `Import ${preview.validRows} Students`}
                    </Button>
                </div>
            </div>
        </div>
    );
}