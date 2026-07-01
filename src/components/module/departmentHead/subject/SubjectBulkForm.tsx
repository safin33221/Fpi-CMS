"use client";

import { useActionState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Plus, Trash2, BookOpen, Loader2 } from "lucide-react";



import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSubject } from "@/services/subject";

type SubjectForm = {
    subjects: {
        code: string;
        name: string;
        credit: number;

        theoryMarks: number;
        practicalMarks: number;
        totalMarks: number;
    }[];
};

const initialState = {
    success: false,
    message: "",
};

export default function SubjectBulkForm() {
    const [state, formAction, pending] = useActionState(
        createSubject,
        initialState
    );

    const form = useForm<SubjectForm>({
        defaultValues: {
            subjects: [
                {
                    code: "",
                    name: "",
                    credit: 3,

                    theoryMarks: 70,
                    practicalMarks: 30,
                    totalMarks: 100,
                },
            ],
        },
    });

    const {
        control,
        register,
        watch,
    } = form;

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "subjects",
    });

    const subjects = watch("subjects");

    return (
        <form
            action={formAction}
            className="space-y-6"
        >
            {/* Hidden Values */}
            <input
                type="hidden"
                name="subjects"
                value={JSON.stringify(subjects)}
            />



            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Master Subject Entry
                    </CardTitle>

                    <CardDescription>
                        Create multiple master subjects
                        that can later be assigned to any
                        department and semester.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">


                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-muted/40">
                                <tr>
                                    <th className="p-3 text-left">Code</th>

                                    <th className="p-3 text-left">
                                        Subject
                                    </th>

                                    <th className="p-3 text-left">
                                        Credit
                                    </th>

                                    <th className="p-3 text-left">
                                        Theory
                                    </th>

                                    <th className="p-3 text-left">
                                        Practical
                                    </th>

                                    <th className="p-3 text-left">
                                        Total
                                    </th>

                                    <th className="w-16"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {fields.map((field, index) => (
                                    <tr
                                        key={field.id}
                                        className="border-t"
                                    >
                                        <td className="p-3">
                                            <Input
                                                placeholder="66611"
                                                {...register(
                                                    `subjects.${index}.code`,
                                                    {
                                                        required: true,
                                                    }
                                                )}
                                            />
                                        </td>

                                        <td className="p-3">
                                            <Input
                                                placeholder="Programming Fundamentals"
                                                {...register(
                                                    `subjects.${index}.name`,
                                                    {
                                                        required: true,
                                                    }
                                                )}
                                            />
                                        </td>

                                        <td className="p-3">
                                            <Input
                                                type="number"
                                                step="0.5"
                                                min={0}
                                                {...register(
                                                    `subjects.${index}.credit`,
                                                    {
                                                        valueAsNumber: true,
                                                    }
                                                )}
                                            />
                                        </td>
                                        <td className="p-3">
                                            <Input
                                                type="number"
                                                {...register(
                                                    `subjects.${index}.theoryMarks`,
                                                    {
                                                        valueAsNumber: true,
                                                    }
                                                )}
                                            />
                                        </td>

                                        <td className="p-3">
                                            <Input
                                                type="number"
                                                {...register(
                                                    `subjects.${index}.practicalMarks`,
                                                    {
                                                        valueAsNumber: true,
                                                    }
                                                )}
                                            />
                                        </td>

                                        <td className="p-3">
                                            <Input
                                                type="number"
                                                {...register(
                                                    `subjects.${index}.totalMarks`,
                                                    {
                                                        valueAsNumber: true,
                                                    }
                                                )}
                                            />
                                        </td>
                                        <td className="p-3 text-center">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                disabled={fields.length === 1}
                                                onClick={() => remove(index)}
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                append({
                                    code: "",
                                    name: "",
                                    credit: 3,

                                    theoryMarks: 70,
                                    practicalMarks: 30,
                                    totalMarks: 100,
                                })
                            }
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Subject
                        </Button>

                        <Button
                            type="submit"
                            disabled={pending}
                        >
                            {pending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save All Subjects"
                            )}
                        </Button>
                    </div>

                    {state?.message && (
                        <div
                            className={`rounded-lg border px-4 py-3 text-sm ${state.success
                                ? "border-green-200 bg-green-50 text-green-700"
                                : "border-red-200 bg-red-50 text-red-700"
                                }`}
                        >
                            {state.message}
                        </div>
                    )}
                </CardContent>
            </Card>
        </form>
    );
}