"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
    CheckCircle2,
    FileSpreadsheet,
    Loader2,
    UploadCloud,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { importStudentPreview } from "@/services/student/importStudentPreview";

export default function ImportStudentForm() {
    const router = useRouter();

    const inputRef =
        useRef<HTMLInputElement>(null);

    const [file, setFile] =
        useState<File | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [createAccount, setCreateAccount] =
        useState(true);

    const [generatePassword, setGeneratePassword] =
        useState(true);

    const handlePreview = async () => {
        if (!file) return;

        try {
            setLoading(true);
            setError("");

            const result =
                await importStudentPreview(
                    file
                );

            if (!result.success) {
                setError(
                    result.message ||
                    "Preview failed."
                );
                return;
            }
            console.log(result);

            /**
             * Backend should return
             *
             * {
             *   success:true,
             *   data:{
             *      fileId:"9f6ab2.xlsx"
             *   }
             * }
             */

            router.push(
                `/registrar/dashboard/students/import/${result.data.fileId}`
            );
        } catch (err) {
            console.error(err);

            setError(
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 rounded-3xl border bg-card p-8 shadow-sm">

            {/* Upload */}

            <div
                onClick={() =>
                    inputRef.current?.click()
                }
                className="
                    cursor-pointer
                    rounded-3xl
                    border-2
                    border-dashed
                    border-primary/20
                    p-12
                    transition-all
                    hover:border-primary
                    hover:bg-primary/5
                "
            >
                <div className="flex flex-col items-center text-center">

                    <div className="mb-4 rounded-full bg-primary/10 p-4">

                        <UploadCloud className="h-8 w-8 text-primary" />

                    </div>

                    <h2 className="text-xl font-semibold">
                        Upload Student Excel
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Click here to browse or drag &
                        drop your Excel file.
                    </p>

                    <p className="mt-3 text-xs text-muted-foreground">
                        Supported:
                        .xlsx / .xls /.csv
                    </p>

                </div>

                <input
                    ref={inputRef}
                    hidden
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={(e) => {
                        setError("");

                        setFile(
                            e.target.files?.[0] ??
                            null
                        );
                    }}
                />
            </div>

            {/* Options */}

            <div className="space-y-4 rounded-2xl border p-5">

                <div className="flex items-center gap-3">

                    <Checkbox
                        checked={
                            createAccount
                        }
                        onCheckedChange={(
                            value
                        ) =>
                            setCreateAccount(
                                Boolean(value)
                            )
                        }
                    />

                    <label className="text-sm font-medium">

                        Create Login Account

                    </label>

                </div>

                <div className="flex items-center gap-3">

                    <Checkbox
                        checked={
                            generatePassword
                        }
                        onCheckedChange={(
                            value
                        ) =>
                            setGeneratePassword(
                                Boolean(value)
                            )
                        }
                    />

                    <label className="text-sm font-medium">

                        Generate Temporary Password

                    </label>

                </div>

            </div>

            {/* Selected File */}

            {file && (
                <div className="flex items-center justify-between rounded-2xl border bg-muted/40 p-4">

                    <div className="flex items-center gap-3">

                        <div className="rounded-xl bg-emerald-500/10 p-3">

                            <FileSpreadsheet className="h-6 w-6 text-emerald-600" />

                        </div>

                        <div>

                            <p className="font-medium">
                                {file.name}
                            </p>

                            <p className="text-sm text-muted-foreground">

                                {(
                                    file.size /
                                    1024
                                ).toFixed(2)}{" "}
                                KB

                            </p>

                        </div>

                    </div>

                    <CheckCircle2 className="h-6 w-6 text-green-600" />

                </div>
            )}

            {error && (
                <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="flex justify-end">

                <Button
                    size="lg"
                    disabled={
                        !file || loading
                    }
                    onClick={
                        handlePreview
                    }
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        "Upload & Preview"
                    )}
                </Button>

            </div>

        </div>
    );
}