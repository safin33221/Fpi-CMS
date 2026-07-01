"use client";

import { useActionState, useMemo, useState } from "react";
import {
    BookOpen,
    Loader2,
    Plus,
    Trash2,
} from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import SearchableSubjectCombobox from "./SearchableSubjectCombobox";
import { assignSubjects } from "@/services/subject-assignment/assignSubjects";

const initialState = {
    success: false,
    message: "",
};

type Subject = {
    id: string;
    code: string;
    name: string;
    credit: number;
    theoryMarks: number;
    practicalMarks: number;
    totalMarks: number;

    department: {
        name: string;
    };
};

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    semesterId: string;
    semesterName: string;

    subjects: Subject[];
};

export default function AssignSubjectSheet({
    open,
    onOpenChange,
    semesterId,
    semesterName,
    subjects,
}: Props) {
    const [selectedId, setSelectedId] =
        useState("");

    const [selectedSubjects, setSelectedSubjects] =
        useState<Subject[]>([]);

    const [state, formAction, pending] =
        useActionState(
            assignSubjects,
            initialState
        );

    const currentSubject = useMemo(
        () =>
            subjects.find(
                (s) => s.id === selectedId
            ),
        [selectedId, subjects]
    );

    const addSubject = () => {
        if (!currentSubject) return;

        const exists =
            selectedSubjects.some(
                (s) =>
                    s.id === currentSubject.id
            );

        if (exists) return;

        setSelectedSubjects((prev) => [
            ...prev,
            currentSubject,
        ]);

        setSelectedId("");
    };

    const removeSubject = (id: string) => {
        setSelectedSubjects((prev) =>
            prev.filter((s) => s.id !== id)
        );
    };

    return (
        <Sheet
            open={open}
            onOpenChange={onOpenChange}
        >
            <SheetContent className="sm:max-w-xl overflow-y-auto p-4">
                <SheetHeader>
                    <SheetTitle>
                        Assign Subjects
                    </SheetTitle>

                    <SheetDescription>
                        Assign multiple subjects to{" "}
                        <span className="font-medium">
                            {semesterName}
                        </span>
                        .
                    </SheetDescription>
                </SheetHeader>

                <form
                    action={formAction}
                    className="mt-6 space-y-6"
                >
                    <input
                        type="hidden"
                        name="semesterId"
                        value={semesterId}
                    />

                    <input
                        type="hidden"
                        name="subjects"
                        value={JSON.stringify(
                            selectedSubjects.map(
                                (s) => s.id
                            )
                        )}
                    />

                    <div className="space-y-2">
                        <Label>
                            Select Subject
                        </Label>

                        <div className="flex gap-2">
                            <div className="flex-1">
                                <SearchableSubjectCombobox
                                    subjects={subjects}
                                    value={selectedId}
                                    onChange={
                                        setSelectedId
                                    }
                                />
                            </div>

                            <Button
                                type="button"
                                onClick={
                                    addSubject
                                }
                                disabled={
                                    !selectedId
                                }
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {currentSubject && (
                        <div className="rounded-xl border p-4 bg-muted/30">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-primary" />

                                <h3 className="font-semibold">
                                    {
                                        currentSubject.name
                                    }
                                </h3>
                            </div>

                            <Separator className="my-4" />

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-muted-foreground">
                                        Code
                                    </p>

                                    <p>
                                        {
                                            currentSubject.code
                                        }
                                    </p>
                                </div>

                                <div>
                                    <p className="text-muted-foreground">
                                        Credit
                                    </p>

                                    <p>
                                        {
                                            currentSubject.credit
                                        }
                                    </p>
                                </div>

                                <div>
                                    <p className="text-muted-foreground">
                                        Theory
                                    </p>

                                    <p>
                                        {
                                            currentSubject.theoryMarks
                                        }
                                    </p>
                                </div>

                                <div>
                                    <p className="text-muted-foreground">
                                        Practical
                                    </p>

                                    <p>
                                        {
                                            currentSubject.practicalMarks
                                        }
                                    </p>
                                </div>

                                <div>
                                    <p className="text-muted-foreground">
                                        Total
                                    </p>

                                    <p>
                                        {
                                            currentSubject.totalMarks
                                        }
                                    </p>
                                </div>

                                <div>
                                    <p className="text-muted-foreground">
                                        Department
                                    </p>

                                    <p>
                                        {
                                            currentSubject
                                                .department
                                                .name
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedSubjects.length >
                        0 && (
                        <div className="space-y-3">
                            <Label>
                                Selected Subjects (
                                {
                                    selectedSubjects.length
                                }
                                )
                            </Label>

                            <div className="space-y-2">
                                {selectedSubjects.map(
                                    (
                                        subject
                                    ) => (
                                        <div
                                            key={
                                                subject.id
                                            }
                                            className="flex items-center justify-between rounded-lg border p-3"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {
                                                        subject.code
                                                    }{" "}
                                                    -{" "}
                                                    {
                                                        subject.name
                                                    }
                                                </p>

                                                <div className="mt-1 flex gap-2">
                                                    <Badge
                                                        variant="secondary"
                                                    >
                                                        Credit{" "}
                                                        {
                                                            subject.credit
                                                        }
                                                    </Badge>

                                                    <Badge
                                                        variant="outline"
                                                    >
                                                        {
                                                            subject
                                                                .department
                                                                .name
                                                        }
                                                    </Badge>
                                                </div>
                                            </div>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    removeSubject(
                                                        subject.id
                                                    )
                                                }
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {state.message && (
                        <div
                            className={`rounded-lg border px-4 py-3 text-sm ${
                                state.success
                                    ? "border-green-300 bg-green-50 text-green-700"
                                    : "border-red-300 bg-red-50 text-red-700"
                            }`}
                        >
                            {state.message}
                        </div>
                    )}

                    <SheetFooter>
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={
                                pending ||
                                selectedSubjects.length ===
                                    0
                            }
                        >
                            {pending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Assigning...
                                </>
                            ) : (
                                <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Assign{" "}
                                    {
                                        selectedSubjects.length
                                    }{" "}
                                    Subject
                                    {selectedSubjects.length >
                                    1
                                        ? "s"
                                        : ""}
                                </>
                            )}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}