"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ISemester {
    id: string;
    name: string;
    number: number;
}

type Props = {
    semesters: ISemester[];
    selectedSemesterId: string;
    onChange: (semesterId: string) => void;
    onAssignSubject: () => void;
};

export default function SemesterTabs({
    semesters,
    selectedSemesterId,
    onChange,
    onAssignSubject,
}: Props) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex-1">
                <div className="grid w-full grid-cols-8 gap-2 rounded-xl border bg-card p-2">
                    {semesters.map((semester) => {
                        const active =
                            semester.id === selectedSemesterId;

                        return (
                            <button
                                key={semester.id}
                                type="button"
                                onClick={() =>
                                    onChange(semester.id)
                                }
                                className={cn(
                                    "flex flex-col items-center justify-center rounded-lg px-3 py-3 text-sm font-medium transition-all",
                                    active
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <span>{semester.name}</span>

                                <span className="text-xs opacity-80">
                                    Semester {semester.number}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <Button onClick={onAssignSubject}>
                Assign Subject
            </Button>
        </div>
    );
}